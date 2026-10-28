
const DISTRICT_ICS_ID='27049';
const VOIGT_ICS='https://thrillshare-cmsv2.services.thrillshare.com/api/v4/o/27541/cms/events/generate_ical?filter_ids=&section_ids=';

const DISTRICT_ICS=VOIGT_ICS.replace('/27541/','/'+DISTRICT_ICS_ID+'/');
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
function centralOffset(date,time){
 const hour=Number(time.slice(0,2)||12);
 const guess=new Date(date+'T'+time+'Z');
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',timeZoneName:'shortOffset'}).formatToParts(guess);
 const offset=parts.find(p=>p.type==='timeZoneName')?.value||'GMT-6';
 const n=Number((offset.match(/GMT([+-]\d+)/)||[])[1]||-6);
 return (n<0?'-':'+')+String(Math.abs(n)).padStart(2,'0')+':00';
}
function parseDateLine(block,name){
 const line=propLine(block,name);if(!line)return null;
 const raw=line.slice(line.indexOf(':')+1).trim();
 const allDay=/VALUE=DATE/i.test(line)||/^\d{8}$/.test(raw);
 const date=raw.slice(0,4)+'-'+raw.slice(4,6)+'-'+raw.slice(6,8);
 if(allDay)return {date,iso:date,allDay:true,time:'All day'};
 const time=raw.slice(9,11)+':'+raw.slice(11,13)+':'+(raw.slice(13,15)||'00');
 const tzid=(line.match(/TZID=([^;:]+)/i)||[])[1]||'';
 let iso;
 if(raw.endsWith('Z'))iso=date+'T'+time+'Z';
 else if(/America\/Chicago|US\/Central/i.test(tzid)||!tzid)iso=date+'T'+time+centralOffset(date,time);
 else {iso=date+'T'+time; /* preserve unsupported timezone as local wall time rather than inventing an offset */}
 const dt=new Date(iso);
 const fmt=Number.isNaN(dt.getTime())?'See official calendar':new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/Chicago'}).format(dt);
 const localDate=Number.isNaN(dt.getTime())?date:new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'America/Chicago'}).format(dt);
 return {date:localDate,iso,allDay:false,time:fmt};
}
function parseStart(block){const p=parseDateLine(block,'DTSTART');return p?{date:p.date,start:p.iso,allDay:p.allDay,time:p.time}:{date:'',start:null,allDay:true,time:''};}
function parseEnd(block){return parseDateLine(block,'DTEND')?.iso||null;}
function normalizeTitle(s=''){return s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,' ').trim();}
function dedupeKey(e){return `${e.date}|${e.start||''}|${normalizeTitle(e.title)}`;}
function parseCalendar(text,source,sourceUrl){
  const flat=unfold(text);
  const blocks=flat.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g)||[];
  return blocks.flatMap((block,i)=>{
    const st=parseStart(block);
    const event={
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
    if(!event.date||!event.title)return [];
    if(!event.allDay||!event.end)return [event];
    const endDate=event.end.slice(0,10);const day=new Date(event.date+'T12:00:00Z');const last=new Date(endDate+'T12:00:00Z');const dates=[];
    while(day<last&&dates.length<45){dates.push({...event,date:day.toISOString().slice(0,10),id:event.id+'-'+dates.length});day.setUTCDate(day.getUTCDate()+1);}
    return dates.length?dates:[event];
  });
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
    const [voigtResp,districtResp]=await Promise.all([fetch(VOIGT_ICS,{headers:{accept:'text/calendar'},signal:AbortSignal.timeout(9000)}),fetch(DISTRICT_ICS,{headers:{accept:'text/calendar'},signal:AbortSignal.timeout(9000)}).catch(()=>null)]);
    if(!voigtResp.ok) throw new Error('School calendar feed unavailable');
    const voigtText=await voigtResp.text();
    const voigt=parseCalendar(voigtText,'Voigt Arts Integration Academy','https://voigt.roundrockisd.org/events?view=list-month');
    const district=districtResp?.ok?parseCalendar(await districtResp.text(),'Round Rock ISD','https://www.roundrockisd.org/events'):[];
    const academicDates=[
      ['2026-08-19','First day of school'],['2026-09-07','Labor Day — no school'],['2026-09-21','Student holiday / staff development'],['2026-10-09','Student holiday / staff development'],['2026-10-12','Student holiday / elementary conferences'],['2026-10-19','YOU Day — no school'],['2026-11-23','Fall Break — no school'],['2026-11-24','Fall Break — no school'],['2026-11-25','Fall Break — no school'],['2026-11-26','Fall Break — no school'],['2026-11-27','Fall Break — no school'],['2026-12-18','Student holiday / teacher work day'],['2026-12-21','Winter Break — no school'],['2026-12-22','Winter Break — no school'],['2026-12-23','Winter Break — no school'],['2026-12-24','Winter Break — no school'],['2026-12-25','Winter Break — no school'],['2026-12-28','Winter Break — no school'],['2026-12-29','Winter Break — no school'],['2026-12-30','Winter Break — no school'],['2026-12-31','Winter Break — no school'],['2027-01-01','New Year’s Day — no school'],['2027-01-04','Student holiday / staff development'],['2027-01-18','Martin Luther King Jr. Day — no school'],['2027-02-12','Student holiday / staff development'],['2027-02-15','YOU Day / Presidents Day — no school'],['2027-03-10','Student holiday / staff development'],['2027-03-15','Spring Break — no school'],['2027-03-16','Spring Break — no school'],['2027-03-17','Spring Break — no school'],['2027-03-18','Spring Break — no school'],['2027-03-19','Spring Break — no school'],['2027-03-26','Good Friday — no school'],['2027-05-27','Last day of school']
    ].map(([date,title])=>({id:'rrisd-academic-'+date,title,date,start:date,end:null,allDay:true,time:'All day',source:'RRISD 2026–27 adopted academic calendar',sourceUrl:'https://www.roundrockisd.org/o/rrisd/page/calendars',type:'District event',details:'District academic calendar date; check the official calendar for updates.'}));
    const merged=[];
    const seen=new Set();
    for(const e of [...voigt,...district,...academicDates]){
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
      sourceUrl:'/events#pta-photo-memories',
      type:'PTA event'
    };
    if(!merged.some(e=>sameLoose(e,pta))) merged.push(pta);
    merged.sort((a,b)=>String(a.start||a.date).localeCompare(String(b.start||b.date))||a.title.localeCompare(b.title));
    res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({ok:true,events:merged,sources:{voigt:'https://voigt.roundrockisd.org/events?view=list-month'},sourceStatus:{school:'synced',district:districtResp?.ok?'live events + academic dates':'academic dates only; live feed unavailable',pta:'historical event only'},counts:{voigt:voigt.length,district:district.length,merged:merged.length}});
  }catch(err){
    console.error(err);
    res.status(502).json({ok:false,error:'Official school calendars are temporarily unavailable.'});
  }
}
