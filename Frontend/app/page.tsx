'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, HeartHandshake, CircleDollarSign, FileCheck2, BarChart3, Check } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { fetchCampaigns, money, Campaign } from '@/lib/api';

export default function HomePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
  }, []);

  return (
    <AppShell>
      <section className="welcome-row">
        <div>
          <div className="kicker"><span className="pulse" /> Autonomous Audit & Verification Network</div>
          <h1>Blockchain-Based Autonomous Charity Fund Tracking and Verification System</h1>
          <p className="lead">Every rupee you give creates a traceable, immutable on-chain impact.</p>
        </div>
        <div className="date-pill"><span className="calendar-icon">▦</span>18 September 2026</div>
      </section>

      <section className="hero-panel" style={{ marginTop: '20px' }}>
        <div className="hero-copy">
          <div className="hero-tag"><ShieldCheck size={14} /> TRANSPARENCY BY DEFAULT</div>
          <h2>See where your<br /><span>kindness goes.</span></h2>
          <p>LedgerCare connects simulated fiat donations, fund allocation, and SHA-256 evidence in one open, verifiable audit record.</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <Link href="/campaigns" className="button light">
              Browse Campaigns <ArrowRight size={15} />
            </Link>
            <Link href="/transparency" className="button subtle" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
              Explore Public Audit
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="chain-node node-main"><Sparkles size={21} /></div>
          <div className="chain-node node-one"><CircleDollarSign size={16} /></div>
          <div className="chain-node node-two"><FileCheck2 size={16} /></div>
          <div className="chain-node node-three"><ShieldCheck size={16} /></div>
          <div className="hero-caption">
            <span className="mini-check"><Check size={11} /></span>
            <span><strong>All systems operational</strong><small>Hardhat Localnet Connected</small></span>
          </div>
        </div>
      </section>

      <div className="section-heading" style={{ marginTop: '40px' }}>
        <div>
          <div className="section-kicker">HOW IT WORKS</div>
          <h2>End-to-End Accountable Giving</h2>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div className="stat-card">
          <div className="stat-icon purple"><HeartHandshake size={18} /></div>
          <div>
            <div className="stat-label">1. Donate</div>
            <div className="stat-value">Simulated Fiat</div>
            <div className="stat-note">Payment reference PAY12345</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><CircleDollarSign size={18} /></div>
          <div>
            <div className="stat-label">2. Track Funds</div>
            <div className="stat-value">FundTracker.sol</div>
            <div className="stat-note">Recorded allocations</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><FileCheck2 size={18} /></div>
          <div>
            <div className="stat-label">3. Verify Evidence</div>
            <div className="stat-value">SHA-256 Hashes</div>
            <div className="stat-note">Digital integrity verified</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><BarChart3 size={18} /></div>
          <div>
            <div className="stat-label">4. Audit Trail</div>
            <div className="stat-value">Public Ledger</div>
            <div className="stat-note">Chronological events</div>
          </div>
        </div>
      </div>

      <div className="section-heading" style={{ marginTop: '40px' }}>
        <div>
          <div className="section-kicker">FEATURED CAMPAIGNS</div>
          <h2>Active Causes Making Impact</h2>
        </div>
        <Link href="/campaigns" className="text-button">View all campaigns <ArrowRight size={14} /></Link>
      </div>

      <section className="campaign-grid">
        {campaigns.slice(0, 3).map(c => {
          const progress = Math.min(100, Math.round((c.raised / c.target) * 100));
          return (
            <article className="campaign-card" key={c.id}>
              <div className={`campaign-glow ${c.accent}`} />
              <div className="campaign-head">
                <span className="eyebrow">{c.category}</span>
                <span className="status active"><span />{c.status}</span>
              </div>
              <h3>{c.title}</h3>
              <p className="muted">{c.charity}</p>
              <p className="campaign-description">{c.description}</p>
              <div className="campaign-amounts">
                <div><span>Raised</span><strong>{money(c.raised)}</strong></div>
                <div className="amount-right"><span>Goal</span><strong>{money(c.target)}</strong></div>
              </div>
              <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
              <div className="progress-meta">
                <span>{progress}% funded</span>
                <span>{c.days ? `${c.days} days left` : 'Completed'}</span>
              </div>
              <div className="campaign-actions">
                <Link href={`/campaign/${c.id}`} className="button primary">
                  View Details & Donate <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <footer style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--muted)' }}>
        <span>© 2026 LedgerCare — Blockchain-Based Autonomous Charity System</span>
        <span>Simulated Fiat Payments · Metadata Recorded On-Chain</span>
        <Link href="/transparency" style={{ color: 'inherit' }}>Privacy & Transparency</Link>
      </footer>
    </AppShell>
  );
}
