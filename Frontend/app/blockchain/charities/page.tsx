'use client'

import React from 'react';
import { AppShell } from '@/components/AppShell';
import { charities } from '@/lib/mock-api';

export default function BlockchainCharitiesPage() {
  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CHARITY REGISTRY CONTRACT</div>
          <h2>On-Chain Registered Charities</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Charity ID</th>
              <th>Organization</th>
              <th>Registration Number</th>
              <th>Document Hash</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {charities.map(c => (
              <tr key={c.id}>
                <td><strong>{c.id}</strong></td>
                <td>{c.organization}</td>
                <td>{c.registrationNumber}</td>
                <td className="mono">{c.documentHash}</td>
                <td><span className="status active"><span />{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
