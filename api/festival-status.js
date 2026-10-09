import { createHash } from 'node:crypto';
import { db, ensureSchema, send } from './_db.js';

const STATUS=
{
  "updatedAt": "2026-10-09",
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
      "Apple Scoop Challenge",
      "Fall Sensory Mystery",
      "Collaborative Autumn Mural",
      "Gratitude Tree",
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
      "detail": "At least 31 unique people committed: Brittani, Dana, Quinteria, 13 Round Rock Sweethearts, and at least 15 ACU adults. Assignments and final ACU count pending."
    }
  ],
  "pending": [
    {
      "title": "School operational closeout",
      "detail": "A consolidated Oct. 2 school email asks only for the remaining 12A/50-foot inflatable power confirmation, school PA operator, first-aid/lost-child point, and any weather/custodial/security requirements."
    },
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
      "detail": "The $50 digital gift certificate was accepted; receipt remains pending before final silent-auction fulfillment can be marked complete."
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
      "title": "Volunteer assignments",
      "detail": "At least 31 of 36 unique people committed. ACU’s final count and named adult lead assignments remain open; all 13 Sweethearts need supervised roles."
    },
    {
      "title": "Eleven specialty material lines",
      "detail": "Pickup/count Austin Creative Reuse order by October 14; confirm Boys & Girls Club itemized offer and reconcile only verified quantities."
    },
    {
      "title": "FASTSIGNS final package",
      "detail": "Upload route confirmed. Field approval October 13 must precede a single locked package upload by October 14; await revised invoice/confirmation."
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
    "October 9: Round Rock Church of Christ received the current Amazon registry; selected items and quantities are pending.",
    "October 8–9: PTA annual liability coverage paid and effective; formal COI pending.",
    "October 8: 13 Round Rock Sweethearts confirmed with Amanda Shingleton as lead; adult supervision must be assigned by PTA/school.",
    "October 8: St. Richard’s donated 86 pumpkins; Five Points approved redirecting $50 to Viking Quest rewards.",
    "October 9: FASTSIGNS upload route confirmed; final package depends on October 13 field approval and October 14 delivery."
  ],
  "blockers": [
    "School power, district audio operator, first aid/lost child, and remaining safety answers before final layout.",
    "PTA insurance certificate (coverage is effective; carrier COI pending).",
    "October 13 field approval before October 14 FASTSIGNS upload.",
    "Named adult supervision/roles for 13 Sweethearts and final ACU count.",
    "Austin Creative Reuse pickup by October 14 and physical reconciliation of 11 specialty material lines."
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
    "Close school power, audio operator, safety and field placement at October 13 walkthrough.",
    "Obtain the formal PTA insurance COI; save with event records.",
    "Pick up and count Austin Creative Reuse order by October 14.",
    "After field approval, send only the locked FASTSIGNS package through its upload route by October 14; confirm revised invoice.",
    "Receive ACU final count and assign named adult leads; place Sweethearts in supervised roles.",
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
        "label": "Committed people",
        "value": "31 / 36 minimum",
        "percent": 86,
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
        "item": "School power, audio and safety answers",
        "status": "Action needed",
        "date": "Oct 13",
        "tone": "action",
        "detail": "Field verification closes inflatable power/clearance, school audio operator, first-aid/lost-child point, and remaining campus safety rules.",
        "next": "Get school answers and approve final layout at the October 13 walkthrough."
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
        "status": "Ready",
        "date": "Oct 14",
        "tone": "action",
        "detail": "Paid bulk order is ready for pickup. Eleven specialty material lines remain open until actual quantities are counted.",
        "next": "Pick up by October 14; reconcile items against Activity Materials and avoid duplicate sourcing."
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
        "detail": "Minimum 31/36 unique people committed, including 13 Sweethearts and at least 15 ACU adults; final ACU count and named supervision remain open.",
        "next": "Assign PTA/school adult leads for Sweethearts and safety/custody roles; then place student volunteers."
      }
    ],
    "working": [
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
        "item": "Conqueror card printing",
        "status": "Sponsor path",
        "date": "Oct 16",
        "tone": "working",
        "detail": "Brittani is not printing the cards; in-kind printing fulfillment and exact quantity remain to be verified.",
        "next": "Confirm printer commitment and delivery before marking covered."
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
            "item": "Minimum committed pool",
            "detail": "31 of 36 unique people, subject to final ACU count.",
            "status": "31 / 36",
            "tone": "working"
          },
          {
            "item": "Round Rock Sweethearts",
            "detail": "13 students; Amanda Shingleton lead. Assign PTA/school adult supervision.",
            "status": "13 confirmed",
            "tone": "confirmed"
          },
          {
            "item": "Austin Christian University",
            "detail": "At least 15 adults committed; final count and named roles pending.",
            "status": "15+ committed",
            "tone": "working"
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
            "detail": "Final artwork after October 13 field approval; upload by October 14.",
            "status": "Action needed",
            "tone": "action"
          },
          {
            "item": "Conqueror cards",
            "detail": "In-kind printing fulfillment and quantity still need verification.",
            "status": "Waiting",
            "tone": "working"
          }
        ]
      },
      "layout": {
        "title": "Layout & operations",
        "description": "Internal work requiring final field and school confirmation.",
        "rows": [
          {
            "item": "October 13 field check",
            "detail": "Train, inflatable, access, clearances and sign placement.",
            "status": "Scheduled",
            "tone": "confirmed"
          },
          {
            "item": "School power, audio and safety",
            "detail": "Final school answers remain open.",
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
          }
        ]
      }
    }
  }
};

const digestToken=t=>createHash('sha256').update(String(t||'')).digest('hex');

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
    return send(res,200,STATUS);
  }catch(err){
    console.error(err);
    return send(res,500,{error:'Festival status is temporarily unavailable.'});
  }
}
