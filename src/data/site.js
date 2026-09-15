export const site = {
  name: 'Xenia Voigt Arts Academy PTA',
  email: 'info@xeniavoigtpta.org',
  legacyEmail: 'voigtpta7@gmail.com',
  address: '1201 Cushing Dr, Round Rock, TX 78664',
  domain: 'xeniavoigtpta.org',
  tagline: 'Thoughtful community. Meaningful experiences. Exceptional care for every Viking.',
  affiliation: 'Xenia Voigt Arts Academy PTA is a local PTA affiliated with Texas PTA.',
  festival: {
    title: 'Viking Quest Fall Festival',
    date: 'Friday, October 23, 2026',
    time: '5:30–7:30 PM',
    location: 'Xenia Voigt Arts Academy',
    target: '2026-10-23T17:30:00-05:00',
    admission: "Admission and children's activities are planned to be free."
  }
};

export const nav = [
  ['Home','/'],['About','/about'],['Membership','/join'],['Volunteer','/volunteer'],['Events','/events'],
  ['Viking Quest','/viking-quest'],['Support','/fundraising'],['Resources','/resources'],['Contact','/contact']
];

// Confirmed 2026 PTA event dates found in the connected PTA Google Drive.
// Do not add dates here unless they are confirmed in PTA records.
export const events = [
  {
    title:'Viking Quest Fall Festival',
    date:'Friday, October 23, 2026',
    time:'5:30–7:30 PM',
    location:'Xenia Voigt Arts Academy',
    description:"A campus-wide family evening with Viking Quest activities, games, arts, food, trunk-or-treat, performances, a sensory-friendly retreat, and more.",
    href:'/viking-quest',
    featured:true
  }
];

export const festivalZones = {
  outdoor: [
    'Inflatables & Ride Zone',
    'Viking Quest Adventure Zone — Stations 1–5',
    'Games & Carnival Zone',
    'Arts Academy Zone',
    'Food Court / Food Trucks',
    'Trunk-or-Treat Zone',
    'Main Entrance + Welcome HQ'
  ],
  indoor: [
    'Cafeteria + Stage — performances and announcements',
    'Gym — Sensory-Friendly Viking Retreat',
    'Nurse’s Office — First Aid',
    'Main Office — Lost Child Area',
    'Silent Auction / PTA Hub — location to be confirmed'
  ]
};

export const stations = [
  ['01','Viking Strength','Family-friendly movement and physical challenges.'],
  ['02','Viking Wisdom','Puzzles, trivia, and brain-teaser activities.'],
  ['03','Viking Creativity','Art and maker experiences celebrating imagination.'],
  ['04','Viking Courage','Playful adventures designed to build confidence.'],
  ['05','Viking Kindness','A community-good activity centered on gratitude and helping others.'],
  ['✓','Finish Line','Complete the Quest and visit the finish-line prize area.']
];

export const portalRoles = [
  {
    key:'parent',
    title:'Family Portal',
    description:'For parents and caregivers to see family-facing events, forms, volunteer opportunities, membership information, and PTA updates.'
  },
  {
    key:'member',
    title:'PTA Member Portal',
    description:'For active PTA members, including parents who are also members, with member resources and participation information.'
  },
  {
    key:'leadership',
    title:'PTA Leadership Portal',
    description:'For authorized officers, committee leads, and event leaders. Access will be permission-based.'
  }
];