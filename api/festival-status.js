import { createHash } from 'node:crypto';
import { db, ensureSchema, send } from './_db.js';

const STATUS={
  "updatedAt": "2026-10-05",
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
      "The Voigt Longship Builders",
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
    "sourcingInventoryLines": 12,
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
      "title": "Five Points pumpkin sponsorship",
      "detail": "Five Points Board of REALTORS® explicitly committed the full $50 sponsorship on October 5 for all 86 St. Richard’s pumpkins — 80 for no-carve decorating and 6 for Pumpkin Bowling. All other pumpkin-sponsor asks are closed."
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
      "title": "Cake Walk plan",
      "detail": "Working target is 40 prize packages: 17 confirmed donated packages plus approximately 23 H-E-B bakery packages at the Oct. 22 appointment."
    },
    {
      "title": "Sensory-friendly retreat",
      "detail": "The Boys & Girls Club portable is the planned sensory-friendly retreat. No PTA-purchased sensory materials are needed."
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
      "title": "Pumpkin payment + pickup closeout",
      "detail": "Five Points Board of REALTORS® committed the full $50 sponsorship October 5, so the funding gap is closed. St. Richard’s has been asked for its preferred payment method and the October 22 pickup window; send Five Points the payment instructions when St. Richard’s replies."
    },
    {
      "title": "A+ candy handoff",
      "detail": "A+ Federal Credit Union pledged 12 Costco variety bags totaling 69 lb. Pickup is scheduled for October 22 at about 11:30 AM at the Mays Street branch; count actual pieces and capture recognition assets at handoff."
    },
    {
      "title": "Volunteer closeout",
      "detail": "Nine Round Rock Sweethearts are confirmed. A status follow-up was sent October 5 requesting the names, adult chaperone/day-of lead and any updated headcount. Cedar Ridge was also followed up October 5 for student volunteers plus an adult sponsor/chaperone. Remaining adult safety/custody leads are still open."
    },
    {
      "title": "Twelve remaining specialty material lines",
      "detail": "All true remaining specialty/consumable gaps have active source paths. October 5 follow-ups went to Round Rock Church of Christ, Big Frog, Kwalwasser, School of Rock, Lakeshore and Office Depot; fresh October 5 requests also cover medal, Conqueror-card printing, art, percussion and photo-stop material paths. AS Awards declined medals and must not be re-contacted."
    },
    {
      "title": "FASTSIGNS release",
      "detail": "A status follow-up was sent October 5 asking for the donation/discount determination plus recommended sizes/materials. Production remains on hold until the October 13 field verification locks exact placement and quantity."
    },
    {
      "title": "Boys & Girls Club operational confirmation",
      "detail": "Confirm sensory-retreat portable access/operator/hours and whether BGC still plans a trunk/booth so those can be placed on the final staffing/map packet."
    },
    {
      "title": "Board & Brush certificate",
      "detail": "The $50 digital gift certificate was accepted; receipt remains pending before final silent-auction fulfillment can be marked complete."
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
    "October 5: Five Points Board of REALTORS® committed the full $50 pumpkin sponsorship; the sponsor gap is closed and other pumpkin asks are stopped.",
    "October 5: Forest Creek Mini Storage confirmed a free 24-hour donation of the 12-foot utility trailer for the retained Viking-ship photo stop; Brittani scheduled pickup for Oct. 23 shortly after 9 AM and return for Oct. 24 morning.",
    "October 5: Austin Christian University committed a minimum of 15 student volunteers, with a final 15–20 headcount due Friday; the group is available 4:30–8:30 PM for setup, event support and teardown.",
    "October 5: status follow-ups were sent for FASTSIGNS, completion bags, Church material support, hand percussion, Lakeshore, Office Depot, Sweethearts and Cedar Ridge; same-day/new asks were not duplicated.",
    "October 5: AS Awards declined medals and BeamBalloons confirmed paid-only décor; both are closed for in-kind outreach.",
    "Planning closeout package completed Oct. 2: Final Zone Plan, Viking Quest Ops, PTA Closet Pull, Day-of Command, Family Rollout, revised Run of Show and revised Volunteer Assignments.",
    "Internal working-final event map was created and stored in the Fall Festival Drive folder.",
    "PTA closet ownership correction applied: no school authorization is required for PTA-owned closet inventory.",
    "A consolidated school closeout email was sent Oct. 2 for power, audio, first-aid/lost-child and weather/custodial/security items.",
    "All 12 remaining specialty material lines have active source paths; Alpha Print is closed/declined for completion bags.",
    "PIE principal-approval hold was removed October 2; the exact Campus Request Form was submitted and Ruth plans the requested-item pull Tuesday or Wednesday.",
    "A+ candy pickup is scheduled for October 22 at about 11:30 AM at the Mays Street branch.",
    "Five Points Board of REALTORS® is the confirmed $50 pumpkin sponsor; all other pumpkin-sponsor asks are closed."
  ],
  "blockers": [
    "School confirmation of the 12-amp/50-foot inflatable power condition.",
    "Name of the district employee responsible for the school speaker/microphone.",
    "School confirmation of first-aid/lost-child point and any weather/custodial/security requirements.",

    "St. Richard’s payment method and October 22 pumpkin pickup window.",
    "Tow vehicle, proof-of-insurance and Saturday-return instructions for the Forest Creek donation; Brittani is the confirmed pickup/return driver.",
    "Remaining adult safety/custody leads, Austin Christian University final 15–20 headcount Friday, and Sweethearts roster/chaperone/day-of contact."
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
    "Close school power/audio/first-aid/lost-child/weather/custodial/security items.",
    "Reconcile PIE quantities when Ruth completes the Tuesday/Wednesday pull; do not duplicate requested items.",
    "Finalize St. Richard’s payment method and October 22 pickup window, then send Five Points the payment instructions.",
    "Complete the scheduled A+ candy pickup October 22 at about 11:30 AM and count pieces at handoff.",
    "Receive Austin Christian University final 15–20 headcount Friday and Sweethearts roster/chaperone/day-of contact; assign adult safety/custody leads first, then student-support/setup/teardown placements.",
    "Reconcile the specialty material lines by exact confirmed quantity; close categories immediately when covered and do not re-contact Alpha Print, AS Awards, BeamBalloons or other closed/declined sources.",
    "Await the October 5 FASTSIGNS status reply and release the final production scope only after the Oct. 13 field verification."
  ],
  "budget": {
    "allocation": "$300",
    "spent": "$0",
    "goal": "$0 PTA cash spend where possible",
    "cashPledges": "$1,340"
  },
  "dashboard": {
    "metrics": [
      {
        "label": "Sponsors & Major Attractions",
        "value": "2 / 2",
        "percent": 100,
        "icon": "heart"
      },
      {
        "label": "Food Vendors",
        "value": "3 / 3",
        "percent": 100,
        "icon": "store"
      },
      {
        "label": "Committed Volunteer Pool",
        "value": "26 / 36 minimum",
        "percent": 72,
        "icon": "users"
      },
      {
        "label": "Specialty Material Lines Sourced",
        "value": "12 / 12",
        "percent": 100,
        "icon": "gift"
      },
      {
        "label": "Family Communication Plan",
        "value": "7 / 7",
        "percent": 100,
        "icon": "megaphone"
      }
    ],
    "action": [
      {
        "item": "Close school power / audio / safety items",
        "status": "Action Needed",
        "date": "ASAP / Oct 13",
        "tone": "action",
        "detail": "Internal program planning is complete. The school-side closeout is now limited to inflatable power, school PA operator, first-aid/lost-child point, and any weather/custodial/security requirements.",
        "next": "Use the Oct. 2 consolidated email and Oct. 13 walkthrough to close every remaining school-side item."
      },
      {
        "item": "Reconcile PIE fulfillment",
        "status": "Submitted / Awaiting Pull",
        "date": "Tue–Wed",
        "tone": "working",
        "detail": "The reconciled Campus Request Form was submitted October 2 and the submission was recorded. Ruth plans to pull the requested items Tuesday or Wednesday.",
        "next": "Record exact fulfilled quantities and subtract them from every matching open material line."
      },
      {
        "item": "Finalize pumpkin payment + pickup",
        "status": "Sponsor Secured",
        "date": "ASAP",
        "tone": "working",
        "detail": "Five Points committed the full $50 sponsorship October 5 for all 86 St. Richard’s pumpkins. The sponsor gap is closed.",
        "next": "Get St. Richard’s payment method and October 22 pickup window, then send Five Points the payment instructions."
      },
      {
        "item": "A+ candy pickup",
        "status": "Scheduled",
        "date": "Oct 22 · ~11:30 AM",
        "tone": "confirmed",
        "detail": "A+ pledged 12 extra-large Costco variety bags totaling 69 lb; pickup is scheduled at the Mays Street branch.",
        "next": "Pick up, count actual pieces, and record the recognition asset at handoff."
      },
      {
        "item": "Close volunteer adult leads / roster",
        "status": "Action Needed",
        "date": "Oct 16",
        "tone": "action",
        "detail": "Nine Sweethearts are confirmed and working placements are built. October 5 follow-ups requested the Sweethearts roster/chaperone/day-of lead and asked Cedar Ridge for student volunteers with an adult sponsor/chaperone; adult safety/custody leads remain open.",
        "next": "Track those October 5 replies and fill adult leads before assigning remaining student support roles."
      },
      {
        "item": "Close 12 specialty material lines",
        "status": "Action Needed",
        "date": "Oct 16",
        "tone": "action",
        "detail": "The remaining true material lines have active source paths. October 5 follow-ups/new requests cover bags, specialty Quest materials, printing, medals, percussion, art consumables and photo-stop materials. Alpha Print and AS Awards are declined/closed.",
        "next": "Track exact quantities, close each category immediately when covered, and do not duplicate same-day or declined-source outreach."
      },
      {
        "item": "Release FASTSIGNS final scope",
        "status": "Action Needed",
        "date": "Oct 13–16",
        "tone": "action",
        "detail": "Print copy and categories are defined. An October 5 status follow-up asked FASTSIGNS for its donation/discount determination and recommended production specs; production remains intentionally on hold until field verification.",
        "next": "After Oct. 13, release only final sign quantities/artwork using FASTSIGNS’ confirmed specs and authorize nothing outside current scope."
      }
    ],
    "working": [
      {
        "item": "Boys & Girls Club retreat / trunk / booth details",
        "status": "Waiting on confirmation",
        "date": "Before Oct 16",
        "tone": "working",
        "detail": "The portable is the planned sensory retreat. Operational access/operator/hours and any trunk/booth participation need final confirmation.",
        "next": "Get one concise operational confirmation from Tyla."
      },
      {
        "item": "Board & Brush $50 certificate",
        "status": "Waiting on fulfillment",
        "date": "Oct 16",
        "tone": "working",
        "detail": "The digital $50 gift certificate was accepted for the silent auction.",
        "next": "Receive the digital certificate and mark the prize fulfilled."
      },
      {
        "item": "Oct. 22 fulfillment run",
        "status": "Scheduled / coordinating",
        "date": "Oct 22",
        "tone": "working",
        "detail": "Nothing Bundt pickup is 9:00 AM, H-E-B is 10:00 AM and A+ candy is about 11:30 AM; St. Richard’s pumpkin pickup will be added once its payment method and pickup window are confirmed.",
        "next": "Keep one fulfillment route and helper plan so pickups do not conflict."
      }
    ],
    "confirmed": [
      {
        "item": "Train Quest package + Oct. 13 walkthrough",
        "status": "Confirmed / Paid",
        "date": "Oct 13",
        "tone": "confirmed",
        "detail": "AiRCO paid $1,095. Shine paid $195 and COI is received. Walkthrough is Tuesday Oct. 13 at 8:00 AM.",
        "next": "Field-verify power, placement, clearances and setup access."
      },
      {
        "item": "Five Points — all 86 pumpkins sponsored",
        "status": "Confirmed / $50 Committed",
        "date": "Oct 5",
        "tone": "confirmed",
        "detail": "Five Points Board of REALTORS® committed the full $50 for St. Richard’s 86-pumpkin package.",
        "next": "Send payment instructions when St. Richard’s confirms its preferred method and pickup window."
      },
      {
        "item": "Forest Creek — photo-stop trailer",
        "status": "Confirmed / $0 In-Kind",
        "date": "Oct 5",
        "tone": "confirmed",
        "detail": "Forest Creek Mini Storage donated a 12-foot utility trailer with 2-foot walls for 24 hours. Brittani is scheduled to pick up Oct. 23 shortly after 9:00 AM and return it Oct. 24 morning. ID, proof of insurance and a card copy are required.",
        "next": "Confirm tow vehicle/proof of insurance, 2-inch hitch/light connection and any special Saturday-return instructions."
      },
      {
        "item": "H-E-B $125 Cake Walk support",
        "status": "Confirmed",
        "date": "Oct 22",
        "tone": "confirmed",
        "detail": "H-E-B approved $125 and confirmed the Business Center appointment at 10:00 AM.",
        "next": "Shop the locked list at or under $125."
      },
      {
        "item": "Nothing Bundt Cakes — 15 Bundtlets",
        "status": "Confirmed",
        "date": "Oct 22",
        "tone": "confirmed",
        "detail": "Fifteen Bundtlet towers are confirmed for 9:00 AM pickup.",
        "next": "Pickup and stage with Cake Walk prizes."
      },
      {
        "item": "Food vendor lineup",
        "status": "Locked",
        "date": "Oct 23",
        "tone": "confirmed",
        "detail": "K&K BBQ, Hearth & Honey and Pour The Fun only; no additional vendors.",
        "next": "Operations/arrival details only."
      },
      {
        "item": "PTA closet inventory",
        "status": "Available",
        "date": "Now",
        "tone": "confirmed",
        "detail": "PTA-owned inventory is available without school authorization.",
        "next": "Physical pull/count/condition checks only."
      },
      {
        "item": "School maps / classroom restriction",
        "status": "Confirmed",
        "date": "Oct 1",
        "tone": "confirmed",
        "detail": "Grounds and interior maps are received; classroom-area doors remain closed.",
        "next": "Use only the school-provided map as the base for internal field verification."
      }
    ],
    "complete": [
      {
        "item": "Planning package built",
        "status": "Completed",
        "date": "Oct 2",
        "tone": "complete",
        "detail": "Final Zone Plan, Viking Quest Ops, PTA Closet Pull, Day-of Command, Family Rollout, Run of Show and Volunteer Assignments are built.",
        "next": "Maintain them as external confirmations arrive."
      },
      {
        "item": "Internal working-final map",
        "status": "Completed",
        "date": "Oct 2",
        "tone": "complete",
        "detail": "Annotated internal map is saved in the Fall Festival Drive folder.",
        "next": "Field-verify Oct. 13 and issue final revision if needed."
      },
      {
        "item": "Express supplies delivered to Voigt",
        "status": "Completed",
        "date": "Sep 25",
        "tone": "complete",
        "detail": "Cleanup/safety supplies are delivered.",
        "next": "Stage them during event setup."
      }
    ],
    "communications": [
      "Family-facing Fall Festival page is live with verified public details only.",
      "Candy donations remain open through October 23.",
      "A seven-touch family rollout plan is prepared through event day.",
      "Internal maps, staffing gaps, power details, funding status and vendor negotiations stay off the public website."
    ],
    "layoutOps": [
      "Train: track perimeter; batting-area/fence side used for loading/queue, field-verified Oct. 13.",
      "Inflatable: covered-area/portable zone; one 110V blower at about 12A within 50 feet, pending confirmation.",
      "Giant games: field-side lawn outside the train route; one table for Giant Jenga.",
      "Viking Quest: five-trial cluster outside train path; children may complete trials in any order, then report to Finish.",
      "General fall activities: separate cluster; no Quest initials awarded.",
      "Food/drink: back-drive spaces nearest gate; exact spaces field-verified.",
      "Trunk-or-Treat: back-drive row facing school; ADA spaces stay open.",
      "Indoor public use: approved hall/cafeteria/downstairs bathrooms only; classroom-area doors remain closed.",
      "Boys & Girls Club portable: sensory-friendly retreat.",
      "Audio: school car-rider speaker + mic; district operator still pending."
    ]
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
