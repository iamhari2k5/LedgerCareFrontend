'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CircleDollarSign, WalletCards, FileCheck2, ShieldCheck, ArrowRight } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { fetchCampaigns, fetchDonations, fetchAllocations, fetchEvidence, money, Campaign } from '@/lib/api';

export default function PublicTransparencyPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">PUBLIC / READ-ONLY</div>
          <h2>Transparency Dashboard</h2>
        </div>
        <Link href="/transparency/audit" className="button light">
          Explore Public Audit Trail <ArrowRight size={15} />
        </Link>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple"><CircleDollarSign size={18} /></div>
          <div>
            <div className="stat-label">Total donations</div>
            <div className="stat-value">₹30.5L</div>
            <div className="stat-note">15 public records</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><WalletCards size={18} /></div>
          <div>
            <div className="stat-label">Funds allocated</div>
            <div className="stat-value">₹22.2L</div>
            <div className="stat-note">8 allocations</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><FileCheck2 size={18} /></div>
          <div>
            <div className="stat-label">Funds utilized</div>
            <div className="stat-value">₹17.29L</div>
            <div className="stat-note">Evidence-linked</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><ShieldCheck size={18} /></div>
          <div>
            <div className="stat-label">Verified evidence</div>
            <div className="stat-value">10 Files</div>
            <div className="stat-note">Hash integrity verified</div>
          </div>
        </div>
      </section>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">CAMPAIGN TRANSPARENCY</div>
          <h2>Open Campaign Records</h2>
        </div>
      </div>

      <div className="transparency-list">
        {campaigns.map(c => (
          <Link key={c.id} href={`/transparency/campaign/${c.id}`} className="transparency-row" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div>
              <strong>{c.title}</strong>
              <span>{c.id} · {c.charity}</span>
            </div>
            <div><small>Raised</small><b>{money(c.raised)}</b></div>
            <div><small>Utilized</small><b>{money(c.utilized)}</b></div>
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
