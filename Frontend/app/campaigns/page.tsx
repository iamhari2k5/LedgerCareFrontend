'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { DonationModal } from '@/components/DonationModal';
import { fetchCampaigns, money, Campaign } from '@/lib/api';

export default function CampaignsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
  }, []);

  const filtered = useMemo(() => {
    return campaigns.filter(c =>
      (category === 'All' || c.category === category) &&
      (c.title.toLowerCase().includes(query.toLowerCase()) || c.charity.toLowerCase().includes(query.toLowerCase()))
    );
  }, [campaigns, query, category]);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CAMPAIGN DISCOVERY</div>
          <h2>Support Verified Charity Causes</h2>
        </div>
        <div className="section-controls">
          <div className="search-box">
            <Search size={16} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search campaigns or charities" />
          </div>
          <select className="filter-button" value={category} onChange={e => setCategory(e.target.value)}>
            <option>All</option>
            <option>Education</option>
            <option>Healthcare</option>
            <option>Community</option>
            <option>Livelihood</option>
            <option>Environment</option>
          </select>
        </div>
      </div>

      <section className="campaign-grid">
        {filtered.map(c => {
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
                <button className="button primary" onClick={() => setSelectedCampaign(c)}>
                  Donate now <ArrowRight size={15} />
                </button>
                <a href={`/campaign/${c.id}`} className="button subtle">Details</a>
              </div>
            </article>
          );
        })}
      </section>

      {selectedCampaign && (
        <DonationModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onSuccess={() => fetchCampaigns().then(setCampaigns)}
        />
      )}
    </AppShell>
  );
}
