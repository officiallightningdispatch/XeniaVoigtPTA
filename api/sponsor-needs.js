import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';
import { sendSponsorPledgeNotification } from './_email.js';

const NEEDS = [
  {id:'bounce-combo',category:'Major Attraction',title:'Combo inflatable',target:195,priority:'Covered',details:'The event plan includes exactly one combo inflatable.',fulfillment:'Direct-pay sponsorship from Shine Pediatric Dental Co. for $195; the sponsor pays the attraction provider directly. Final placement remains subject to campus safety/layout approval.',recognition:'Shine Pediatric Dental Co. — Combo Inflatable Sponsor; website and event recognition where permitted.',outreachStatus:'Covered — no additional inflatable outreach needed.'},
  {id:'trackless-train',category:'Major Attraction',title:'Trackless train',target:1095,priority:'Covered',details:'The event plan includes one trackless train.',fulfillment:'Direct-pay sponsorship from AiRCO Mechanical for $1,095; the sponsor pays the attraction provider directly. PTA coordinates route, insurance and campus approval.',recognition:'AiRCO Mechanical — Trackless Train Sponsor; website and event recognition where permitted.',outreachStatus:'Covered — no additional train outreach needed.'},
  {id:'pumpkin-package',category:'Fall Activities',title:'All 86 Fall Festival pumpkins',target:50,priority:'Covered',details:'St. Richard’s Pumpkin Patch is providing all 86 pumpkins: 80 for no-carve decorating and 6 for Pumpkin Bowling.',fulfillment:'Five Points Board of REALTORS® committed the full $50 sponsorship on October 5. Only St. Richard’s payment instructions and the October 22 pickup window remain to be finalized.',recognition:'Five Points Board of REALTORS® — Pumpkin Activities Sponsor.',outreachStatus:'Covered — all other pumpkin-sponsor outreach is closed.'},
  {id:'backup-candy',category:'Trunk-or-Treat',title:'Teacher trunk candy',target:0,priority:'Covered',details:'Candy is needed for seven teacher trunks, one per grade Pre-K through 5. Community trunk hosts supply their own candy.',fulfillment:'A+ Federal Credit Union pledged 12 extra-large Costco variety bags at 5.75 lb each (69 lb total). Verify the actual piece count on receipt.',recognition:'A+ Federal Credit Union — Teacher Trunk Candy Sponsor.',coverageNote:'A+ Federal Credit Union · 12 × 5.75-lb bags (69 lb total)',inKindPendingValue:true,quantityTarget:12,quantityUnit:'bags',quantityConfirmedMin:12,quantityConfirmedMax:12,quantityRemainingMin:0,quantityRemainingMax:0,outreachStatus:'Covered — pickup is scheduled for October 22; verify pieces at handoff.'},
  {id:'cakewalk-prizes',category:'Cake Walk',title:'40 Cake Walk prize packages',target:0,priority:'Covered',details:'The board-approved one-hour Cake Walk uses exactly 40 prize packages.',fulfillment:'17 donated prize packages are confirmed, and H-E-B approved $125 for approximately 23 bakery prize packages at the October 22 Business Center appointment.',recognition:'Recognize Nothing Bundt Cakes, Paige’s Bakehouse, Cookies & Crumbles, H-E-B and any other confirmed Cake Walk donors.',coverageNote:'40 of 40 planned prize packages are covered by confirmed donations plus H-E-B funding',inKindPendingValue:true,quantityTarget:40,quantityUnit:'prizes',quantityConfirmedMin:40,quantityConfirmedMax:40,quantityRemainingMin:0,quantityRemainingMax:0,outreachStatus:'Covered — fulfillment/pickup remains; no broad Cake Walk prize solicitation needed.'},
  {id:'activity-materials',category:'Activities',title:'Remaining specialty activity materials',target:0,priority:'Open in-kind need',details:'Inventory reconciliation is complete enough to source only true specialty gaps: child-safe foam/Velcro axe sets and soft targets, mini shield blanks, smooth wooden rune blanks, safe dry sensory filler, washable art media, paper leaves/twine and small hand percussion.',fulfillment:'Active source paths are already open. Partial quantities are useful; each category closes immediately when its exact target is covered. Do not donate generic supplies without coordinating first.',recognition:'In-kind donor recognition for materials actually used.',inKindPendingValue:true,openEnded:true,outreachStatus:'Active sourcing — exact, deduplicated asks only.'},
  {id:'quest-finish-items',category:'Viking Quest',title:'Viking Quest completion items',target:0,priority:'Open in-kind need',details:'The remaining finish-table needs are up to 300 blank completion bags/pouches, 300 Conqueror award-card prints and up to 300 simple medals/medallions.',fulfillment:'Bag follow-ups went to Round Rock Church of Christ, Big Frog and Kwalwasser on October 5. Conqueror-card printing requests went to three local printers. AS Awards declined medals; the Round Rock Awards/other medal path remains active.',recognition:'Viking Quest completion-item supporter recognition where appropriate.',inKindPendingValue:true,openEnded:true,outreachStatus:'Active sourcing — partial quantities welcome; declined sources are closed.'},
  {id:'event-ops-support',category:'Event Operations',title:'Remaining event-operations loan items',target:0,priority:'School closeout first',details:'School/PE/PTA/Express already cover much of the operating inventory. Final needs for lighting/batteries, radios/vests, first-aid support, tools, carts and related safety items depend on the school closeout and October 13 field check.',fulfillment:'Do not launch broad operations outreach. Source only the exact verified gap after school/custodial/safety requirements are confirmed.',recognition:'Event operations supporter recognition where appropriate.',inKindPendingValue:true,hold:true,outreachStatus:'School/field verification first — no duplicate generic safety outreach.'},
  {id:'viking-photo-stop',category:'Photo Experience',title:'Viking-ship photo-stop materials',target:0,priority:'Open in-kind need',details:'The Viking-ship photo stop is retained. Forest Creek Mini Storage donated the 12-foot utility trailer with 2-foot walls at no charge for 24 hours.',fulfillment:'The trailer is secured. Brittani will pick it up the morning of Oct. 23 shortly after 9:00 AM and return it the morning of Oct. 24. Remaining material asks are limited to large clean corrugated cardboard/panels, approximately four small square hay bales, and safe fall foliage/greenery/decor accents. Paid balloon décor is closed.',recognition:'Forest Creek Mini Storage and confirmed in-kind material donors receive photo-stop supporter recognition where permitted.',coverageNote:'Forest Creek Mini Storage · 12-foot utility trailer donated for 24 hours at $0',inKindPendingValue:true,openEnded:true,outreachStatus:'Trailer secured — remaining décor/build materials are actively sourced.'}
];

