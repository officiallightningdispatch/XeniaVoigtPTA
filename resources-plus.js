(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/resources') return;
  const main=document.querySelector('#main');
  if(!main) return;

  main.innerHTML=`
    <section class="page-hero hero-soft resource-hero">
      <div class="container">
        <div class="eyebrow">Xenia Voigt Arts Academy PTA</div>
        <h1>Resources for the whole Voigt community</h1>
        <div class="squiggle" aria-hidden="true"><svg viewBox="0 0 100 20"><path d="M2 10 C12 1,22 19,34 10 S56 1,68 10 S88 1,98 10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></div>
        <p>One easy place for parents and caregivers, students, teachers and staff, and community supporters to find the links they use most.</p>
      </div>
    </section>

    <section class="section resource-hub-section">
      <div class="container">
        <div class="resource-audience-nav" role="navigation" aria-label="Resource categories">
          <a href="#families">Families</a>
          <a href="#students">Students</a>
          <a href="#staff">Teachers & Staff</a>
          <a href="#community">Community</a>
        </div>

        <div class="resource-spotlight">
          <div>
            <span class="mini-label">START HERE</span>
            <h2>Need something from Voigt or Round Rock ISD?</h2>
            <p>Use these official school and district links for the fastest route to current information.</p>
          </div>
          <div class="resource-spotlight-links">
            <a href="https://voigt.roundrockisd.org/" target="_blank" rel="noopener"><b>Voigt School Website</b><span>Campus news, attendance, counselor, lunch & more ↗</span></a>
            <a href="https://voigt.roundrockisd.org/staff" target="_blank" rel="noopener"><b>Voigt Staff Directory</b><span>Teachers, administration and campus staff ↗</span></a>
            <a href="https://www.roundrockisd.org/events" target="_blank" rel="noopener"><b>RRISD Calendar</b><span>District events and calendar information ↗</span></a>
          </div>
        </div>

        <section class="audience-block" id="families">
          <div class="audience-heading"><span class="audience-icon">👨‍👩‍👧</span><div><span class="eyebrow">PARENTS & CAREGIVERS</span><h2>Family essentials</h2><p>Quick paths to school information, PTA involvement and family support.</p></div></div>
          <div class="resource-grid expanded">
            <a class="resource-card" href="https://voigt.roundrockisd.org/" target="_blank" rel="noopener"><b>🏫</b><h3>Voigt School Hub</h3><p>Campus announcements, report an absence, counselor information, lunch resources and more.</p><span>Open official site ↗</span></a>
            <a class="resource-card" href="https://voigt.roundrockisd.org/staff" target="_blank" rel="noopener"><b>👩‍🏫</b><h3>Staff Directory</h3><p>Find teachers, administrators, support staff and campus contacts.</p><span>Find staff ↗</span></a>
            <a class="resource-card" href="https://www.roundrockisd.org/events" target="_blank" rel="noopener"><b>📅</b><h3>District Calendar</h3><p>Keep up with Round Rock ISD events, school days and district dates.</p><span>View calendar ↗</span></a>
            <a class="resource-card" href="/events"><b>🎟️</b><h3>PTA Events</h3><p>Confirmed PTA events, family experiences and upcoming dates.</p><span>See PTA events →</span></a>
            <a class="resource-card" href="/join"><b>⭐</b><h3>PTA Membership</h3><p>Support students and stay connected without a volunteer requirement.</p><span>Membership info →</span></a>
            <a class="resource-card" href="/contact"><b>💌</b><h3>Ask the PTA</h3><p>Questions, ideas or not sure where to start? We’ll help point you in the right direction.</p><span>Contact us →</span></a>
          </div>
        </section>

        <section class="audience-block" id="students">
          <div class="audience-heading"><span class="audience-icon">🎒</span><div><span class="eyebrow">STUDENTS</span><h2>Student corner</h2><p>Events, creativity, service and ways for students to be part of the community.</p></div></div>
          <div class="resource-grid expanded">
            <a class="resource-card" href="/viking-quest"><b>🍂</b><h3>Viking Quest</h3><p>See what is planned for the fall festival, including games, arts and student experiences.</p><span>Explore Viking Quest →</span></a>
            <a class="resource-card" href="/events"><b>🎉</b><h3>What’s Happening</h3><p>Find confirmed PTA events and family activities throughout the year.</p><span>View events →</span></a>
            <a class="resource-card" href="/volunteer"><b>🎨</b><h3>Student Service & Creativity</h3><p>See opportunities for student groups to support art, games and family-friendly activities.</p><span>See opportunities →</span></a>
            <a class="resource-card" href="https://voigt.roundrockisd.org/" target="_blank" rel="noopener"><b>🏫</b><h3>School Website</h3><p>Use the official Voigt site for campus information and school resources.</p><span>Visit Voigt ↗</span></a>
          </div>
        </section>

        <section class="audience-block" id="staff">
          <div class="audience-heading"><span class="audience-icon">🍎</span><div><span class="eyebrow">TEACHERS & STAFF</span><h2>Educator resources</h2><p>PTA support, collaboration, volunteer coordination and school links in one place.</p></div></div>
          <div class="resource-grid expanded">
            <a class="resource-card" href="/contact"><b>🤝</b><h3>Request PTA Support</h3><p>Share a classroom, student, staff appreciation or campus need with the PTA.</p><span>Contact PTA →</span></a>
            <a class="resource-card" href="/events"><b>📅</b><h3>PTA Event Calendar</h3><p>Check confirmed PTA dates when planning classroom and campus activities.</p><span>View events →</span></a>
            <a class="resource-card" href="/volunteer"><b>🙋</b><h3>Volunteer Coordination</h3><p>See how the PTA is organizing volunteer support for events and school needs.</p><span>Volunteer page →</span></a>
            <a class="resource-card" href="https://www.roundrockisd.org/staff" target="_blank" rel="noopener"><b>🔎</b><h3>RRISD Directory</h3><p>Search the district employee directory for departments and contacts.</p><span>Search directory ↗</span></a>
          </div>
        </section>

        <section class="audience-block" id="community">
          <div class="audience-heading"><span class="audience-icon">🌎</span><div><span class="eyebrow">COMMUNITY</span><h2>Community connections</h2><p>Ways local businesses, neighbors, alumni and supporters can connect with Voigt.</p></div></div>
          <div class="resource-grid expanded">
            <a class="resource-card" href="/fundraising"><b>🎁</b><h3>Partner With the PTA</h3><p>Learn about sponsorships, in-kind donations, silent auction support and service partnerships.</p><span>Ways to support →</span></a>
            <a class="resource-card" href="/volunteer"><b>🙌</b><h3>Volunteer</h3><p>Find flexible ways to contribute time, skills or event support.</p><span>Get involved →</span></a>
            <a class="resource-card" href="/events"><b>🎪</b><h3>Community Events</h3><p>See PTA experiences where community partners and supporters can participate.</p><span>View events →</span></a>
            <a class="resource-card" href="/contact"><b>💬</b><h3>Start a Conversation</h3><p>Have a partnership idea, resource or opportunity for Voigt? Reach out to the PTA.</p><span>Contact PTA →</span></a>
          </div>
        </section>

        <div class="resource-help-card">
          <div><span class="mini-label">CAN’T FIND IT?</span><h2>Tell us what you’re looking for.</h2><p>We want this page to become the useful community directory people actually bookmark.</p></div>
          <a class="btn primary" href="mailto:info@xeniavoigtpta.org?subject=Resource%20request">Suggest a resource</a>
        </div>
      </div>
    </section>`;
})();
