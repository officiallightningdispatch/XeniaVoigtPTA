import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';
import { sendSponsorPledgeNotification } from './_email.js';

const NEEDS = [
  {id:'bounce-combo',category:'Major Attraction',title:'Combo inflatable',target:195,priority:'Covered',details:'The event plan includes exactly one combo inflatable.',fulfillment:'Direct-pay sponsorship from Shine Pediatric Dental Co. for $195; the sponsor pays the attraction provider directly. Final placement remains subject to campus safety/layout approval.',recognition:'Shine Pediatric Dental Co. — Combo Inflatable Sponsor; website and event recognition where permitted.',outreachStatus:'Covered — no additional inflatable outreach needed.'},
  {id:'trackless-train',category:'Major Attraction',title:'Trackless train',target:1095,priority:'Covered',details:'The event plan includes one trackless train.',fulfillment:'Direct-pay sponsorship from AiRCO Mechanical for $1,095; the sponsor pays the attraction provider directly. PTA coordinates route, insurance and campus approval.',recognition:'AiRCO Mechanical — Trackless Train Sponsor; website and event recognition where permitted.',outreachStatus:'Covered — no additional train outreach needed.'},
  {id:'backup-candy',category:'Trunk-or-Treat',title:'Teacher trunk candy',target:0,priority:'Covered',details:'Candy is needed for seven teacher trunks, one per grade Pre-K through 5. Community trunk hosts supply their own candy.',fulfillment:'A+ Federal Credit Union pledged 12 extra-large Costco variety bags at 5.75 lb each (69 lb total). Verify the actual piece count on receipt.',recognition:'A+ Federal Credit Union — Teacher Trunk Candy Sponsor.',coverageNote:'A+ Federal Credit Union · 12 × 5.75-lb bags (69 lb total)',inKindPendingValue:true,quantityTarget:12,quantityUnit:'bags',quantityConfirmedMin:12,quantityConfirmedMax:12,quantityRemainingMin:0,quantityRemainingMax:0,outreachStatus:'Covered — coordinate receipt and verify pieces.'},
  {id:'cakewalk-prizes',category:'Cake Walk',title:'Additional Cake Walk dessert prizes',target:0,priority:'Critical',details:'Additional commercially prepared or packaged cakes and dessert prizes are still wanted so the PTA can avoid cash spending.',fulfillment:'15 Nothing Bundt Cakes Bundtlets plus one Paige\'s Bakehouse cookie bundle are already confirmed. Amy\'s Ice Cream application was submitted September 27 and is pending; pending requests are not counted as confirmed.',recognition:'Cake Walk supporter recognition on the website and applicable event recognition.',coverageNote:'16 physical prizes confirmed; additional donated cakes/treats still needed',inKindPendingValue:true,openEnded:true,quantityConfirmedMin:16,quantityConfirmedMax:16,quantityUnit:'prizes',outreachStatus:'Outreach active — additional donated Cake Walk prizes needed.'},
  {id:'activity-materials',category:'Activities',title:'Remaining activity + Viking Quest materials',target:0,priority:'Inventory first',details:'Only materials still missing after the PE/school and PTA inventory pull should be sourced.',fulfillment:'Finish the inventory pull, then request only truly uncovered buckets, tubs, scoops/tongs, station supplies, signage and photo-stop materials as in-kind donations. Do not buy or request duplicates.',recognition:'In-kind donor recognition for materials actually used.',inKindPendingValue:true,hold:true,outreachStatus:'Inventory check first — do not launch broad outreach until the uncovered list is final.'},
  {id:'quest-prizes',category:'Viking Quest',title:'Viking Quest / activity prizes',target:0,priority:'Inventory first',details:'Reconcile existing prize inventory and confirmed family donations before requesting more prizes.',fulfillment:'A Melissa & Doug giraffe family donation is confirmed but its final event use/placement still needs to be recorded. Request only the remaining prize quantity after inventory is reconciled.',recognition:'Viking Quest or family-experience supporter recognition where applicable.',inKindPendingValue:true,hold:true,outreachStatus:'Inventory check first — quantity still being reconciled.'},
  {id:'event-ops-support',category:'Event Operations',title:'Remaining event-operations loan items',target:0,priority:'Inventory first',details:'Cleaning and safety supplies are already substantially covered by Express Commercial Cleaning and school inventory.',fulfillment:'Do not request more cleaning or safety supplies. After inventory, source only remaining practical needs such as labeled loans of carts/wagons, power banks, lanterns or volunteer lanyards if still required.',recognition:'Event operations supporter recognition where appropriate.',inKindPendingValue:true,hold:true,outreachStatus:'Inventory check first — no new cleaning/safety outreach.'},
  {id:'harvest-wagon',category:'Photo Experience',title:'Harvest photo-stop materials',target:0,priority:'Inventory first',details:'A stationary fall photo stop remains an option, but its exact materials should be confirmed only after school/PTA inventory is checked.',fulfillment:'Use existing or donated wagon/cart, faux hay, pumpkins/mums, garland and photo décor only if still needed after the inventory pull.',recognition:'Photo-stop donor recognition where applicable.',inKindPendingValue:true,hold:true,outreachStatus:'Inventory check first — finalize exact photo-stop need before outreach.'}
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
        {label:'A+ Federal Credit Union',detail:'Teacher-trunk candy — 12 × 5.75-lb bags (69 lb) for seven teacher trunks; verify pieces on receipt'},
        {label:'Apple Scoop Challenge',detail:'80 of 80 apples covered for festival night'},
        {label:'Cake Walk',detail:'15 Nothing Bundt Cakes Bundtlets + one Paige\'s Bakehouse cookie bundle confirmed; additional donated prizes still needed'},
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
