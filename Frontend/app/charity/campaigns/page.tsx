'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { fetchCampaigns, money, Campaign } from '@/lib/api';

export default function CharityCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CHARITY WORKSPACE</div>
          <h2>My Active & Completed Campaigns</h2>
        </div>
        <Link href="/charity/campaign/create" className="button primary">
          Create New Campaign <ArrowRight size={15} />
        </Link>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Campaign ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Target</th>
              <th>Raised</th>
              <th>Allocated</th>
              <th>Utilized</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id}>
                <td><strong>{c.id}</strong></td>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>{money(c.target)}</td>
                <td>{money(c.raised)}</td>
                <td>{money(c.allocated)}</td>
                <td>{money(c.utilized)}</td>
                <td><span className="status active"><span />{c.status}</span></td>
                <td>
                  <Link href={`/campaign/${c.id}`} className="button subtle" style={{ padding: '4px 8px', fontSize: '12px' }}>
                    View Audit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
