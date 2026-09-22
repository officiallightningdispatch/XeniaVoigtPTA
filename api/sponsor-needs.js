import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';
import { sendSponsorPledgeNotification } from './_email.js';

const NEEDS = [
  {id:'dj-mc',category:'Entertainment',title:'DJ / MC underwriting',target:300,priority:'Critical',details:'Underwrite the current two-hour DJ/MC proposal for the October 23 Fall Festival.',fulfillment:'Financial sponsorship. PTA confirms booking after funding and campus sound-connection details are finalized.',recognition:'Sponsor recognition on the event website and applicable entertainment-area recognition.'},
  {id:'obstacle-course',category:'Inflatables',title:'Inflatable obstacle course',target:365,priority:'Critical',details:'Fund one inflatable obstacle-course rental to expand the free attraction area for families.',fulfillment:'Financial sponsorship toward the current estimated rental. Electrical access is available; final layout remains subject to campus safety approval.',recognition:'Recognition near the sponsored attraction when permitted, plus website recognition.'},
  {id:'bounce-combo',category:'Inflatables',title:'Bounce / combo inflatable',target:195,priority:'Covered',details:'One bounce/combo inflatable experience for families during Viking Quest.',fulfillment:'Fully pledged by Shine Pediatric Dental Co. for the current $195 attraction cost. Final placement remains subject to campus safety/layout approval.',recognition:'Shine Pediatric Dental Co. will receive attraction sponsor recognition on the website and near the sponsored inflatable where permitted.',outreachStatus:'Covered — no additional sponsorship outreach needed.'},
  {id:'interactive-inflatable',category:'Inflatables',title:'Interactive inflatable / game',target:225,priority:'Critical',details:'Fund one additional interactive inflatable or comparable major family attraction.',fulfillment:'Financial sponsorship toward the current estimated rental; final attraction selection follows campus/layout approval.',recognition:'Recognition near the sponsored attraction when permitted, plus website recognition.'},
  {id:'trackless-train',category:'Major Attraction',title:'Trackless train',target:1095,priority:'Covered',details:'AiRCO Mechanical has pledged the full $1,095 needed for the Viking Quest trackless train.',fulfillment:'Fully pledged by AiRCO Mechanical. PTA will coordinate payment follow-through, vendor booking, route, insurance, and campus approval.',recognition:'AiRCO Mechanical receives Trackless Train Sponsor recognition on the website and event signage where approved.',outreachStatus:'Covered — no additional sponsorship outreach needed.'},
  {id:'sensory-retreat',category:'Accessibility',title:'Sensory-Friendly Retreat bundle',target:449.16,priority:'Critical',details:'Support noise-reducing earmuffs, fidgets, weighted lap pads, soft seating/mats, and visual timers for the quiet retreat.',fulfillment:'Financial or equivalent in-kind support. Specialized items remain subject to school protocol and final room setup.',recognition:'Accessibility-support recognition on the website and applicable retreat signage.'},
  {id:'quest-prizes',category:'Viking Quest',title:'Quest completion prizes',target:262.50,priority:'Critical',details:'Provide approximately 350 small completion prizes so children who finish the Viking Quest leave with a reward.',fulfillment:'Financial or in-kind sponsorship. Multiple sponsors may combine to reach the full quantity.',recognition:'Viking Quest supporter recognition on the website and applicable finish-area signage.'},
  {id:'quest-pouches',category:'Viking Quest',title:'Quest pouches / favor bags',target:105,priority:'Critical',details:'Provide approximately 300 small bags for children to collect their Viking Quest keepsakes.',fulfillment:'Financial or in-kind donation of equivalent bags. Final style/color coordinated with the PTA.',recognition:'Viking Quest supporter recognition on the website.'},
  {id:'trial-of-skill',category:'Viking Quest',title:'Trial of Skill station bundle',target:270.60,priority:'Critical',details:'Complete the Trial of Skill with child-safe foam/Velcro axes, a soft target and stand, stabilizing weights, Hack-Silver coins, and throw-line supplies.',fulfillment:'Financial or equivalent in-kind support. Art markers may be filled through existing arts outreach, so the PTA will reconcile any duplicate materials before purchase.',recognition:'Named Trial of Skill station supporter recognition on the website and applicable station signage.',outreachStatus:'Dedicated sponsorship outreach not started.'},
  {id:'longship-music',category:'Viking Quest',title:'Longship Builders music + crew bundle',target:239.40,priority:'High',details:'Support rhythm sticks, egg shakers/maracas, hand or bucket drums, a portable speaker, and Dragon Crew stickers/tattoos for the Longship Builders experience.',fulfillment:'Loans, in-kind supplies, or financial sponsorship are all useful; reusable music equipment is preferred as a loan before purchase.',recognition:'Longship Builders supporter recognition on the website and applicable station signage.',outreachStatus:'Dedicated sponsorship outreach not started.'},
  {id:'cakewalk-prizes',category:'Cake Walk',title:'Cakewalk dessert prizes',target:0,priority:'High',details:'Help fill approximately 15 cakewalk rounds with commercially prepared or packaged cakes, cupcakes, cookies, brownies, cake pops, pastry boxes, or dessert certificates.',fulfillment:"Paige's Bakehouse has confirmed one physical prize: a dozen decorated cookies. Nothing Bundt Cakes was followed up and additional bakery outreach is active.",recognition:'Cakewalk Supporter recognition on the website and applicable event recognition.',coverageNote:"Paige's Bakehouse · 1 of approximately 15 physical dessert prizes confirmed",inKindPendingValue:true,quantityTarget:15,quantityUnit:'prizes',quantityConfirmedMin:1,quantityConfirmedMax:1,quantityRemainingMin:14,quantityRemainingMax:14,outreachStatus:'Outreach active · 1/15 physical prizes confirmed.'},
  {id:'non-food-treats',category:'Trunk-or-Treat',title:'Non-food treat reserve',target:90,priority:'High',details:'Provide approximately 600 stickers, pencils, erasers, or small fidgets so children with food allergies or sensory needs have a non-candy option.',fulfillment:'Financial or equivalent in-kind support for a Teal-Pumpkin-style reserve. Final items must be child-safe and age appropriate.',recognition:'Trunk-or-Treat accessibility supporter recognition on the website and applicable event recognition.',outreachStatus:'Dedicated sponsorship outreach not started.'},
  {id:'event-ops-support',category:'Event Operations',title:'Event operations backup + loan bundle',target:431.60,priority:'Medium',details:'Cover or loan practical event-night support items: 20 volunteer lanyard/badge sets, battery lanterns and batteries, 4 phone power banks, and 4 rolling carts/wagons.',fulfillment:'In-kind donations and short-term labeled loans are preferred. Coolers/ice are intentionally excluded unless the final volunteer-refreshment plan requires them.',recognition:'Event operations supporter recognition on the website; loaned equipment can be recognized where appropriate.',outreachStatus:'Dedicated sponsorship/loan outreach not started.'},
  {id:'backup-candy',category:'Trunk-or-Treat',title:'Teacher trunk candy',target:0,priority:'Partially covered',details:'Provide candy for the 6 reserved teacher trunks — plan for about 2 large bulk bags per teacher trunk.',fulfillment:'A+ Federal Credit Union repeat candy support is confirmed based on prior support of approximately 6–7 large bags. Exact 2026 quantity is still being finalized.',recognition:'Trunk-or-Treat sponsor recognition.',coverageNote:'A+ Federal Credit Union · approximately 6–7 large bags pledged',inKindPendingValue:true,quantityTarget:12,quantityUnit:'large bags',quantityConfirmedMin:6,quantityConfirmedMax:7,quantityRemainingMin:5,quantityRemainingMax:6,outreachStatus:'Partially covered · exact 2026 quantity pending.'},
  {id:'harvest-wagon',category:'Photo Experience',title:'Viking Harvest Wagon Photo Stop',target:390,priority:'High',details:'Fund or provide the stationary wagon/cart, faux hay bales, pumpkins/mums, garland, and photo décor.',fulfillment:'Financial or in-kind support. This is a stationary photo experience, not a moving ride.',recognition:'Photo-stop sponsor recognition on the website and optional display signage.'},
];

