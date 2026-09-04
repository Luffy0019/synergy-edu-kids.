/* ============================================================
   SYNERGY EDU KIDS — ERP frontend (vanilla SPA, zero deps)
   ============================================================ */
'use strict';

/* ---------------- inline SVG icon set (no external deps) ---------------- */
const I = (paths, vb) => `<svg viewBox="${vb || '0 0 24 24'}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const ICONS = {
  dashboard: I('<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>'),
  students: I('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  attendance: I('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 16l2 2 4-4"/>'),
  biometric: I('<path d="M12 11a3 3 0 0 0-3 3c0 2.5-.5 4.5-1.5 6"/><path d="M12 11a3 3 0 0 1 3 3c0 2.5.5 4.5 1.5 6"/><path d="M5 8.5A7 7 0 0 1 19 8.5"/><path d="M4 13a8 8 0 0 1 1.2-4.2M20 13a8 8 0 0 0-1.2-4.2"/><path d="M12 14v4c0 1.5-.3 2.8-.8 4"/><rect x="3" y="3" width="18" height="18" rx="3"/>'),
  fees: I('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>'),
  faculty: I('<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>'),
  notices: I('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  edit: I('<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>'),
  trash: I('<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
  x: I('<path d="M18 6L6 18M6 6l12 12"/>'),
  check: I('<path d="M20 6L9 17l-5-5"/>'),
  alert: I('<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'),
  lock: I('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
  logout: I('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>'),
  menu: I('<path d="M3 6h18M3 12h18M3 18h18"/>'),
  collapse: I('<path d="M15 18l-6-6 6-6"/>'),
  camera: I('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>'),
  send: I('<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>'),
  refresh: I('<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/>'),
  eye: I('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'),
  inr: I('<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3M9 13c6.7 0 6.7-10 0-10"/>'),
};

/* ---------------- tiny helpers ---------------- */
const $ = (sel, el) => (el || document).querySelector(sel);
const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const inr = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(n) || 0);
const fmtDate = (iso) => { try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return iso; } };
const fmtTime = (iso) => { try { return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } };
const fmtDateTime = (iso) => { try { const d = new Date(iso); return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ', ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); } catch (e) { return iso; } };
const AVATAR_SHADES = ['', 'sky', 'green', 'violet', 'rose'];
const avatarClass = (name) => AVATAR_SHADES[(String(name || '?').charCodeAt(0) || 0) % AVATAR_SHADES.length];
const initials = (name) => String(name || '?').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
const GRADES = ['Pre-K', 'Nursery', 'LKG', 'UKG', 'Kindergarten'];
const WINGS = ['Lotus Wing', 'Peacock Wing', 'Banyan Wing', 'Marigold Wing'];

/* ---------------- state ---------------- */
const state = {
  user: null,
  token: localStorage.getItem('sek_token') || null,
  view: 'dashboard',
  dashboard: null,
  students: [],
  fees: null,
  faculty: [],
  attendance: null,
  attDate: new Date().toISOString().slice(0, 10),
  checkins: [],
  notices: [],
  filters: { q: '', grade: '', wing: '' },
  bioStream: null,
  bioScanning: false,
};
const isOwner = () => state.user && state.user.role === 'owner';

/* ---------------- API layer ---------------- */
async function api(path, opts) {
  opts = opts || {};
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  if (state.token) headers['x-session-token'] = state.token;
  let res;
  try {
    res = await fetch(path, Object.assign({}, opts, { headers }));
  } catch (e) {
    throw new Error('Server unreachable. Is the ERP server running?');
  }
  let data = {};
  try { data = await res.json(); } catch (e) { /* empty */ }
  if (res.status === 401) { logout(true); throw new Error(data.error || 'Session expired. Please sign in again.'); }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

/* ---------------- toast ---------------- */
function toast(msg, type) {
  type = type || 'info';
  const root = $('#toast-root');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icon = type === 'success' ? ICONS.check : type === 'error' ? ICONS.alert : ICONS.send;
  el.innerHTML = `${icon}<div>${msg}</div>`;
  root.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 3600);
}

/* ---------------- modal ---------------- */
function openModal(title, bodyHTML, opts) {
  opts = opts || {};
  closeModal(true);
  const root = $('#modal-root');
  const wrap = document.createElement('div');
  wrap.className = 'modal-backdrop';
  wrap.id = 'modal-backdrop';
  wrap.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="modal-head"><h3>${esc(title)}</h3>
        <button class="icon-btn" id="modal-close" aria-label="Close">${ICONS.x}</button></div>
      <div class="modal-body">${bodyHTML}</div>
    </div>`;
  root.appendChild(wrap);
  requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add('show')));
  const close = () => closeModal();
  $('#modal-close', wrap).addEventListener('click', close);
  wrap.addEventListener('mousedown', (e) => { if (e.target === wrap) close(); });
  document.addEventListener('keydown', escClose);
  if (opts.onMount) opts.onMount(wrap);
  return wrap;
}
function escClose(e) { if (e.key === 'Escape') closeModal(); }
function closeModal(instant) {
  document.removeEventListener('keydown', escClose);
  const wrap = $('#modal-backdrop');
  if (!wrap) return;
  if (instant) { wrap.remove(); return; }
  wrap.classList.remove('show');
  setTimeout(() => wrap.remove(), 180);
}
const field = (label, inner, full) => `<label class="field ${full ? 'full' : ''}"><span>${label}</span>${inner}</label>`;
const input = (name, val, attrs) => `<input name="${name}" value="${esc(val == null ? '' : val)}" ${attrs || ''} />`;

/* ---------------- auth ---------------- */
function setSession(token, user) {
  state.token = token; state.user = user;
  if (token) localStorage.setItem('sek_token', token);
  else localStorage.removeItem('sek_token');
}
function logout(silent) {
  if (state.token && !silent) api('/api/auth/logout', { method: 'POST' }).catch(() => {});
  stopCamera();
  setSession(null, null);
  $('#app').classList.add('hidden');
  $('#login-screen').classList.remove('hidden');
}

async function boot() {
  wireLogin();
  if (state.token) {
    try {
      const { user } = await api('/api/auth/me');
      state.user = user;
      enterApp();
      return;
    } catch (e) { setSession(null, null); }
  }
  $('#app').classList.add('hidden');
  $('#login-screen').classList.remove('hidden');
}

