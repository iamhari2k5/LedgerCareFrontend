'use client'

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { fetchCampaigns, money, Campaign } from '@/lib/api';

export default function BlockchainCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CAMPAIGNMANAGER.SOL CONTRACT</div>
          <h2>On-Chain Recorded Campaigns</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Campaign ID</th>
              <th>Title</th>
              <th>Charity</th>
              <th>Target</th>
              <th>Raised</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id}>
                <td><strong>{c.id}</strong></td>
                <td>{c.title}</td>
                <td>{c.charity}</td>
                <td>{money(c.target)}</td>
                <td>{money(c.raised)}</td>
                <td><span className="status active"><span />{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
