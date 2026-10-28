(()=>{
const path=location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';
const main=document.querySelector('main#main');if(!main)return;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hero=(tag,title,copy)=>'<section class="ed-hero"><div class="container"><p class="ed-kicker">'+tag+'</p><h1>'+title+'</h1><p class="ed-lede">'+copy+'</p></div></section>';
const action=(title,copy,url,label)=>'<a class="ed-action" href="'+url+'"><strong>'+title+'</strong><span>'+copy+'</span><b>'+label+' ↗</b></a>';
const panel=(title,body)=>'<article class="ed-panel"><h3>'+title+'</h3><p>'+body+'</p></article>';
const wrap=html=>'<div class="ed-site">'+html+'</div>';
const resources=[
['Holiday Gifts','Round Rock Operation Blue Santa','2026 applications: November 1–30, online only. Round Rock residency, photo ID and school enrollment documentation may be required. Delivery December 18.','https://www.roundrocktexas.gov/city-departments/police/divisions/round-rock-operation-blue-santa/','2026 dates verified'],
['Holiday Gifts','Williamson County Brown Santa','For qualifying Williamson County households outside city limits where no comparable municipal program serves them. Check 2026 application status; the public application page still shows the 2025 closure.','https://www.wcbrownsanta.com/need-assistance','2026 opening unverified'],
['Holiday Gifts','Salvation Army Angel Tree — Austin Area','2026 gift-assistance applications are closed due to capacity. The program serves qualifying Travis and Williamson County families; call 2-1-1 for alternatives.','https://salvationarmyaustin.org/texas-austin/angel-tree-applications','2026 applications closed'],
['Holiday Gifts','Hill Country Christmas Bureau','Holiday gifts for eligible families in its northern Austin, Cedar Park and Leander service area. Round Rock city residents should start with Round Rock Blue Santa.','https://www.hillcountrychristmas.org/services.htm','Service area restricted'],
['Holiday Gifts','RRISD Winter and Holiday Resource List','School counseling teams share seasonal assistance referrals and family-support information. Check current programs and service areas.','https://sites.google.com/roundrockisd.org/redbudcounselingsite/resources','District resource'],
['Holiday Gifts','2-1-1 Texas — Holiday Assistance Search','Ask a local resource specialist about seasonal toy drives and holiday gift assistance by ZIP code when programs are full or outside your area.','https://www.211texas.org/','Year-round referral'],
['Basic Necessities','Salvation Army Williamson County Corps','Referral-based emergency rent and utility assistance, youth programs and food support for eligible Williamson County households. Call 512-943-8421.','https://southernusa.salvationarmy.org/texas-austin/williamson-county-corps','Referral required'],
['Basic Necessities','Round Rock Area Serving Center','Food pantry, clothing and furniture vouchers, and possible assistance with rent, utilities, prescriptions, transport and temporary lodging. Apply online; 512-244-2431.','https://www.rrasc.org/request-assistance/','Eligibility and funding vary'],
['Basic Necessities','RRASC Food Pantry','1099 E. Main St, Round Rock. Food pantry hours and voucher procedures are published on the provider website; confirm before visiting.','https://www.rrasc.org/','Local provider'],
['Basic Necessities','RRISD Clothes Closet','District-wide clothing support for students. Check current eligibility, locations and donation or volunteer opportunities.','https://www.roundrockisd.org/page/community-resources','District resource'],
['Crisis & Safety','2-1-1 Texas','Call 2-1-1 or 877-541-7905 for housing, food, utility, healthcare and crisis referrals.','https://www.211texas.org/','Referral service'],
['Crisis & Safety','988 Suicide & Crisis Lifeline','Call or text 988 for immediate mental-health crisis support. For imminent danger call 911.','https://988lifeline.org/','24/7'],
['Crisis & Safety','Round Rock utility assistance','City information about independent organizations that may help with water and other utility bills. Funding is not guaranteed.','https://www.roundrocktexas.gov/city-departments/utility-billing/','City guidance'],
['Crisis & Safety','RRISD Social Work Community Resources','District-curated resources for mental health, food, medical and dental care, parenting, housing and financial needs.','https://www.roundrockisd.org/page/community-resources','School district'],
['Academic Enrichment','Reading in the RRock','District literacy volunteer program supporting kindergarten students; check training and application details.','https://www.roundrockisd.org/','District program'],
['Academic Enrichment','Round Rock Public Library','Books, youth learning activities, digital resources and family programs.','https://www.roundrocktexas.gov/city-departments/library-home/','Public library'],
['Volunteer Opportunities','Voigt PTA volunteer opportunities','Current school-community volunteering and reusable interest form.','/volunteer','PTA'],
['Volunteer Opportunities','RRASC Volunteer Center','Food pantry and community service volunteer opportunities; check orientation details.','https://www.rrasc.org/','Community'],
['PTA Documents','Texas PTA','Membership, advocacy, leadership and family-engagement resources.','https://www.txpta.org/','State PTA'],
['PTA Documents','Contact the PTA board','Request current meeting materials, policies or financial reports from PTA leadership.','/contact','Available on request'],
['School Information','Official Voigt school calendar','The district is the authoritative source for school schedule changes and cancellations.','https://voigt.roundrockisd.org/events?view=list-month','Official'],
['School Information','Daily Voigt breakfast and lunch menus','Select Voigt to see the current school meal options, nutrition and allergen information. Menus are subject to change.','https://roundrockisd.nutrislice.com/','Official meal menus'],
['School Information','2026–27 RRISD academic calendars','District-approved academic calendar, holidays, breaks and school-year dates.','https://www.roundrockisd.org/o/rrisd/page/calendars','Official district calendar'],
['School Information','Round Rock ISD','District information, student and family services and announcements.','https://www.roundrockisd.org/','Official']
];
async function displayMeals(date,target){
 const historical=typeof OCTOBER_LUNCH!=='undefined'&&Object.prototype.hasOwnProperty.call(OCTOBER_LUNCH,date)?OCTOBER_LUNCH[date]:undefined;
 if(historical!==undefined){const el=document.getElementById(target);if(!el)return;el.innerHTML='<article class="ed-panel"><span class="ed-tag">Published RRISD elementary lunch · September–October 2026</span><h3>Lunch · '+esc(date)+'</h3>'+(historical===null?'<p>No school — no lunch service.</p>':'<ol class="ed-meal-options">'+historical.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ol><p>Entrée choices; meals include two fruits, two vegetables and milk.</p>')+'</article><article class="ed-panel"><span class="ed-tag">Breakfast</span><h3>Breakfast · '+esc(date)+'</h3><p>The supplied picture menu does not include breakfast items. <a href="https://www.roundrockisd.org/page/menus" target="_blank" rel="noopener">Check official breakfast menu ↗</a></p></article><p class="ed-footnote">From the RRISD Elementary Picture Menu PDF. Menus are subject to change; this is the published plan, not confirmation of what was served.</p>';return;}

 const el=document.getElementById(target);if(!el)return;
 el.textContent='Checking the district menu for '+date+'…';
 try{
  const r=await fetch('/api/school-calendar?mealDate='+encodeURIComponent(date));
  if(!r.ok)throw Error('Menu unavailable');
  const menu=(await r.json()).menu||{};
  if(!document.getElementById(target))return;
  const groups=[['Breakfast',menu.breakfast],['Lunch',menu.lunch]];
  el.innerHTML=groups.map(([name,items])=>'<article class="ed-panel"><span class="ed-tag">'+name+'</span><h3>'+name+' · '+esc(date)+'</h3>'+(items?.length?'<p>'+items.map(esc).join(' · ')+'</p>':'<p>No verified '+name.toLowerCase()+' items published for this date.</p>')+'</article>').join('')+'<p class="ed-footnote">Meals are supplied by the district menu provider. Items and availability may change. <a href="https://www.roundrockisd.org/page/menus" target="_blank" rel="noopener">Official menus ↗</a></p>';
 }catch(e){el.innerHTML='<p>Meal details could not be loaded. <a href="https://www.roundrockisd.org/page/menus">View the district menus ↗</a>.</p>';}
}

function home(){
main.innerHTML=wrap('<section class="ed-home"><div class="container ed-home-grid"><div><p class="ed-kicker">XENIA VOIGT ELEMENTARY PTA · ROUND ROCK, TEXAS</p><h1>A remarkable school community begins with belonging.</h1><p class="ed-lede">We bring families, educators and neighbors together to champion creativity, care and opportunity for every Viking.</p><a class="ed-primary" href="/join">Become a PTA member ↗</a></div><aside class="ed-feature"><p class="ed-kicker">THE COMMUNITY STORY</p><span class="ed-feature-date">OCTOBER 2026</span><h2>A celebration made possible together.</h2><p>Our Viking Quest Fall Festival brought families, educators, volunteers and community partners together for an evening of creativity and connection.</p><a href="/events#pta-photo-memories">Explore festival memories →</a></aside></div></section><section class="ed-section"><div class="container"><p class="ed-kicker">HOW CAN WE HELP?</p><div class="ed-three">'+action('Join the community','Support students and stay connected.','/join','Membership')+action('Share your time','Find flexible ways to volunteer.','/volunteer','Opportunities')+action('Find support','Family resources, basic needs and holiday help.','/resources','Resources')+'</div></div></section><section class="ed-section ed-tint" id="today-at-voigt"><div class="container"><div class="ed-section-heading"><div><p class="ed-kicker">FAMILY DAILY DESK</p><h2>Today at Voigt</h2></div><span id="ed-today-date"></span></div><div class="ed-three"><article class="ed-panel"><span class="ed-tag">Breakfast</span><h3>Daily breakfast</h3><p>View the current Voigt elementary breakfast choices and allergen details in the district official meal menu. Daily items may change.</p><a href="https://roundrockisd.nutrislice.com/" target="_blank" rel="noopener">View daily breakfast ↗</a></article><article class="ed-panel"><span class="ed-tag">Lunch</span><h3>Daily lunch</h3><p>Find daily lunch entrées, sides, nutrition information and allergen filters. Select Voigt in the official menu.</p><a href="https://roundrockisd.nutrislice.com/" target="_blank" rel="noopener">View daily lunch ↗</a></article><article class="ed-panel"><span class="ed-tag">School year</span><h3>District calendars</h3><p>Check the 2026–27 academic calendar for holidays, breaks and student attendance days.</p><a href="https://www.roundrockisd.org/o/rrisd/page/calendars" target="_blank" rel="noopener">Open district calendars ↗</a></article></div><div id="ed-home-meals" class="ed-three" aria-live="polite"></div><p class="ed-footnote">Meal choices are published by Round Rock ISD, not the PTA. We link to the live menu instead of displaying unverified dishes. On weekends and school holidays, no school meal is assumed.</p></div></section><section class="ed-section ed-tint"><div class="container"><div class="ed-section-heading"><div><p class="ed-kicker">ON THE HORIZON</p><h2>What’s happening at Voigt</h2></div><a href="/events">Explore the full calendar →</a></div><div id="ed-home-upcoming" class="ed-three"><p>Loading verified upcoming school events…</p></div></div></section>');
loadUpcoming();
const mealDay=new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'America/Chicago'}).format(new Date());displayMeals(mealDay,'ed-home-meals');
const stamp=document.getElementById('ed-today-date');if(stamp)stamp.textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric',timeZone:'America/Chicago'}).format(new Date());
}
function about(){
main.innerHTML=wrap(hero('OUR PURPOSE','A PTA built around every Viking.','Supporting students, partnering with educators and creating meaningful ways for families to belong.')+'<section class="ed-section"><div class="container"><h2>Our mission</h2><p class="ed-wide">To strengthen the partnership between home, school and community through student enrichment, educator support, family engagement and inclusive experiences.</p><div class="ed-three">'+panel('Membership creates a voice','Membership supports advocacy, community connections and a stronger collective voice for student needs. Volunteering is always optional.')+panel('Fundraising creates opportunities','Approved fundraising helps make educational enrichment, school experiences, supplies and student-centered programs possible. Specific allocations are determined by the PTA.')+panel('Partnerships multiply impact','Community sponsors, in-kind donors and volunteers help reduce event costs and expand opportunities for families.')+'</div><h2>Our community impact · 2026–27</h2><div class="ed-three">'+panel('Family connection','The PTA supports ongoing family communication, opportunities to volunteer, and a welcoming school community. Verified participation totals are not yet published.')+panel('Student enrichment and inclusion','Our work spans arts-integrated experiences, community partnerships, school support and accessible family participation. Specific program results are being reconciled.')+panel('Community-powered events','The October 2026 Fall Festival is one completed example of families, volunteers, educators and businesses working together. Additional activities will be reported when documented.')+panel('Fundraising and stewardship','Sponsorships, in-kind donations and auction contributions have been documented. Final proceeds and expenditures remain subject to treasurer verification.')+panel('School and family resources','The PTA website now connects families to food, clothing, crisis support, enrichment and seasonal holiday assistance through external providers.')+panel('What we are measuring','Membership participation, volunteer hours, program attendance, fundraising net proceeds and direct student support will be published when the board confirms the figures.')+'</div><h2>Meet your PTA board</h2><p>Officer information below reflects the current PTA administrative roster. Direct personal contact details are not published; please use the <a href="/contact">PTA contact form</a> for inquiries.</p><div class="ed-three">'+panel('Nikki Clark','President')+panel('John Clark','Vice President')+panel('Veronica Fabian','Communications Chair & Secretary')+panel('Rudy Martin Del Campo','Treasurer')+'</div><p class="ed-footnote">Officer assignments should be reconfirmed against the approved PTA roster before annual publication.</p><p class="ed-footnote">Impact figures describe verified activities, not estimated revenue or student reach. Request official board and financial records through <a href="/contact">Contact PTA</a>.</p></div></section>');
}
function join(){
main.innerHTML=wrap(hero('MEMBERSHIP','Your membership makes belonging possible.','One simple commitment supports a stronger connection between students, families and educators. No volunteering requirement.')+'<section class="ed-section"><div class="container"><div class="ed-three">'+panel('Advocate for students','Membership strengthens the PTA’s collective voice in conversations about student experiences and school needs.')+panel('Support enrichment','PTA programs and approved projects can provide learning experiences, family events and teacher support.')+panel('Stay connected','Become part of a community that shares information, opportunities and ways to participate.')+'</div><div class="ed-join-cta"><h2>Every Viking benefits when families connect.</h2><p>The official Texas PTA enrollment site will ask you to select Round Rock ISD and then Xenia Voigt PTA.</p><a class="ed-primary" href="https://txpta.my.salesforce-sites.com/JoinPTA" target="_blank" rel="noopener">Join through Texas PTA ↗</a></div><h2>Membership questions</h2><div class="ed-faq"><details><summary>Do I have to volunteer?</summary><p>No. Membership and volunteering are separate choices.</p></details><details><summary>Do I have to attend meetings?</summary><p>No. Attend when it works for you.</p></details><details><summary>Can grandparents or community members join?</summary><p>Texas PTA membership is open to supporters of the school community; follow the official enrollment requirements.</p></details><details><summary>Where does my payment go?</summary><p>Membership dues may include state and national PTA portions as well as the local PTA portion. Consult the official join form for current amounts.</p></details></div></div></section>');
}
function resourcesPage(){
main.innerHTML=wrap(hero('FAMILY RESOURCE LIBRARY','Find the help you need, without the hunt.','A searchable collection of local support, school information, basic necessities, crisis services and holiday gift programs.')+'<section class="ed-section"><div class="container"><div class="ed-alert"><strong>Holiday assistance: 2026 Round Rock Blue Santa applications open November 1–30.</strong><p>Applications are online only. Review the required documents before applying. Other programs may have different service boundaries or unconfirmed 2026 dates.</p><a href="https://www.roundrocktexas.gov/city-departments/police/divisions/round-rock-operation-blue-santa/" target="_blank" rel="noopener">See official Blue Santa details ↗</a></div><div class="ed-resource-controls"><label for="ed-resource-search">Search programs and services</label><input id="ed-resource-search" type="search" placeholder="Try: Christmas gifts, food, rent, clothes, crisis…"><label for="ed-resource-category">Browse by category</label><select id="ed-resource-category"><option value="all">All resources</option>'+[...new Set(resources.map(x=>x[0]))].map(x=>'<option>'+esc(x)+'</option>').join('')+'</select></div><p id="ed-resource-count" aria-live="polite"></p><div id="ed-resource-grid" class="ed-resource-grid"></div><p class="ed-footnote">These are third-party programs, not PTA-administered benefits. Eligibility, funding and hours may change. Confirm with the provider. In immediate danger, call 911.</p></div></section>');
const input=document.getElementById('ed-resource-search'),cat=document.getElementById('ed-resource-category');
const draw=()=>{let q=input.value.trim().toLowerCase(),c=cat.value;let list=resources.filter(x=>(c==='all'||x[0]===c)&&x.join(' ').toLowerCase().includes(q));document.getElementById('ed-resource-count').textContent=list.length+' resources';document.getElementById('ed-resource-grid').innerHTML=list.map(x=>'<article class="ed-panel"><span class="ed-tag">'+esc(x[0])+'</span><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p><small>'+esc(x[4])+'</small><a href="'+esc(x[3])+'" '+(x[3].startsWith('http')?'target="_blank" rel="noopener"':'')+'>Open resource ↗</a></article>').join('')||'<p>No matching resources. Try a different search.</p>';};
input.addEventListener('input',draw);cat.addEventListener('change',draw);draw();
}
function contact(){
main.innerHTML=wrap(hero('CONTACT YOUR PTA','The right conversation starts here.','Choose the topic so your message is easy to route. We welcome questions, ideas and offers to help.')+'<section class="ed-section"><div class="container ed-contact-grid"><div><h2>How to reach us</h2><p><a href="mailto:info@xeniavoigtpta.org">info@xeniavoigtpta.org</a></p><p>Choose Membership, Volunteering, Events, Family Resources, Sponsorships or Board Matters. We cannot guarantee a response time until the board approves a service standard.</p><p class="ed-footnote">This form sends your inquiry to the PTA email service. A confirmation appears only when the service reports successful delivery.</p></div><form id="ed-contact-form" class="ed-panel"><label>What is this about?<select name="topic" required><option value="">Choose a category</option><option>Membership</option><option>Volunteering</option><option>Events and Calendar</option><option>Family Resources</option><option>Sponsorships and Donations</option><option>Board and Governance</option><option>Other</option></select></label><label>Your name<input name="name" required maxlength="100"></label><label>Your email<input name="email" type="email" required maxlength="180"></label><label>Your message<textarea name="message" rows="5" required maxlength="3000"></textarea></label><button class="ed-primary" type="submit">Send inquiry ↗</button><p id="ed-contact-status" role="status"></p></form></div></section>');
document.getElementById('ed-contact-form').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,btn=form.querySelector('button'),status=document.getElementById('ed-contact-status'),d=Object.fromEntries(new FormData(form));btn.disabled=true;status.textContent='Sending your inquiry…';try{const res=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}),data=await res.json().catch(()=>({}));if(!res.ok)throw Error(data.error||'Message not delivered');form.reset();status.textContent='Your inquiry was delivered to the PTA email service. Please watch for a confirmation email.';}catch(err){status.textContent=(err.message||'Unable to send')+' You may email info@xeniavoigtpta.org directly.';}finally{btn.disabled=false;}});
}
function fundraising(){
main.innerHTML=wrap(hero('SUPPORT OUR STUDENTS','Invest in what makes Voigt extraordinary.','Every meaningful contribution begins with a clear purpose and responsible stewardship.')+'<section class="ed-section"><div class="container"><div class="ed-alert"><strong>Funding goals and current balances are awaiting board verification.</strong><p>We will not display invented targets, totals or percentages. Current needs below are areas for sponsorship inquiry, not approved budget requests.</p></div><div class="ed-three">'+panel('Arts-integrated enrichment','Explore sponsoring classroom creativity, reusable art materials or learning experiences. Scope and costs require school and PTA approval.')+panel('Family-centered experiences','Help support accessible, welcoming PTA activities, including sensory-considerate participation and event supplies.')+panel('Student and educator support','Discuss practical school needs, family resources or staff appreciation with the board before committing funds.')+'</div><div class="ed-join-cta"><h2>Become a community supporter</h2><p>Offer funding, goods, services or volunteer expertise. We will confirm the need, recognition terms and approval before any commitment.</p><a class="ed-primary" href="/contact">Discuss a sponsorship ↗</a></div><h2>Progress and accountability</h2><p>Verified funding goal: not yet published. Amount raised: not yet verified. Amount allocated: not yet verified. We will display progress when approved financial figures are available.</p><a href="/about">How PTA support benefits students →</a></div></section>');
}
function vendor(){
const supporters=[
 [
  "A+ Federal Credit Union",
  "https://aplusfcu.org/",
  "approved-aplus"
 ],
 [
  "AiRCO Mechanical",
  "https://www.aircomechanical.com/",
  "airco"
 ],
 [
  "Amy’s Ice Creams",
  "https://amysicecreams.com/",
  "approved-amy"
 ],
 [
  "Andy’s Frozen Custard",
  "https://www.eatandys.com/",
  ""
 ],
 [
  "Austin Aquarium",
  "https://austinaquarium.com/",
  "approved-austin-aquarium"
 ],
 [
  "Austin Christian University (ACU)",
  "https://www.austinchristianuniversity.org/",
  "approved-acu"
 ],
 [
  "Austin Creative Reuse",
  "https://austincreativereuse.org/",
  "approved-austin-creative-reuse"
 ],
 [
  "Austin Zoo",
  "https://austinzoo.org/",
  "approved-austin-zoo"
 ],
 [
  "Blue Diamond Boutique",
  "https://shopbluediamondboutique.com/",
  ""
 ],
 [
  "Board & Brush",
  "https://boardandbrush.com/",
  "approved-board-brush"
 ],
 [
  "Boys & Girls Clubs of the Austin Area",
  "https://www.bgcaustin.org/",
  "approved-boys-girls-club"
 ],
 [
  "Cookies & Crumbles Bake Shop",
  "https://www.cookiesandcrumblesbakeshop.com/",
  "approved-cookies-crumbles"
 ],
 [
  "Express Commercial Cleaning",
  "https://www.expresscommercialcleaning.com/",
  "approved-express-cleaning"
 ],
 [
  "FASTSIGNS",
  "https://www.fastsigns.com/",
  "fastsigns"
 ],
 [
  "Five Points Board of REALTORS",
  "https://www.fivepointsrealtors.com/",
  "five-points"
 ],
 [
  "Flix Brewhouse",
  "https://www.flixbrewhouse.com/",
  ""
 ],
 [
  "Forest Creek Mini Storage",
  "https://forestcreekministorage.com/",
  "approved-forest-creek"
 ],
 [
  "H-E-B",
  "https://www.heb.com/",
  "heb"
 ],
 [
  "Hearth & Honey",
  "https://www.hearthandhoneyatx.com/",
  "/logos/vendors/Hearth_and_Honey_Official.jpeg"
 ],
 [
  "K&K BBQ Mexican Food",
  "https://www.kkbbqmexicanfoodroundrock.com/",
  "/logos/vendors/K_and_K_BBQ_Mexican_Food_Official.jpeg"
 ],
 [
  "Lady Bird Johnson Wildflower Center",
  "https://www.wildflower.org/",
  ""
 ],
 [
  "Longhorn Production Services",
  "https://www.longhornproductions.com/",
  "approved-longhorn"
 ],
 [
  "Mathnasium",
  "https://www.mathnasium.com/",
  "mathnasium"
 ],
 [
  "Mickan Motor Company",
  "",
  "approved-mickan"
 ],
 [
  "Monster Mini Golf",
  "https://monsterminigolf.com/",
  "approved-monster-mini-golf"
 ],
 [
  "Nothing Bundt Cakes",
  "https://www.nothingbundtcakes.com/",
  "approved-nothing-bundt"
 ],
 [
  "Oriental Trading",
  "https://www.orientaltrading.com/",
  ""
 ],
 [
  "Paige’s Bakehouse",
  "https://www.paigesbakehouse.com/",
  "approved-paiges"
 ],
 [
  "PHP Agency",
  "https://phpagency.com/",
  "approved-php"
 ],
 [
  "Pour The Fun",
  "https://pourthefun.com/",
  "approved-pour-the-fun"
 ],
 [
  "Round Rock Church of Christ",
  "",
  "approved-round-rock-church"
 ],
 [
  "Round Rock ISD PIE Foundation",
  "https://www.rrisdeducationfoundation.org/",
  "approved-pie"
 ],
 [
  "Round Rock Pumpkin Festival",
  "https://roundrockpumpkinfestival.com/",
  "approved-pumpkin-festival"
 ],
 [
  "Round Rock Sweethearts",
  "https://www.roundrocksweethearts.org/",
  "approved-sweethearts"
 ],
 [
  "Round the Rock",
  "https://roundtherocktx.com/",
  "/round-the-rock-logo.png"
 ],
 [
  "Sam’s Club",
  "https://www.samsclub.com/",
  ""
 ],
 [
  "Shine Pediatric Dental",
  "https://shinepediatricdental.com/",
  "shine"
 ],
 [
  "St. Richard’s Pumpkin Patch",
  "https://saintrichards.org/pumpkin-patch/",
  "approved-st-richards"
 ],
 [
  "Texas Stars",
  "https://www.texasstars.com/",
  "approved-texas-stars"
 ],
 [
  "Toybrary Austin",
  "https://toybraryaustin.com/",
  "approved-toybrary"
 ],
 [
  "Trader Joe’s",
  "https://www.traderjoes.com/",
  ""
 ],
 [
  "Train Quest",
  "",
  "approved-train-quest"
 ],
 [
  "Walburg Feed Store",
  "",
  "approved-walburg"
 ]
];
const tiles=supporters.map(([name,url,slug])=>{
 const logo=slug?(slug[0]==='/'?slug:'/assets/partners/'+slug+'.svg'):'';
 const mark=logo?'<img src="'+esc(logo)+'" alt="'+esc(name)+' logo" loading="lazy" decoding="async" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span class="ed-partner-fallback" style="display:none">'+esc(name)+'</span>':'<span class="ed-partner-fallback">'+esc(name)+'</span>';
 const inside='<span class="ed-partner-mark">'+mark+'</span><strong>'+esc(name)+'</strong>'+(url?'<small>Visit website ↗</small>':'<small>Thank you for your support</small>');
 return url?'<a class="ed-partner-tile" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer" aria-label="Visit '+esc(name)+' website">'+inside+'</a>':'<article class="ed-partner-tile">'+inside+'</article>';
}).join('');
main.innerHTML=wrap(hero('OUR COMMUNITY','The people who make it possible.','Celebrating the organizations and volunteers who support Voigt students, educators and families across school years.')+'<section class="ed-section"><div class="container"><p class="ed-wide">Every contribution matters. Explore the community organizations who have supported our PTA through volunteering, donations, collaboration and school activities.</p><div class="ed-partner-wall">'+tiles+'</div><section class="ed-volunteer-thanks"><h2>Thank you to every volunteer.</h2><p>Parents, grandparents, educators, students and neighbors make our school community stronger throughout the year. We are especially grateful to the Round Rock Sweethearts and Austin Christian University volunteers, whose organizations are recognized above.</p><a class="ed-primary" href="/volunteer">Volunteer with us ↗</a></section><div class="ed-join-cta"><h2>Help our Vikings thrive.</h2><p>Interested in supporting Voigt students and families? We would love to hear from you.</p><a class="ed-primary" href="/contact">Connect with our PTA ↗</a></div></div></section>');
}
function archive(){
main.innerHTML=wrap(hero('OUR 2026 COMMUNITY ARCHIVE','Viking Quest, remembered.','The October 23 Fall Festival and its Trunk-or-Treat activities have concluded.')+'<section class="ed-section"><div class="container"><h2>Thank you, Vikings.</h2><p>This page preserves historical context only. Festival volunteer, trunk-host and vendor signups for October 23 are closed. Explore memories or discover current ways to get involved.</p><div class="ed-three">'+action('Festival memories','Explore the approved photo collection.','/events#pta-photo-memories','View memories')+action('Current volunteering','Find active opportunities.','/volunteer','Volunteer')+action('Upcoming events','Explore the current calendar.','/events','Calendar')+'</div></div></section>');
}
function calendar(){
main.innerHTML=wrap(hero('THE COMMUNITY CALENDAR','Make room for the moments that matter.','Filter school, district and PTA dates; select a day to see details and save events to your calendar.')+'<section class="ed-section"><div class="container"><div class="ed-calendar"><div class="ed-calendar-top"><div><p class="ed-kicker">BROWSE EVENTS</p><h2 id="ed-month"></h2></div><div class="ed-calendar-nav"><button id="ed-prev" aria-label="Previous month">←</button><button id="ed-today">Today</button><button id="ed-next" aria-label="Next month">→</button></div></div><fieldset class="ed-filters"><legend>Show event types</legend><label><input type="checkbox" value="PTA event" checked> PTA</label><label><input type="checkbox" value="School event" checked> School</label><label><input type="checkbox" value="District event" checked> District</label></fieldset><p id="ed-calendar-state" role="status"></p><div class="ed-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div><div id="ed-days" class="ed-days"></div><section class="ed-meal-calendar"><h3>Breakfast & lunch for the selected day</h3><p>Select a calendar date to check its published meals.</p><div id="ed-calendar-meals" class="ed-three" aria-live="polite"></div></section><div class="ed-agenda"><div class="ed-section-heading"><h3 id="ed-agenda-title">This month</h3><button id="ed-clear" type="button">View full month</button></div><div id="ed-agenda-list"></div></div></div><section class="ed-upcoming"><h2>Coming up next</h2><div id="ed-upcoming-list" class="ed-three"></div></section><p class="ed-footnote">Event details are supplied by the school calendar feed. The district website remains authoritative for changes. Downloaded calendar files are generated in your browser from the displayed event details.</p><a href="https://voigt.roundrockisd.org/events?view=list-month" target="_blank" rel="noopener">Official Voigt calendar ↗</a></div></section>');
let events=[],selected=null,month=new Date();month=new Date(month.getFullYear(),month.getMonth(),1),failed=false;
const ymd=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
const enabled=()=>new Set([...document.querySelectorAll('.ed-filters input:checked')].map(x=>x.value));
const filtered=()=>events.filter(x=>enabled().has(x.type||'School event'));
const ics=e=>{const dt=v=>new Date(v).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const date=e.date.replace(/-/g,'');const start=e.allDay?'DTSTART;VALUE=DATE:'+date:'DTSTART:'+dt(e.start||e.date+'T12:00:00-05:00');const end=e.allDay?'DTEND;VALUE=DATE:'+ymd(new Date(new Date(e.date+'T12:00:00').getTime()+86400000)).replace(/-/g,''):'DTEND:'+dt(e.end||new Date(new Date(e.start||e.date+'T12:00:00-05:00').getTime()+3600000));const clean=s=>String(s||'').replace(/[\r\n]/g,' ').replace(/[,;]/g,' ');return 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Xenia Voigt PTA//EN\r\nBEGIN:VEVENT\r\nUID:'+encodeURIComponent(e.id||e.title+'-'+e.date)+'@xeniavoigtpta.org\r\nDTSTAMP:'+dt(new Date())+'\r\n'+start+'\r\n'+end+'\r\nSUMMARY:'+clean(e.title)+'\r\nDESCRIPTION:Check official school calendar for updates\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n';};
const download=e=>{const a=document.createElement('a'),u=URL.createObjectURL(new Blob([ics(e)],{type:'text/calendar'}));a.href=u;a.download='voigt-event-'+e.date+'.ics';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
const card=e=>'<article class="ed-event"><span class="ed-tag">'+esc(e.type||'School event')+'</span><strong>'+esc(e.date)+'</strong><h4>'+esc(e.title)+'</h4><p>'+esc(e.time|| (e.allDay?'All day':'See official calendar for time'))+'</p><details><summary>Event details</summary><p>'+esc(e.details||e.description||'For full event details and any schedule changes, check the official school calendar.')+'</p>'+(e.sourceUrl?'<a href="'+esc(e.sourceUrl)+'" target="_blank" rel="noopener">Official event source ↗</a>':'')+'</details><button type="button" data-download="'+esc(e.id||e.title+'|'+e.date)+'">Add to calendar ↓</button></article>';
function render(){const f=filtered(),y=month.getFullYear(),m=month.getMonth(),first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();document.getElementById('ed-month').textContent=month.toLocaleDateString('en-US',{month:'long',year:'numeric'});let html='';for(let i=0;i<first;i++)html+='<span class="ed-empty"></span>';for(let d=1;d<=days;d++){let date=ymd(new Date(y,m,d)),n=f.filter(e=>e.date===date).length;html+='<button class="'+(selected===date?'ed-selected ':'')+(n?'ed-has-event':'')+'" data-day="'+date+'" aria-label="'+date+', '+n+' events"><b>'+d+'</b>'+(n?'<i>'+n+'</i>':'')+'</button>';}document.getElementById('ed-days').innerHTML=html;const monthList=f.filter(e=>e.date.startsWith(ymd(month).slice(0,7))),list=selected?monthList.filter(e=>e.date===selected):monthList;document.getElementById('ed-agenda-title').textContent=selected?new Date(selected+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'}):'This month · '+monthList.length+' events';document.getElementById('ed-agenda-list').innerHTML=list.slice(0,8).map(card).join('')||'<p>No published events for this selection.</p>';const upcoming=f.filter(e=>e.date>=ymd(new Date())).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);document.getElementById('ed-upcoming-list').innerHTML=upcoming.map(card).join('')||'<p>No upcoming events available from the current feed. Check the official school calendar.</p>';}
document.getElementById('ed-prev').onclick=()=>{month=new Date(month.getFullYear(),month.getMonth()-1,1);selected=null;render();};document.getElementById('ed-next').onclick=()=>{month=new Date(month.getFullYear(),month.getMonth()+1,1);selected=null;render();};document.getElementById('ed-today').onclick=()=>{month=new Date();month=new Date(month.getFullYear(),month.getMonth(),1);selected=null;render();};document.getElementById('ed-clear').onclick=()=>{selected=null;render();};document.querySelectorAll('.ed-filters input').forEach(el=>el.onchange=render);main.addEventListener('click',e=>{let day=e.target.closest('[data-day]');if(day){selected=selected===day.dataset.day?null:day.dataset.day;render();if(selected)displayMeals(selected,'ed-calendar-meals');else document.getElementById('ed-calendar-meals').innerHTML='';}let dl=e.target.closest('[data-download]');if(dl){let event=events.find(x=>(x.id||x.title+'|'+x.date)===dl.dataset.download);if(event)download(event);}});
render();fetch('/api/school-calendar',{headers:{accept:'application/json'}}).then(r=>{if(!r.ok)throw Error('Feed unavailable');return r.json()}).then(j=>{if(!Array.isArray(j.events))throw Error('Invalid feed');events=j.events.map((x,i)=>({...x,id:x.id||'voigt-'+i,type:x.type||'School event'}));document.getElementById('ed-calendar-state').textContent='Showing '+events.length+' school, district and PTA calendar entries. District source: '+(j.sourceStatus?.district||'status unknown')+'.';render();}).catch(()=>{failed=true;document.getElementById('ed-calendar-state').textContent='Live event feed is unavailable. Please use the official school calendar; no unverified dates have been inserted.';render();});
}
async function loadUpcoming(){const el=document.getElementById('ed-home-upcoming');if(!el)return;try{const r=await fetch('/api/school-calendar');if(!r.ok)throw Error();const j=await r.json(),today=new Date().toISOString().slice(0,10),items=(j.events||[]).filter(x=>x.date>=today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);el.innerHTML=items.length?items.map(x=>panel(esc(x.title),esc(x.date)+' · '+esc(x.type||'School event'))).join(''):'<p>No upcoming dates currently published in the feed. <a href="/events">View the calendar</a>.</p>';}catch(e){el.innerHTML='<p>Current event listings are temporarily unavailable. <a href="https://voigt.roundrockisd.org/events?view=list-month">See the official school calendar ↗</a>.</p>';}}

function recognition(){
const isSponsor=path==='/sponsors';
const groups=isSponsor?[
['Confirmed festival sponsors',[['Smile / Shine Pediatric Dental','Festival sponsor · financial contribution recorded in PTA planning'],['Mathnasium','Festival sponsor · financial contribution recorded in PTA planning'],['Five Points','Confirmed festival sponsor; contribution details not published']]],
['In-kind and auction donors',[['A+ Federal Credit Union','Teacher-trunk candy donation'],['Texas Stars','Silent auction prize donor'],['Monster Mini Golf','Silent auction prize donor'],['Board & Brush','Silent auction prize donor · $50 item'],["Amy’s Ice Cream",'Silent auction prize donor'],['Austin Zoo','Silent auction prize donor'],['Austin Aquarium','Silent auction prize donor'],['Cookies & Crumbles','Silent auction prize donor'],['Toybrary Austin','Family-experience donation'],['Austin Creative Reuse','Activity materials contribution']]]
]:[['Community collaborators',[['Boys & Girls Club','Sensory-friendly support and community collaboration'],['Austin Creative Reuse','Creative activity materials and community collaboration'],['PHP Agency','Community event participation; not counted as paid sponsorship']]]];
main.innerHTML=wrap(hero(isSponsor?'SPONSORS AND DONORS':'COMMUNITY PARTNERS',isSponsor?'The people behind the possibilities.':'Stronger together, every day.','Recognizing verified contributions to our 2026 community experiences without confusing financial sponsorship, in-kind donations, event vendors and collaboration.')+'<section class="ed-section"><div class="container">'+groups.map(([heading,items])=>'<h2>'+esc(heading)+'</h2><div class="ed-resource-grid">'+items.map(([name,detail])=>'<article class="ed-panel ed-recognition"><span class="ed-tag">2026 · HISTORICAL</span><h3>'+esc(name)+'</h3><p>'+esc(detail)+'</p></article>').join('')+'</div>').join('')+'<div class="ed-alert" style="margin-top:35px"><strong>Recognition accuracy matters.</strong><p>Official brand artwork is displayed only when an approved asset is available. These name-only acknowledgments are intentional, not fabricated logos. Contribution amounts are omitted unless supported by records.</p><a href="/contact">Ask about becoming a partner ↗</a></div></div></section>');
}

const routes={'/sponsors':vendor,'/community-partners':vendor,'/our-community':vendor,'/':home,'/about':about,'/join':join,'/events':calendar,'/resources':resourcesPage,'/contact':contact,'/fundraising':fundraising,'/donate':fundraising,'/vendors':vendor,'/fall-festival':archive,'/trunk-or-treat':archive,'/trunk-host':archive,'/trunk-host.html':archive,'/viking-quest':archive};
if(path==='/vendors'){location.replace('/our-community');}else if(path==='/fall-festival'||path==='/viking-quest'){location.replace('/events#pta-photo-memories');}else if(routes[path])routes[path]();
})();