function wireLogin() {
  let role = 'owner';
  $$('.role-tab').forEach((b) => b.addEventListener('click', () => {
    $$('.role-tab').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    role = b.dataset.roleTab;
    $('#login-email').value = role === 'owner' ? 'owner@synergy.edu' : 'ananya.iyer@synergy.edu';
    $('#login-pass').value = role === 'owner' ? 'owner123' : 'teacher123';
  }));
  $$('[data-demo]').forEach((b) => b.addEventListener('click', () => {
    const [em, pw] = b.dataset.demo.split('|');
    $('#login-email').value = em; $('#login-pass').value = pw;
    $('#login-form').requestSubmit();
  }));
  $('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('#login-btn'), err = $('#login-error');
    err.hidden = true; btn.disabled = true; btn.textContent = 'Signing in…';
    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: $('#login-email').value, password: $('#login-pass').value }),
      });
      setSession(data.token, data.user);
      enterApp();
      toast(`Welcome back, ${esc(data.user.name.split(' ')[0])}! Signed in as ${data.user.role === 'owner' ? 'Owner' : 'Faculty'}.`, 'success');
    } catch (ex) { err.textContent = ex.message; err.hidden = false; }
    btn.disabled = false; btn.textContent = 'Sign in securely';
  });
}

function enterApp() {
  $('#login-screen').classList.add('hidden');
  $('#app').classList.remove('hidden');
  renderShell();
  showView('dashboard');
  startClock();
}

/* ---------------- shell ---------------- */
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', sub: 'Institution overview & live pulse' },
  { id: 'students', label: 'Students (SIS)', icon: 'students', sub: 'Enroll, update, wings & records' },
  { id: 'attendance', label: 'Attendance', icon: 'attendance', badge: () => state.attendance ? state.attendance.summary.absent : 0, badgeCls: '', sub: 'Live register with instant summary' },
  { id: 'biometric', label: 'Biometric Check-in', icon: 'biometric', sub: 'Optical faculty check-in via camera' },
  { id: 'fees', label: 'Fee Ledger', icon: 'fees', badge: () => state.fees ? state.fees.summary.overdue : 0, badgeCls: 'amber', sub: 'Reconciliation, balances & status' },
  { id: 'faculty', label: 'Faculty', icon: 'faculty', sub: 'Teaching staff records' },
  { id: 'notices', label: 'Notice Board', icon: 'notices', badge: () => state.notices.filter((n) => n.published).length, badgeCls: 'amber', sub: 'School-wide circulars & broadcasts' },
];

function renderShell() {
  const u = state.user;
  $('#side-avatar').textContent = u.avatar || initials(u.name);
  $('#side-avatar').className = 'avatar ' + avatarClass(u.name);
  $('#side-username').textContent = u.name;
  const roleHtml = `<span class="role-pill ${u.role}">${u.role === 'owner' ? 'Owner · Super-Admin' : 'Faculty'}</span>`;
  $('#side-role').outerHTML = roleHtml.replace('class="role-pill', 'id="side-role" class="role-pill');
  $('#top-role').outerHTML = roleHtml.replace('class="role-pill', 'id="top-role" class="role-pill');
  $('#logout-btn').innerHTML = `${ICONS.logout} Sign out`;
  $('#top-logout').innerHTML = ICONS.logout;
  $('#collapse-btn').innerHTML = ICONS.collapse;
  $('#mobile-nav-btn').innerHTML = ICONS.menu;
  renderNav();
  $('#logout-btn').onclick = () => logout();
  $('#top-logout').onclick = () => logout();
  $('#collapse-btn').onclick = () => $('#app').classList.toggle('side-collapsed');
  $('#mobile-nav-btn').onclick = () => $('#app').classList.toggle('nav-open');
}

function renderNav() {
  const nav = $('#side-nav');
  nav.innerHTML = NAV.map((n) => {
    const count = n.badge ? n.badge() : 0;
    return `<button class="nav-item ${state.view === n.id ? 'active' : ''}" data-nav="${n.id}" title="${esc(n.label)}">
      ${ICONS[n.icon]}<span class="nav-text">${esc(n.label)}</span>
      ${count > 0 ? `<span class="nav-badge ${n.badgeCls || ''}">${count}</span>` : ''}
    </button>`;
  }).join('');
  $$('[data-nav]', nav).forEach((b) => b.addEventListener('click', () => {
    $('#app').classList.remove('nav-open');
    showView(b.dataset.nav);
  }));
}

function startClock() {
  const tick = () => {
    try {
      $('#live-clock').textContent = new Date().toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    } catch (e) { /* noop */ }
  };
  tick(); setInterval(tick, 1000);
}

function showView(id) {
  stopCamera();
  state.view = id;
  const meta = NAV.find((n) => n.id === id);
  $('#page-title').textContent = meta ? meta.label : id;
  $('#page-sub').textContent = meta ? meta.sub : '';
  renderNav();
  $('#view').innerHTML = `<div class="empty">${I('<circle cx="12" cy="12" r="9"/>', )} <p>Loading…</p></div>`;
  VIEWS[id]().catch((e) => {
    $('#view').innerHTML = `<div class="panel glass"><div class="empty">${ICONS.alert}<h4>Couldn’t load this section</h4><p>${esc(e.message)}</p><button class="btn btn-sm" onclick="window.location.reload()">Retry</button></div></div>`;
  });
  $('#view').scrollIntoView({ block: 'start' });
  window.scrollTo({ top: 0 });
}

/* ============================================================
   VIEW: Dashboard
   ============================================================ */