async function ensureKnownPledges(sql){
  // Normalize and deduplicate the confirmed Shine Pediatric Dental Co. $195 pledge.
  await sql`UPDATE pta_sponsorships SET organization='Shine Pediatric Dental Co.',donor_name='Shine Pediatric Dental Co.',updated_at=NOW() WHERE need_id='bounce-combo' AND amount=195 AND organization='Smile Doctors'`;
  const shineDupes=await sql`SELECT id FROM pta_sponsorships WHERE need_id='bounce-combo' AND organization='Shine Pediatric Dental Co.' AND amount=195 AND status IN ('pledged','confirmed','paid') ORDER BY id ASC`;
  if(shineDupes.length>1){ const keep=shineDupes[0].id; await sql`DELETE FROM pta_sponsorships WHERE need_id='bounce-combo' AND organization='Shine Pediatric Dental Co.' AND amount=195 AND id<>${keep}`; }

  const heb=await sql`SELECT id FROM pta_sponsorships WHERE organization='H-E-B' AND need_id='volunteer-snacks' AND status IN ('pledged','confirmed','paid') LIMIT 1`;
  if(!heb[0]) await sql`INSERT INTO pta_sponsorships (need_id,need_title,amount,status,donor_name,organization,email,phone,recognition,notes,payload)
    VALUES ('volunteer-snacks','Volunteer snacks',150,'pledged','H-E-B','H-E-B','s495aa@heb.com','','Public sponsor recognition','Repeat-support rule: H-E-B previously awarded Voigt $150 in Fall Festival gift cards; 2026 support requested again. Gift card will cover volunteer snacks.',${JSON.stringify({source:'historical-repeat-support',priorYear:2024,priorValue:150,currentUse:'volunteer snacks'})}::jsonb)`;
  const aplus=await sql`SELECT id FROM pta_sponsorships WHERE organization='A+ Federal Credit Union' AND need_id='backup-candy' AND status IN ('pledged','confirmed','paid') LIMIT 1`;
  if(!aplus[0]) await sql`INSERT INTO pta_sponsorships (need_id,need_title,amount,status,donor_name,organization,email,phone,recognition,notes,payload)
    VALUES ('backup-candy','Backup candy reserve',0,'pledged','A+ Federal Credit Union','A+ Federal Credit Union','vbrooks@aplusfcu.org','','Public sponsor recognition','Repeat-support rule: A+ FCU previously sponsored approximately 6–7 bags of Fall Festival candy and was asked to sponsor candy again for 2026. Exact 2026 quantity/value pending fulfillment.',${JSON.stringify({source:'historical-repeat-support',priorQuantity:'6-7 bags',status:'confirmed-in-kind-quantity-pending'})}::jsonb)`;

  const existing=await sql`SELECT id FROM pta_sponsorships WHERE need_id='bounce-combo' AND organization='Shine Pediatric Dental Co.' AND status IN ('pledged','confirmed','paid') LIMIT 1`;
  if(!existing[0]){
    await sql`INSERT INTO pta_sponsorships (need_id,need_title,amount,status,donor_name,organization,email,phone,recognition,notes,payload)
      VALUES ('bounce-combo','Bounce / combo inflatable',195,'pledged','Shine Pediatric Dental Co.','Shine Pediatric Dental Co.','', '', 'Public sponsor recognition', 'Existing confirmed $195 pledge coordinated with Rudy / PTA.', ${JSON.stringify({source:'existing-confirmed-pledge',amount:195})}::jsonb)`;
  }
}

