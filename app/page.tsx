'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight, BarChart3, Bell, Check, ChevronDown, CircleDollarSign,
  ClipboardCheck, ExternalLink, FileCheck2, HeartHandshake, LayoutDashboard,
  Menu, Search, ShieldCheck, Sparkles, WalletCards, X, Zap,
} from 'lucide-react'

type Campaign = { id: string; title: string; charity: string; category: string; raised: number; target: number; status: string; days: number; accent: string }

const campaigns: Campaign[] = [
  { id: 'CMP001', title: 'Education Support Program', charity: 'Hope Foundation', category: 'Education', raised: 725000, target: 1000000, status: 'Active', days: 103, accent: 'violet' },
  { id: 'CMP002', title: 'Rural Healthcare Access', charity: 'Seva Collective', category: 'Healthcare', raised: 480000, target: 650000, status: 'Active', days: 61, accent: 'cyan' },
  { id: 'CMP003', title: 'Clean Water for Vidarbha', charity: 'Jal Jeevan Trust', category: 'Community', raised: 910000, target: 1200000, status: 'Active', days: 42, accent: 'amber' },
]

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`

function Stat({ label, value, note, icon: Icon, tone }: { label: string; value: string; note: string; icon: typeof BarChart3; tone: string }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18} /></div><div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div></div>
}

function CampaignCard({ campaign, onDonate }: { campaign: Campaign; onDonate: (campaign: Campaign) => void }) {
  const progress = Math.round((campaign.raised / campaign.target) * 100)
  return <article className="campaign-card"><div className={`campaign-glow ${campaign.accent}`} /><div className="campaign-head"><span className="eyebrow">{campaign.category}</span><span className="status active"><span />{campaign.status}</span></div><h3>{campaign.title}</h3><p className="muted">{campaign.charity}</p><div className="campaign-amounts"><div><span>Raised</span><strong>{money(campaign.raised)}</strong></div><div className="amount-right"><span>Goal</span><strong>{money(campaign.target)}</strong></div></div><div className="progress-track"><div style={{ width: `${progress}%` }} /></div><div className="progress-meta"><span>{progress}% funded</span><span>{campaign.days} days left</span></div><div className="campaign-actions"><button className="button primary" onClick={() => onDonate(campaign)}>Donate now <ArrowRight size={15} /></button><button className="icon-button" aria-label="View campaign"><ExternalLink size={16} /></button></div></article>
}

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [selected, setSelected] = useState<Campaign | null>(null)
  const [donated, setDonated] = useState(false)
  const [amount, setAmount] = useState('5000')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => campaigns.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.charity.toLowerCase().includes(query.toLowerCase())), [query])

  const navItems = [
    ['Overview', LayoutDashboard], ['Campaigns', HeartHandshake], ['My donations', WalletCards], ['Transparency', ShieldCheck], ['Blockchain records', Zap],
  ] as const

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Sparkles size={17} /></div><span>ledger<span className="brand-dot">.</span>care</span></div>
      <div className="workspace"><span className="workspace-avatar">D</span><div><strong>Demo Donor</strong><small>Personal workspace</small></div><ChevronDown size={15} /></div>
      <div className="side-label">Workspace</div>
      <nav>{navItems.map(([label, Icon]) => <button key={label} className={active === label ? 'nav-active' : ''} onClick={() => { setActive(label); setMobileNav(false) }}><Icon size={17} />{label}{label === 'My donations' && <span className="nav-count">3</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="trust-card"><ShieldCheck size={18} /><div><strong>On-chain verified</strong><span>All records are public</span></div></div><button className="nav-item"><Bell size={17} />Notifications<span className="notification-dot" /></button><div className="sidebar-footer">LedgerCare v1.0.4<br /><span>Built for accountable giving</span></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu"><Menu size={20} /></button><div className="breadcrumb"><span>Donor workspace</span><ChevronDown size={14} /></div><div className="top-actions"><button className="top-icon"><Bell size={18} /><i /></button><div className="profile"><span>DK</span><strong>Demo Donor</strong><ChevronDown size={14} /></div></div></header>
      <div className="page-wrap">
        <section className="welcome-row"><div><div className="kicker"><span className="pulse" /> Live transparency network</div><h1>Good morning, <em>Demo.</em></h1><p className="lead">Every rupee you give creates a traceable impact.</p></div><div className="date-pill"><span className="calendar-icon">▦</span>18 September 2026</div></section>
        <section className="stats-grid"><Stat label="Total contributed" value="₹25,000" note="↑ 12% from last month" icon={CircleDollarSign} tone="purple" /><Stat label="Active donations" value="3" note="Across 3 campaigns" icon={HeartHandshake} tone="blue" /><Stat label="Impact tracked" value="96%" note="Funds with verified evidence" icon={FileCheck2} tone="green" /><Stat label="Network events" value="1,284" note="Public blockchain records" icon={BarChart3} tone="orange" /></section>
        <section className="hero-panel"><div className="hero-copy"><div className="hero-tag"><ShieldCheck size={14} /> TRANSPARENCY BY DEFAULT</div><h2>See where your<br /><span>kindness goes.</span></h2><p>LedgerCare connects donations, fund allocation, and evidence in one open, verifiable record.</p><button className="button light" onClick={() => setActive('Transparency')}>Explore transparency <ArrowRight size={15} /></button></div><div className="hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="chain-node node-main"><Sparkles size={21} /></div><div className="chain-node node-one"><CircleDollarSign size={16} /></div><div className="chain-node node-two"><FileCheck2 size={16} /></div><div className="chain-node node-three"><ShieldCheck size={16} /></div><div className="connection-line line-one" /><div className="connection-line line-two" /><div className="connection-line line-three" /><div className="hero-caption"><span className="mini-check"><Check size={11} /></span><span><strong>All systems operational</strong><small>Last block synced 2m ago</small></span></div></div></section>
        <section className="section-heading"><div><div className="section-kicker">FIND YOUR CAUSE</div><h2>Campaigns making an impact</h2></div><div className="section-controls"><div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search campaigns" /></div><button className="filter-button">All categories <ChevronDown size={15} /></button></div></section>
        <section className="campaign-grid">{filtered.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} onDonate={(item) => { setSelected(item); setDonated(false) }} />)}</section>
        <section className="bottom-grid"><div className="activity-card"><div className="card-title"><div><div className="section-kicker">RECENT ACTIVITY</div><h3>Your giving timeline</h3></div><button className="text-button" onClick={() => setActive('My donations')}>View all <ArrowRight size={14} /></button></div><div className="timeline"><div className="timeline-item"><div className="timeline-icon done"><Check size={14} /></div><div><strong>Donation recorded on-chain</strong><span>Education Support Program · 2 days ago</span></div><b>₹5,000</b></div><div className="timeline-item"><div className="timeline-icon purple"><FileCheck2 size={14} /></div><div><strong>Evidence hash verified</strong><span>Rural Healthcare Access · 5 days ago</span></div><b className="verified">Verified</b></div><div className="timeline-item"><div className="timeline-icon blue"><CircleDollarSign size={14} /></div><div><strong>Donation completed</strong><span>Clean Water for Vidarbha · 12 days ago</span></div><b>₹10,000</b></div></div></div><div className="impact-card"><div className="section-kicker">YOUR IMPACT</div><h3>Real giving.<br /><span>Real records.</span></h3><p>Your donations are connected to 8 verified fund allocations and 12 evidence records.</p><div className="impact-bar"><span style={{ width: '82%' }} /></div><div className="impact-footer"><strong>82% of your giving tracked</strong><ShieldCheck size={15} /></div></div></section>
        <footer><span>© 2026 LedgerCare</span><span>Simulated fiat payments · Metadata recorded on-chain</span><a href="#transparency">Privacy & transparency</a></footer>
      </div>
    </main>
    {selected && <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="donation-modal"><button className="close-modal" onClick={() => setSelected(null)} aria-label="Close"><X size={18} /></button>{donated ? <div className="success-state"><div className="success-icon"><Check size={28} /></div><div className="section-kicker">PAYMENT SUCCESSFUL</div><h2>Your gift is on its way.</h2><p>Your simulated fiat payment has been recorded and linked to the public audit trail.</p><div className="receipt"><div><span>Payment reference</span><strong>PAY{Math.floor(10000 + Math.random() * 89999)}</strong></div><div><span>Donation ID</span><strong>DON016</strong></div><div><span>Blockchain status</span><strong className="verified">RECORDED</strong></div></div><button className="button primary full" onClick={() => setSelected(null)}>Back to campaigns</button></div> : <><div className="section-kicker">SIMULATED FIAT PAYMENT</div><h2>Support {selected.title}</h2><p className="modal-copy">Your donation will be recorded as transparent payment metadata. No cryptocurrency is transferred.</p><label className="field-label">Donation amount</label><div className="amount-input"><span>₹</span><input value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} aria-label="Donation amount" /></div><div className="quick-amounts">{['1000', '2500', '5000', '10000'].map((value) => <button key={value} className={amount === value ? 'selected' : ''} onClick={() => setAmount(value)}>₹{Number(value).toLocaleString('en-IN')}</button>)}</div><button className="button primary full" onClick={() => setDonated(true)} disabled={!amount || Number(amount) < 100}>Proceed to payment <ArrowRight size={15} /></button><div className="secure-note"><ShieldCheck size={14} /> Demo environment · Secure by design</div></>}</div></div>}
  </div>
}
