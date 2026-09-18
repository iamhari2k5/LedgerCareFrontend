'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { Check, ShieldCheck } from 'lucide-react';
import { AppShell } from '@/components/AppShell';

export default function SingleDonationTrackingPage() {
  const params = useParams();
  const donId = String(params.id || 'DON001');

  const trackingSteps = [
    { label: 'Payment Initiated', status: 'COMPLETED', description: 'Simulated fiat payment attempt created.', timestamp: '2 days ago' },
    { label: 'Payment Successful', status: 'COMPLETED', description: 'Payment reference PAY12345 confirmed.', timestamp: '2 days ago' },
    { label: 'Donation Created', status: 'COMPLETED', description: `Record ${donId} generated in system ledger.`, timestamp: '2 days ago' },
    { label: 'Blockchain Recorded', status: 'COMPLETED', description: 'Donation metadata stored on DonationLedger.sol contract.', timestamp: '2 days ago', transactionHash: '0x8f3a91bc77fd21aa' },
    { label: 'Funds Available', status: 'COMPLETED', description: 'Campaign balance updated with donated funds.', timestamp: '2 days ago' },
    { label: 'Fund Allocated', status: 'COMPLETED', description: 'Charity allocated funds for textbook supplies.', timestamp: '1 week ago' },
    { label: 'Fund Utilized', status: 'COMPLETED', description: 'Expenditure completed by Hope Foundation.', timestamp: '1 week ago' },
    { label: 'Evidence Uploaded', status: 'COMPLETED', description: 'Invoice file uploaded with SHA-256 hash.', timestamp: '1 week ago' },
    { label: 'Evidence Verified', status: 'VERIFIED', description: 'Digital hash verified against EvidenceRegistry.sol contract.', timestamp: '1 week ago', transactionHash: '0x91df02ab43d72e1b' }
  ];

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">DONATION TRACKING TIMELINE</div>
          <h2>Tracking Record #{donId}</h2>
        </div>
      </div>

      <div className="tracking-panel">
        <div className="tracking-line">
          {trackingSteps.map((item, i) => (
            <div className="tracking-step" key={item.label}>
              <div className="tracking-dot"><Check size={13} /></div>
              <strong>{item.label}</strong>
              <span>{item.description}</span>
              <small>{donId} · {item.timestamp}</small>
              {item.transactionHash && (
                <div className="mono" style={{ fontSize: '11px', marginTop: '4px', opacity: 0.8 }}>
                  Tx: {item.transactionHash}
                </div>
              )}
              {i < trackingSteps.length - 1 && <i />}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
