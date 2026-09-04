/**
 * SYNERGY EDU KIDS — Institutional School ERP & Management Platform
 * Full-stack server: Express REST API + static dashboard frontend.
 * Persistence: local JSON file (data/db.json), auto-seeded with realistic
 * Indian institutional demo data on first boot.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

/* ------------------------------------------------------------------ */
/* Storage                                                             */
/* ------------------------------------------------------------------ */

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const uid = (prefix) => `${prefix}_${crypto.randomBytes(6).toString('hex')}`;
const todayISO = () => new Date().toISOString().slice(0, 10);
const nowISO = () => new Date().toISOString();

/* ------------------------------------------------------------------ */
/* Seed data — realistic Indian institutional demo dataset             */
/* ------------------------------------------------------------------ */

function seedDatabase() {
  const users = [
    {
      id: 'u_owner',
      name: 'Dr. Meera Krishnan',
      email: 'owner@synergy.edu',
      password: 'owner123',
      role: 'owner',
      title: 'Director & Owner',
      phone: '+91 98250 40001',
      avatar: 'MK',
    },
    {
      id: 'u_fac1',
      name: 'Ananya Iyer',
      email: 'ananya.iyer@synergy.edu',
      password: 'teacher123',
      role: 'faculty',
      title: 'UKG Class Teacher',
      subject: 'Early Literacy',
      wing: 'Lotus Wing',
      phone: '+91 98250 40011',
      avatar: 'AI',
    },
    {
      id: 'u_fac2',
      name: 'Rohan Mehta',
      email: 'rohan.mehta@synergy.edu',
      password: 'teacher123',
      role: 'faculty',
      title: 'Nursery Educator',
      subject: 'Numeracy & Play',
      wing: 'Peacock Wing',
      phone: '+91 98250 40012',
      avatar: 'RM',
    },
    {
      id: 'u_fac3',
      name: 'Kavya Nair',
      email: 'kavya.nair@synergy.edu',
      password: 'teacher123',
      role: 'faculty',
      title: 'LKG Educator',
      subject: 'Phonics & Rhymes',
      wing: 'Banyan Wing',
      phone: '+91 98250 40013',
      avatar: 'KN',
    },
    {
      id: 'u_fac4',
      name: 'Arjun Patel',
      email: 'arjun.patel@synergy.edu',
      password: 'teacher123',
      role: 'faculty',
      title: 'Sports Coordinator',
      subject: 'Physical Education',
      wing: 'Marigold Wing',
      phone: '+91 98250 40014',
      avatar: 'AP',
    },
    {
      id: 'u_fac5',
      name: 'Sneha Joshi',
      email: 'sneha.joshi@synergy.edu',
      password: 'teacher123',
      role: 'faculty',
      title: 'Arts Educator',
      subject: 'Music & Art',
      wing: 'Lotus Wing',
      phone: '+91 98250 40015',
      avatar: 'SJ',
    },
  ];

  const S = (id, name, adm, grade, wing, gender, dob, parent, relation, phone, address) => ({
    id, name, admissionNo: adm, grade, wing, gender, dob,
    parentName: parent, relation, parentPhone: phone, address,
    enrolledOn: '2026-06-10',
  });

  const students = [
    S('st_01', 'Aarav Patel', 'SYN2026001', 'UKG', 'Lotus Wing', 'Boy', '2020-08-14', 'Rajesh Patel', 'Father', '+91 98250 12301', '12, Shivalik Plaza, Amroli, Surat'),
    S('st_02', 'Diya Shah', 'SYN2026002', 'LKG', 'Peacock Wing', 'Girl', '2021-03-02', 'Nita Shah', 'Mother', '+91 98250 12302', 'B-44, Adajan Gam, Surat'),
    S('st_03', 'Vihaan Mehta', 'SYN2026003', 'Nursery', 'Banyan Wing', 'Boy', '2022-01-19', 'Chetan Mehta', 'Father', '+91 98250 12303', '7, Green Acres, Vesu, Surat'),
    S('st_04', 'Anaya Desai', 'SYN2026004', 'Pre-K', 'Marigold Wing', 'Girl', '2022-09-30', 'Falguni Desai', 'Mother', '+91 98250 12304', '21, Sarthana Jakatnaka, Surat'),
    S('st_05', 'Kabir Malhotra', 'SYN2026005', 'Kindergarten', 'Lotus Wing', 'Boy', '2019-11-05', 'Vikram Malhotra', 'Father', '+91 98250 12305', 'C-9, Althan-Bhimrad Road, Surat'),
    S('st_06', 'Myra Nair', 'SYN2026006', 'UKG', 'Peacock Wing', 'Girl', '2020-05-27', 'Suresh Nair', 'Father', '+91 98250 12306', 'Plot 88, Palanpur Gam, Surat'),
    S('st_07', 'Arjun Reddy', 'SYN2026007', 'LKG', 'Banyan Wing', 'Boy', '2021-07-11', 'Lakshmi Reddy', 'Mother', '+91 98250 12307', '14, Honey Park, Adajan, Surat'),
    S('st_08', 'Sara Khan', 'SYN2026008', 'Nursery', 'Marigold Wing', 'Girl', '2022-04-16', 'Imran Khan', 'Father', '+91 98251 22308', '3/142, Rander Road, Surat'),
    S('st_09', 'Krishna Joshi', 'SYN2026009', 'Kindergarten', 'Peacock Wing', 'Boy', '2019-12-22', 'Hemant Joshi', 'Father', '+91 98251 22309', '27, Ghod Dod Road, Surat'),
    S('st_10', 'Pari Chauhan', 'SYN2026010', 'Pre-K', 'Lotus Wing', 'Girl', '2022-10-08', 'Mahesh Chauhan', 'Father', '+91 98251 22310', '6, Yogichowk, Surat'),
    S('st_11', 'Dev Parmar', 'SYN2026011', 'LKG', 'Marigold Wing', 'Boy', '2021-02-14', 'Kiran Parmar', 'Mother', '+91 98251 22311', '19, Katargam, Surat'),
    S('st_12', 'Ishita Gupta', 'SYN2026012', 'UKG', 'Banyan Wing', 'Girl', '2020-09-19', 'Amit Gupta', 'Father', '+91 98251 22312', 'A-31, City Light, Surat'),
    S('st_13', 'Yash Thakor', 'SYN2026013', 'Nursery', 'Lotus Wing', 'Boy', '2022-06-25', 'Bharat Thakor', 'Father', '+91 98251 22313', '8, Pandesara, Surat'),
    S('st_14', 'Navya Kulkarni', 'SYN2026014', 'Kindergarten', 'Banyan Wing', 'Girl', '2020-01-30', ' Prasad Kulkarni', 'Mother', '+91 98251 22314', '55, Vesu-Abhva Road, Surat'),
  ];

  const FEE_BY_GRADE = { 'Pre-K': 42000, Nursery: 48000, LKG: 55000, UKG: 62000, Kindergarten: 68000 };
  const fees = students.map((s, i) => {
    const total = FEE_BY_GRADE[s.grade];
    // Mix of cleared / overdue demo states
    const paidPattern = [62000, 30000, 48000, 20000, 68000, 62000, 25000, 48000, 40000, 42000, 15000, 62000, 24000, 68000];
    const paid = Math.min(paidPattern[i % paidPattern.length], total);
    return {
      studentId: s.id,
      total,
      paid,
      dueDate: paid >= total ? null : '2026-09-30',
      lastPayment: paid > 0 ? '2026-08-1' + ((i % 9) + 1) : null,
      updatedAt: nowISO(),
    };
  });

  const t = todayISO();
  const attendance = {};
  attendance[t] = {};
  students.forEach((s, i) => {
    // Lively demo: most present, a couple absent
    attendance[t][s.id] = i === 2 || i === 10 ? 'absent' : 'present';
  });

  const checkins = [
    { id: uid('chk'), facultyId: 'u_fac1', method: 'optical', confidence: 98.2, timestamp: `${t}T08:12:44` },
    { id: uid('chk'), facultyId: 'u_fac2', method: 'optical', confidence: 97.5, timestamp: `${t}T08:21:09` },
    { id: uid('chk'), facultyId: 'u_fac3', method: 'optical', confidence: 96.8, timestamp: `${t}T08:31:52` },
  ];

  const notices = [
    {
      id: uid('ntc'), title: 'Term-1 Parent–Teacher Meet — 12 Sept 2026',
      body: 'Dear Parents, the Term-1 PTM for Pre-K to Kindergarten will be held on Saturday, 12 Sept 2026, 9:00 AM–12:00 PM in the respective class wings. Report cards and attendance summaries will be shared. Kindly confirm attendance with the class teacher.',
      audience: 'All Parents', priority: 'High', published: true,
      author: 'Dr. Meera Krishnan', createdAt: '2026-09-02T10:00:00',
    },
    {
      id: uid('ntc'), title: 'Term-2 Fee Reminder — Due 30 Sept 2026',
      body: 'This is a gentle reminder that Term-2 fees are due on or before 30 Sept 2026. Parents with pending balances are requested to clear dues at the school office or via UPI to avoid late charges of ₹250. Contact the office for receipts.',
      audience: 'Parents (Dues Pending)', priority: 'High', published: true,
      author: 'Dr. Meera Krishnan', createdAt: '2026-09-01T09:30:00',
    },
    {
      id: uid('ntc'), title: 'Monsoon Health & Hygiene Advisory',
      body: 'With monsoon showers continuing, please send children with raincoats, extra socks and labelled water bottles. The school has intensified classroom sanitisation. Children with fever/cold should rest at home and rejoin with a fitness note.',
      audience: 'All Parents', priority: 'Medium', published: true,
      author: 'Ananya Iyer', createdAt: '2026-08-28T11:15:00',
    },
    {
      id: uid('ntc'), title: 'Annual Sports Day Trials — Kindergarten & UKG',
      body: 'Trials for the Annual Sports Day (December) begin next week during activity periods. Events include flat race, lemon-and-spoon, and relay. Interested parents may volunteer for the organising committee via the class teacher.',
      audience: 'UKG & Kindergarten', priority: 'Low', published: false,
      author: 'Arjun Patel', createdAt: '2026-08-25T14:00:00',
    },
  ];

  return { users, students, fees, attendance, checkins, notices, sessions: {} };
}

