# Blockchain-Based Autonomous Charity Fund Tracking and Verification System

A complete final-year engineering solution integrating an Express/Node.js backend, a Next.js frontend UI, and Ethereum smart contracts running on a local Hardhat network for transparent, accountable charity giving.

---

## 1. System Architecture

```text
                    ┌──────────────────────┐
                    │      FRONTEND        │
                    │ React / Next.js UI   │
                    │ Existing UI           │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │       BACKEND        │
                    │ Node.js + Express    │
                    │ Authentication       │
                    │ Business Logic       │
                    │ Payment Simulation   │
                    │ Database             │
                    │ IPFS / Evidence      │
                    │ Blockchain Service   │
                    └───────┬───────┬──────┘
                            │       │
                    Database│       │ethers.js
                            │       │
                            ▼       ▼
                       ┌───────┐ ┌──────────────────┐
                       │ DB    │ │ Hardhat Localnet │
                       └───────┘ └────────┬─────────┘
                                          │
                                          ▼
                                ┌────────────────────┐
                                │ Solidity Contracts │
                                │ CharityRegistry    │
                                │ CampaignManager    │
                                │ DonationLedger     │
                                │ FundTracker        │
                                │ EvidenceRegistry   │
                                └────────────────────┘

                          Evidence
                             │
                             ▼
                           IPFS
```

---

## 2. Critical Payment Architecture (Simulated Fiat Only)

* **FIAT DONATIONS ONLY (INR ₹)**: No cryptocurrency or MetaMask is required for donors.
* **Separation of Concerns**:
  * **Fiat Payment Gateway**: Simulated processing produces a payment reference `PAY12345` and creates donation record `DON001`.
  * **Blockchain Audit Ledger**: The backend records donation metadata and payment reference on-chain via `DonationLedger.sol` producing a transaction hash `0x...`.
  * **Clarification**: Blockchain records prove existence and integrity of donation metadata; it does NOT independently prove physical banking transfers.

---

## 3. Smart Contracts & Addresses (Hardhat Localnet)

Deployed on Chain ID `31337` (`http://127.0.0.1:8545`):

* `CharityRegistry`: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
* `CampaignManager`: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
* `DonationLedger`: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`
* `FundTracker`: `0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9`
* `EvidenceRegistry`: `0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9`

---

## 4. Folder Structure

```text
blockchain-charity/
│
├── BlockChain/
│   ├── contracts/
│   │   ├── CharityRegistry.sol
│   │   ├── CampaignManager.sol
│   │   ├── DonationLedger.sol
│   │   ├── FundTracker.sol
│   │   └── EvidenceRegistry.sol
│   ├── scripts/deploy.js
│   ├── deployed-addresses.json
│   └── hardhat.config.js
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── dev.db
│   ├── uploads/
│   ├── test/
│   ├── .env.example
│   └── package.json
│
├── Frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   ├── api.ts
│   │   └── mock-api.ts
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 5. Quick Start Instructions

### Step 1 — Blockchain Node & Deployment

```bash
# Terminal 1: Start Hardhat local node
cd BlockChain
npm install
npx hardhat node

# Terminal 2: Deploy smart contracts
cd BlockChain
npx hardhat run scripts/deploy.js --network localhost
```

### Step 2 — Backend Service & Database Setup

```bash
# Terminal 3: Start Backend API
cd Backend
npm install
npx prisma db push
npm run seed
npm run dev
```

Backend will start on `http://localhost:5000` with health check at `http://localhost:5000/api/health`.

### Step 3 — Frontend UI

```bash
# Terminal 4: Start Next.js Frontend
cd Frontend
pnpm install
pnpm dev
```

Frontend will be accessible at `http://localhost:3000`.

---

## 6. Main REST API Endpoints

* `POST /api/auth/register` — Register User (`DONOR` or `CHARITY`)
* `POST /api/auth/login` — Authenticate & obtain JWT
* `GET  /api/charities` — List charities registered on DB & Blockchain
* `POST /api/charities` — Register charity & record on `CharityRegistry.sol`
* `GET  /api/campaigns` — Fetch active campaigns
* `POST /api/campaigns` — Create campaign & record on `CampaignManager.sol`
* `POST /api/payments/create` — Simulate fiat payment attempt
* `POST /api/donations` — Record fiat donation & store metadata on `DonationLedger.sol`
* `POST /api/funds` — Record fund allocation on `FundTracker.sol`
* `POST /api/evidence` — Upload evidence file, calculate SHA-256 hash & CID, register on `EvidenceRegistry.sol`
* `POST /api/evidence/:id/verify` — Verify evidence file digital hash integrity
* `GET  /api/transparency` — Combined public transparency overview
* `GET  /api/blockchain/info` — Network status and smart contract addresses

---

## 7. End-to-End Demonstration Steps

1. **Charity Registration**: Register charity "Green Hope Foundation" (`CH001`) and record on `CharityRegistry.sol`.
2. **Campaign Creation**: Create campaign "Education Support for Rural Students" (`CMP001`) and record on `CampaignManager.sol`.
3. **Donor Contribution**: Select ₹5,000 donation amount on campaign detail.
4. **Simulated Payment**: System generates payment reference `PAY12345` with status `SUCCESS`.
5. **Donation Record**: System assigns donation ID `DON001` and records metadata on `DonationLedger.sol`.
6. **Blockchain Audit Receipt**: View recorded transaction hash `0x...` on receipt modal.
7. **Fund Allocation**: Charity allocates ₹3,000 for "Learning materials" (`ALLOC001`) on `FundTracker.sol`.
8. **Evidence Upload**: Upload `invoice.pdf` (`EVD001`), producing SHA-256 hash and IPFS CID `QmMock...`.
9. **Hash Verification**: Verify SHA-256 hash integrity against on-chain record.
10. **Public Transparency Audit**: Inspect complete public audit timeline on Transparency dashboard.

---

## 8. Disclaimer & Limitations

* **Evidence Verification**: Hash verification confirms the digital integrity of referenced files. It does not independently verify physical real-world events.
* **Payments**: Payments are simulated fiat gateway transactions. No cryptocurrency or ETH transfers occur during donation.
