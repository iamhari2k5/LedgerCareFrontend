'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, Check } from 'lucide-react';
import { AppShell } from '@/components/AppShell';

export default function TransparencyDonationPage() {
  const params = useParams();
  const donId = String(params.id || 'DON001');

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">PUBLIC DONATION AUDIT</div>
          <h2>Donation Record #{donId}</h2>
        </div>
      </div>

      <div className="receipt" style={{ maxWidth: '600px', padding: '24px', margin: '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Check size={20} color="#22c55e" />
          <strong style={{ color: '#22c55e' }}>Simulated Fiat Donation Recorded ✓</strong>
        </div>

        <div><span>Donation ID</span><strong>{donId}</strong></div>
        <div><span>Campaign</span><strong>Education Support Program (CMP001)</strong></div>
        <div><span>Amount</span><strong>₹5,000 INR</strong></div>
        <div><span>Payment Reference</span><strong>PAY12345</strong></div>
        <div><span>Payment Status</span><strong className="verified">SUCCESS</strong></div>
        <div><span>Blockchain Status</span><strong className="verified">RECORDED</strong></div>
        <div><span>Transaction Hash</span><strong className="mono">0x8f3a91bc77fd21aa</strong></div>
      </div>

      <p className="disclaimer" style={{ marginTop: '20px', maxWidth: '600px' }}>
        <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
        This record clearly separates the simulated fiat payment reference (PAY12345) from the on-chain audit ledger transaction hash.
      </p>
    </AppShell>
  );
}
