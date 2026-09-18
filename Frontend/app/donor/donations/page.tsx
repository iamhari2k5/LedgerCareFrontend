'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { fetchDonations, money, Donation } from '@/lib/api';

export default function DonorDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetchDonations().then(setDonations);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">DONOR WORKSPACE</div>
          <h2>Donation History & Audit References</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Campaign ID</th>
              <th>Amount</th>
              <th>Payment Reference</th>
              <th>Blockchain Status</th>
              <th>Transaction Hash</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d.id}>
                <td><strong>{d.id}</strong><small>{d.timestamp}</small></td>
                <td>{d.campaignId}</td>
                <td>{money(d.amount)}</td>
                <td>{d.paymentReference}</td>
                <td><span className="status active"><span />RECORDED</span></td>
                <td className="mono">{d.transactionHash}</td>
                <td>
                  <Link href={`/donor/donation/${d.id}`} className="button subtle" style={{ padding: '4px 10px', fontSize: '12px' }}>
                    Track
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