let db;
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      db.users = db.users || [];
      db.students = db.students || [];
      db.fees = db.fees || [];
      db.attendance = db.attendance || {};
      db.checkins = db.checkins || [];
      db.notices = db.notices || [];
      db.sessions = db.sessions || {};
      if (!db.users.length) db = seedDatabase();
    } else {
      db = seedDatabase();
    }
  } catch (e) {
    console.error('DB load failed, reseeding:', e.message);
    db = seedDatabase();
  }
  saveDB();
}

let saveTimer = null;
function saveDB() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    } catch (e) {
      console.error('DB save failed:', e.message);
    }
  }, 150);
}

loadDB();

/* ------------------------------------------------------------------ */
/* Auth helpers                                                        */
/* ------------------------------------------------------------------ */

function publicUser(u) {
  if (!u) return null;
  const { password, ...rest } = u;
  return rest;
}

function authFromReq(req) {
  const token = req.headers['x-session-token'] || (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const session = db.sessions[token];
  if (!session) return null;
  const user = db.users.find((u) => u.id === session.userId);
  return user ? { user, token } : null;
}

function requireAuth(req, res, next) {
  const auth = authFromReq(req);
  if (!auth) return res.status(401).json({ error: 'Session expired. Please sign in again.' });
  req.auth = auth;
  next();
}

function requireOwner(req, res, next) {
  if (req.auth.user.role !== 'owner') {
    return res.status(403).json({ error: 'Restricted: only the Owner (Super-Admin) can perform this action.' });
  }
  next();
}

const feeStatus = (f) => (f.total - f.paid <= 0 ? 'Cleared' : 'Overdue');
const feeWithStatus = (f) => ({ ...f, balance: f.total - f.paid, status: feeStatus(f) });

/* ------------------------------------------------------------------ */
/* Auth routes                                                         */
/* ------------------------------------------------------------------ */

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
  const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase().trim());
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials. Try a demo account below.' });
  }
  const token = crypto.randomBytes(24).toString('hex');
  db.sessions[token] = { userId: user.id, createdAt: nowISO() };
  saveDB();
  res.json({ token, user: publicUser(user) });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  delete db.sessions[req.auth.token];
  saveDB();
  res.json({ ok: true });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: publicUser(req.auth.user) });
});

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

