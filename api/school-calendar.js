const DISTRICT_ICS='https://thrillshare-cmsv2.services.thrillshare.com/api/v4/o/27049/cms/events/generate_ical?filter_ids=&section_ids=';
const VOIGT_ICS='https://thrillshare-cmsv2.services.thrillshare.com/api/v4/o/27541/cms/events/generate_ical?filter_ids=&section_ids=';

function unfold(text){return text.replace(/\r?\n[ \t]/g,'');}
function unescapeIcs(s=''){return s.replace(/\\n/gi,'\n').replace(/\\,/g,',').replace(/\\;/g,';').replace(/\\\\/g,'\\');}
function prop(block,name){
  const line=block.split(/\r?\n/).find(l=>l.toUpperCase().startsWith(name.toUpperCase()+':')||l.toUpperCase().startsWith(name.toUpperCase()+';'));
  if(!line)return '';
  const i=line.indexOf(':');
  return i>=0?unescapeIcs(line.slice(i+1).trim()):'';
}
function propLine(block,name){return block.split(/\r?\n/).find(l=>l.toUpperCase().startsWith(name.toUpperCase()+':')||l.toUpperCase().startsWith(name.toUpperCase()+';'))||'';}
function pad(n){return String(n).padStart(2,'0');}
function parseStart(block){
  const line=propLine(block,'DTSTART');
  if(!line)return {date:'',start:null,allDay:true,time:''};
  const raw=line.slice(line.indexOf(':')+1).trim();
  const allDay=/VALUE=DATE/i.test(line)||/^\d{8}$/.test(raw);
  const y=raw.slice(0,4),m=raw.slice(4,6),d=raw.slice(6,8);
  const date=`${y}-${m}-${d}`;
  if(allDay)return {date,start:`${date}T00:00:00`,allDay:true,time:'All day'};
  let iso;
  if(/Z$/.test(raw)) iso=`${y}-${m}-${d}T${raw.slice(9,11)}:${raw.slice(11,13)}:${raw.slice(13,15)||'00'}Z`;
  else iso=`${y}-${m}-${d}T${raw.slice(9,11)}:${raw.slice(11,13)}:${raw.slice(13,15)||'00'}-05:00`;
  const dt=new Date(iso);
  const time=Number.isNaN(dt.getTime())?'':new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/Chicago'}).format(dt);
  return {date,start:iso,allDay:false,time};
}
function parseEnd(block){
  const line=propLine(block,'DTEND'); if(!line)return null;
  const raw=line.slice(line.indexOf(':')+1).trim();
  if(/^\d{8}$/.test(raw)) return `${raw.slice(0,4)}-${raw.slice(4,6)}-${raw.slice(6,8)}T00:00:00`;
  const y=raw.slice(0,4),m=raw.slice(4,6),d=raw.slice(6,8);
  if(/Z$/.test(raw)) return `${y}-${m}-${d}T${raw.slice(9,11)}:${raw.slice(11,13)}:${raw.slice(13,15)||'00'}Z`;
  return `${y}-${m}-${d}T${raw.slice(9,11)}:${raw.slice(11,13)}:${raw.slice(13,15)||'00'}-05:00`;
}
function normalizeTitle(s=''){return s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,' ').trim();}
function dedupeKey(e){return `${e.date}|${e.start||''}|${normalizeTitle(e.title)}`;}
function parseCalendar(text,source,sourceUrl){
  const flat=unfold(text);
  const blocks=flat.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g)||[];
  return blocks.map((block,i)=>{
    const st=parseStart(block);
    return {
      id:prop(block,'UID')||`${source}-${i}-${st.date}`,
      title:prop(block,'SUMMARY')||'Untitled event',
      date:st.date,
      start:st.start,
      end:parseEnd(block),
      allDay:st.allDay,
      time:st.time,
      location:prop(block,'LOCATION'),
      details:prop(block,'DESCRIPTION'),
      source,
      sourceUrl,
      type:source==='Voigt Arts Integration Academy'?'School event':'District event'
    };
  }).filter(e=>e.date&&e.title);
}
function sameLoose(a,b){
  if(a.date!==b.date)return false;
  const ta=normalizeTitle(a.title),tb=normalizeTitle(b.title);
  if(ta===tb)return true;
  if(ta.includes(tb)||tb.includes(ta))return Math.min(ta.length,tb.length)>=8;
  return false;
}

export default async function handler(req,res){
  if(req.method!=='GET'){res.status(405).json({error:'Method not allowed'});return;}
  try{
    const [districtResp,voigtResp]=await Promise.all([
      fetch(DISTRICT_ICS,{headers:{accept:'text/calendar'}}),
      fetch(VOIGT_ICS,{headers:{accept:'text/calendar'}})
    ]);
    if(!districtResp.ok||!voigtResp.ok) throw new Error(`Calendar source error: district ${districtResp.status}, Voigt ${voigtResp.status}`);
    const [districtText,voigtText]=await Promise.all([districtResp.text(),voigtResp.text()]);
    const district=parseCalendar(districtText,'Round Rock ISD','https://www.roundrockisd.org/events');
    const voigt=parseCalendar(voigtText,'Voigt Arts Integration Academy','https://voigt.roundrockisd.org/events?view=list-month');
    const merged=[];
    const seen=new Set();
    for(const e of [...voigt,...district]){
      const key=dedupeKey(e);
      if(seen.has(key)||merged.some(x=>sameLoose(x,e))) continue;
      seen.add(key); merged.push(e);
    }
    const pta={
      id:'voigt-pta-fall-festival-2026',
      title:'The 2026 Voigt PTA Fall Festival',
      date:'2026-10-23',
      start:'2026-10-23T17:30:00-05:00',
      end:'2026-10-23T19:30:00-05:00',
      allDay:false,
      time:'5:30 PM',
      location:'Xenia Voigt Arts Integration Academy, 1201 Cushing Dr, Round Rock, TX 78664',
      details:'Voigt PTA family fall festival with games, arts, food, performances, Trunk-or-Treat, and community activities.',
      source:'Xenia Voigt PTA',
      sourceUrl:'/viking-quest',
      type:'PTA event'
    };
    if(!merged.some(e=>sameLoose(e,pta))) merged.push(pta);
    merged.sort((a,b)=>String(a.start||a.date).localeCompare(String(b.start||b.date))||a.title.localeCompare(b.title));
    res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({ok:true,events:merged,sources:{district:'https://www.roundrockisd.org/events',voigt:'https://voigt.roundrockisd.org/events?view=list-month'},counts:{district:district.length,voigt:voigt.length,merged:merged.length}});
  }catch(err){
    console.error(err);
    res.status(502).json({ok:false,error:'Official school calendars are temporarily unavailable.'});
  }
}
