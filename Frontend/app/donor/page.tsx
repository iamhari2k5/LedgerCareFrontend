'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CircleDollarSign, HeartHandshake, FileCheck2, BarChart3, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { fetchCampaigns, fetchDonations, money, Campaign, Donation } from '@/lib/api';

export default function DonorDashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
    fetchDonations().then(setDonations);
  }, []);

  return (
    <AppShell>
      <section className="welcome-row">
        <div>
          <div className="kicker"><span className="pulse" /> Live transparency network</div>
          <h1>Good morning, <em>Donor.</em></h1>
          <p className="lead">Every rupee you give creates a traceable impact.</p>
        </div>
        <div className="date-pill"><span className="calendar-icon">▦</span>18 September 2026</div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple"><CircleDollarSign size={18} /></div>
          <div>
            <div className="stat-label">Total contributed</div>
            <div className="stat-value">₹25,000</div>
            <div className="stat-note">↑ 12% from last month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><HeartHandshake size={18} /></div>
          <div>
            <div className="stat-label">Active donations</div>
            <div className="stat-value">{donations.length}</div>
            <div className="stat-note">Across {campaigns.length} campaigns</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><FileCheck2 size={18} /></div>
          <div>
            <div className="stat-label">Impact tracked</div>
            <div className="stat-value">96%</div>
            <div className="stat-note">Funds with verified evidence</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><BarChart3 size={18} /></div>
          <div>
            <div className="stat-label">Network events</div>
            <div className="stat-value">1,284</div>
            <div className="stat-note">Public blockchain records</div>
          </div>
        </div>
      </section>

      <section className="bottom-grid" style={{ marginTop: '32px' }}>
        <div className="activity-card">
          <div className="card-title">
            <div>
              <div className="section-kicker">RECENT ACTIVITY</div>
              <h3>Your giving timeline</h3>
            </div>
            <Link href="/donor/donations" className="text-button">View all <ArrowRight size={14} /></Link>
          </div>
          <div className="timeline">
            {donations.slice(0, 4).map((d, i) => (
              <div className="timeline-item" key={d.id}>
                <div className={`timeline-icon ${i ? 'purple' : 'done'}`}>{i ? <FileCheck2 size={14} /> : <Check size={14} />}</div>
                <div>
                  <strong>{i ? 'Evidence hash verified' : 'Donation recorded on-chain'}</strong>
                  <span>{d.campaignId} · {d.paymentReference}</span>
                </div>
                <b>{money(d.amount)}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="impact-card">
          <div className="section-kicker">YOUR IMPACT</div>
          <h3>Real giving.<br /><span>Real records.</span></h3>
          <p>Your donations are connected to verified fund allocations and evidence records.</p>
          <div className="impact-bar"><span style={{ width: '82%' }} /></div>
          <div className="impact-footer"><strong>82% of your giving tracked</strong><ShieldCheck size={15} /></div>
        </div>
      </section>
    </AppShell>
  );
}
