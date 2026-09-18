'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';

export default function TransparencyFundPage() {
  const params = useParams();
  const allocId = String(params.id || 'ALLOC001');

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">PUBLIC FUND TRANSPARENCY</div>
          <h2>Fund Allocation #{allocId}</h2>
        </div>
      </div>

      <div className="receipt" style={{ maxWidth: '600px', padding: '24px' }}>
        <div><span>Allocation ID</span><strong>{allocId}</strong></div>
        <div><span>Campaign ID</span><strong>CMP001</strong></div>
        <div><span>Purpose</span><strong>Learning materials and textbooks</strong></div>
        <div><span>Amount</span><strong>₹4,80,000 INR</strong></div>
        <div><span>Recipient Wallet</span><strong className="mono">0x5FbDB2315678afecb367f032d93F642f64180aa3</strong></div>
        <div><span>Blockchain Tx</span><strong className="mono">0xa81c22ef7db901aa</strong></div>
      </div>
    </AppShell>
  );
}