async function vDashboard() {
  const [dash, att, fees, chk, notices] = await Promise.all([
    api('/api/dashboard'),
    api(`/api/attendance?date=${state.attDate}`),
    api('/api/fees'),
    api('/api/checkins'),
    api('/api/notices'),
  ]);
  state.dashboard = dash; state.attendance = att; state.fees = fees; state.checkins = chk.logs; state.notices = notices.notices;
  renderNav();
  const cards = [
    { cls: '', icon: 'students', label: 'Total Scholars', val: dash.students, sub: 'Pre-K → Kindergarten', ic: 'var(--accent)' },
    { cls: 'gn', icon: 'attendance', label: 'Present Today', val: `${dash.attendancePct}%`, sub: `${dash.presentToday} present · ${dash.absentToday} absent`, ic: 'var(--green)' },
    { cls: 'sk', icon: 'inr', label: 'Fees Collected', val: inr(dash.feesCollected), sub: `${inr(dash.feesPending)} pending · ${dash.overdueCount} overdue`, ic: 'var(--sky)' },
    { cls: 'vt', icon: 'faculty', label: 'Faculty On Campus', val: `${dash.checkedInToday}/${dash.facultyCount}`, sub: 'Optical check-ins today', ic: 'var(--violet)' },
  ];
  const recentLogs = state.checkins.slice(0, 5);
  const overdue = fees.ledger.filter((f) => f.status === 'Overdue').slice(0, 5);
  const live = notices.notices.filter((n) => n.published).slice(0, 3);
  $('#view').innerHTML = `
    <div class="stat-grid">
      ${cards.map((c) => `<div class="stat-card glass ${c.cls}">
        <div class="stat-top"><span>${c.label}</span><div class="stat-ico" style="color:${c.ic}">${ICONS[c.icon]}</div></div>
        <div class="stat-val">${c.val}</div><div class="stat-sub">${esc(c.sub)}</div>
      </div>`).join('')}
    </div>
    <div class="grid-2">
      <div class="panel glass">
        <div class="panel-head"><div><h3>Today’s Attendance Pulse</h3><p>${fmtDate(state.attDate)} · live register</p></div>
          <button class="btn btn-sm" data-go="attendance">Open register</button></div>
        <div class="panel-body">
          <div class="summary-strip">
            <div class="summary-chip glass-soft"><strong class="text-green">${att.summary.present}</strong><span>Present</span></div>
            <div class="summary-chip glass-soft"><strong class="text-red">${att.summary.absent}</strong><span>Absent</span></div>
            <div class="summary-chip glass-soft"><strong>${att.summary.unmarked}</strong><span>Unmarked</span></div>
          </div>
          <div class="progress"><div style="width:${att.summary.pct}%"></div></div>
          <p class="text-muted" style="font-size:12.5px;margin-top:8px">${att.summary.pct}% attendance today</p>
        </div>
      </div>
      <div class="panel glass">
        <div class="panel-head"><div><h3>Faculty On Campus</h3><p>Optical biometric check-ins · ${fmtDate(state.attDate)}</p></div>
          <button class="btn btn-sm" data-go="biometric">Check-in</button></div>
        <div class="panel-body">
          ${recentLogs.length ? `<div class="dash-list">${recentLogs.map((c) => `
            <div class="dash-row glass-soft"><div class="avatar ${avatarClass(c.facultyName)}">${initials(c.facultyName)}</div>
              <div><div class="cell-main">${esc(c.facultyName)}</div><div class="cell-sub">${esc(c.title || '')} · ${c.confidence}% match</div></div>
              <time>${fmtTime(c.timestamp)}</time></div>`).join('')}</div>`
            : `<div class="empty">${ICONS.biometric}<h4>No check-ins yet</h4><p>Faculty can check in from the Biometric module.</p></div>`}
        </div>
      </div>
      <div class="panel glass">
        <div class="panel-head"><div><h3>Fee Watchlist</h3><p>${fees.summary.overdue} overdue · ${inr(fees.summary.pending)} pending</p></div>
          <button class="btn btn-sm" data-go="fees">Open ledger</button></div>
        <div class="panel-body">
          ${overdue.length ? `<div class="dash-list">${overdue.map((f) => `
            <div class="dash-row glass-soft"><div class="avatar ${avatarClass(f.studentName)}">${initials(f.studentName)}</div>
              <div><div class="cell-main">${esc(f.studentName)}</div><div class="cell-sub">${esc(f.grade)} · ${esc(f.admissionNo)}</div></div>
              <div class="right"><span class="tag overdue"><span class="dot"></span>Overdue</span><div class="cell-sub fee-amt">${inr(f.balance)} due</div></div></div>`).join('')}</div>`
            : `<div class="empty">${ICONS.check}<h4>All clear!</h4><p>Every scholar’s fees are cleared.</p></div>`}
        </div>
      </div>
      <div class="panel glass">
        <div class="panel-head"><div><h3>Live Circulars</h3><p>Broadcast on the notice board</p></div>
          <button class="btn btn-sm" data-go="notices">View board</button></div>
        <div class="panel-body">
          <div class="dash-list">${live.map((n) => `
            <div class="dash-row glass-soft"><div class="stat-ico" style="color:var(--accent)">${ICONS.notices}</div>
              <div><div class="cell-main">${esc(n.title)}</div><div class="cell-sub">${esc(n.audience)} · ${fmtDate(n.createdAt)}</div></div>
              <span class="right tag ${n.priority.toLowerCase()}">${esc(n.priority)}</span></div>`).join('') || `<div class="empty">${ICONS.notices}<h4>No live circulars</h4></div>`}
          </div>
        </div>
      </div>
    </div>`;
  $$('[data-go]').forEach((b) => b.addEventListener('click', () => showView(b.dataset.go)));
}

/* ============================================================
   VIEW: Students (SIS)
   ============================================================ */
async function vStudents() {
  const { students } = await api('/api/students');
  state.students = students;
  const owner = isOwner();
  const f = state.filters;
  const render = () => {
    const q = f.q.trim().toLowerCase();
    const rows = state.students.filter((s) =>
      (!q || (s.name + ' ' + s.admissionNo + ' ' + s.parentName).toLowerCase().includes(q)) &&
      (!f.grade || s.grade === f.grade) && (!f.wing || s.wing === f.wing));
    $('#view').innerHTML = `
      ${owner ? '' : `<div class="lock-note">${ICONS.lock}<span>Faculty view — read-only. You can mark attendance and check in, but student records are managed by the Owner.</span></div>`}
      <div class="panel glass">
        <div class="panel-head">
          <div><h3>Student Information System</h3><p>${state.students.length} scholars enrolled · ${rows.length} shown</p></div>
          <div class="panel-actions">
            ${owner ? `<button class="btn btn-primary btn-sm" id="add-student">${ICONS.plus} Enroll scholar</button>` : ''}
          </div>
        </div>
        <div class="panel-body">
          <div class="toolbar" style="margin-bottom:14px">
            <div class="search-box">${ICONS.search}<input id="st-q" placeholder="Search name, admission no, parent…" value="${esc(f.q)}" /></div>
            <select id="st-grade" class="filter-select"><option value="">All grades</option>${GRADES.map((g) => `<option ${f.grade === g ? 'selected' : ''}>${g}</option>`).join('')}</select>
            <select id="st-wing" class="filter-select"><option value="">All wings</option>${WINGS.map((w) => `<option ${f.wing === w ? 'selected' : ''}>${w}</option>`).join('')}</select>
          </div>
          <div class="table-wrap"><table class="data"><thead><tr>
            <th>Scholar</th><th>Grade / Wing</th><th>Parent / Contact</th><th>Enrolled</th>
            ${owner ? '<th style="text-align:right">Manage</th>' : ''}
          </tr></thead><tbody>
          ${rows.map((s) => `<tr>
            <td><div style="display:flex;gap:10px;align-items:center"><div class="avatar ${avatarClass(s.name)}">${initials(s.name)}</div>
              <div><div class="cell-main">${esc(s.name)}</div><div class="cell-sub">${esc(s.admissionNo)} · ${esc(s.gender)}${s.dob ? ' · ' + fmtDate(s.dob) : ''}</div></div></div></td>
            <td><span class="tag grade">${esc(s.grade)}</span><div class="cell-sub" style="margin-top:4px">${esc(s.wing)}</div></td>
            <td><div class="cell-main" style="font-weight:600">${esc(s.parentName || '—')}</div><div class="cell-sub">${esc(s.relation || '')} · ${esc(s.parentPhone || '—')}</div></td>
            <td class="text-muted">${s.enrolledOn ? fmtDate(s.enrolledOn) : '—'}</td>
            ${owner ? `<td><div class="row-actions">
              <button class="icon-btn" data-edit="${s.id}" title="Edit ${esc(s.name)}">${ICONS.edit}</button>
              <button class="icon-btn danger" data-del="${s.id}" title="Delete record">${ICONS.trash}</button>
            </div></td>` : ''}
          </tr>`).join('') || `<tr><td colspan="6"><div class="empty">${ICONS.students}<h4>No scholars found</h4><p>Try a different search, or enroll a new scholar.</p></div></td></tr>`}
          </tbody></table></div>
        </div>
      </div>`;
    $('#st-q').addEventListener('input', (e) => { f.q = e.target.value; const pos = e.target.selectionStart; render(); const el = $('#st-q'); el.focus(); el.setSelectionRange(pos, pos); });
    $('#st-grade').addEventListener('change', (e) => { f.grade = e.target.value; render(); });
    $('#st-wing').addEventListener('change', (e) => { f.wing = e.target.value; render(); });
    const add = $('#add-student'); if (add) add.addEventListener('click', () => studentModal(null, render));
    $$('[data-edit]').forEach((b) => b.addEventListener('click', () => {
      const s = state.students.find((x) => x.id === b.dataset.edit);
      if (s) studentModal(s, render);
    }));
    $$('[data-del]').forEach((b) => b.addEventListener('click', () => {
      const s = state.students.find((x) => x.id === b.dataset.del);
      if (s) confirmDeleteStudent(s, render);
    }));
  };
  render();
}

