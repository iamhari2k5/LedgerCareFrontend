'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, ShieldCheck, HeartHandshake, FileCheck2, CircleDollarSign } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { fetchCampaignById, fetchAllocations, fetchEvidence, money, Campaign, Allocation, Evidence } from '@/lib/api';

export default function TransparencyCampaignDetailPage() {
  const params = useParams();
  const campaignId = String(params.id || 'CMP001');

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);

  useEffect(() => {
    fetchCampaignById(campaignId).then(c => c && setCampaign(c));
    fetchAllocations(campaignId).then(setAllocations);
    fetchEvidence(campaignId).then(setEvidenceList);
  }, [campaignId]);

  if (!campaign) {
    return <AppShell><div className="empty-state">Loading transparency record...</div></AppShell>;
  }

  const progress = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">PUBLIC CAMPAIGN TRANSPARENCY</div>
          <h2>{campaign.title}</h2>
          <p className="muted">{campaign.id} · Managed by {campaign.charity}</p>
        </div>
        <span className="status active"><span />READ-ONLY PUBLIC RECORD</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple"><CircleDollarSign size={18} /></div>
          <div>
            <div className="stat-label">Raised</div>
            <div className="stat-value">{money(campaign.raised)}</div>
            <div className="stat-note">Target: {money(campaign.target)}</div>
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
            <div className="stat-label">Verified evidence</div>
            <div className="stat-value">{evidenceList.length} Files</div>
            <div className="stat-note">Hash integrity verified</div>
          </div>
        </div>
      </div>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">PUBLIC ALLOCATION LOG</div>
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
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map(a => (
              <tr key={a.id}>
                <td><strong>{a.id}</strong><small>{a.timestamp}</small></td>
                <td>{a.purpose}</td>
                <td>{a.category}</td>
                <td>{money(a.amount)}</td>
                <td className="mono">{a.transactionHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">PUBLIC EVIDENCE AUDIT</div>
          <h2>Verification Proofs & Hashes</h2>
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
    </AppShell>
  );
}
