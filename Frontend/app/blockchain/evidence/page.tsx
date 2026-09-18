'use client'

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { fetchEvidence, Evidence } from '@/lib/api';

export default function BlockchainEvidencePage() {
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);

  useEffect(() => {
    fetchEvidence().then(setEvidenceList);
  }, []);

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">EVIDENCEREGISTRY.SOL CONTRACT</div>
          <h2>On-Chain Recorded SHA-256 Hashes</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Evidence ID</th>
              <th>Campaign ID</th>
              <th>Document Type</th>
              <th>SHA-256 Hash</th>
              <th>IPFS CID</th>
              <th>Verification Status</th>
            </tr>
          </thead>
          <tbody>
            {evidenceList.map(e => (
              <tr key={e.id}>
                <td><strong>{e.id}</strong></td>
                <td>{e.campaignId}</td>
                <td>{e.type}</td>
                <td className="mono">{e.hash}</td>
                <td className="mono">{e.cid}</td>
                <td><span className="status active"><span />{e.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
