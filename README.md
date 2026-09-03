# VeriDex Underwriting Engine — Prototype

Ye ek static HTML/CSS/JS prototype hai — koi build step, koi npm install, koi
framework nahi. VS Code mein seedha kholo aur chalao.

## Files

- `index.html` — poora markup, sab pages/modals
- `styles.css` — sab styling (design tokens, components, layout)
- `app.js` — poori application logic (data, rendering, event handlers)

## VS Code mein Kaise Chalayein

**Option 1 — Live Server Extension (recommended)**
1. VS Code mein "Live Server" extension install karo (Ritwick Dey ka).
2. `index.html` pe right-click → **"Open with Live Server"**.
3. Browser mein automatically khul jayega, aur file save karte hi auto-reload hoga.

**Option 2 — Directly Browser Mein**
1. `index.html` ko double-click karo, ya
2. VS Code mein right-click → **"Reveal in File Explorer"** → file ko browser mein drag karo.

> Note: seedha `file://` se kholne pe kaam karega (koi fetch/CORS dependency nahi hai), lekin Live Server use karna better hai smooth development experience ke liye.

## Tech Stack

- Plain HTML5 + CSS3 (custom properties/design tokens based)
- Vanilla JavaScript (no framework, no build tool)
- [Phosphor Icons](https://phosphoricons.com/) (CDN se load hote hain)
- Google Fonts: Inter + IBM Plex Mono

## Data

Sab data in-memory JavaScript arrays/objects mein hai (`app.js` ke andar
`SUBMISSIONS_DATASET`, `USER_ROLES_CONFIG`, `PERMISSIONS_MATRIX`, etc.) —
koi backend/database nahi hai. Page reload karte hi state reset ho jayegi.

## Key Features

- 7-step underwriting workflow (Intake → Clearance → Enrichment → Workbench
  → Authority & Referral → Rating → Quote & Bind)
- Role-based access control (7 personas: Assistant, Junior UW, Senior UW,
  CUO, Binding Ops, Auditor, Admin) — User Master se admin permission matrix
  edit kar sakta hai
- Archive & Decline Center — configurable retention policy, live eligibility
  computation, decline audit trail
- Quote Intelligence — renewal comparison, multi-quote comparison
- Unified Account View — cross-LOB customer records
- Team Activity dashboard (admin-only) — live pipeline chart + per-underwriter
  board
- Discretionary Pricing — post-rating credit/debit workflow
