import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';
import { sendFormEmails } from './_email.js';

function publicName(name=''){
  const key=String(name).toLowerCase().replace(/[’]/g,"'").replace(/\s+/g,' ').trim();
  const map={
    'k&kbbqmexicanfood':'K&K BBQ Mexican Food',
    'unus vita llc dba kona ice':'Kona Ice Greater Austin',
    "coco's eats & sweets":"Coco's Eats & Sweets",
    'hearth and honey':'Hearth & Honey',
    'pour the fun':'Pour The Fun',
    'roxk n grill':'Roxk N Grill'
  };
  return map[key]||cleanText(name,180);
}
function safeWebsite(value=''){
  const raw=String(value||'').trim();
  if(!raw)return '';
  const candidate=/^https?:\/\//i.test(raw)?raw:(/^www\./i.test(raw)?'https://'+raw:'');
  if(!candidate)return '';
  try{ const u=new URL(candidate); return ['http:','https:'].includes(u.protocol)?u.href:''; }catch{return '';}
}
function vendorType(name,offering){
  const s=(String(name)+' '+String(offering)).toLowerCase();
  if(s.includes('kona ice')||s.includes('shaved ice'))return 'Confirmed Dessert Vendor';
  if(s.includes('pour the fun'))return 'Confirmed Beverage + Food Vendor';
  return 'Confirmed Food Vendor';
}

export default async function handler(req,res){
  try{
    const sql=db(); await ensureSchema(sql);

    if(req.method==='GET'){
      const rows=await sql`
        SELECT DISTINCT ON (LOWER(TRIM(business_name)))
          id,business_name,payload,created_at
        FROM pta_vendors
        WHERE status='approved'
        ORDER BY LOWER(TRIM(business_name)), created_at DESC
      `;
      const vendors=rows.map(r=>{
        const p=r.payload||{};
        const name=publicName(r.business_name||p.businessName||'');
        const offering=cleanText(p.offering,700);
        const website=safeWebsite(p.website);
        return {
          id:Number(r.id),
          name,
          type:vendorType(name,offering),
          offering,
          website,
          businessType:cleanText(p.businessType,120)
        };
      }).sort((a,b)=>a.name.localeCompare(b.name));
      return send(res,200,{vendors,count:vendors.length});
    }

    if(req.method==='POST'){
      const body=jsonBody(req);
      const businessName=cleanText(body.businessName,180);
      const contactName=cleanText(body.contactName,180);
      const email=cleanText(body.email,320);
      if(!businessName||!contactName||!email) return send(res,400,{error:'Business name, contact name, and email are required.'});
      if(body.profitShareAccepted!==true) return send(res,400,{error:'The 10% event-sales contribution agreement must be accepted.'});
      const phone=cleanText(body.phone,80);
      await sql`INSERT INTO pta_vendors (status,business_name,contact_name,email,phone,payload)
        VALUES ('pending',${businessName},${contactName},${email},${phone},${JSON.stringify(body)}::jsonb)`;
      await sendFormEmails({type:'vendor application',email,name:contactName,details:[['Business',businessName],['Contact',contactName],['Email',email],['Phone',phone],['10% contribution agreement','Accepted']]});
      return send(res,201,{ok:true});
    }

    return send(res,405,{error:'Method not allowed'});
  }catch(err){console.error(err);return send(res,500,{error:'Vendor service is temporarily unavailable.'});}
}