async function ensureKnownPledges(sql){
  await sql`UPDATE pta_sponsorships SET organization='Shine Pediatric Dental Co.',donor_name='Shine Pediatric Dental Co.',updated_at=NOW() WHERE need_id='bounce-combo' AND amount=195 AND organization='Smile Doctors'`;
  await sql`UPDATE pta_sponsorships SET status='removed',updated_at=NOW() WHERE need_id IN ('dj-mc','obstacle-course','interactive-inflatable','sensory-retreat','non-food-treats') AND status IN ('pledged','confirmed','paid') AND COALESCE(payload->>'source','')='historical-repeat-support'`;
  await sql`UPDATE pta_sponsorships SET status='removed',updated_at=NOW() WHERE organization='H-E-B' AND need_id='volunteer-snacks' AND COALESCE(payload->>'source','')='historical-repeat-support'`;
  const aplus=await sql`SELECT id FROM pta_sponsorships WHERE organization='A+ Federal Credit Union' AND need_id='backup-candy' ORDER BY id ASC LIMIT 1`;
  const note='2026 explicit pledge: 12 extra-large Costco candy variety bags, 5.75 lb each (69 lb total), for seven teacher trunks. Verify brand/SKU and actual piece count on receipt.';
  if(aplus[0]) await sql`UPDATE pta_sponsorships SET status='pledged',need_title='Teacher trunk candy',notes=${note},payload=${JSON.stringify({source:'explicit-2026-email',bags:12,bagWeightLb:5.75,totalWeightLb:69,teacherTrunks:7,pieceCount:'verify on receipt'})}::jsonb,updated_at=NOW() WHERE id=${aplus[0].id}`;
  else await sql`INSERT INTO pta_sponsorships (need_id,need_title,amount,status,donor_name,organization,email,phone,recognition,notes,payload)
    VALUES ('backup-candy','Teacher trunk candy',0,'pledged','A+ Federal Credit Union','A+ Federal Credit Union','vbrooks@aplusfcu.org','','Public sponsor recognition',${note},${JSON.stringify({source:'explicit-2026-email',bags:12,bagWeightLb:5.75,totalWeightLb:69,teacherTrunks:7,pieceCount:'verify on receipt'})}::jsonb)`;
  const dupes=await sql`SELECT id FROM pta_sponsorships WHERE organization='A+ Federal Credit Union' AND need_id='backup-candy' ORDER BY id ASC`;
  if(dupes.length>1){ const keep=dupes[0].id; await sql`UPDATE pta_sponsorships SET status='removed',updated_at=NOW() WHERE organization='A+ Federal Credit Union' AND need_id='backup-candy' AND id<>${keep}`; }

  const fivePoints=await sql`SELECT id FROM pta_sponsorships WHERE organization='Five Points Board of REALTORS®' AND need_id='pumpkin-package' ORDER BY id ASC LIMIT 1`;
  const fivePointsNote='Oct. 5, 2026 explicit commitment: full $50 sponsorship for all 86 St. Richard’s pumpkins — 80 no-carve decorating pumpkins and 6 Pumpkin Bowling pumpkins. Payment method/pickup closeout remains.';
  if(fivePoints[0]) await sql`UPDATE pta_sponsorships SET status='pledged',need_title='All 86 Fall Festival pumpkins',amount=50,donor_name='Five Points Board of REALTORS®',email='heather@fivepointsrealtors.com',notes=${fivePointsNote},payload=${JSON.stringify({source:'explicit-2026-email',pumpkins:86,amount:50,confirmedOn:'2026-10-05'})}::jsonb,updated_at=NOW() WHERE id=${fivePoints[0].id}`;
  else await sql`INSERT INTO pta_sponsorships (need_id,need_title,amount,status,donor_name,organization,email,phone,recognition,notes,payload)
    VALUES ('pumpkin-package','All 86 Fall Festival pumpkins',50,'pledged','Five Points Board of REALTORS®','Five Points Board of REALTORS®','heather@fivepointsrealtors.com','','Pumpkin Activities Sponsor',${fivePointsNote},${JSON.stringify({source:'explicit-2026-email',pumpkins:86,amount:50,confirmedOn:'2026-10-05'})}::jsonb)`;
  const fiveDupes=await sql`SELECT id FROM pta_sponsorships WHERE organization='Five Points Board of REALTORS®' AND need_id='pumpkin-package' ORDER BY id ASC`;
  if(fiveDupes.length>1){ const keep=fiveDupes[0].id; await sql`UPDATE pta_sponsorships SET status='removed',updated_at=NOW() WHERE organization='Five Points Board of REALTORS®' AND need_id='pumpkin-package' AND id<>${keep}`; }

  const forest=await sql`SELECT id FROM pta_sponsorships WHERE organization='Forest Creek Mini Storage' AND need_id='viking-photo-stop' ORDER BY id ASC LIMIT 1`;
  const forestNote='Oct. 5, 2026 explicit in-kind confirmation: 12-foot utility trailer with 2-foot walls donated at $0 for 24 hours. Brittani will pick up the morning of Oct. 23 shortly after 9 AM and return the morning of Oct. 24. No deposit; driver license, proof of insurance and card copy for damage security required; 2-inch ball; hitch/light plug available if needed. Await any special Saturday-return instructions.';
  if(forest[0]) await sql`UPDATE pta_sponsorships SET status='pledged',need_title='Viking-ship photo-stop materials',amount=0,donor_name='Forest Creek Mini Storage',email='forestcreekms@gmail.com',notes=${forestNote},payload=${JSON.stringify({source:'explicit-2026-email',inKind:'12-foot utility trailer',confirmedOn:'2026-10-05'})}::jsonb,updated_at=NOW() WHERE id=${forest[0].id}`;
  else await sql`INSERT INTO pta_sponsorships (need_id,need_title,amount,status,donor_name,organization,email,phone,recognition,notes,payload)
    VALUES ('viking-photo-stop','Viking-ship photo-stop materials',0,'pledged','Forest Creek Mini Storage','Forest Creek Mini Storage','forestcreekms@gmail.com','','Photo-stop in-kind supporter',${forestNote},${JSON.stringify({source:'explicit-2026-email',inKind:'12-foot utility trailer',confirmedOn:'2026-10-05'})}::jsonb)`;
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
      const needs=NEEDS.map(n=>{const f=Number(funded[n.id]||0);const quantityFulfilled=Number(n.quantityTarget||0)>0&&Number(n.quantityConfirmedMin||0)>=Number(n.quantityTarget||0);const fulfilled=n.hold||n.openEnded?false:(Number(n.quantityTarget||0)>0?quantityFulfilled:f>=Number(n.target||0));return {...n,funded:Math.min(Number(n.target||0),f),remaining:Math.max(0,Number(n.target||0)-f),fulfilled};});
      const cashPledged=needs.reduce((sum,n)=>sum+Number(n.funded||0),0);
      const openCashTarget=needs.filter(n=>!n.inKindPendingValue&&!n.hold&&!n.openEnded).reduce((sum,n)=>sum+Number(n.target||0),0);
      const openCashRemaining=needs.filter(n=>!n.inKindPendingValue&&!n.hold&&!n.openEnded).reduce((sum,n)=>sum+Number(n.remaining||0),0);
      const inKindConfirmed=needs.filter(n=>n.inKindPendingValue&&n.coverageNote&&!n.fulfilled).map(n=>({id:n.id,title:n.title,note:n.coverageNote}));
      const confirmedCoverage=[
        {label:'Shine Pediatric Dental Co.',detail:'$195 bounce/combo inflatable — fully covered; the only inflatable planned'},
        {label:'AiRCO Mechanical',detail:'$1,095 trackless train — fully covered'},
        {label:'Five Points Board of REALTORS®',detail:'$50 pumpkin sponsorship — all 86 St. Richard’s pumpkins covered; payment/pickup closeout pending'},
        {label:'Forest Creek Mini Storage',detail:'12-foot utility trailer for the Viking-ship photo stop — donated at $0 for 24 hours; Brittani pickup Oct. 23 AM / return Oct. 24 AM'},
        {label:'A+ Federal Credit Union',detail:'Teacher-trunk candy — 12 × 5.75-lb bags (69 lb) for seven teacher trunks; verify pieces on receipt'},
        {label:'Apple Scoop Challenge',detail:'80 of 80 apples covered for festival night'},
        {label:'Cake Walk',detail:'40 of 40 planned prize packages covered through 17 donated packages plus H-E-B’s $125 bakery allocation'},
        {label:'Sensory-Friendly Retreat',detail:'Boys & Girls Club portable — no PTA materials required'}

      ];
      return send(res,200,{needs,summary:{cashPledged,openCashTarget,openCashRemaining,inKindConfirmed,confirmedCoverage}});
    }
    if(req.method==='POST'){
      const b=jsonBody(req);
      const need=NEEDS.find(n=>n.id===cleanText(b.needId,80));
      if(!need)return send(res,400,{error:'Please choose a valid sponsorship need.'});
      if(need.hold)return send(res,400,{error:'This need is waiting on the school/PTA inventory reconciliation before sponsorship outreach opens.'});
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
