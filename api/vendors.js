import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';

export default async function handler(req,res){
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  try{
    const body=jsonBody(req);
    const businessName=cleanText(body.businessName,180);
    const contactName=cleanText(body.contactName,180);
    const email=cleanText(body.email,320);
    if(!businessName||!contactName||!email) return send(res,400,{error:'Business name, contact name, and email are required.'});
    if(body.profitShareAccepted!==true) return send(res,400,{error:'The 10% event-sales contribution agreement must be accepted.'});
    const sql=db(); await ensureSchema(sql);
    await sql`INSERT INTO pta_vendors (business_name,contact_name,email,phone,payload)
      VALUES (${businessName},${contactName},${email},${cleanText(body.phone,80)},${JSON.stringify(body)}::jsonb)`;
    return send(res,201,{ok:true});
  }catch(err){console.error(err);return send(res,500,{error:'Vendor submission service is not configured yet.'});}
}