async function totals(sql){
  const rows=await sql`SELECT need_id, COALESCE(SUM(amount),0)::float AS funded
    FROM pta_sponsorships WHERE status IN ('pledged','confirmed','paid') GROUP BY need_id`;
  return Object.fromEntries(rows.map(r=>[r.need_id,Number(r.funded||0)]));
}

export default async function handler(req,res){
  try{
    const sql=db(); await ensureSchema(sql);
    await sql`UPDATE pta_sponsorships SET status='pledged',updated_at=NOW() WHERE status='pending_payment'`;
    await ensureKnownPledges(sql);
    if(req.method==='GET'){
      const funded=await totals(sql);
      const needs=NEEDS.map(n=>{const f=Number(funded[n.id]||0);const quantityFulfilled=Number(n.quantityTarget||0)>0&&Number(n.quantityConfirmedMin||0)>=Number(n.quantityTarget||0);return {...n,funded:Math.min(Number(n.target||0),f),remaining:Math.max(0,Number(n.target||0)-f),fulfilled:Number(n.quantityTarget||0)>0?quantityFulfilled:f>=Number(n.target||0)};});
      const cashPledged=needs.reduce((sum,n)=>sum+Number(n.funded||0),0);
      const openCashTarget=needs.filter(n=>!n.inKindPendingValue).reduce((sum,n)=>sum+Number(n.target||0),0);
      const openCashRemaining=needs.filter(n=>!n.inKindPendingValue).reduce((sum,n)=>sum+Number(n.remaining||0),0);
      const inKindConfirmed=needs.filter(n=>n.inKindPendingValue&&n.coverageNote).map(n=>({id:n.id,title:n.title,note:n.coverageNote}));
      const confirmedCoverage=[
        {label:'Shine Pediatric Dental Co.',detail:'$195 bounce/combo inflatable — fully covered'},
        {label:'AiRCO Mechanical',detail:'$1,095 trackless train — fully covered'},
        {label:'H-E-B',detail:'Volunteer snacks — covered with confirmed gift-card support'},
        {label:'A+ Federal Credit Union',detail:'Teacher trunk candy — approximately 6–7 of 12 large bags pledged'},
        {label:'Apple Scoop Challenge',detail:'80 of 80 apples covered for festival night'},
        {label:"Paige's Bakehouse",detail:'Cake Walk — 1 of approximately 15 physical dessert prizes confirmed'}
      ];
      return send(res,200,{needs,summary:{cashPledged,openCashTarget,openCashRemaining,inKindConfirmed,confirmedCoverage}});
    }
    if(req.method==='POST'){
      const b=jsonBody(req);
      const need=NEEDS.find(n=>n.id===cleanText(b.needId,80));
      if(!need)return send(res,400,{error:'Please choose a valid sponsorship need.'});
      const amount=Math.round(Number(b.amount)*100)/100;
      if(!Number.isFinite(amount)||amount<=0)return send(res,400,{error:'Enter a valid contribution amount.'});
      const donorName=cleanText(b.donorName,160), email=cleanText(b.email,180), phone=cleanText(b.phone,80), organization=cleanText(b.organization,180), recognition=cleanText(b.recognition,120), notes=cleanText(b.notes,1200);
      if(!donorName||!email)return send(res,400,{error:'Name and email are required.'});
      const rows=await sql`INSERT INTO pta_sponsorships (need_id,need_title,amount,status,donor_name,organization,email,phone,recognition,notes,payload)
        VALUES (${need.id},${need.title},${amount},'pledged',${donorName},${organization},${email},${phone},${recognition},${notes},${JSON.stringify(b)}::jsonb)
        RETURNING id,created_at`;
      await sendSponsorPledgeNotification({needTitle:need.title,amount,donorName,organization,email,phone,recognition});
      const funded=await totals(sql); const total=Number(funded[need.id]||0);
      return send(res,200,{ok:true,id:rows[0].id,need:{...need,funded:Math.min(need.target,total),remaining:Math.max(0,need.target-total),fulfilled:total>=need.target},checkoutReady:false,message:'Your sponsorship pledge is recorded and now counts toward this need. Secure payment checkout will be attached to this same pledge when the PTA payment account is activated.'});
    }
    return send(res,405,{error:'Method not allowed'});
  }catch(err){console.error(err);return send(res,500,{error:'The sponsorship service is temporarily unavailable.'});}
}
