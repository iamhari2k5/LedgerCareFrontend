'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeartHandshake, CircleDollarSign, WalletCards, FileCheck2, ArrowRight } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { fetchCampaigns, fetchEvidence, money, Campaign } from '@/lib/api';
import { charityStats } from '@/lib/mock-api';

export default function CharityDashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CHARITY WORKSPACE</div>
          <h2>Hope Foundation Dashboard</h2>
        </div>
        <Link href="/charity/campaign/create" className="button primary">
          Create New Campaign <ArrowRight size={15} />
        </Link>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple"><HeartHandshake size={18} /></div>
          <div>
            <div className="stat-label">Total campaigns</div>
            <div className="stat-value">{campaigns.length}</div>
            <div className="stat-note">5 active campaigns</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><CircleDollarSign size={18} /></div>
          <div>
            <div className="stat-label">Funds received</div>
            <div className="stat-value">{money(charityStats.received)}</div>
            <div className="stat-note">15 public donations</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><WalletCards size={18} /></div>
          <div>
            <div className="stat-label">Funds utilized</div>
            <div className="stat-value">{money(charityStats.utilized)}</div>
            <div className="stat-note">57% of received funds</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><FileCheck2 size={18} /></div>
          <div>
            <div className="stat-label">Verified evidence</div>
            <div className="stat-value">10 Files</div>
            <div className="stat-note">0 pending review</div>
          </div>
        </div>
      </section>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">CAMPAIGN PERFORMANCE</div>
          <h2>My Active Campaigns</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Raised</th>
              <th>Allocated</th>
              <th>Utilized</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id}>
                <td><strong>{c.id}</strong><small>{c.title}</small></td>
                <td>{money(c.raised)}</td>
                <td>{money(c.allocated)}</td>
                <td>{money(c.utilized)}</td>
                <td><span className="status active"><span />{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
