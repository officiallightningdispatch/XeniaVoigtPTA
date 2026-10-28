
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

async function mealForDate(date){
 const result={date,breakfast:[],lunch:[],status:'unavailable',source:'https://www.roundrockisd.org/page/menus'};
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return result;
 const base='https://roundrockisd.api.nutrislice.com/menu/api';
 try{
  const schoolsResponse=await fetch(base+'/schools',{signal:AbortSignal.timeout(5000)});
  if(!schoolsResponse.ok)return result;
  const schools=await schoolsResponse.json();
  const list=Array.isArray(schools)?schools:Array.isArray(schools.schools)?schools.schools:[];
  const school=list.find(x=>/voigt/i.test([x.name,x.slug,x.id].join(' ')));
  if(!school)return result;
  const schoolSlug=school.slug||school.name?.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  if(!schoolSlug)return result;
  const [y,m,d]=date.split('-');
  const requests=['breakfast','lunch'].map(async kind=>{
   const url=base+'/digest/school/'+encodeURIComponent(schoolSlug)+'/menu-type/'+kind+'/date/'+y+'/'+Number(m)+'/'+Number(d);
   const response=await fetch(url,{signal:AbortSignal.timeout(5000)});
   if(!response.ok)return [];
   const data=await response.json();
   return Array.isArray(data.menu_items)?data.menu_items.filter(x=>typeof x==='string'&&x.trim()).slice(0,18):[];
  });
  const [breakfast,lunch]=await Promise.all(requests);
  return {...result,breakfast,lunch,status:breakfast.length||lunch.length?'published':'not published'};
 }catch(e){return result;}
}

export default async function handler(req,res){
  if(req.method!=='GET'){res.status(405).json({error:'Method not allowed'});return;}
  try{
    const mealDate=String(req.query?.mealDate||'');
    if(mealDate){const menu=await mealForDate(mealDate);res.setHeader('Cache-Control','s-maxage=1800, stale-while-revalidate=3600');return res.status(200).json({ok:true,menu});}
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
    // Confirmed by PTA board update October 28, 2026. Times were not provided;
    // all-day markers denote date-only listings, not all-day programming.
    const upcomingPtaEvents=[
      {
        id:'voigt-pta-teacher-thanksgiving-lunch-2026',
        title:'Teacher Thanksgiving Lunch',
        date:'2026-11-18',
        details:'PTA teacher appreciation lunch. PTA will smoke and provide turkeys; staff will bring side dishes potluck-style. Time to be announced.',
      },
      {
        id:'voigt-pta-boosterthon-fun-run-2026',
        title:'Boosterthon Fun Run',
        date:'2026-12-04',
        details:'Boosterthon Fun Run scheduled for December 4. Planning and event details to follow from the PTA. Time to be announced.',
      },
      {
        id:'voigt-pta-teacher-coffee-cart-2026',
        title:'Teacher Appreciation Coffee Cart',
        date:'2026-12-16',
        details:'Teacher appreciation coffee cart scheduled for December 16. Time to be announced.',
      }
    ].map(e=>({
      ...e,
      start:e.date,
      end:null,
      allDay:true,
      time:'Time to be announced',
      location:'Xenia Voigt Arts Integration Academy',
      source:'Xenia Voigt PTA board update, October 28, 2026',
      sourceUrl:'/events',
      type:'PTA event'
    }));
    for(const event of upcomingPtaEvents){
      if(!merged.some(existing=>sameLoose(existing,event)))merged.push(event);
    }
    merged.sort((a,b)=>String(a.start||a.date).localeCompare(String(b.start||b.date))||a.title.localeCompare(b.title));
    res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({ok:true,events:merged,sources:{voigt:'https://voigt.roundrockisd.org/events?view=list-month'},sourceStatus:{school:'synced',district:districtResp?.ok?'live events + academic dates':'academic dates only; live feed unavailable',pta:'historical event only'},counts:{voigt:voigt.length,district:district.length,merged:merged.length}});
  }catch(err){
    console.error(err);
    res.status(502).json({ok:false,error:'Official school calendars are temporarily unavailable.'});
  }
}