app.get('/api/dashboard', requireAuth, (req, res) => {
  const t = todayISO();
  const day = db.attendance[t] || {};
  const present = Object.values(day).filter((s) => s === 'present').length;
  const totalFees = db.fees.reduce((a, f) => a + f.total, 0);
  const collected = db.fees.reduce((a, f) => a + f.paid, 0);
  const overdueCount = db.fees.filter((f) => feeStatus(f) === 'Overdue').length;
  const checkedInToday = db.checkins.filter((c) => (c.timestamp || '').slice(0, 10) === t).length;
  const facultyCount = db.users.filter((u) => u.role === 'faculty').length;
  res.json({
    date: t,
    students: db.students.length,
    presentToday: present,
    absentToday: Object.values(day).filter((s) => s === 'absent').length,
    attendancePct: db.students.length ? Math.round((present / db.students.length) * 100) : 0,
    feesTotal: totalFees,
    feesCollected: collected,
    feesPending: totalFees - collected,
    overdueCount,
    facultyCount,
    checkedInToday,
    notices: db.notices.filter((n) => n.published).length,
  });
});

/* ------------------------------------------------------------------ */
/* Students (SIS)                                                      */
/* ------------------------------------------------------------------ */

app.get('/api/students', requireAuth, (req, res) => {
  res.json({ students: db.students });
});