function studentModal(s, rerender) {
  const isNew = !s;
  s = s || { grade: 'Nursery', wing: 'Lotus Wing', gender: 'Boy', relation: 'Father' };
  const m = openModal(isNew ? 'Enroll new scholar' : `Edit — ${s.name}`, `
    <form id="st-form"><div class="form-grid">
      ${field('Full name *', input('name', s.name, 'required placeholder="e.g. Aarav Patel"'))}
      ${field('Admission no.', input('admissionNo', s.admissionNo, isNew ? 'placeholder="Auto-generated"' : ''))}
      ${field('Grade *', `<select name="grade">${GRADES.map((g) => `<option ${s.grade === g ? 'selected' : ''}>${g}</option>`).join('')}</select>`)}
      ${field('Class wing *', `<select name="wing">${WINGS.map((w) => `<option ${s.wing === w ? 'selected' : ''}>${w}</option>`).join('')}</select>`)}
      ${field('Gender', `<select name="gender">${['Boy', 'Girl'].map((g) => `<option ${s.gender === g ? 'selected' : ''}>${g}</option>`).join('')}</select>`)}
      ${field('Date of birth', input('dob', s.dob || '', 'type="date"'))}
      ${field('Parent / guardian *', input('parentName', s.parentName, 'required placeholder="e.g. Rajesh Patel"'))}
      ${field('Relation', `<select name="relation">${['Father', 'Mother', 'Guardian'].map((g) => `<option ${s.relation === g ? 'selected' : ''}>${g}</option>`).join('')}</select>`)}
      ${field('Parent phone *', input('parentPhone', s.parentPhone, 'required placeholder="+91 …"'))}
      ${field('Address', input('address', s.address, 'placeholder="Area, City"'), true)}
      ${isNew ? field('Annual fee (₹)', input('feeTotal', '', 'type="number" min="0" placeholder="Auto by grade"'), true) : ''}
    </div>
    <div class="modal-foot">
      <button type="button" class="btn btn-ghost" id="m-cancel">Cancel</button>
      <button type="submit" class="btn btn-primary">${isNew ? 'Enroll scholar' : 'Save changes'}</button>
    </div></form>`, {
    onMount(wrap) {
      $('#m-cancel', wrap).addEventListener('click', () => closeModal());
      $('#st-form', wrap).addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        try {
          if (isNew) {
            const { student } = await api('/api/students', { method: 'POST', body: JSON.stringify(fd) });
            state.students.push(student);
            toast(`${esc(student.name)} enrolled with admission no. ${esc(student.admissionNo)}.`, 'success');
          } else {
            const { student } = await api(`/api/students/${s.id}`, { method: 'PUT', body: JSON.stringify(fd) });
            Object.assign(s, student);
            toast(`Record updated for ${esc(student.name)}.`, 'success');
          }
          closeModal(); rerender(); renderNav();
        } catch (ex) { toast(exc(ex), 'error'); }
      });
    },
  });
  return m;
}

function confirmDeleteStudent(s, rerender) {
  openModal(`Delete record — ${s.name}?`, `
    <p style="font-size:13.5px;color:#c6cfdf;line-height:1.6">This permanently removes <strong>${esc(s.name)}</strong> (${esc(s.admissionNo)}), including fee ledger entries and attendance history. This cannot be undone.</p>
    <div class="modal-foot">
      <button class="btn btn-ghost" id="m-cancel">Keep record</button>
      <button class="btn btn-danger" id="m-del">Delete permanently</button>
    </div>`, {
    onMount(wrap) {
      $('#m-cancel', wrap).addEventListener('click', () => closeModal());
      $('#m-del', wrap).addEventListener('click', async (e) => {
        e.target.disabled = true;
        // optimistic removal
        const idx = state.students.findIndex((x) => x.id === s.id);
        const [gone] = state.students.splice(idx, 1);
        closeModal(); rerender();
        try {
          await api(`/api/students/${s.id}`, { method: 'DELETE' });
          toast(`Record deleted for ${esc(gone.name)}.`, 'success');
          const f = await api('/api/fees'); state.fees = f; renderNav();
        } catch (ex) { state.students.splice(idx, 0, gone); rerender(); toast(exc(ex), 'error'); }
      });
    },
  });
}

/* ============================================================
   VIEW: Attendance
   ============================================================ */
