'use client'

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { fetchAllocations, money, Allocation } from '@/lib/api';

export default function BlockchainFundsPage() {
  const [allocations, setAllocations] = useState<Allocation[]>([]);

  useEffect(() => {
    fetchAllocations().then(setAllocations);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">FUNDTRACKER.SOL CONTRACT</div>
          <h2>On-Chain Recorded Fund Allocations</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Allocation ID</th>
              <th>Campaign ID</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Transaction Hash</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map(a => (
              <tr key={a.id}>
                <td><strong>{a.id}</strong><small>{a.timestamp}</small></td>
                <td>{a.campaignId}</td>
                <td>{a.purpose}</td>
                <td>{money(a.amount)}</td>
                <td className="mono">{a.transactionHash}</td>
                <td><span className="status active"><span />RECORDED</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
