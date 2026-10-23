import { createHash } from 'node:crypto';
import { db, ensureSchema, send } from './_db.js';

const STATUS=
{
  "updatedAt": "2026-10-22",
  "event": {
    "title": "Xenia Voigt Viking Quest Fall Festival",
    "date": "Friday, October 23, 2026",
    "time": "5:30–7:30 PM",
    "venue": "Xenia Voigt Arts Integration Academy, 1201 Cushing Drive, Round Rock, TX 78664",
    "attendance": "Approximately 320"
  },
  "metrics": {
    "approvedVendors": [
      "K&K BBQ",
      "Hearth & Honey",
      "Pour The Fun"
    ],
    "foodPlan": "2 food vendors + Pour The Fun",
    "teacherTrunks": 7,
    "teacherTrunksTarget": 7,
    "candyBagsPledged": 12,
    "candyBagWeightLb": 5.75,
    "candyTotalWeightLb": 69,
    "trunkSpacesClaimed": 9,
    "trunkSpacesTarget": 20,
    "vikingQuestTrials": [
      "The Trial of Skill",
      "The Shield Wall",
      "The Rune Maker’s Workshop",
      "The Navigator’s Trial",
      "The Skald’s Stage"
    ],
    "generalActivities": [
      "Pumpkin Bowling",
      "Fall Sensory Mystery",
      "Pumpkin Decorating",
      "Face Painting",
      "Photo Stop"
    ],
    "activeInventoryLines": 81,
    "sourcingInventoryLines": 11,
    "cashPledges": 1340,
    "budgetAllocation": 300,
    "cashSpent": 0,
    "foodPlanTarget": 3,
    "majorAttractionsSponsored": 2,
    "majorAttractionsTarget": 2,
    "silentAuctionPrizes": 7
  },
  "confirmed": [
    {
      "title": "Third-grade Trunk-or-Treat participation",
      "detail": "Ms. Ruiz, Miss Ortega, Ms. Benavidez, Ms. Ramirez, and Ms. Cardenas confirmed. Piñata theme with papel picado and marigolds; no accommodations needed. Existing third-grade reserved space; no additional trunk."
    },
    {
      "title": "Major attractions paid",
      "detail": "AiRCO paid Train Quest INV0761 in full for $1,095. Shine Pediatric Dental Co. paid INV0763 in full for $195 for the Kids Rainbow Combo, and the updated Shine COI has been received."
    },
    {
      "title": "Train Quest walkthrough",
      "detail": "Tuesday, October 13 at 8:00 AM is confirmed with the school and Train Quest for the onsite field verification."
    },
    {
      "title": "Final food/vendor lineup",
      "detail": "K&K BBQ and Hearth & Honey are the two food vendors, plus Pour The Fun. The final board-approved vendor giveback is 0%; no additional food vendors are being added."
    },
    {
      "title": "PTA closet inventory available",
      "detail": "The photographed closet belongs to the PTA. Its usable supplies are available for Fall Festival without school authorization, subject only to physical count, condition, hygiene and safety checks."
    },
    {
      "title": "H-E-B Cake Walk support",
      "detail": "H-E-B approved $125 and confirmed the Business Center shopping appointment for Thursday, October 22 at 10:00 AM."
    },
    {
      "title": "Forest Creek photo-stop trailer",
      "detail": "Forest Creek Mini Storage donated the 12-foot utility trailer with 2-foot walls at $0 for 24 hours. Brittani is scheduled to pick up Oct. 23 shortly after 9:00 AM and return it Oct. 24 morning. No deposit is required; driver’s license, proof of insurance and a card copy for damage security are required; the trailer uses a 2-inch ball."
    },
    {
      "title": "School maps received",
      "detail": "Ana Garza supplied the grounds and interior maps. Classroom-area doors must remain closed throughout the event."
    },
    {
      "title": "Sensory-friendly retreat",
      "detail": "The Boys & Girls Club portable is the planned sensory-friendly retreat. No PTA-purchased sensory materials are needed."
    },
    {
      "title": "St. Richard’s pumpkins",
      "detail": "All 86 pumpkins donated; October 22 pickup confirmation pending."
    },
    {
      "title": "Volunteer commitments",
      "detail": "ACU roster now lists 14 named volunteers: 10 original confirmed for 4:30–8:30 PM, four additional names with availability pending, and one vacant ACU slot. Other volunteer pools must be counted separately."
    },
    {
      "title": "School safety procedures",
      "detail": "Mrs. Cobb confirmed first-aid kit in Nurse’s Office, 911 for emergencies, campus-led lost-child reporting, posted exits, clear ADA routes, first-floor severe-weather shelter, custodian on duty and volunteer identification."
    }
  ],
  "pending": [
    {
      "title": "PIE Foundation Campus Request Form",
      "detail": "The reconciled PIE Campus Request Form was submitted October 2 and the confirmation showed the response was recorded. Ruth Erb plans to pull the requested items Tuesday or Wednesday; reconcile exact quantities when the pull is ready."
    },
    {
      "title": "A+ candy handoff",
      "detail": "A+ Federal Credit Union pledged 12 Costco variety bags totaling 69 lb. Pickup is scheduled for October 22 at about 11:30 AM at the Mays Street branch; count actual pieces and capture recognition assets at handoff."
    },
    {
      "title": "Board & Brush certificate",
      "detail": "Steffany offered a $50 digital gift certificate; it has not been received. Follow-up sent October 14 requesting delivery by October 16 and clarification of redemption restrictions. Do not count as fulfilled auction prize."
    },
    {
      "title": "Insurance certificate",
      "detail": "PTA annual liability coverage is paid and effective October 8; formal carrier COI remains pending."
    },
    {
      "title": "Pumpkin pickup and reward sponsorship",
      "detail": "St. Richard’s donated 86 pumpkins; confirm October 22 pickup. Five Points approved redirecting its $50 commitment to Viking Quest rewards; payment and item selection remain open."
    },
    {
      "title": "Volunteer assignment confirmation",
      "detail": "October 20 ACU reconciliation: 14 named / 15 target, 10 original confirmed 4:30–8:30 PM. Addy Jeffers accepted Face Painting Lead; Katie Salmon proposed Outdoor PA/MC pending acceptance; Adysen DeVaney sensory retreat and Caleb Kendrick relief/supplies tentative; Lee Dawn unassigned. Confirm newcomer hours, adult status and official #1–15 mapping."
    },
    {
      "title": "Eleven specialty material lines",
      "detail": "Austin Creative Reuse order picked up October 14 in full; confirm Boys & Girls Club itemized offer and reconcile verified materials against the inventory."
    },
    {
      "title": "FASTSIGNS final package",
      "detail": "22 final PNG artwork files accepted by FASTSIGNS; estimate EST-17493 approval/payment and proof confirmation remain to be verified. October 22 afternoon pickup conditional."
    },
    {
      "title": "Power and audio closeout",
      "detail": "Usual track/blue-awning portable power location identified, but 12A/50-foot fit remains unverified. School audio operator has not been assigned; resolve at Oct. 13 field check."
    },
    {
      "title": "Ranger card proof and certificate printer",
      "detail": "Ranger confirmed 350 donated Viking Quest cards on October 14. Proof and pickup pending. Completion certificates require a separate printer; library contacted."
    }
  ],
  "declined": [
    {
      "title": "Removed from current event plan",
      "detail": "DJ/MC, extra inflatables, additional food vendors, paid face-painter outreach, new silent-auction donor outreach, and new sensory-retreat material purchases remain closed unless Brittani explicitly changes scope."
    }
  ],
  "followUp": [
    {
      "title": "Internal map + field check",
      "detail": "The internal working-final map and zone plan are complete. Oct. 13 verifies exact footprints, power distance, clearances and setup access; it does not reopen the program scope."
    },
    {
      "title": "PTA closet pull",
      "detail": "Pull/count/condition-check the PTA-owned totes, games, craft supplies, tablecloths, face-paint supplies, photo props, coolers and operations stock using the new PTA Closet Pull sheet."
    },
    {
      "title": "Pumpkin fulfillment",
      "detail": "The $50 sponsorship is secured with Five Points and all other sponsor asks are closed. Confirm St. Richard’s payment method and October 22 pickup window, then send Five Points the payment instructions."
    }
  ],
  "changes": [
    "October 22: Sabrina Ruiz confirmed third-grade teachers, piñata theme with papel picado and marigolds, and no accommodations. Likely Benavidez midsize crossover SUV remains NOT FINAL until Sabrina confirms; existing reserved space count unchanged.",
    "October 20: ACU roster reconciled to 14 named / 15 target; 10 original confirmed for 4:30–8:30 PM, four newer volunteers pending shift details. Addy moved to Face Painting Lead; Katie proposed as Outdoor PA/MC; Lee Dawn newly recruited.",
    "October 14: Toybrary Austin, Austin Aquarium and Austin Creative Reuse pickups completed; all promised items received in full, no substitutions or shortages.",
    "October 9: Mrs. Cobb supplied safety procedures and customary inflatable power location; audio operator and exact electrical fit remain open.",
    "October 9: ACU has 14 named volunteers, 10 original shift-confirmed; Sweethearts confirmed 13 students arriving 5:15 PM.",
    "October 9: Ranger received three card/certificate PDFs; in-kind print decision pending.",
    "October 9: SC Johnson declined; archived from active donor list.",
    "October 9: Round Rock Church of Christ received the current Amazon registry; selected items and quantities are pending.",
    "October 8–9: PTA annual liability coverage paid and effective; formal COI pending.",
    "October 8: 13 Round Rock Sweethearts confirmed with Amanda Shingleton as lead; adult supervision must be assigned by PTA/school.",
    "October 8: St. Richard’s donated 86 pumpkins; Five Points approved redirecting $50 to Viking Quest rewards.",
    "October 9: FASTSIGNS upload route confirmed; final package depends on October 13 field approval and October 14 delivery."
  ],
  "blockers": [
    "October 13 field check: verify inflatable 12A load and <=50-foot cord run; obtain school audio operator.",
    "PTA insurance certificate (coverage is effective; carrier COI pending).",
    "October 13 field approval before October 14 FASTSIGNS upload.",
    "Named adult supervision/roles for 13 Sweethearts and final ACU count.",
    "Austin Creative Reuse picked up October 14 in full; inventory reconciliation of specialty material lines remains separate."
  ],
  "deadlines": [
    {
      "date": "October 13, 2026",
      "detail": "Train Quest onsite field verification at 8:00 AM; close power/placement/clearances and release final map/signage afterward."
    },
    {
      "date": "October 16, 2026",
      "detail": "Final fulfillment/staffing/print freeze."
    },
    {
      "date": "October 22, 2026",
      "detail": "Nothing Bundt pickup at 9:00 AM; H-E-B Cake Walk shop at 10:00 AM; A+ candy pickup at about 11:30 AM; add St. Richard’s pumpkin pickup after its payment method/window is confirmed."
    },
    {
      "date": "October 23, 2026",
      "detail": "Festival 5:30–7:30 PM; family candy donations remain open through event day."
    }
  ],
  "actions": [
    "Confirm third-grade final vehicle and vehicle-host email/phone with Sabrina Ruiz. Participation and theme are confirmed; likely Ms. Benavidez midsize crossover SUV is not final.",
    "Close school power, audio operator, safety and field placement at October 13 walkthrough.",
    "Obtain the formal PTA insurance COI; save with event records.",
    "Austin Creative Reuse picked up October 14; all promised items received in full.",
    "After field approval, send only the locked FASTSIGNS package through its upload route by October 14; confirm revised invoice.",
    "Receive ACU final name/shift mapping and assign named adult leads; place Sweethearts in supervised roles.",
    "Confirm St. Richard’s October 22 pumpkin pickup; send Five Points approved Viking Quest reward selection/payment instructions.",
    "Keep A+ candy, H-E-B and Nothing Bundt pickups scheduled for October 22."
  ],
  "budget": {
    "allocation": "$300",
    "spent": "$0",
    "goal": "$0 PTA cash spend where possible",
    "cashPledges": "$1,340 committed/pledged; confirm itemized receipts"
  },
  "dashboard": {
    "metrics": [
      {
        "label": "Food lineup",
        "value": "3 / 3",
        "percent": 100,
        "icon": "store"
      },
      {
        "label": "Major attractions",
        "value": "2 / 2 paid",
        "percent": 100,
        "icon": "heart"
      },
      {
        "label": "ACU named / target",
        "value": "ACU 14 / 15",
        "percent": 93,
        "icon": "users"
      },
      {
        "label": "Specialty materials",
        "value": "11 lines open",
        "percent": 0,
        "icon": "gift"
      },
      {
        "label": "Silent auction",
        "value": "7 / 7 identified",
        "percent": 100,
        "icon": "gift"
      }
    ],
    "action": [
      {
        "item": "Verify inflatable power and name audio operator",
        "status": "Field check / operator open",
        "date": "Oct 13",
        "tone": "action",
        "detail": "Mrs. Cobb identified the customary track/blue-awning portable power location. Exact 12A load and 50-foot cord run have not been verified. No school audio operator has been assigned.",
        "next": "Measure and test the power path at the October 13 field check; obtain the operator name before the final run of show."
      },
      {
        "item": "PTA liability certificate",
        "status": "COI pending",
        "date": "ASAP",
        "tone": "action",
        "detail": "Annual coverage is paid and effective October 8; the formal carrier certificate is still outstanding.",
        "next": "Save the carrier COI in event records when received."
      },
      {
        "item": "Austin Creative Reuse pickup and count",
        "status": "Received in full",
        "date": "Oct 14",
        "tone": "confirmed",
        "detail": "Picked up October 14; all promised items received with no shortages or substitutions.",
        "next": "Pickup closed. Reconcile physical inventory against Activity Materials without duplicating sourcing."
      },
      {
        "item": "FASTSIGNS final artwork and invoice",
        "status": "Field approval first",
        "date": "Oct 14",
        "tone": "action",
        "detail": "Upload route is confirmed. The revised itemized scope and invoice require verification against the approved signs.",
        "next": "Following October 13 field approval, upload one final package by October 14 and get written receipt."
      },
      {
        "item": "Assign volunteer adult leads",
        "status": "Assignments open",
        "date": "Oct 16",
        "tone": "action",
        "detail": "ACU has 14 named volunteers, 10 original shift-confirmed, and 13 Sweethearts will arrive at 5:15 PM. Four newer ACU volunteers need shift confirmation; one ACU vacancy remains. Confirm Katie for MC, Addy for face painting, and supervision of 13 Sweethearts.",
        "next": "Confirm Katie Salmon as outdoor MC, Addy Jeffers as face-paint lead, Adysen DeVaney sensory retreat, Caleb Kendrick relief runner; assign Lee Dawn and fill one vacancy."
      }
    ],
    "working": [
      {
        "item": "Third-grade trunk vehicle",
        "status": "Vehicle not final",
        "date": "Before Oct 23 setup",
        "tone": "working",
        "detail": "NOT FINAL: likely Ms. Benavidez’s midsize crossover SUV. Await Sabrina Ruiz’s confirmation of the final vehicle and vehicle-host email/phone.",
        "next": "Sabrina to confirm final vehicle and vehicle-host email/phone; follow-up sent through website inbox reply."
      },
      {
        "item": "Ranger Quest cards and certificates",
        "status": "Artwork sent",
        "date": "Pending review",
        "tone": "working",
        "detail": "Three print PDFs were sent to Luis at Ranger Print House October 9: Quest card front/back and completion certificate front. In-kind production scope, quantity and delivery remain unconfirmed.",
        "next": "Await Ranger’s review before marking printing covered; do not resend the same request."
      },
      {
        "item": "St. Richard’s pumpkin pickup",
        "status": "86 donated",
        "date": "Oct 22",
        "tone": "working",
        "detail": "All 86 pumpkins donated. Pickup window still needs confirmation; Five Points redirected its $50 pledge to Viking Quest rewards.",
        "next": "Confirm pickup, then close the approved reward selection and payment instructions."
      },
      {
        "item": "Church registry selections",
        "status": "Link sent",
        "date": "Pending",
        "tone": "working",
        "detail": "Round Rock Church of Christ received the current Amazon registry October 9.",
        "next": "Record exact selected items and quantities only after the church replies or purchases."
      },
      {
        "item": "October 22 fulfillment route",
        "status": "Scheduled",
        "date": "Oct 22",
        "tone": "working",
        "detail": "Nothing Bundt pickup 9 AM, H-E-B Cake Walk shop 10 AM, A+ candy around 11:30 AM; add pumpkin pickup after confirmation.",
        "next": "Assign transport/helpers and capture actual fulfilled quantities."
      }
    ],
    "confirmed": [
      {
        "item": "Third-grade Trunk-or-Treat",
        "status": "Participation confirmed",
        "date": "Oct 23",
        "tone": "confirmed",
        "detail": "Ms. Ruiz, Miss Ortega, Ms. Benavidez, Ms. Ramirez, and Ms. Cardenas confirmed. Piñata theme with papel picado and marigolds; no accommodations needed. Existing third-grade reserved space; no additional trunk."
      },
      {
        "item": "K&K BBQ, Hearth & Honey, Pour The Fun",
        "status": "Lineup locked",
        "date": "Oct 23",
        "tone": "confirmed",
        "detail": "Two food vendors, one savory and one sweet, plus beverage vendor; 10% fee waived. No additional vendors."
      },
      {
        "item": "Train Quest and covered combo inflatable",
        "status": "Paid",
        "date": "Oct 13",
        "tone": "confirmed",
        "detail": "AiRCO paid $1,095 and Shine paid $195; Train Quest field walkthrough confirmed October 13 at 8 AM."
      },
      {
        "item": "Cake Walk plan",
        "status": "Board-approved",
        "date": "Oct 23",
        "tone": "confirmed",
        "detail": "One-hour plan with 40 prize target. Seventeen donated packages identified; H-E-B $125 appointment supports the remaining bakery packages."
      },
      {
        "item": "Silent auction",
        "status": "7 prizes identified",
        "date": "Oct 23",
        "tone": "confirmed",
        "detail": "Seven-prize cap; fulfillment/custody still tracked separately."
      },
      {
        "item": "Sensory retreat",
        "status": "Planned",
        "date": "Oct 23",
        "tone": "confirmed",
        "detail": "Boys & Girls Club portable; no PTA-purchased materials needed."
      },
      {
        "item": "School safety procedures",
        "status": "Received",
        "date": "Oct 9",
        "tone": "confirmed",
        "detail": "Mrs. Cobb confirmed Nurse’s Office first-aid kit/911, campus-led lost-child procedure, posted exits, clear ADA routes, first-floor severe-weather shelter, custodian on duty and staff/PTA identification. Exact lost-child point remains to be identified internally."
      }
    ],
    "complete": [
      {
        "item": "PTA closet inventory ownership",
        "status": "Available",
        "date": "Oct 2",
        "tone": "complete",
        "detail": "PTA-owned items can be used after count, condition and safety checks; no school authorization needed."
      },
      {
        "item": "Express cleanup supplies",
        "status": "Delivered",
        "date": "Sep 25",
        "tone": "complete",
        "detail": "Supplies delivered to Voigt; stage them at setup."
      }
    ],
    "panels": {
      "sponsors": {
        "title": "Sponsors & donations",
        "description": "Commitments, fulfillment and current asks. Full record is in the master tracker.",
        "rows": [
          {
            "item": "AiRCO — Train Quest",
            "detail": "$1,095 paid directly to provider.",
            "status": "Paid",
            "tone": "complete"
          },
          {
            "item": "Shine — combo inflatable",
            "detail": "$195 paid; provider COI received.",
            "status": "Paid",
            "tone": "complete"
          },
          {
            "item": "H-E-B — Cake Walk",
            "detail": "$125 shopping appointment October 22 at 10 AM.",
            "status": "Approved",
            "tone": "confirmed"
          },
          {
            "item": "St. Richard’s — 86 pumpkins",
            "detail": "Donation confirmed; pickup window pending.",
            "status": "Pickup pending",
            "tone": "working"
          },
          {
            "item": "Five Points — Viking Quest rewards",
            "detail": "$50 redirect approved; selection/payment pending.",
            "status": "Committed",
            "tone": "working"
          },
          {
            "item": "Church registry",
            "detail": "Current list sent October 9; selections unverified.",
            "status": "Waiting",
            "tone": "working"
          }
        ]
      },
      "vendors": {
        "title": "Vendors & attractions",
        "description": "Locked participants and operational follow-up.",
        "rows": [
          {
            "item": "K&K BBQ",
            "detail": "Savory food; confirm final operating details.",
            "status": "Approved",
            "tone": "confirmed"
          },
          {
            "item": "Hearth & Honey",
            "detail": "Sweet vendor; 4:30 PM arrival, self-powered booth.",
            "status": "Confirmed",
            "tone": "confirmed"
          },
          {
            "item": "Pour The Fun",
            "detail": "Beverage vendor; confirm final setup details.",
            "status": "Approved",
            "tone": "confirmed"
          },
          {
            "item": "Train Quest",
            "detail": "Train/games paid; field verification October 13.",
            "status": "Paid",
            "tone": "confirmed"
          },
          {
            "item": "Covered combo inflatable",
            "detail": "Paid; school power/placement confirmation pending.",
            "status": "Paid",
            "tone": "confirmed"
          }
        ]
      },
      "volunteers": {
        "title": "Volunteer coverage",
        "description": "Committed pool and assignment work. Group pledges are not assigned shifts.",
        "rows": [
          {
            "item": "Confirmed unique pool",
            "detail": "31/36: Brittani, Dana, Quinteria, 13 Sweethearts and 15 ACU adults.",
            "status": "31 / 36",
            "tone": "working"
          },
          {
            "item": "Round Rock Sweethearts",
            "detail": "13 students, 5:15 PM arrival. Final role packets sent October 13; verify adult supervision and roster.",
            "status": "13 confirmed",
            "tone": "confirmed"
          },
          {
            "item": "Austin Christian University",
            "detail": "15 adults confirmed, 4:30 PM arrival; assignment packet sent October 13. Final named roster confirmation pending.",
            "status": "15 confirmed",
            "tone": "confirmed"
          },
          {
            "item": "Named adult leads",
            "detail": "Safety, custody and station assignments must be placed by October 16.",
            "status": "Action needed",
            "tone": "action"
          }
        ]
      },
      "communications": {
        "title": "Communications",
        "description": "Only current family communication and print dependencies.",
        "rows": [
          {
            "item": "Public festival page",
            "detail": "Family-facing confirmed event information only.",
            "status": "Live",
            "tone": "complete"
          },
          {
            "item": "Candy drive",
            "detail": "October 23 deadline; family donations accepted through event day.",
            "status": "Current",
            "tone": "confirmed"
          },
          {
            "item": "FASTSIGNS package",
            "detail": "22 PNG files accepted. Verify estimate approval, payment and proofs; conditional October 22 pickup.",
            "status": "Action needed",
            "tone": "action"
          },
          {
            "item": "Quest cards and certificates",
            "detail": "Ranger donated 350 cards; proof and pickup date pending. 350 completion certificates require another printer; library contacted October 14.",
            "status": "Review pending",
            "tone": "working"
          }
        ]
      },
      "layout": {
        "title": "Layout & operations",
        "description": "Internal work requiring final field and school confirmation.",
        "rows": [
          {
            "item": "Third-grade Trunk-or-Treat",
            "status": "Teachers/theme confirmed; vehicle pending",
            "tone": "working",
            "detail": "Ms. Ruiz, Miss Ortega, Ms. Benavidez, Ms. Ramirez, and Ms. Cardenas confirmed. Piñata theme with papel picado and marigolds; no accommodations needed. Existing third-grade reserved space; no additional trunk. NOT FINAL: likely Ms. Benavidez’s midsize crossover SUV. Await Sabrina Ruiz’s confirmation of the final vehicle and vehicle-host email/phone."
          },
          {
            "item": "October 13 field check",
            "detail": "Train, inflatable, access, clearances and sign placement.",
            "status": "Scheduled",
            "tone": "confirmed"
          },
          {
            "item": "School power and audio",
            "detail": "Portable outlet location identified; 12A/50-foot fit needs field check. Operator unassigned.",
            "status": "Action needed",
            "tone": "action"
          },
          {
            "item": "Sensory retreat",
            "detail": "Boys & Girls Club portable; access and staffing tracked.",
            "status": "Planned",
            "tone": "working"
          },
          {
            "item": "Photo stop trailer",
            "detail": "Forest Creek donation; confirm towing, insurance and return.",
            "status": "Confirmed / logistics",
            "tone": "working"
          },
          {
            "item": "October 22 pickups",
            "detail": "Nothing Bundt, H-E-B, A+; pumpkin time pending.",
            "status": "Coordinating",
            "tone": "working"
          },
          {
            "item": "School safety procedures",
            "detail": "Confirmed October 9; use only in internal event briefing.",
            "status": "Received",
            "tone": "confirmed"
          }
        ]
      }
    }
  }
};