async function vAttendance() {
  const data = await api(`/api/attendance?date=${state.attDate}`);
  state.attendance = data;
  if (!state.students.length) state.students = (await api('/api/students')).students;
  renderNav();
  const sMap = Object.fromEntries(state.students.map((s) => [s.id, s]));
  const paint = () => {
    const a = state.attendance;
    $('#view').innerHTML = `
      <div class="panel glass">
        <div class="panel-head">
          <div><h3>Live Attendance Register</h3><p>Tap a toggle — summary updates instantly (optimistic)</p></div>
          <div class="panel-actions">
            <input type="date" id="att-date" class="filter-select" value="${a.date}" max="${new Date().toISOString().slice(0, 10)}" />
            <button class="btn btn-green btn-sm" id="all-present">All present</button>
            <button class="btn btn-danger btn-sm" id="all-absent">All absent</button>
          </div>
        </div>
        <div class="panel-body">
          <div class="summary-strip">
            <div class="summary-chip glass-soft"><strong class="text-green" id="sum-present">${a.summary.present}</strong><span>Present</span></div>
            <div class="summary-chip glass-soft"><strong class="text-red" id="sum-absent">${a.summary.absent}</strong><span>Absent</span></div>
            <div class="summary-chip glass-soft"><strong id="sum-unmarked">${a.summary.unmarked}</strong><span>Unmarked</span></div>
            <div class="summary-chip glass-soft"><strong id="sum-pct">${a.summary.pct}%</strong><span>Attendance</span></div>
          </div>
          <div class="progress" style="margin:0 0 14px"><div id="sum-bar" style="width:${a.summary.pct}%"></div></div>
          <div class="table-wrap"><table class="data"><thead><tr>
            <th>Scholar</th><th>Grade / Wing</th><th>Status</th><th style="text-align:right">Mark</th>
          </tr></thead><tbody>
          ${a.rows.map((r) => { const s = sMap[r.studentId]; if (!s) return ''; return `<tr>
            <td><div style="display:flex;gap:10px;align-items:center"><div class="avatar ${avatarClass(s.name)}">${initials(s.name)}</div>
              <div><div class="cell-main">${esc(s.name)}</div><div class="cell-sub">${esc(s.admissionNo)}</div></div></div></td>
            <td><span class="tag grade">${esc(s.grade)}</span> <span class="tag wing">${esc(s.wing)}</span></td>
            <td id="st-${r.studentId}">${statusTag(r.status)}</td>
            <td><div class="row-actions"><div class="att-toggle" role="group" aria-label="Mark ${esc(s.name)}">
              <button data-mark="present" data-sid="${r.studentId}" class="${r.status === 'present' ? 'on-present' : ''}">Present</button>
              <button data-mark="absent" data-sid="${r.studentId}" class="${r.status === 'absent' ? 'on-absent' : ''}">Absent</button>
            </div></div></td></tr>`; }).join('') || `<tr><td colspan="4"><div class="empty">${ICONS.students}<h4>No scholars enrolled</h4></div></td></tr>`}
          </tbody></table></div>
        </div>
      </div>`;
    $('#att-date').addEventListener('change', async (e) => {
      state.attDate = e.target.value;
      await vAttendance();
    });
    $('#all-present').addEventListener('click', () => bulkMark('present'));
    $('#all-absent').addEventListener('click', () => bulkMark('absent'));
    $$('[data-mark]').forEach((b) => b.addEventListener('click', () => toggleAttend(b.dataset.sid, b.dataset.mark, b)));
  };
  const recompute = () => {
    const rows = state.attendance.rows;
    const p = rows.filter((r) => r.status === 'present').length;
    const ab = rows.filter((r) => r.status === 'absent').length;
    state.attendance.summary = { total: rows.length, present: p, absent: ab, unmarked: rows.length - p - ab, pct: rows.length ? Math.round((p / rows.length) * 100) : 0 };
    const s = state.attendance.summary;
    $('#sum-present').textContent = s.present; $('#sum-absent').textContent = s.absent;
    $('#sum-unmarked').textContent = s.unmarked; $('#sum-pct').textContent = s.pct + '%';
    $('#sum-bar').style.width = s.pct + '%';
    renderNav();
  };
  const toggleAttend = async (sid, status, btn) => {
    const row = state.attendance.rows.find((r) => r.studentId === sid);
    const prev = row.status;
    row.status = status; // optimistic
    btn.parentElement.querySelectorAll('button').forEach((x) => x.classList.remove('on-present', 'on-absent'));
    btn.classList.add(status === 'present' ? 'on-present' : 'on-absent');
    $(`#st-${CSS.escape(sid)}`).innerHTML = statusTag(status);
    recompute();
    try {
      await api('/api/attendance', { method: 'POST', body: JSON.stringify({ date: state.attendance.date, studentId: sid, status }) });
    } catch (ex) {
      row.status = prev; paint(); toast(exc(ex), 'error');
    }
  };
  const bulkMark = async (status) => {
    const prev = state.attendance.rows.map((r) => r.status);
    state.attendance.rows.forEach((r) => (r.status = status));
    paint(); // optimistic full repaint
    try {
      await api('/api/attendance/mark-all', { method: 'POST', body: JSON.stringify({ date: state.attDate, status }) });
      toast(`Entire register marked ${status}.`, 'success');
    } catch (ex) {
      state.attendance.rows.forEach((r, i) => (r.status = prev[i]));
      paint(); toast(exc(ex), 'error');
    }
  };
  paint();
}
const statusTag = (s) => s === 'present' ? `<span class="tag present"><span class="dot"></span>Present</span>`
  : s === 'absent' ? `<span class="tag absent"><span class="dot"></span>Absent</span>`
  : `<span class="tag unmarked"><span class="dot"></span>Unmarked</span>`;

/* ============================================================
   VIEW: Biometric check-in
   ============================================================ */