app.post('/api/students', requireAuth, requireOwner, (req, res) => {
  const b = req.body || {};
  if (!b.name || !b.grade) return res.status(400).json({ error: 'Student name and grade are required.' });
  const maxAdm = db.students.reduce((m, s) => {
    const n = parseInt((s.admissionNo || '').replace(/\D/g, ''), 10);
    return Number.isFinite(n) && n > m ? n : m;
  }, 2026000);
  const student = {
    id: uid('st'),
    name: String(b.name).trim(),
    admissionNo: b.admissionNo || `SYN${maxAdm + 1}`,
    grade: b.grade,
    wing: b.wing || 'Lotus Wing',
    gender: b.gender || 'Boy',
    dob: b.dob || '',
    parentName: b.parentName || '',
    relation: b.relation || 'Father',
    parentPhone: b.parentPhone || '',
    address: b.address || '',
    enrolledOn: todayISO(),
  };
  db.students.push(student);
  // create matching fee ledger row
  const FEE_BY_GRADE = { 'Pre-K': 42000, Nursery: 48000, LKG: 55000, UKG: 62000, Kindergarten: 68000 };
  db.fees.push({
    studentId: student.id,
    total: Number(b.feeTotal) || FEE_BY_GRADE[student.grade] || 50000,
    paid: 0,
    dueDate: '2026-09-30',
    lastPayment: null,
    updatedAt: nowISO(),
  });
  saveDB();
  res.status(201).json({ student });
});

app.put('/api/students/:id', requireAuth, requireOwner, (req, res) => {
  const s = db.students.find((x) => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Student record not found.' });
  const fields = ['name', 'admissionNo', 'grade', 'wing', 'gender', 'dob', 'parentName', 'relation', 'parentPhone', 'address'];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) s[f] = req.body[f];
  });
  saveDB();
  res.json({ student: s });
});

app.delete('/api/students/:id', requireAuth, requireOwner, (req, res) => {
  const idx = db.students.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Student record not found.' });
  const [removed] = db.students.splice(idx, 1);
  db.fees = db.fees.filter((f) => f.studentId !== removed.id);
  Object.values(db.attendance).forEach((day) => delete day[removed.id]);
  saveDB();
  res.json({ ok: true, removed });
});

/* ------------------------------------------------------------------ */
/* Faculty records                                                     */
/* ------------------------------------------------------------------ */

app.get('/api/faculty', requireAuth, (req, res) => {
  res.json({ faculty: db.users.filter((u) => u.role === 'faculty').map(publicUser) });
});

app.post('/api/faculty', requireAuth, requireOwner, (req, res) => {
  const b = req.body || {};
  if (!b.name || !b.email) return res.status(400).json({ error: 'Faculty name and email are required.' });
  if (db.users.some((u) => u.email.toLowerCase() === String(b.email).toLowerCase())) {
    return res.status(400).json({ error: 'A user with this email already exists.' });
  }
  const initials = String(b.name).split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const member = {
    id: uid('u_fac'),
    name: String(b.name).trim(),
    email: String(b.email).trim(),
    password: b.password || 'teacher123',
    role: 'faculty',
    title: b.title || 'Educator',
    subject: b.subject || 'General',
    wing: b.wing || 'Lotus Wing',
    phone: b.phone || '',
    avatar: initials,
  };
  db.users.push(member);
  saveDB();
  res.status(201).json({ member: publicUser(member) });
});

