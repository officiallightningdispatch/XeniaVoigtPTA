import { db, ensureSchema, send } from './_db.js';

export default async function handler(req,res){
  if(req.method!=='GET') return send(res,405,{error:'Method not allowed'});
  try{
    const sql=db();
    await ensureSchema(sql);
    const rows=await sql`
      SELECT
        (SELECT COUNT(*)::int FROM pta_volunteers) AS volunteers,
        (SELECT COUNT(*)::int FROM pta_vendors) AS vendors,
        (SELECT COUNT(*)::int FROM pta_newsletter) AS newsletter
    `;
    return send(res,200,{ok:true,database:'connected',counts:rows[0]});
  }catch(err){
    console.error(err);
    return send(res,500,{ok:false,database:'unavailable'});
  }
}
