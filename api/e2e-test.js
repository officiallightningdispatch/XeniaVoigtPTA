import { db, ensureSchema, send } from './_db.js';

export default async function handler(req,res){
  if(req.method!=='GET') return send(res,405,{error:'Method not allowed'});
  const marker='pta-e2e-20260916';
  const volunteerEmail=`${marker}-volunteer@example.com`;
  const vendorEmail=`${marker}-vendor@example.com`;
  const newsletterEmail=`${marker}-newsletter@example.com`;
  const origin=`https://${req.headers.host}`;
  const results={};
  try{
    const calls=[
      ['volunteer','/api/volunteers',{firstName:'PTA',lastName:'E2E Test',email:volunteerEmail,phone:'555-0100',event:'E2E Test',notes:marker}],
      ['vendor','/api/vendors',{businessName:'PTA E2E Test Vendor',contactName:'PTA Test',email:vendorEmail,phone:'555-0101',profitShareAccepted:true,notes:marker}],
      ['newsletter','/api/newsletter',{email:newsletterEmail,source:marker}]
    ];
    for(const [name,path,body] of calls){
      const r=await fetch(origin+path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
      results[name]={status:r.status,body:await r.json().catch(()=>({}))};
    }
    const sql=db(); await ensureSchema(sql);
    const before={
      volunteers:Number((await sql`SELECT COUNT(*)::int AS n FROM pta_volunteers WHERE email=${volunteerEmail}`)[0]?.n||0),
      vendors:Number((await sql`SELECT COUNT(*)::int AS n FROM pta_vendors WHERE email=${vendorEmail}`)[0]?.n||0),
      newsletter:Number((await sql`SELECT COUNT(*)::int AS n FROM pta_newsletter WHERE email=${newsletterEmail}`)[0]?.n||0)
    };
    await sql`DELETE FROM pta_volunteers WHERE email=${volunteerEmail}`;
    await sql`DELETE FROM pta_vendors WHERE email=${vendorEmail}`;
    await sql`DELETE FROM pta_newsletter WHERE email=${newsletterEmail}`;
    const after={
      volunteers:Number((await sql`SELECT COUNT(*)::int AS n FROM pta_volunteers WHERE email=${volunteerEmail}`)[0]?.n||0),
      vendors:Number((await sql`SELECT COUNT(*)::int AS n FROM pta_vendors WHERE email=${vendorEmail}`)[0]?.n||0),
      newsletter:Number((await sql`SELECT COUNT(*)::int AS n FROM pta_newsletter WHERE email=${newsletterEmail}`)[0]?.n||0)
    };
    return send(res,200,{ok:Object.values(results).every(x=>x.status===201)&&Object.values(before).every(x=>x===1)&&Object.values(after).every(x=>x===0),results,verifiedBeforeCleanup:before,verifiedAfterCleanup:after});
  }catch(err){console.error(err);return send(res,500,{ok:false,error:String(err?.message||err),results});}
}