app.put('/api/faculty/:id', requireAuth, requireOwner, (req, res) => {
  const m = db.users.find((x) => x.id === req.params.id && x.role === 'faculty');
  if (!m) return res.status(404).json({ error: 'Faculty record not found.' });
  ['name', 'email', 'title', 'subject', 'wing', 'phone'].forEach((f) => {
    if (req.body[f] !== undefined) m[f] = req.body[f];
  });
  saveDB();
  res.json({ member: publicUser(m) });
});

app.delete('/api/faculty/:id', requireAuth, requireOwner, (req, res) => {
  const idx = db.users.findIndex((x) => x.id === req.params.id && x.role === 'faculty');
  if (idx === -1) return res.status(404).json({ error: 'Faculty record not found.' });
  const [removed] = db.users.splice(idx, 1);
  Object.values(db.sessions).forEach(() => {});
  Object.keys(db.sessions).forEach((t) => {
    if (db.sessions[t].userId === removed.id) delete db.sessions[t];
  });
  saveDB();
  res.json({ ok: true });
});

/* ------------------------------------------------------------------ */
/* Attendance                                                          */
/* ------------------------------------------------------------------ */

app.get('/api/attendance', requireAuth, (req, res) => {
  const date = req.query.date || todayISO();
  const day = db.attendance[date] || {};
  const rows = db.students.map((s) => ({ studentId: s.id, status: day[s.id] || 'unmarked' }));
  const present = rows.filter((r) => r.status === 'present').length;
  const absent = rows.filter((r) => r.status === 'absent').length;
  const marked = present + absent;
  res.json({
    date,
    rows,
    summary: {
      total: db.students.length,
      present,
      absent,
      unmarked: db.students.length - marked,
      pct: db.students.length ? Math.round((present / db.students.length) * 100) : 0,
    },
  });
});

app.post('/api/attendance', requireAuth, (req, res) => {
  const { date, studentId, status } = req.body || {};
  if (!studentId || !['present', 'absent'].includes(status)) {
    return res.status(400).json({ error: 'studentId and a valid status (present/absent) are required.' });
  }
  if (!db.students.some((s) => s.id === studentId)) return res.status(404).json({ error: 'Student not found.' });
  const d = date || todayISO();
  db.attendance[d] = db.attendance[d] || {};
  db.attendance[d][studentId] = status; // toggle
  saveDB();
  res.json({ ok: true, date: d, studentId, status });
});

app.post('/api/attendance/mark-all', requireAuth, (req, res) => {
  const { date, status } = req.body || {};
  if (!['present', 'absent'].includes(status)) return res.status(400).json({ error: 'Valid status required.' });
  const d = date || todayISO();
  db.attendance[d] = db.attendance[d] || {};
  db.students.forEach((s) => { db.attendance[d][s.id] = status; });
  saveDB();
  res.json({ ok: true, date: d, status });
});

/* ------------------------------------------------------------------ */
/* Optical biometric check-in                                          */
/* ------------------------------------------------------------------ */

app.get('/api/checkins', requireAuth, (req, res) => {
  const date = req.query.date || todayISO();
  const logs = db.checkins
    .filter((c) => (c.timestamp || '').slice(0, 10) === date)
    .map((c) => {
      const f = db.users.find((u) => u.id === c.facultyId);
      return { ...c, facultyName: f ? f.name : 'Unknown', title: f ? f.title : '' };
    })
    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  res.json({ date, logs });
});

app.post('/api/checkins', requireAuth, (req, res) => {
  // Faculty may check themselves in; owners may log any faculty member.
  let facultyId = req.body && req.body.facultyId;
  if (req.auth.user.role === 'faculty') facultyId = req.auth.user.id;
  const member = db.users.find((u) => u.id === facultyId && u.role === 'faculty');
  if (!member) return res.status(400).json({ error: 'Valid facultyId is required.' });
  const entry = {
    id: uid('chk'),
    facultyId,
    method: 'optical',
    confidence: Number((96 + Math.random() * 3.4).toFixed(1)),
    timestamp: nowISO(),
  };
  db.checkins.push(entry);
  saveDB();
  res.status(201).json({ checkin: { ...entry, facultyName: member.name, title: member.title } });
});