async function vBiometric() {
  const [{ logs }, { faculty }] = await Promise.all([api('/api/checkins'), api('/api/faculty')]);
  state.checkins = logs; state.faculty = faculty;
  const meFac = state.user.role === 'faculty' ? state.user : null;
  const paint = () => {
    $('#view').innerHTML = `
      <div class="bio-grid">
        <div class="panel glass">
          <div class="panel-head"><div><h3>Optical Biometric Check-in</h3><p>Live camera · anti-spoof targeting HUD · timestamped log</p></div></div>
          <div class="panel-body">
            <div class="cam-stage">
              <video id="bio-video" playsinline muted hidden></video>
              <div class="cam-off" id="bio-off">${ICONS.camera}<div>Camera is off.<br/>Start the optical sensor to begin check-in.</div></div>
              <div class="hud" id="bio-hud" hidden>
                <div class="hud-corner tl"></div><div class="hud-corner tr"></div>
                <div class="hud-corner bl"></div><div class="hud-corner br"></div>
                <div class="hud-oval"></div><div class="hud-scan"></div>
                <div class="hud-status warn" id="bio-status">Align face in frame</div>
              </div>
            </div>
            ${meFac ? '' : `<div class="toolbar" style="margin-top:12px">
              <select id="bio-fac" class="filter-select" style="flex:1">
                ${state.faculty.map((fm) => `<option value="${fm.id}">${esc(fm.name)} — ${esc(fm.title || '')}</option>`).join('')}
              </select></div>`}
            ${meFac ? `<p class="text-muted" style="font-size:12.5px;margin-top:12px">Checking in as <strong>${esc(meFac.name)}</strong> (${esc(meFac.title || 'Faculty')})</p>` : ''}
            <div class="bio-controls">
              <button class="btn btn-sky btn-sm" id="bio-start">${ICONS.camera} Start camera</button>
              <button class="btn btn-green btn-sm" id="bio-scan" disabled>Scan &amp; check in</button>
              <button class="btn btn-ghost btn-sm" id="bio-sim">Simulate scan</button>
              <button class="btn btn-ghost btn-sm" id="bio-stop" disabled>Stop</button>
            </div>
            <p class="text-muted" style="font-size:12px;margin-top:10px">Camera access uses <code>navigator.mediaDevices.getUserMedia</code> and stays on-device. If no camera is available, use “Simulate scan”.</p>
          </div>
        </div>
        <div class="panel glass">
          <div class="panel-head"><div><h3>Today’s Check-in Log</h3><p>${state.checkins.length} entr${state.checkins.length === 1 ? 'y' : 'ies'} · auto timestamps</p></div></div>
          <div class="panel-body"><div class="log-list" id="bio-log">
            ${logHTML() || `<div class="empty">${ICONS.biometric}<h4>No check-ins yet today</h4><p>Start the camera and scan to log the first entry.</p></div>`}
          </div></div>
        </div>
      </div>`;
    $('#bio-start').addEventListener('click', startCamera);
    $('#bio-stop').addEventListener('click', stopCameraUI);
    $('#bio-scan').addEventListener('click', () => runScan(false));
    $('#bio-sim').addEventListener('click', () => runScan(true));
  };
  const logHTML = () => state.checkins.map((c) => `
    <div class="log-item glass-soft"><div class="avatar ${avatarClass(c.facultyName)}">${initials(c.facultyName)}</div>
      <div><div class="cell-main">${esc(c.facultyName)}</div>
        <div class="cell-sub">Optical · ${c.confidence}% liveness match</div>
        <div class="conf-bar"><div style="width:${c.confidence}%"></div></div></div>
      <time>${fmtTime(c.timestamp)}</time></div>`).join('');

  const startCamera = async () => {
    const video = $('#bio-video'), off = $('#bio-off'), hud = $('#bio-hud');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast('This browser blocked camera access. Use “Simulate scan”.', 'error');
      return;
    }
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      state.bioStream = stream;
      video.srcObject = stream; video.hidden = false;
      await video.play().catch(() => {});
      off.style.display = 'none'; hud.hidden = false;
      $('#bio-scan').disabled = false; $('#bio-stop').disabled = false; $('#bio-start').disabled = true;
      setStatus('Align face in frame', true);
    } catch (e) {
      toast('Camera unavailable or permission denied. Use “Simulate scan”.', 'error');
    }
  };
  const setStatus = (t, warn) => {
    const el = $('#bio-status'); if (!el) return;
    el.textContent = t; el.classList.toggle('warn', !!warn);
  };
  const runScan = async (simulated) => {
    if (state.bioScanning) return;
    if (!simulated && !state.bioStream) { toast('Start the camera first — or use “Simulate scan”.', 'error'); return; }
    state.bioScanning = true;
    const hud = $('#bio-hud'); if (hud) { hud.hidden = false; hud.classList.add('scanning'); }
    const phases = ['Align face in frame', 'Detecting liveness…', 'Anti-spoof check…', 'Matching biometrics…'];
    for (const p of phases) { setStatus(p, true); await new Promise((r) => setTimeout(r, 650)); }
    try {
      const fid = meFac ? meFac.id : ($('#bio-fac') ? $('#bio-fac').value : null);
      const { checkin } = await api('/api/checkins', { method: 'POST', body: JSON.stringify({ facultyId: fid }) });
      state.checkins.unshift({ ...checkin, facultyName: checkin.facultyName, title: checkin.title });
      setStatus(`Verified · ${checkin.confidence}%`, false);
      $('#bio-log').innerHTML = logHTML();
      toast(`${esc(checkin.facultyName)} checked in at ${fmtTime(checkin.timestamp)} (${checkin.confidence}% match).`, 'success');
    } catch (ex) { setStatus('Verification failed', true); toast(exc(ex), 'error'); }
    if (hud) hud.classList.remove('scanning');
    state.bioScanning = false;
  };
  paint();
}
function stopCamera() {
  if (state.bioStream) { state.bioStream.getTracks().forEach((t) => t.stop()); state.bioStream = null; }
}
function stopCameraUI() {
  stopCamera();
  const video = $('#bio-video'), off = $('#bio-off'), hud = $('#bio-hud');
  if (video) { video.hidden = true; video.srcObject = null; }
  if (off) off.style.display = '';
  if (hud) hud.hidden = true;
  if ($('#bio-scan')) $('#bio-scan').disabled = true;
  if ($('#bio-stop')) $('#bio-stop').disabled = true;
  if ($('#bio-start')) $('#bio-start').disabled = false;
}

/* ============================================================
   VIEW: Fee ledger
   ============================================================ */
async function vFees() {
  const data = await api('/api/fees');
  state.fees = data;
  renderNav();
  const owner = isOwner();
  const s = data.summary;
  $('#view').innerHTML = `
    ${owner ? '' : `<div class="lock-note">${ICONS.lock}<span>Faculty view — read-only ledger. Fee adjustments are restricted to the Owner.</span></div>`}
    <div class="stat-grid">
      <div class="stat-card glass sk"><div class="stat-top"><span>Collected</span><div class="stat-ico" style="color:var(--sky)">${ICONS.inr}</div></div>
        <div class="stat-val">${inr(s.collected)}</div><div class="stat-sub">of ${inr(s.total)} annual target</div></div>
      <div class="stat-card glass rd"><div class="stat-top"><span>Pending</span><div class="stat-ico" style="color:var(--red)">${ICONS.clock}</div></div>
        <div class="stat-val">${inr(s.pending)}</div><div class="stat-sub">${s.overdue} overdue accounts</div></div>
      <div class="stat-card glass gn"><div class="stat-top"><span>Cleared</span><div class="stat-ico" style="color:var(--green)">${ICONS.check}</div></div>
        <div class="stat-val">${s.cleared}</div><div class="stat-sub">scholars fully paid</div></div>
    </div>
    <div class="panel glass">
      <div class="panel-head"><div><h3>Fee Reconciliation Ledger</h3><p>Dynamic balances · Cleared vs Overdue tagging</p></div></div>
      <div class="panel-body"><div class="table-wrap"><table class="data"><thead><tr>
        <th>Scholar</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th><th>Due date</th>
        ${owner ? '<th style="text-align:right">Adjust</th>' : ''}
      </tr></thead><tbody>
      ${data.ledger.map((fl) => `<tr>
        <td><div style="display:flex;gap:10px;align-items:center"><div class="avatar ${avatarClass(fl.studentName)}">${initials(fl.studentName)}</div>
          <div><div class="cell-main">${esc(fl.studentName)}</div><div class="cell-sub">${esc(fl.grade)} · ${esc(fl.admissionNo)}</div></div></div></td>
        <td class="fee-amt">${inr(fl.total)}</td>
        <td class="fee-amt text-green">${inr(fl.paid)}</td>
        <td class="fee-amt ${fl.balance > 0 ? 'text-red' : ''}">${inr(fl.balance)}</td>
        <td><span class="tag ${fl.status.toLowerCase()}"><span class="dot"></span>${fl.status}</span></td>
        <td class="text-muted">${fl.dueDate ? fmtDate(fl.dueDate) : '—'}</td>
        ${owner ? `<td><div class="row-actions"><button class="icon-btn" data-fee="${fl.studentId}" title="Adjust balance">${ICONS.edit}</button></div></td>` : ''}
      </tr>`).join('')}
      </tbody></table></div></div>
    </div>`;
  $$('[data-fee]').forEach((b) => b.addEventListener('click', () => {
    const fl = state.fees.ledger.find((x) => x.studentId === b.dataset.fee);
    if (fl) feeModal(fl);
  }));
}