const digestToken=t=>createHash('sha256').update(String(t||'')).digest('hex');

async function statusWithPrivateLiveOverrides(sql){
  const result=JSON.parse(JSON.stringify(STATUS));
  const rows=await sql`SELECT section,item_key,operation,payload,updated_at FROM public.pta_festival_status_overrides ORDER BY updated_at ASC,section,item_key`;
  for(const row of rows){
    const target=row.section.split('.').reduce((v,k)=>v&&v[k],result);
    if(!Array.isArray(target)) continue;
    const index=target.findIndex(item=>item&&(item.item===row.item_key||item.title===row.item_key||item.label===row.item_key));
    if(row.operation==='remove'){if(index>=0)target.splice(index,1);continue;}
    if(row.operation!=='upsert'||!row.payload||typeof row.payload!=='object')continue;
    if(index>=0)target[index]={...target[index],...row.payload};
    else target.push(row.payload);
  }
  if(rows.length)result.updatedAt=String(rows[rows.length-1].updated_at).slice(0,10);
  return result;
}


export default async function handler(req,res){
  try{
    res.setHeader('Cache-Control','no-store, max-age=0');
    if(req.method==='OPTIONS') return res.status(204).end();
    if(req.method!=='GET') return send(res,405,{error:'Method not allowed'});
    const token=String(req.headers['x-admin-session']||'').trim();
    if(!token) return send(res,401,{error:'Board sign-in required.'});
    const sql=db();
    await ensureSchema(sql);
    const rows=await sql`SELECT s.username
      FROM pta_board_sessions s
      JOIN pta_board_users u ON u.username=s.username
      WHERE s.token_hash=${digestToken(token)} AND s.expires_at>NOW()
      LIMIT 1`;
    if(!rows[0]) return send(res,401,{error:'Board sign-in required.'});
    return send(res,200,await statusWithPrivateLiveOverrides(sql));
  }catch(err){
    console.error(err);
    return send(res,500,{error:'Festival status is temporarily unavailable.'});
  }
}
