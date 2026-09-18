'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { AppShell } from '@/components/AppShell';

export default function TransparencyEvidencePage() {
  const params = useParams();
  const evId = String(params.id || 'EVD001');

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">PUBLIC EVIDENCE AUDIT</div>
          <h2>Evidence Record #{evId}</h2>
        </div>
      </div>

      <div className="receipt" style={{ maxWidth: '600px', padding: '24px' }}>
        <div><span>Evidence ID</span><strong>{evId}</strong></div>
        <div><span>Allocation ID</span><strong>ALLOC001</strong></div>
        <div><span>Campaign ID</span><strong>CMP001</strong></div>
        <div><span>Document Type</span><strong>Invoice bundle</strong></div>
        <div><span>SHA-256 Hash</span><strong className="mono">sha256:abc12391de40f0a83b...</strong></div>
        <div><span>IPFS CID</span><strong className="mono">QmMockCharityEvidence001</strong></div>
        <div><span>Status</span><strong className="verified">VERIFIED</strong></div>
        <div><span>Blockchain Tx</span><strong className="mono">0xe91c4b025ab312cf</strong></div>
      </div>

      <p className="disclaimer" style={{ marginTop: '20px', maxWidth: '600px' }}>
        <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
        Hash verification confirms digital integrity of the referenced evidence. It does not independently prove that the underlying real-world expense occurred.
      </p>
    </AppShell>
  );
}
