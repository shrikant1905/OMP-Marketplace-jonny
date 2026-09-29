# OMP DEALS — COMPLETE CLIENT REQUIREMENT, ROLE, WORKFLOW & LIVE-TEST AUDIT REPORT

**Document Version:** 2.0.0 (Master Client Specification & Audit Edition)  
**Audit Date:** September 29, 2026  
**Auditor:** Antigravity Advanced Agentic AI Engine  
**Project:** OMP Deals Marketplace (OfferUp-Style Automotive Marketplace & Integrated Lead CRM)  
**Target Pilot Scenario:** One Auto Dealer / South Florida Live Test (**"Auto Money"**)  
**Repository Path:** `c:\kiaan project\omp-deals-marketplace`  

---

## 1. CLIENT CHAT LOGS & VERBATIM INSTRUCTIONS (THE SOURCE OF TRUTH)

The following communications were sent directly by the client (**Johnny / johnnybaums007**) defining the business scope, live-test parameters, and architectural boundaries:

```text
johnnybaums007 — Sep 27, 10:51 AM:
"My sales team would like to start using OMP Deals as we continue to build and improve the platform."

johnnybaums007 — Sep 27, 11:08 AM:
"within the OMP Deals Marketplace we would like to start testing the platform with One Auto Dealer as a realistic test. I would like to use OMP to have a CRM integration where it can import names, phone numbers, information and sales notes to close deals."

johnnybaums007 — Sep 27, 11:11 AM:
"no worries, I'm going to start traveling again, I'm just leaving you some notes."

johnnybaums007 — Sep 27, 11:12 AM:
"I'll just include the notes in a file and upload it. thank you"

johnnybaums007 — Sep 27, 2:14 PM:
"I think a live test will be the best way to know what works and what's needed for future implementation before a full launch. I want to keep OMP Deals project separate from the CRM nErgy software."
```

### Core Business Takeaways:
1. **OMP Deals is NOT CRM nErgy:** OMP Deals is an OfferUp-style automotive marketplace with its **own built-in Lead CRM**. CRM nErgy is a separate enterprise software. They must remain completely separate systems.
2. **Immediate Objective — South Florida Live Pilot:** Conduct a realistic pilot with **One Auto Dealer in South Florida** named **"Auto Money"**.
3. **Primary Lead Pipeline:** End User searches vehicle $\rightarrow$ enters "Auto Money" dealership profile $\rightarrow$ stays $>10$ seconds $\rightarrow$ triggers OMP Help Center AI Popup $\rightarrow$ selects buying timeline $\rightarrow$ shares phone upon agreement $\rightarrow$ creates qualified lead in OMP CRM $\rightarrow$ Dealership Liaison distributes lead $\rightarrow$ Sales Rep receives notification, opens lead, calls customer directly from app (Click-to-Call), and records sales notes.

---

## 2. EXECUTIVE SUMMARY & ARCHITECTURAL REALITY

### A. Architectural Reality in Codebase:
1. **Frontend-Only Application:** OMP Deals is currently a **100% Client-Side React 19 Single Page Application (SPA)** powered by Vite.
2. **No Backend Server:** There is **NO backend server** (no Node/Express/Fastify, no Python/Django/FastAPI).
3. **No Database:** There is **NO database** (no PostgreSQL, SQLite, MySQL, Prisma, or MongoDB).
4. **No REST API:** There are **zero API network calls** (`fetch()` or `axios`). All data is stored in transient React component `useState` and minimal browser `localStorage`.
5. **CRM nErgy Contamination:** Vestigial links to `CRM nErgy (Port 3000)` in `MarketplaceLayout.jsx` and an unreferenced CRM nErgy RBAC file (`src/utils/rbac.js`) exist in the repository and must be cleanly decoupled.

### B. South Florida Live-Test Readiness Score:
* 🟢 **PASS:** **0 / 22** Steps
* 🟡 **PARTIAL:** **3 / 22** Steps (Search UI renders, car cards display, static lead card exists)
* 🔴 **FAIL:** **19 / 22** Steps (10s timer missing, intent popup missing, phone consent missing, Click-to-Call broken, Liaison role missing)
* **Verdict:** **NOT READY FOR LIVE TEST** until the missing core lead pipeline and roles are implemented.

---

## 3. STRICT SEPARATION: OMP DEALS vs CRM nErgy

