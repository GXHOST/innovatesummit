// Innovate Web Summit 2026 — static site logic. Sample data below; replace with real speakers/sessions.
(() => {
const TRACKS = [
  { name: 'AI & the Web', desc: 'Agents, AI search and conversational products on the open web.' },
  { name: 'Web Engineering', desc: 'Performance, security and architecture for apps that scale.' },
  { name: 'Product & Growth', desc: 'Design, distribution and the metrics that actually matter.' },
  { name: 'Founders & Startups', desc: 'Raising, hiring and launching from India to the world.' },
];
const SPEAKERS = [
  ['aarav','Aarav Mehta','CTO','Lumen Labs',0,'Aarav leads engineering at Lumen Labs, where his team ships AI assistants used by more than a million small businesses.'],
  ['priya','Priya Nair','Staff Engineer','Northstack',1,'Priya works on rendering performance and edge infrastructure, and maintains several open-source tools for web vitals.'],
  ['rohan','Rohan Kapoor','Founder','Kirana OS',3,'Rohan built Kirana OS from a Lucknow meetup idea into a platform serving retail stores across 40 cities.'],
  ['sana','Sana Qureshi','Head of Growth','Pathway',2,'Sana has run growth at three consumer startups and writes about community-led acquisition.'],
  ['vikram','Vikram Rao','Principal Engineer','Cloudcraft',1,'Vikram designs distributed systems and mentors early-career engineers through the Innovate Web community.'],
  ['ananya','Ananya Singh','ML Lead','Saar AI',0,'Ananya builds retrieval and evaluation pipelines for Indic-language models.'],
  ['kabir','Kabir Malhotra','Partner','Seedline Ventures',3,'Kabir invests in pre-seed developer tools and SaaS companies.'],
  ['meera','Meera Iyer','Design Director','Forma',2,'Meera leads product design and the design system team at Forma.'],
  ['arjun','Arjun Verma','Security Researcher','Independent',1,'Arjun finds and responsibly discloses vulnerabilities in web platforms, and teaches practical security.'],
  ['neha','Neha Joshi','Founder','Bolt Commerce',3,'Neha founded Bolt Commerce, a checkout platform for D2C brands.'],
  ['ishaan','Ishaan Gupta','Developer Advocate','Vertex Cloud',0,'Ishaan helps developers ship their first AI features and runs hands-on workshops.'],
  ['tara','Tara Bhatia','Product Lead','Pathway',2,'Tara leads product for Pathway’s learning platform.'],
].map(([id,name,role,company,t,bio]) => ({ id, name, role, company, track: TRACKS[t].name, bio }));
const G = 'General';
const SESSIONS = [
  ['09:00','Registration and coffee','General','Main Hall',G,[],'Pick up your badge and meet your matched attendees before the opening.'],
  ['09:45','The builder decade','Keynote','Main Hall',G,['aarav'],'Why the next ten years of the web belong to small, fast teams.'],
  ['10:30','AI agents in production web apps','Talk','Main Hall',0,['ananya'],'Evaluation, guardrails and cost control from real deployments.'],
  ['10:30','Fast by default: rendering at the edge','Talk','Hall B',1,['priya'],'Measured wins from moving rendering closer to users.'],
  ['10:30','Building fortresses: practical web security','Workshop','Workshop Room',1,['arjun'],'Hands-on: find and fix common vulnerabilities in a sample app.'],
  ['11:30','Community-led growth','Talk','Hall B',2,['sana'],'How communities compound acquisition for early products.'],
  ['11:30','From meetup idea to 40 cities','Talk','Main Hall',3,['rohan'],'The story of Kirana OS, told through its hardest decisions.'],
  ['12:30','Lunch and founder tables','General','Courtyard',G,[],'Curated tables grouped by interest and stage.'],
  ['13:30','Raising your first round in 2026','Panel','Main Hall',3,['kabir','neha','rohan'],'Investors and founders on what has changed this year.'],
  ['13:30','Ship your first AI feature','Workshop','Workshop Room',0,['ishaan'],'Bring a laptop. Leave with a working feature.'],
  ['14:30','Design systems at startup speed','Talk','Hall B',2,['meera'],'Keeping consistency without slowing down.'],
  ['14:30','Systems that survive scale','Talk','Main Hall',1,['vikram'],'Architecture patterns for the first million users.'],
  ['15:30','AI-powered search and the open web','Panel','Main Hall',0,['aarav','ananya','ishaan'],'What AI search means for discovery and publishing.'],
  ['15:30','Metrics over vanity','Talk','Hall B',2,['tara'],'Choosing the product metrics that change decisions.'],
  ['16:30','Closing and community awards','Keynote','Main Hall',G,[],'Recognising the builders who showed up for each other this year.'],
].map(([time,title,format,room,t,people,desc]) => ({ time, title, format, room, track: t===G ? G : TRACKS[t].name, people, desc }));
const TIERS = [
  { id:'student', name:'Student', price:499, note:'ID required', summary:'All talks and panels, lunch', features:['All talks and panels','Lunch and coffee','Student ID required at entry'] },
  { id:'pro', name:'Professional', price:999, note:'Most picked', summary:'Talks, panels, workshops, attendee matching', features:['All talks, panels and workshops','Lunch and coffee','Curated attendee matching before the event'] },
  { id:'founder', name:'Founder', price:1499, note:'Limited', summary:'Everything, plus founder dinner', features:['Everything in Professional','Founder dinner and private networking','Reserved seating in the Main Hall'] },
];
const TARGET = Date.parse('2026-11-27T09:00:00+05:30');

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr = n => '₹' + n.toLocaleString('en-IN');
const pad = n => String(n).padStart(2, '0');
const spk = id => SPEAKERS.find(x => x.id === id);
const ARR = '<i class="arr"></i>';

const st = { track:'All', format:'All', spTrack:'All', tier:'pro', qty:1, step:1 };

/* ---------- static sections ---------- */
$('#nav').innerHTML = [['Agenda','#/agenda'],['Speakers','#/speakers'],['Tracks','#/tracks'],['Tickets','#/tickets'],['Call for speakers','#/cfp']]
  .map(([l,h]) => `<a href="${h}">${l}</a>`).join('');
$('#why').innerHTML = [
  ['Networking','Connect with developers, founders and professionals from the ecosystem.'],
  ['Learning','Access workshops, mentoring sessions and practical learning opportunities.'],
  ['Career Growth','Discover internships, jobs and collaboration opportunities.'],
  ['Innovation','Build projects, launch ideas and grow with the community.'],
].map(([t,b],i) => `<div><div class="n">${pad(i+1)}</div><h3>${t}</h3><p>${b}</p></div>`).join('');
$('#stats').innerHTML = [['12k+','Members'],['350+','Events hosted'],['25+','Cities'],['50+','Mentors']]
  .map(([v,l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
$('#trackCards').innerHTML = TRACKS.map((t,i) => `<button class="track" data-track="${esc(t.name)}">
  <div class="top"><b>${pad(i+1)}</b><span class="muted">${SESSIONS.filter(x => x.track===t.name).length} sessions</span></div>
  <h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p><span class="go">See sessions ${ARR}</span></button>`).join('');
const spCard = s => `<button class="sp" data-sp="${s.id}"><div class="ph">speaker photo · b/w</div>
  <div class="tag-k">${esc(s.track)}</div><div class="nm">${esc(s.name)}</div><div class="rl">${esc(s.role)}, ${esc(s.company)}</div></button>`;
$('#featured').innerHTML = SPEAKERS.slice(0,4).map(spCard).join('');
const who = x => x.people.length ? x.people.map(id => spk(id).name).join(', ') : x.room;
$('#preview').innerHTML = SESSIONS.slice(0,7).filter((_,i) => i!==3 && i!==4).map(x =>
  `<div class="pv"><div class="t">${x.time}</div><div><div class="ti">${esc(x.title)}</div><div class="who">${esc(who(x))}</div></div><div class="tr">${esc(x.track)}</div></div>`).join('');
$('#gallery').innerHTML = ['g1','g2','g3','g4'].map(g =>
  `<div><img loading="lazy" class="bw" src="https://innovateweb.org/images/gallery/${g}.webp" alt="Innovate Web event"></div>`).join('');
$('#tiers').innerHTML = TIERS.map(t => { const hi = t.id==='pro'; return `<div class="tier${hi?' hi':''}">
  <div class="hd"><h3>${t.name}</h3><span class="note">${t.note}</span></div>
  <div class="price">${inr(t.price)}</div>
  <ul>${t.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
  <button class="${hi?'btn-p':'btn-d'}" data-tickets="${t.id}">Select ${t.name} ${ARR}</button></div>`; }).join('');

/* ---------- countdown ---------- */
const tick = () => {
  const d = Math.max(0, TARGET - Date.now());
  $('#countdown').innerHTML = [['Days',Math.floor(d/864e5)],['Hours',Math.floor(d/36e5)%24],['Minutes',Math.floor(d/6e4)%60],['Seconds',Math.floor(d/1e3)%60]]
    .map(([l,v]) => `<div class="cd"><b>${pad(v)}</b><span>${l}</span></div>`).join('');
};
tick(); setInterval(tick, 1000);

/* ---------- agenda + speakers pages ---------- */
const chips = (el, opts, cur, key, render) => {
  el.innerHTML = opts.map(o => `<button aria-pressed="${o===cur}">${esc(o)}</button>`).join('');
  el.querySelectorAll('button').forEach((b,i) => b.onclick = () => { st[key] = opts[i]; render(); });
};
const renderAgenda = () => {
  chips($('#trackChips'), ['All',...TRACKS.map(t => t.name)], st.track, 'track', renderAgenda);
  chips($('#formatChips'), ['All','Keynote','Talk','Panel','Workshop'], st.format, 'format', renderAgenda);
  const list = SESSIONS.filter(x => (st.track==='All' || x.track===st.track) && (st.format==='All' || x.format===st.format));
  $('#sessCount').textContent = `${list.length} of ${SESSIONS.length} sessions`;
  $('#sessions').innerHTML = list.length ? list.map(x => `<div class="sess">
    <div><div class="t">${x.time}</div><div class="muted sm">${esc(x.room)}</div></div>
    <div class="main"><div class="pills"><span class="pill f">${x.format}</span><span class="pill">${esc(x.track)}</span></div>
      <div class="ti">${esc(x.title)}</div><p>${esc(x.desc)}</p>
      <div class="people">${x.people.map(id => `<button data-sp="${id}">${esc(spk(id).name)}</button>`).join('')}</div></div></div>`).join('')
    : `<div class="empty">No sessions match these filters. <button class="link" id="clearF">Clear filters</button></div>`;
  const c = $('#clearF'); if (c) c.onclick = () => { st.track = st.format = 'All'; renderAgenda(); };
};
const renderSpeakers = () => {
  chips($('#spChips'), ['All',...TRACKS.map(t => t.name)], st.spTrack, 'spTrack', renderSpeakers);
  $('#allSpeakers').innerHTML = SPEAKERS.filter(x => st.spTrack==='All' || x.track===st.spTrack).map(spCard).join('');
};

/* ---------- routing (hash-based, works on GitHub Pages) ---------- */
const route = () => {
  const key = (location.hash.replace(/^#\/?/, '') || '').split('?')[0];
  const page = key==='agenda' || key==='speakers' ? key : 'home';
  document.querySelectorAll('[data-view]').forEach(v => v.hidden = v.dataset.view !== page);
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#/'+key));
  if (page==='agenda') renderAgenda();
  if (page==='speakers') renderSpeakers();
  const anchor = page==='home' && key && document.getElementById(key);
  requestAnimationFrame(() => anchor
    ? window.scrollTo({ top: anchor.getBoundingClientRect().top + scrollY - 70, behavior:'smooth' })
    : window.scrollTo({ top: 0, behavior: 'instant' }));
};
addEventListener('hashchange', route); route();

/* ---------- modals ---------- */
let lastFocus = null;
const openModal = m => { lastFocus = document.activeElement; m.hidden = false; document.body.style.overflow = 'hidden'; m.querySelector('[data-close]').focus(); };
const closeModal = m => { m.hidden = true; document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
document.querySelectorAll('.overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o || e.target.closest('[data-close]')) closeModal(o); });
});
addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.overlay:not([hidden])').forEach(closeModal); });

const openSpeaker = id => {
  const s = spk(id);
  $('#spTrack').textContent = s.track; $('#spName').textContent = s.name;
  $('#spRole').textContent = `${s.role}, ${s.company}`; $('#spBio').textContent = s.bio;
  $('#spSess').innerHTML = SESSIONS.filter(x => x.people.includes(id)).map(x =>
    `<div class="ms"><b>${x.time}</b><div><div class="ti">${esc(x.title)}</div><div class="muted sm">${x.format} · ${esc(x.room)}</div></div></div>`).join('');
  openModal($('#spModal'));
};

/* ticket flow — placeholder: no payment is taken */
const renderTickets = () => {
  const tier = TIERS.find(t => t.id === st.tier);
  $('#tBars').innerHTML = [1,2,3].map(n => `<i class="${n<=st.step?'on':''}"></i>`).join('');
  $('#tLabel').textContent = st.step===3 ? 'Coming soon' : `Step ${st.step} of 3`;
  $('#tTitle').textContent = ['Choose your pass','Attendee details','Sales open soon.'][st.step-1];
  [1,2,3].forEach(n => $('#tStep'+n).hidden = st.step !== n);
  $('#tierRows').innerHTML = TIERS.map(t => `<button class="trow" role="radio" aria-checked="${t.id===st.tier}" data-tier="${t.id}">
    <span class="rd"></span><span><span class="nm">${t.name}</span><span class="su">${esc(t.summary)}</span></span><span class="pr">${inr(t.price)}</span></button>`).join('');
  $('#qVal').textContent = st.qty;
  $('#tSummary').textContent = `${st.qty} × ${tier.name} pass`;
  $('#tTotal').textContent = inr(tier.price * st.qty);
  $('#tBack').hidden = st.step !== 2;
  $('#tNext').innerHTML = ['Continue','Continue','Done'][st.step-1] + ' ' + ARR;
};
const openTickets = tier => { if (tier) st.tier = tier; st.step = 1; $('#tErr').textContent = ''; renderTickets(); openModal($('#tModal')); };
$('#tierRows').addEventListener('click', e => { const r = e.target.closest('[data-tier]'); if (r) { st.tier = r.dataset.tier; renderTickets(); } });
$('#qDec').onclick = () => { st.qty = Math.max(1, st.qty-1); renderTickets(); };
$('#qInc').onclick = () => { st.qty = Math.min(10, st.qty+1); renderTickets(); };
$('#tBack').onclick = () => { st.step = 1; renderTickets(); };
$('#tNext').onclick = () => {
  if (st.step === 1) { st.step = 2; return renderTickets(); }
  if (st.step === 2) {
    if (!$('#fName').value.trim() || !/^\S+@\S+\.\S+$/.test($('#fEmail').value)) { $('#tErr').textContent = 'Enter your name and a valid email to continue.'; return; }
    $('#tErr').textContent = ''; st.step = 3; return renderTickets();
  }
  closeModal($('#tModal'));
};

/* global click delegation */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tickets]');
  if (t) { e.preventDefault(); return openTickets(t.dataset.tickets); }
  const s = e.target.closest('[data-sp]');
  if (s) return openSpeaker(s.dataset.sp);
  const tr = e.target.closest('[data-track]');
  if (tr) { st.track = tr.dataset.track; st.format = 'All'; location.hash = '#/agenda'; }
});

/* call for speakers — placeholder: prepares an email instead of storing data */
$('#cfpForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nTrack: ${f.get('track')}\nFormat: ${f.get('format')}\n\n${f.get('abstract')}`;
  $('#cfpMail').href = `mailto:hello@innovateweb.org?subject=${encodeURIComponent('Summit proposal: ' + f.get('title'))}&body=${encodeURIComponent(body)}`;
  e.target.hidden = true; $('#cfpDone').hidden = false;
});
$('#cfpReset').onclick = () => { $('#cfpDone').hidden = true; $('#cfpForm').hidden = false; };
})();