function feeModal(fl) {
  openModal(`Adjust balance — ${fl.studentName}`, `
    <div class="summary-strip">
      <div class="summary-chip glass-soft"><strong>${inr(fl.total)}</strong><span>Total</span></div>
      <div class="summary-chip glass-soft"><strong class="text-green">${inr(fl.paid)}</strong><span>Paid</span></div>
      <div class="summary-chip glass-soft"><strong class="${fl.balance > 0 ? 'text-red' : ''}">${inr(fl.balance)}</strong><span>Balance</span></div>
    </div>
    <form id="fee-form"><div class="form-grid">
      ${field('Record new payment (₹)', input('recordPayment', '', 'type="number" min="0" placeholder="e.g. 10000"'), true)}
      ${field('Set total fee (₹)', input('total', fl.total, 'type="number" min="0"'))}
      ${field('Set paid amount (₹)', input('paid', fl.paid, 'type="number" min="0"'))}
      ${field('Due date', input('dueDate', fl.dueDate || '', 'type="date"'), true)}
    </div>
    <p class="text-muted" style="font-size:12px;margin-top:10px">Status auto-tags: balance ₹0 → <strong class="text-green">Cleared</strong>, otherwise <strong class="text-red">Overdue</strong>.</p>
    <div class="modal-foot">
      <button type="button" class="btn btn-ghost" id="m-cancel">Cancel</button>
      <button type="submit" class="btn btn-primary">Apply adjustment</button>
    </div></form>`, {
    onMount(wrap) {
      $('#m-cancel', wrap).addEventListener('click', () => closeModal());
      $('#fee-form', wrap).addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        const payload = {};
        if (fd.recordPayment !== '') payload.recordPayment = Number(fd.recordPayment);
        if (fd.total !== '') payload.total = Number(fd.total);
        if (fd.paid !== '') payload.paid = Number(fd.paid);
        payload.dueDate = fd.dueDate || null;
        // optimistic: patch local row
        const prev = { ...fl };
        if (payload.total !== undefined) fl.total = payload.total;
        if (payload.paid !== undefined) fl.paid = Math.min(fl.total, payload.paid);
        if (payload.recordPayment) fl.paid = Math.min(fl.total, fl.paid + payload.recordPayment);
        fl.balance = fl.total - fl.paid; fl.status = fl.balance <= 0 ? 'Cleared' : 'Overdue';
        closeModal(); vFees();
        try {
          await api(`/api/fees/${fl.studentId}`, { method: 'PUT', body: JSON.stringify(payload) });
          toast(`Ledger updated — ${esc(fl.studentName)} is now ${fl.status}.`, 'success');
        } catch (ex) { Object.assign(fl, prev); vFees(); toast(exc(ex), 'error'); }
      });
    },
  });
}

/* ============================================================
   VIEW: Faculty
   ============================================================ */
async function vFaculty() {
  const { faculty } = await api('/api/faculty');
  state.faculty = faculty;
  const { logs } = await api('/api/checkins').catch(() => ({ logs: [] }));
  const checked = new Set(logs.map((l) => l.facultyId));
  const owner = isOwner();
  $('#view').innerHTML = `
    ${owner ? '' : `<div class="lock-note">${ICONS.lock}<span>Faculty view — staff directory is read-only. Record edits are restricted to the Owner.</span></div>`}
    <div class="panel glass">
      <div class="panel-head"><div><h3>Faculty Records</h3><p>${faculty.length} teaching staff · ${checked.size} checked in today</p></div>
        <div class="panel-actions">${owner ? `<button class="btn btn-primary btn-sm" id="add-fac">${ICONS.plus} Add faculty</button>` : ''}</div></div>
      <div class="panel-body"><div class="table-wrap"><table class="data"><thead><tr>
        <th>Member</th><th>Subject</th><th>Wing</th><th>Contact</th><th>Today</th>
        ${owner ? '<th style="text-align:right">Manage</th>' : ''}
      </tr></thead><tbody>
      ${faculty.map((fm) => `<tr>
        <td><div style="display:flex;gap:10px;align-items:center"><div class="avatar ${avatarClass(fm.name)}">${fm.avatar || initials(fm.name)}</div>
          <div><div class="cell-main">${esc(fm.name)}</div><div class="cell-sub">${esc(fm.title || '')}</div></div></div></td>
        <td>${esc(fm.subject || '—')}</td>
        <td><span class="tag wing">${esc(fm.wing || '—')}</span></td>
        <td><div class="cell-sub">${esc(fm.email)}</div><div class="cell-sub">${esc(fm.phone || '')}</div></td>
        <td>${checked.has(fm.id) ? '<span class="tag present"><span class="dot"></span>Checked in</span>' : '<span class="tag unmarked"><span class="dot"></span>Not yet</span>'}</td>
        ${owner ? `<td><div class="row-actions">
          <button class="icon-btn" data-fedit="${fm.id}" title="Edit record">${ICONS.edit}</button>
          <button class="icon-btn danger" data-fdel="${fm.id}" title="Remove">${ICONS.trash}</button>
        </div></td>` : ''}
      </tr>`).join('')}
      </tbody></table></div></div>
    </div>`;
  const add = $('#add-fac'); if (add) add.addEventListener('click', () => facultyModal(null));
  $$('[data-fedit]').forEach((b) => b.addEventListener('click', () => {
    const fm = state.faculty.find((x) => x.id === b.dataset.fedit);
    if (fm) facultyModal(fm);
  }));
  $$('[data-fdel]').forEach((b) => b.addEventListener('click', () => {
    const fm = state.faculty.find((x) => x.id === b.dataset.fdel);
    if (!fm) return;
    openModal(`Remove ${fm.name}?`, `<p style="font-size:13.5px;color:#c6cfdf">This removes the faculty record and signs them out everywhere.</p>
      <div class="modal-foot"><button class="btn btn-ghost" id="m-cancel">Cancel</button><button class="btn btn-danger" id="m-del">Remove</button></div>`, {
      onMount(wrap) {
        $('#m-cancel', wrap).addEventListener('click', () => closeModal());
        $('#m-del', wrap).addEventListener('click', async () => {
          try { await api(`/api/faculty/${fm.id}`, { method: 'DELETE' }); closeModal(); toast('Faculty record removed.', 'success'); vFaculty(); }
          catch (ex) { toast(exc(ex), 'error'); }
        });
      },
    });
  }));
}