| Dimension | OMP Deals (This Project) | CRM nErgy (Separate Project) |
|---|---|---|
| **System Purpose** | Automotive Marketplace (OfferUp-style) + Integrated Dealership Lead CRM | Enterprise Dealership Operations CRM, ERP, HR, Finance, Inventory Management |
| **Port / Host** | Port `5173` (Vite SPA) | Port `3000` (Next.js / Node Server) |
| **Target Users** | Consumers (Car Buyers), Dealership Liaison, Sales Reps, Auto Brokers, AMP Affiliates | Dealership Corporate Executives, HR Managers, General Managers, Accounting/Finance |
| **Lead Mechanism** | 10s Profile Browsing $\rightarrow$ Intent AI Popup $\rightarrow$ Fast Lead Distribution $\rightarrow$ Click-to-Call | Heavy Sales Pipelines, Desking, Credit Application Bureau, Payroll, Enterprise Reporting |
| **Client Directive** | *"Keep OMP Deals project separate from the CRM nErgy software."* | Must NOT be merged, coupled, or redirected to from OMP Deals. |

---

## 4. THE 7 PLATFORM ROLES — COMPREHENSIVE SPECIFICATION & AUDIT

According to the client document `OMP Deals – South Florida Test.docx`, OMP Deals has **7 distinct roles / actors**.

```
                           ┌─────────────────────────────────────────┐
                           │         1. END USER / CONSUMER          │
                           │  (Searches, Browses, Asks, Posts Cars)  │
                           └────────────────────┬────────────────────┘
                                                │
                          Enters Profile & Stays >10s + Answers Popup
                                                │
                                                ▼
                           ┌─────────────────────────────────────────┐
                           │          2. AUTO DEALERSHIP             │
                           │         ("Auto Money" - S. FL)          │
                           └────────────────────┬────────────────────┘
                                                │
                                    Overseen & Managed by
                                                │
                                                ▼
                           ┌─────────────────────────────────────────┐
                           │          3. DEALERSHIP LIAISON          │
                           │   (OMP Platform Mgr for Dealership;     │
                           │    Triage, Distribute, Monitor Leads)   │
                           └───────┬────────────┼───────────┬────────┘
                                   │            │           │
                     ┌─────────────┘            │           └─────────────┐
                     ▼                          ▼                         ▼
        ┌─────────────────────────┐ ┌───────────────────────┐ ┌─────────────────────────┐
        │    4. SALES MANAGER     │ │     5. SALES REP      │ │     6. AUTO BROKER      │
        │ (Team Overviews, High-  │ │ (Inbox, BUY NOW Alert,│ │ (Independent Deals,     │
        │  Tier Leads, Escalation)│ │  Click-to-Call, Notes)│ │  Direct Negotiation)    │
        └─────────────────────────┘ └───────────────────────┘ └─────────────────────────┘
                                                │
                                                ▼
                                    ┌───────────────────────┐
                                    │   7. AUTO SALES AMP   │
                                    │ (Affiliate Marketing; │
                                    │  Promo, Referral Leads│
                                    └───────────────────────┘
```

---

### ROLE 1: END USER / CONSUMER (Car Buyers & Private Sellers)
* **Definition:** Non-professional consumers who buy and sell vehicles on the marketplace.
* **Responsibilities:**
  - Search vehicles by location (OfferUp-style 30-mile radius or specific ZIP code).
  - Filter by make, model, price, mileage, and condition.
  - Enter Auto Dealer marketplace profile (e.g. "Auto Money").
  - Have browsing tracked when staying $>10$ seconds in a dealer profile.
  - Answer the OMP Help Center AI Popup (*"How Soon Are You Looking To Buy?"*).
  - Explicitly consent to share phone number with the dealership.
  - Post vehicles for sale as private sellers (Peer-to-Peer).
  - Message sellers/dealers via in-app messaging.
  - View Community Police Safe MeetUp Spots.
* **Menus & Navigation in UI:**
  - `Marketplace / Search` (`/`)
  - `Cars & Trucks` (`/cars-trucks`)
  - `Post Ad (Sell Car)` (`/post-ad`)
  - `My Messages` (`/omp/crm/inbox`)
  - `Safe MeetUp Spots` (Modal trigger)
  - `My Saved Listings`
* **Audit Status:** 🟡 **PARTIAL**. Browsing and listing views exist, but 10s timer, Help Center intent modal, and phone consent check are missing.

---

