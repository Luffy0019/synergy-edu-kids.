# SYNERGY EDU KIDS — Institutional School ERP & Management Platform

Full-stack school ERP for **School Owners/Directors, Administrators & Teaching Faculty**:
Student Information System (SIS), live attendance register, optical biometric
faculty check-in, fee reconciliation ledger, faculty records and a broadcast
notice board — in one enterprise dashboard.

## Run it

```bash
npm install
npm start        # http://localhost:3000
```

Single Node.js server (`server.js`) serves the REST API **and** the dashboard
frontend (`public/`). Data persists to `data/db.json` (auto-created, git-ignored)
and is pre-seeded with realistic Indian institutional demo data on first boot.

## Demo accounts

| Role | Email | Password | Can do |
|---|---|---|---|
| Owner Super-Admin | `owner@synergy.edu` | `owner123` | Everything: SIS CRUD, fee adjustments, faculty records, circulars, full register |
| Faculty / Teacher | `ananya.iyer@synergy.edu` | `teacher123` | Mark attendance, biometric self check-in, read-only SIS / ledger / circulars |

Sessions persist via token in `localStorage` (survive reloads).

## Modules

1. **Dual-role auth** — Owner vs Faculty, server-enforced (`401`/`403`), session persistence.
2. **Student Information System** — enroll / update / class-wing transfer / delete scholars (Owner only); search + grade/wing filters.
3. **Live attendance register** — per-day present/absent toggles, real-time summary (present/absent/unmarked/%), mark-all, optimistic updates with rollback.
4. **Optical biometric check-in** — `navigator.mediaDevices.getUserMedia` camera, animated anti-spoof targeting HUD (corner brackets, liveness oval, scan beam), confidence score + timestamp log. “Simulate scan” fallback when no camera.
5. **Fee reconciliation ledger** — per-scholar totals/paid/balance in Indian Rupee (₹), record-payment & manual adjustments, auto `Cleared` vs `Overdue` tagging (Owner only).
6. **Notice board** — broadcast/draft circulars with audience + priority, full edit/delete (Owner only).

## Design

Collapsible dark-navy sidebar (`#070c18`), slate glassmorphism cards, micro-borders,
inline SVG icon set (zero icon dependencies), modal transitions, empty states,
badge counters, toasts, IST live clock, mobile-responsive.

## API quick reference

```
POST /api/auth/login | POST /api/auth/logout | GET /api/auth/me
GET  /api/dashboard
GET/POST /api/students · PUT/DELETE /api/students/:id          (CUD: owner)
GET/POST /api/faculty  · PUT/DELETE /api/faculty/:id           (CUD: owner)
GET  /api/attendance?date= · POST /api/attendance · POST /api/attendance/mark-all
GET/POST /api/checkins
GET  /api/fees · PUT /api/fees/:studentId                       (owner)
GET/POST /api/notices · PUT/DELETE /api/notices/:id             (CUD: owner)
POST /api/reset   (owner — restore demo dataset)
```

Auth header: `x-session-token: <token>` (or `Authorization: Bearer <token>`).