function facultyModal(fm) {
  const isNew = !fm;
  fm = fm || { wing: 'Lotus Wing' };
  openModal(isNew ? 'Add faculty member' : `Edit — ${fm.name}`, `
    <form id="fac-form"><div class="form-grid">
      ${field('Full name *', input('name', fm.name, 'required placeholder="e.g. Ananya Iyer"'))}
      ${field('Email *', input('email', fm.email, 'required type="email" placeholder="name@synergy.edu"'))}
      ${field('Job title', input('title', fm.title, 'placeholder="e.g. UKG Class Teacher"'))}
      ${field('Subject', input('subject', fm.subject, 'placeholder="e.g. Phonics & Rhymes"'))}
      ${field('Wing', `<select name="wing">${WINGS.map((w) => `<option ${fm.wing === w ? 'selected' : ''}>${w}</option>`).join('')}</select>`)}
      ${field('Phone', input('phone', fm.phone, 'placeholder="+91 …"'))}
      ${isNew ? field('Login password', input('password', 'teacher123'), true) : ''}
    </div><div class="modal-foot">
      <button type="button" class="btn btn-ghost" id="m-cancel">Cancel</button>
      <button type="submit" class="btn btn-primary">${isNew ? 'Add member' : 'Save changes'}</button>
    </div></form>`, {
    onMount(wrap) {
      $('#m-cancel', wrap).addEventListener('click', () => closeModal());
      $('#fac-form', wrap).addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        try {
          if (isNew) { await api('/api/faculty', { method: 'POST', body: JSON.stringify(fd) }); toast('Faculty member added.', 'success'); }
          else { await api(`/api/faculty/${fm.id}`, { method: 'PUT', body: JSON.stringify(fd) }); toast('Faculty record updated.', 'success'); }
          closeModal(); vFaculty();
        } catch (ex) { toast(exc(ex), 'error'); }
      });
    },
  });
}

/* ============================================================
   VIEW: Notice board
   ============================================================ */
async function vNotices() {
  const { notices } = await api('/api/notices');
  state.notices = notices;
  renderNav();
  const owner = isOwner();
  $('#view').innerHTML = `
    ${owner ? '' : `<div class="lock-note">${ICONS.lock}<span>Faculty view — circulars are broadcast by the Owner. You can read and share them with parents.</span></div>`}
    <div class="panel glass">
      <div class="panel-head"><div><h3>Administrative Notice Board</h3><p>${notices.filter((n) => n.published).length} live · ${notices.filter((n) => !n.published).length} drafts</p></div>
        <div class="panel-actions">${owner ? `<button class="btn btn-primary btn-sm" id="add-notice">${ICONS.send} Broadcast circular</button>` : ''}</div></div>
      <div class="panel-body"><div class="notice-list">
        ${notices.map((n) => `<article class="notice-card glass-soft pri-${n.priority}">
          <div class="notice-top"><h4>${esc(n.title)}</h4>
            ${owner ? `<div class="row-actions">
              <button class="icon-btn" data-nedit="${n.id}" title="Edit circular">${ICONS.edit}</button>
              <button class="icon-btn danger" data-ndel="${n.id}" title="Delete circular">${ICONS.trash}</button>
            </div>` : ''}
          </div>
          <div class="notice-meta">
            <span class="tag ${n.priority.toLowerCase()}">${esc(n.priority)} priority</span>
            ${n.published ? '<span class="tag published"><span class="dot"></span>Broadcast live</span>' : '<span class="tag draft"><span class="dot"></span>Draft</span>'}
            <span>${esc(n.audience)}</span><span>·</span><span>By ${esc(n.author)}</span><span>·</span><span>${fmtDate(n.createdAt)}</span>
          </div>
          <p class="notice-body">${esc(n.body)}</p>
        </article>`).join('') || `<div class="empty">${ICONS.notices}<h4>No circulars yet</h4><p>Broadcast the first school-wide circular.</p></div>`}
      </div></div>
    </div>`;
  const add = $('#add-notice'); if (add) add.addEventListener('click', () => noticeModal(null));
  $$('[data-nedit]').forEach((b) => b.addEventListener('click', () => {
    const n = state.notices.find((x) => x.id === b.dataset.nedit);
    if (n) noticeModal(n);
  }));
  $$('[data-ndel]').forEach((b) => b.addEventListener('click', async () => {
    try { await api(`/api/notices/${b.dataset.ndel}`, { method: 'DELETE' }); toast('Circular deleted.', 'success'); vNotices(); }
    catch (ex) { toast(exc(ex), 'error'); }
  }));
}

function noticeModal(n) {
  const isNew = !n;
  n = n || { audience: 'All Parents', priority: 'Medium', published: true };
  openModal(isNew ? 'Broadcast new circular' : 'Edit circular', `
    <form id="ntc-form"><div class="form-grid">
      ${field('Title *', input('title', n.title, 'required placeholder="e.g. Term-2 Fee Reminder"'), true)}
      ${field('Message *', `<textarea name="body" required placeholder="Write the circular for parents & staff…">${esc(n.body || '')}</textarea>`, true)}
      ${field('Audience', `<select name="audience">${['All Parents', 'Parents (Dues Pending)', 'UKG & Kindergarten', 'Pre-K & Nursery', 'Staff Only'].map((a) => `<option ${n.audience === a ? 'selected' : ''}>${a}</option>`).join('')}</select>`)}
      ${field('Priority', `<select name="priority">${['High', 'Medium', 'Low'].map((p) => `<option ${n.priority === p ? 'selected' : ''}>${p}</option>`).join('')}</select>`)}
      ${field('Visibility', `<select name="published"><option value="true" ${n.published ? 'selected' : ''}>Broadcast live</option><option value="false" ${!n.published ? 'selected' : ''}>Save as draft</option></select>`, true)}
    </div><div class="modal-foot">
      <button type="button" class="btn btn-ghost" id="m-cancel">Cancel</button>
      <button type="submit" class="btn btn-primary">${isNew ? 'Broadcast now' : 'Save changes'}</button>
    </div></form>`, {
    onMount(wrap) {
      $('#m-cancel', wrap).addEventListener('click', () => closeModal());
      $('#ntc-form', wrap).addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        fd.published = fd.published === 'true';
        try {
          if (isNew) { await api('/api/notices', { method: 'POST', body: JSON.stringify(fd) }); toast('Circular broadcast school-wide.', 'success'); }
          else { await api(`/api/notices/${n.id}`, { method: 'PUT', body: JSON.stringify(fd) }); toast('Circular updated.', 'success'); }
          closeModal(); vNotices();
        } catch (ex) { toast(exc(ex), 'error'); }
      });
    },
  });
}

/* ---------------- misc ---------------- */
const exc = (ex) => (ex && ex.message) || 'Something went wrong.';
const VIEWS = { dashboard: vDashboard, students: vStudents, attendance: vAttendance, biometric: vBiometric, fees: vFees, faculty: vFaculty, notices: vNotices };

document.addEventListener('DOMContentLoaded', boot);