### ROLE 2: AUTO DEALERSHIP (Business Entity — "Auto Money")
* **Definition:** A licensed retail dealership business selling new and used vehicles in South Florida.
* **Responsibilities:**
  - Maintain a public Dealership Marketplace Profile (Lot Storefront) showcasing inventory, address, business hours, and phone.
  - Manage inventory feeds (DMS sync: CDK, DealerSocket, vAuto).
  - Host sales organization roster (Liaison, Managers, Reps).
  - Access dealership-level sales and lead analytics.
* **Menus & Navigation in UI:**
  - `Dealership Lot Profile` (`/omp/dealer/:id`) — *Public facing for buyers*
  - `Verified Dealer Dashboard` (`/omp/verified-dealer`)
  - `Inventory Manager / DMS Sync` (`/omp/inventory/feeds`)
  - `Deal Desking 4-Square` (`/omp/desking/calculator`)
  - `Contract Jackets & E-Sign` (`/omp/deals/e-sign`)
  - `Dealership Sales Team` (`/omp/executive/permissions`)
* **Audit Status:** 🟡 **PARTIAL**. The internal `VerifiedDealerDashboard` exists, but there is **no public dealership storefront page** (`/omp/dealer/:id`) for buyers to visit!

---

### ROLE 3: DEALERSHIP LIAISON (The OMP Platform Manager)
* **Definition:** **The OMP Deals platform representative manager acting on behalf of the Auto Dealership.** This is the primary operational administrator inside the dealership who manages sales personnel and controls lead distribution.
* **Responsibilities:**
  - Manage Sales Managers, Sales Reps, Auto Brokers, and Auto Sales AMP participants.
  - Triage incoming leads arriving from the 10-second browsing trigger and Help Center popup.
  - **Determine access level:** Decide which sales level receives each lead based on the Lead Qualification Tier.
  - **Distribute leads:** Manually or automatically route leads to Sales Reps, Managers, Brokers, or AMP affiliates.
  - **Post vehicles** on OMP Deals on behalf of the dealership.
  - **Monitor leads post-release:** Continue tracking lead response times, rep notes, call records, and stage changes even after the lead is assigned.
  - Access dealership lead qualification reports.
* **Menus & Navigation in UI:**
  - `Liaison Command Desk` (`/omp/crm/liaison`)
  - `Incoming Lead Queue` (Filterable by `BUY NOW`, `New Lead`, `Shopping Around`)
  - `Lead Distribution Engine` (Assign to Rep / Manager / Broker / AMP)
  - `Sales Roster Management` (`/omp/executive/permissions`)
  - `Post Dealer Inventory` (`/post-ad`)
  - `Lead Activity & Post-Release Monitor` (`/omp/crm/lead-monitor`)
  - `Dealership Reports` (`/omp/crm/reports`)
* **Audit Status:** 🔴 **COMPLETELY MISSING**. Zero code exists. The role is not in `AuthContext.jsx`, has no routes in `App.jsx`, and no lead distribution interface.

---

### ROLE 4: SALES MANAGER
* **Definition:** Dealership sales executive overseeing the retail sales floor and sales reps.
* **Responsibilities:**
  - View all dealership leads and incoming lead flow.
  - Monitor sales rep response times and call activity.
  - Review `BUY NOW` hot leads and high-tier opportunities.
  - Intervene/reassign stagnant leads.
  - Review desking calculations and deal structures.
* **Menus & Navigation in UI:**
  - `Sales Manager Dashboard` (`/omp/crm/manager`)
  - `All Dealership Leads` (`/omp/leads/top-indicators`)
  - `Sales Rep Activity Tracker`
  - `60s Deal Desking` (`/omp/desking/calculator`)
  - `E-Sign Contract Approvals` (`/omp/deals/e-sign`)
* **Audit Status:** 🔴 **MISSING**. Only legacy CRM nErgy `sales` exists in unused `rbac.js`. No Sales Manager dashboard exists in OMP Deals.

---

