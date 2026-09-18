'use client'

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { fetchBlockchainInfo, contracts as fallbackContracts } from '@/lib/api';

export default function BlockchainContractsPage() {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    fetchBlockchainInfo().then(setInfo);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">SMART CONTRACT REGISTRY</div>
          <h2>Deployed Contract Addresses & Network Metrics</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Contract Name</th>
              <th>Deployed Address</th>
              <th>Network</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(info?.contracts || fallbackContracts).map((c: any) => (
              <tr key={c.name}>
                <td><strong>{c.name}</strong></td>
                <td className="mono">{c.address}</td>
                <td>{c.network}</td>
                <td><span className="status active"><span />{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