/* ------------------------------------------------------------------ */
/* Fee reconciliation ledger                                           */
/* ------------------------------------------------------------------ */

app.get('/api/fees', requireAuth, (req, res) => {
  const ledger = db.students.map((s) => {
    const f = db.fees.find((x) => x.studentId === s.id) || { studentId: s.id, total: 0, paid: 0, dueDate: null, lastPayment: null };
    return { ...feeWithStatus(f), studentName: s.name, admissionNo: s.admissionNo, grade: s.grade, wing: s.wing, parentName: s.parentName, parentPhone: s.parentPhone };
  });
  const total = ledger.reduce((a, f) => a + f.total, 0);
  const collected = ledger.reduce((a, f) => a + f.paid, 0);
  res.json({
    ledger,
    summary: {
      total, collected, pending: total - collected,
      cleared: ledger.filter((f) => f.status === 'Cleared').length,
      overdue: ledger.filter((f) => f.status === 'Overdue').length,
    },
  });
});

app.put('/api/fees/:studentId', requireAuth, requireOwner, (req, res) => {
  const f = db.fees.find((x) => x.studentId === req.params.studentId);
  if (!f) return res.status(404).json({ error: 'Fee record not found.' });
  if (req.body.total !== undefined) f.total = Math.max(0, Number(req.body.total) || 0);
  if (req.body.paid !== undefined) f.paid = Math.max(0, Number(req.body.paid) || 0);
  if (f.paid > f.total) f.paid = f.total;
  if (req.body.dueDate !== undefined) f.dueDate = req.body.dueDate || null;
  if (req.body.recordPayment !== undefined && Number(req.body.recordPayment) > 0) {
    f.paid = Math.min(f.total, f.paid + Number(req.body.recordPayment));
    f.lastPayment = todayISO();
  }
  if (f.total - f.paid <= 0) f.dueDate = null;
  f.updatedAt = nowISO();
  saveDB();
  res.json({ fee: feeWithStatus(f) });
});

/* ------------------------------------------------------------------ */
/* Notice board                                                        */
/* ------------------------------------------------------------------ */

app.get('/api/notices', requireAuth, (req, res) => {
  const sorted = [...db.notices].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  res.json({ notices: sorted });
});

app.post('/api/notices', requireAuth, requireOwner, (req, res) => {
  const b = req.body || {};
  if (!b.title || !b.body) return res.status(400).json({ error: 'Title and message body are required.' });
  const notice = {
    id: uid('ntc'),
    title: String(b.title).trim(),
    body: String(b.body).trim(),
    audience: b.audience || 'All Parents',
    priority: b.priority || 'Medium',
    published: b.published !== undefined ? !!b.published : true,
    author: req.auth.user.name,
    createdAt: nowISO(),
  };
  db.notices.push(notice);
  saveDB();
  res.status(201).json({ notice });
});

app.put('/api/notices/:id', requireAuth, requireOwner, (req, res) => {
  const n = db.notices.find((x) => x.id === req.params.id);
  if (!n) return res.status(404).json({ error: 'Circular not found.' });
  ['title', 'body', 'audience', 'priority', 'published'].forEach((f) => {
    if (req.body[f] !== undefined) n[f] = req.body[f];
  });
  saveDB();
  res.json({ notice: n });
});

app.delete('/api/notices/:id', requireAuth, requireOwner, (req, res) => {
  const idx = db.notices.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Circular not found.' });
  db.notices.splice(idx, 1);
  saveDB();
  res.json({ ok: true });
});

/* ------------------------------------------------------------------ */
/* Demo reset (owner)                                                  */
/* ------------------------------------------------------------------ */

app.post('/api/reset', requireAuth, requireOwner, (req, res) => {
  const fresh = seedDatabase();
  fresh.sessions = db.sessions; // keep everyone signed in
  db = fresh;
  saveDB();
  res.json({ ok: true });
});

/* ------------------------------------------------------------------ */
/* Frontend                                                            */
/* ------------------------------------------------------------------ */

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SYNERGY EDU KIDS ERP running at http://0.0.0.0:${PORT}`);
});