### ROLE 5: SALES REP (Dealership Floor Salesperson)
* **Definition:** Retail salesperson working for the dealership who directly closes car deals with buyers.
* **Responsibilities:**
  - Receive assigned leads from the Dealership Liaison.
  - Receive instant push/visual notifications for new leads.
  - See `BUY NOW` flashing red hot-lead indicator for immediate response.
  - View permitted customer info (Name, Phone, Email — only when customer consented).
  - View vehicle/search context (exact car viewed, price, stock #, search parameters).
  - **Call the lead directly from within the app (Click-to-Call).**
  - Add sales notes and record interaction history.
  - Update lead status (`Contacted`, `Appointment Set`, `Test Drive`, `Deal Desked`, `Sold`, `Lost`).
  - **Post vehicles** on OMP Deals.
* **Menus & Navigation in UI:**
  - `My Lead Inbox` (`/omp/crm/rep-inbox`)
  - `Hot Leads / BUY NOW Alerts` (`/omp/leads/top-indicators`)
  - `Lead Detail Dossier & Click-to-Call`
  - `Sales Notes & Activity Timeline`
  - `Post Inventory Listing` (`/post-ad`)
* **Audit Status:** 🟡 **PARTIAL / BROKEN**. `TopLeadIndicator.jsx` shows mock leads, but:
  1. The Click-to-Call button has **NO `onClick` handler** (completely non-functional).
  2. Sales notes cannot be entered or saved.
  3. No dedicated Rep login or rep-specific inbox exists.

---

### ROLE 6: AUTO BROKER
* **Definition:** An independent automotive professional acting as an intermediary between car buyers and dealerships, negotiating vehicle transactions.
* **Responsibilities:**
  - Receive delegated leads approved by the Dealership Liaison.
  - View qualified buyer dossiers and search preferences.
  - Receive `BUY NOW` notifications when authorized by the dealership.
  - Contact leads directly via Click-to-Call or in-app messaging.
  - **Post vehicles** on OMP Deals Marketplace.
* **Menus & Navigation in UI:**
  - `Broker Deal Desk` (`/omp/crm/broker`)
  - `Broker Assigned Leads`
  - `Marketplace Car Listings` (`/cars-trucks`)
  - `Post Vehicle Listing` (`/post-ad`)
  - `In-App Messaging` (`/omp/crm/inbox`)
* **Audit Status:** 🔴 **MISSING**. Only referenced in real estate and business brokerage categories. No automotive sales broker implementation exists.

---

### ROLE 7: AUTO SALES AMP (Affiliate Marketing Program)
* **Definition:** Independent affiliates and marketing partners who promote car sales through online channels, personal networks, or social media and earn commissions.
* **Responsibilities:**
  - Generate and receive sales opportunities through personal referral links and digital campaigns.
  - Receive lower-funnel leads delegated by the Dealership Liaison.
  - Track referral traffic and lead status.
  - **Post vehicles** on OMP Deals Marketplace.
* **Menus & Navigation in UI:**
  - `AMP Affiliate Portal` (`/omp/crm/amp`)
  - `Referral Link Generator & Campaign Tracker`
  - `Assigned Leads & Inquiries`
  - `Commission & Attribution Summary`
  - `Post Car Listing` (`/post-ad`)
* **Audit Status:** 🔴 **COMPLETELY MISSING**. Zero code exists for AMP roles, referral tracking, or affiliate lead assignment.

---

## 5. VEHICLE POSTING PERMISSION MATRIX

The client document explicitly states:
> *"WHO Are The People Posting On OMP Deals?  
> End Users / Consumers, Dealership Liaison, Auto Dealerships (Sales Reps, Auto Brokers), Auto Sales Affiliate Marketing Program [Auto Sales AMP] post cars on OMP Deals Marketplace."*

| Role | Can Post Vehicles? | Listing Type | Management Interface |
|---|---|---|---|
| **End User / Consumer** | ✅ YES | Private Seller (Peer-to-Peer) | `/post-ad` (Fast Ad Wizard) |
| **Dealership Liaison** | ✅ YES | Dealership Certified Lot Inventory | `/post-ad` or DMS Sync `/omp/inventory/feeds` |
| **Auto Dealership Entity** | ✅ YES | Commercial Dealership Lot | DMS Automated Feed Sync (CDK, DealerSocket) |
| **Sales Rep** | ✅ YES | Dealership Inventory with Rep Tag | `/post-ad` linked to Dealership |
| **Auto Broker** | ✅ YES | Brokered / Represented Vehicles | `/post-ad` with Broker Badge |
| **Auto Sales AMP** | ✅ YES | Affiliate / Promoted Vehicle Listings | `/post-ad` with AMP Referral Tag |

---

## 6. OFFERUP-STYLE BROWSING & ENGAGEMENT MODEL

Per client document `Offerup end user engagement browsing.docx`, OMP Deals implements OfferUp's core engagement mechanics:

```
[User on Home Page] ──► [Location Selector: 30-Mi Radius / ZIP] ──► [Filtered Local Feed]
                                                                            │
      ┌─────────────────────────────────────────────────────────────────────┘
      ▼
[In-App Messaging] ──► Direct negotiation without exposing private info
[TruYou / Verified Profiles] ──► ID & business ratings building trust
[Police Safe MeetUp Spots] ──► 1,600+ inspected safe physical exchange zones
```

### Audit of OfferUp Features in OMP Deals:
1. **Search Location (30-Mile Radius / ZIP):** 🟢 **WORKING**. Filter bar allows picking city, entering 5-digit ZIP, and selecting radius ($15, 30, 50\text{ miles}$). Implemented in `MarketplaceLayout.jsx` and `OmpMarketplace.jsx`.
2. **In-App Messaging:** 🟡 **PARTIAL**. Implemented in `UnifiedInbox.jsx` as a chat UI, but not currently tied to buyer vehicle browsing or lead generation.
3. **User Profiles & Badges:** 🟢 **WORKING**. TruYou verified badges and dealer ratings appear on car cards.
4. **Community Police Safe MeetUp Spots:** 🟢 **WORKING**. `PoliceSafeSpotsModal.jsx` provides an interactive searchable directory with Google Maps integration.

---

## 7. OMP HELP CENTER AI & 10-SECOND BEHAVIORAL TRIGGER

This is the primary automated lead capture mechanism demanded by Johnny:

```
[End User Conducts Vehicle Search]
               │
               ▼
[Enters "Auto Money" Dealership Profile]
               │
               ▼
   [Timer: 10 Continuous Seconds]
               │
       > 10 Seconds Elapsed
               │
               ▼
 ┌─────────────────────────────────────────────────────────────┐
 │            OMP HELP CENTER AI POPUP MODAL                   │
 │                                                             │
 │   "How Soon Are You Looking To Buy?"                        │
 │                                                             │
 │   [ 1. NOW or within 24 hours ]   ──► Qualifies as BUY NOW   │
 │   [ 2. Within 2–5 days        ]   ──► Qualifies as SHOPPING │
 │   [ 3. 1 week                 ]   ──► Qualifies as TAKING   │
 │   [ 4. Just Browsing          ]   ──► Low intent browsing   │
 │                                                             │
 │   ☑ "I agree to allow Auto Money to contact me regarding    │
 │      this vehicle at my profile phone number."              │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
         [Phone Number Automatically Imported & Shared]
                                │
                                ▼
         [Qualified Lead Record Dispatched to OMP CRM]
```

### Audit Status:
* 10-Second Timer: 🔴 **MISSING** (No timer exists on any page).
* "How Soon Are You Looking To Buy?" Modal: 🔴 **MISSING** (Only generic chatbot modal exists).
* Phone Consent Checkbox: 🔴 **MISSING** (Fake phones hardcoded without consent).

---

## 8. LEAD QUALIFICATION SYSTEM (5 EXACT TIERS)

| Qualification Tier | Client Document Trigger | Expected UI / Behavioral Indicator | Assigned Audience | Existing Code Status |
|---|---|---|---|---|
| **1. BUY NOW** | User selects *"NOW or 24 hours"* in Help Center popup | 🔥 **Flashing / Blinking Red HOT LEAD Alert** visible across CRM headers and lead cards | Sales Reps, Auto Brokers, Auto Sales AMP, Dealership Liaison | 🟡 **YELLOW** (Static red pill; no flashing animation; hardcoded) |
| **2. Buyer Shopping Around** | User selects *"Within 2–5 days"* OR compares $>10$ listings | 🟡 Yellow Badge: *"Ready to Buy in 2–5 Days"* | Dealership Liaison, Sales Reps | 🔴 **RED** (Missing calculation and tier) |
| **3. Taking Time** | User selects *"1 week"* in Help Center popup | 🔵 Blue Badge: *"Looking in 1 Week+"* | Dealership Liaison, Auto Brokers, AMP | 🔴 **RED** (Missing) |
| **4. Shopping Around** | User selects *"Just Browsing"* | ⚪ Gray Badge: *"Casual Browser / Low Intent"* | Dealership Liaison, Auto Sales AMP | 🔴 **RED** (Missing) |
| **5. New Lead** | User created OMP account $<24\text{ hours}$ ago and visits dealer profile | ⚡ **Flashing / Blinking "New Lead" Notification** for exactly 24 hours; then defaults to popup answer | All Sales Staff | 🔴 **RED** (No 24h timer or expiration logic exists) |

---

## 9. DEALERSHIP LIAISON LEAD DISTRIBUTION WORKFLOW

```
Incoming Qualified Lead Arrives at Dealership ("Auto Money")
                           │
                           ▼
          ┌──────────────────────────────────┐
          │  DEALERSHIP LIAISON QUEUE        │
          │  - Lead Urgency: BUY NOW / New   │
          │  - Customer Consent: Granted     │
          │  - Vehicle: 2024 Ford F-150      │
          └────────────────┬─────────────────┘
                           │
             Liaison Selects Distribution Level
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  SALES REP   │   │ AUTO BROKER  │   │AUTO SALES AMP│
│ (Retail Lot) │   │(Negotiator)  │   │ (Affiliate)  │
└───────┬──────┘   └───────┬──────┘   └───────┬──────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
          ┌──────────────────────────────────┐
          │  POST-RELEASE MONITORING         │
          │  Liaison continues to monitor:   │
          │  - Time to first contact         │
          │  - Call logs from Click-to-Call  │
          │  - Sales notes and deal stage    │
          └──────────────────────────────────┘
```

---

## 10. SALES TEAM CRM WORKSPACE (CLICK-TO-CALL & NOTES)

The client specifically stated:
> *"The Sales Team will be able to call the lead directly from the app."*  
> *"I would like to use OMP to have a CRM integration where it can import names, phone numbers, information and sales notes to close deals."*

### Code-Level Audit of Sales Features:
1. **Direct Click-to-Call Button:**
   - **Location:** `src/pages/omp/leads/TopLeadIndicator.jsx` Lines 435–438:
     ```jsx
     <button style={{ background: '#10b981', color: '#fff', ... }}>
       <Phone size={14} />
       <span>Click-to-Call</span>
     </button>
     ```
   - **CRITICAL FINDING:** **The button has ZERO `onClick` handler!** Clicking it does absolutely nothing.
   - **Required Fix:** Connect to real device dialer (`window.location.href = 'tel:' + lead.phone`), display call confirmation dialog, and automatically append a *"Call initiated"* entry to the lead's activity history.
2. **Sales Notes & Activity History:**
   - **Location:** `TopLeadIndicator.jsx`
   - **CRITICAL FINDING:** There is **NO input field** for sales reps to type notes, no follow-up date picker, and no activity history timeline.

---

## 11. SOUTH FLORIDA / ONE AUTO DEALER ("AUTO MONEY") LIVE-TEST ACCEPTANCE AUDIT

The following **22-step audit checklist** evaluates the end-to-end pilot workflow using the exact code paths:

| # | Step Description | Expected Code Execution | Current Reality | Result |
|---|---|---|---|---|
| **1** | End User registers OMP account | Account stored with name, email, phone, consent | Mock presets in `AuthContext`; no phone/consent stored | 🔴 **FAIL** |
| **2** | End User searches vehicles in South Florida | Radius/ZIP search returns South Florida cars | Search works, but defaults to CA/TX cities | 🟡 **PARTIAL** |
| **3** | Enters "Auto Money" dealership profile | `/omp/dealer/:id` displays Auto Money storefront | No "Auto Money" profile; no dealer storefront route | 🔴 **FAIL** |
| **4** | User stays on profile $>10$ seconds | Timer hook records continuous duration | No timer or duration listener in code | 🔴 **FAIL** |
| **5** | Tracking begins | Visit event logged for user and dealer | No tracking or session persistence | 🔴 **FAIL** |
| **6** | Help Center AI Popup appears | Modal asks *"How Soon Are You Looking To Buy?"* | No popup modal exists | 🔴 **FAIL** |
| **7** | User selects intent tier | User clicks 1 of 4 choices | Cannot select (modal missing) | 🔴 **FAIL** |
| **8** | Customer grants phone consent | Checkbox authorizes phone sharing | No consent mechanism | 🔴 **FAIL** |
| **9** | Lead created in OMP CRM | Lead record instantiated with vehicle & intent | Only 4 static hardcoded mock leads exist | 🔴 **FAIL** |
| **10** | Correct qualification displayed | `BUY NOW`, `Buyer Shopping Around`, etc. | Displays generic `HOT_LEAD` or `HIGH_INTENT` | 🔴 **FAIL** |
| **11** | Flashing notification generated | Blinking CSS indicator for `BUY NOW` | Static red text only; no flashing animation | 🔴 **FAIL** |
| **12** | Dealership Liaison sees lead | Lead appears in Liaison Triage Desk | Dealership Liaison role does not exist | 🔴 **FAIL** |
| **13** | Liaison distributes lead | Liaison assigns to Sales Rep, Broker, or AMP | No assignment UI or logic exists | 🔴 **FAIL** |
| **14** | Sales Rep alerted of lead | Notification badge appears in Rep view | Hardcoded static `'5'` badge in sidebar | 🔴 **FAIL** |
| **15** | Rep opens assigned lead | Rep views lead dossier | Can view static lead card in `TopLeadIndicator` | 🟡 **PARTIAL** |
| **16** | Rep views customer info | Customer name and phone displayed | Fake hardcoded numbers shown without consent | 🔴 **FAIL** |
| **17** | Rep views vehicle context | Car make, model, stock #, price shown | Displays static card data | 🟡 **PARTIAL** |
| **18** | Rep initiates Click-to-Call | App launches device dialer (`tel:`) | Button has **NO onClick handler** | 🔴 **FAIL** |
| **19** | Rep adds sales note | Rep saves note text to lead record | No input field; nowhere to save notes | 🔴 **FAIL** |
| **20** | Rep updates lead status | Status changed to `Contacted` / `Sold` | Status cannot be updated | 🔴 **FAIL** |
| **21** | Liaison monitors post-release | Liaison tracks rep response & call time | Liaison portal does not exist | 🔴 **FAIL** |
| **22** | Analytics reflect conversion | Dealership lead conversion stats update | Reports are static mock numbers | 🔴 **FAIL** |

**Summary Score:** **0 PASS, 3 PARTIAL, 19 FAIL**.

---

## 12. DATABASE & PERSISTENCE AUDIT

* **Database Engine:** **NONE**. No PostgreSQL, SQLite, MySQL, or MongoDB.
* **ORM:** **NONE**. No Prisma schema or migration files.
* **Browser Persistence:**
  - `localStorage.getItem('omp_user')` — Current active user role preset.
  - `localStorage.getItem('omp_custom_listings')` — User-created fast ads.
  - `localStorage.getItem('omp_theme')` — Theme preference.
* **Lead State:** Stored in a static array inside `TopLeadIndicator.jsx`. Any changes vanish on page refresh.

---

## 13. API & ENDPOINTS AUDIT

| API Route | Method | Server-Side Endpoint | Auth Guard | Role Check | DB Persistence | Status |
|---|---|---|---|---|---|---|
| User Login / Switch | POST | ❌ None | ❌ None | ❌ None | `localStorage` | **Client-Side Only** |
| Dealership Profile View | GET | ❌ None | ❌ None | ❌ None | ❌ None | **MISSING** |
| 10s Timer Ping | POST | ❌ None | ❌ None | ❌ None | ❌ None | **MISSING** |
| Submit Intent Popup | POST | ❌ None | ❌ None | ❌ None | ❌ None | **MISSING** |
| Create CRM Lead | POST | ❌ None | ❌ None | ❌ None | ❌ None | **MISSING** |
| Liaison Lead Queue | GET | ❌ None | ❌ None | ❌ None | ❌ None | **MISSING** |
| Distribute Lead | POST | ❌ None | ❌ None | ❌ None | ❌ None | **MISSING** |
| Click-to-Call Dial | POST | ❌ None | ❌ None | ❌ None | ❌ None | **MISSING** |
| Add Sales Note | POST | ❌ None | ❌ None | ❌ None | ❌ None | **MISSING** |

---

## 14. CRM nErgy SEPARATION AUDIT & EVIDENCE

| Contamination Item | File Path | Line Range | Finding | Action Required |
|---|---|---|---|---|
| **Port 3000 SSO Link** | `src/layouts/MarketplaceLayout.jsx` | Lines 122–144 | `<Link to="http://localhost:3000">Switch to CRM nErgy AI (Port 3000)</Link>` | **Remove link** |
| **Legacy RBAC File** | `src/utils/rbac.js` | Lines 1–402 | `CRM nErgy Enterprise + OAL Network Marketplace` | **Decouple / Isolate** |
| **Copyright Declaration**| `src/layouts/MarketplaceLayout.jsx` | Line 543 | `© 2026 OMP Deals • OAL Network & CRM nErgy Ecosystem` | **Update to OMP Deals only** |
| **Corporate Email Domain**| `src/context/AuthContext.jsx` | Line 31 | `alexander.wright@nergy.io` | **Change to ompdeals.com** |

---

## 15. PRIORITY ACTION PLAN (P0 / P1 / P2 ROADMAP)

### P0 — BLOCKERS (Mandatory for South Florida Live Test with "Auto Money"):
1. **Public Dealership Storefront:** Create `/omp/dealer/:id` for **"Auto Money" (South Florida)** displaying dealership info, address, phone, and active inventory.
2. **10-Second Browsing Hook:** Implement `useDealerProfileTimer` that triggers lead tracking after the buyer spends $>10$ seconds on the Auto Money profile.
3. **OMP Help Center AI Popup Modal:** Build the intent modal with the exact 4 choices:
   - `NOW or 24 hours`
   - `Within 2–5 days`
   - `1 week`
   - `Just Browsing`
   Plus customer phone consent checkbox.
4. **5-Tier Lead Qualification Engine:**
   - `BUY NOW`: Flashing red animated indicator (`@keyframes pulse/flash`).
   - `Buyer Shopping Around`: 2–5 days ready to buy.
   - `Taking Time`: 1 week+.
   - `Shopping Around`: Casual browsing.
   - `New Lead`: 24-hour blinking badge.
5. **Dealership Liaison Command Desk (`/omp/crm/liaison`):**
   - View incoming qualified leads in real time.
   - Assign leads to Sales Reps, Sales Managers, Auto Brokers, or Auto Sales AMP.
   - Post-release monitoring view to track rep follow-ups.
6. **Sales Rep Workspace & Click-to-Call Fix:**
   - Fix Click-to-Call button at `TopLeadIndicator.jsx` with real `tel:` dialer.
   - Add Sales Notes textarea with date/time stamped entry log.
   - Add Lead Status dropdown (`Contacted`, `Appointment`, `Sold`).
7. **Purge CRM nErgy SSO Links:** Remove the port 3000 external links from `MarketplaceLayout.jsx`.

### P1 — REQUIRED FOR WIDER LAUNCH:
1. **Auto Broker & AMP Dedicated Portals:** Add dedicated broker and affiliate workspaces.
2. **Persistent Lead Store:** Wrap leads in a persistent `localStorage` / `IndexedDB` manager so leads survive browser refreshes.
3. **Push / In-App Notification Center:** Dropdown bell notification alerting reps of new assignments.

### P2 — FUTURE ENHANCEMENTS:
1. **Node/PostgreSQL Backend Server:** Migrate from client storage to a secure production API.
2. **Real-time WebSockets:** Live lead streaming without page refresh.
3. **Twilio VoIP WebRTC Dialing:** In-browser calling with audio recording.

---

## 16. MASTER PROMPT FOR FUTURE AUDITS & CHECKS

*Copy and paste the prompt below into Antigravity at any time to verify compliance:*

```markdown
# OMP DEALS — ACCEPTANCE VERIFICATION & AUDIT PROMPT

Please audit the current OMP Deals Marketplace codebase against the client requirements defined in OMP_DEALS_COMPLETE_AUDIT_REPORT.md:

1. TARGET DEALERSHIP: Is "Auto Money" in South Florida configured as the primary live-test dealership?
2. 7 ROLES: Do End User, Auto Dealership, Dealership Liaison, Sales Manager, Sales Rep, Auto Broker, and Auto Sales AMP exist with their dedicated permissions and views?
3. 10-SECOND TIMER: Does browsing an Auto Dealer profile for >10 seconds trigger lead tracking?
4. HELP CENTER POPUP: Does the "How Soon Are You Looking To Buy?" popup appear with the 4 exact options and a phone consent checkbox?
5. 5 QUALIFICATION TIERS: Are BUY NOW (flashing), Buyer Shopping Around, Taking Time, Shopping Around, and New Lead (24h flashing) implemented?
6. DEALERSHIP LIAISON: Can the Liaison triage, assign leads to Reps/Brokers/AMP, and monitor them post-release?
7. CLICK-TO-CALL: Does the Click-to-Call button have a functional onClick handler that launches the phone dialer and logs the call event?
8. SALES NOTES: Can sales personnel enter and save notes and status updates on lead cards?
9. CRM nErgy SEPARATION: Are all port 3000 links and CRM nErgy references removed?
10. CAR POSTING: Can End Users, Liaison, Sales Reps, Auto Brokers, and AMP participants post cars on OMP Deals?

Run code checks and report the exact pass/fail status for each item with file and line references.
```
