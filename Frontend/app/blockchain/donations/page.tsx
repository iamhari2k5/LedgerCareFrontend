'use client'

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { fetchDonations, money, Donation } from '@/lib/api';

export default function BlockchainDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetchDonations().then(setDonations);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">DONATIONLEDGER.SOL CONTRACT</div>
          <h2>On-Chain Donation Metadata Records</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Campaign ID</th>
              <th>Amount (₹)</th>
              <th>Payment Reference</th>
              <th>Transaction Hash</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d.id}>
                <td><strong>{d.id}</strong><small>{d.timestamp}</small></td>
                <td>{d.campaignId}</td>
                <td>{money(d.amount)}</td>
                <td>{d.paymentReference}</td>
                <td className="mono">{d.transactionHash}</td>
                <td><span className="status active"><span />RECORDED</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
