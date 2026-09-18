'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, ShieldCheck, HeartHandshake, FileCheck2, CircleDollarSign } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { DonationModal } from '@/components/DonationModal';
import { fetchCampaignById, fetchAllocations, fetchEvidence, money, Campaign, Allocation, Evidence } from '@/lib/api';

export default function SingleCampaignPage() {
  const params = useParams();
  const campaignId = String(params.id || 'CMP001');

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [showDonate, setShowDonate] = useState(false);

  useEffect(() => {
    fetchCampaignById(campaignId).then(c => c && setCampaign(c));
    fetchAllocations(campaignId).then(setAllocations);
    fetchEvidence(campaignId).then(setEvidenceList);
  }, [campaignId]);

  if (!campaign) {
    return <AppShell><div className="empty-state">Loading campaign details...</div></AppShell>;
  }

  const progress = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CAMPAIGN AUDIT & DETAILS</div>
          <h2>{campaign.title}</h2>
          <p className="muted">{campaign.id} · Created by {campaign.charity}</p>
        </div>
        <button className="button primary" onClick={() => setShowDonate(true)}>
          Donate to Campaign <ArrowRight size={15} />
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple"><CircleDollarSign size={18} /></div>
          <div>
            <div className="stat-label">Raised</div>
            <div className="stat-value">{money(campaign.raised)}</div>
            <div className="stat-note">Goal: {money(campaign.target)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><HeartHandshake size={18} /></div>
          <div>
            <div className="stat-label">Allocated</div>
            <div className="stat-value">{money(campaign.allocated)}</div>
            <div className="stat-note">{allocations.length} allocation records</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><FileCheck2 size={18} /></div>
          <div>
            <div className="stat-label">Utilized</div>
            <div className="stat-value">{money(campaign.utilized)}</div>
            <div className="stat-note">Evidence-linked</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><ShieldCheck size={18} /></div>
          <div>
            <div className="stat-label">Verification</div>
            <div className="stat-value">{evidenceList.length} Files</div>
            <div className="stat-note">On-chain verified</div>
          </div>
        </div>
      </div>

      <div className="hero-panel" style={{ marginTop: '20px' }}>
        <div className="hero-copy">
          <div className="hero-tag"><ShieldCheck size={14} /> ON-CHAIN METADATA RECORDED</div>
          <h2>{progress}% Funded</h2>
          <p>{campaign.description}</p>
          <div className="progress-track" style={{ height: '8px', margin: '16px 0' }}>
            <div style={{ width: `${progress}%` }} />
          </div>
          <Link href={`/transparency/campaign/${campaign.id}`} className="button light">
            View Public Transparency Page <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">ALLOCATED FUNDS</div>
          <h2>Fund Allocations</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Allocation ID</th>
              <th>Purpose</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map(a => (
              <tr key={a.id}>
                <td><strong>{a.id}</strong><small>{a.timestamp}</small></td>
                <td>{a.purpose}</td>
                <td>{a.category}</td>
                <td>{money(a.amount)}</td>
                <td><span className="status active"><span />RECORDED</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">EVIDENCE REGISTRY</div>
          <h2>Uploaded Verification Proofs</h2>
        </div>
      </div>

      <div className="evidence-grid">
        {evidenceList.map(e => (
          <div className="evidence-card" key={e.id}>
            <div className="evidence-card-head">
              <strong>{e.id}</strong>
              <span className="status active"><span />{e.status}</span>
            </div>
            <p>{e.type}</p>
            <span className="mono">{e.hash}</span>
            <small>CID: {e.cid}</small>
          </div>
        ))}
      </div>

      {showDonate && (
        <DonationModal
          campaign={campaign}
          onClose={() => setShowDonate(false)}
        />
      )}
    </AppShell>
  );
}
