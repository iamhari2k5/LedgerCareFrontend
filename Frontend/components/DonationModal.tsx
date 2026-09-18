'use client'

import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, X } from 'lucide-react';
import { processPaymentAndDonation, money, Campaign } from '@/lib/api';

interface DonationModalProps {
  campaign: Campaign;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DonationModal({ campaign, onClose, onSuccess }: DonationModalProps) {
  const [amount, setAmount] = useState('5000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<{
    id: string;
    paymentReference: string;
    amount: number;
    transactionHash: string;
  } | null>(null);

  const handlePay = async () => {
    if (!amount || Number(amount) < 100 || isProcessing) return;
    setIsProcessing(true);
    try {
      const res = await processPaymentAndDonation(campaign.id, Number(amount));
      setReceipt(res);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="donation-modal">
        <button className="close-modal" onClick={onClose} aria-label="Close"><X size={18} /></button>

        {receipt ? (
          <div className="success-state">
            <div className="success-icon"><Check size={28} /></div>
            <div className="section-kicker">PAYMENT SUCCESSFUL</div>
            <h2>Your gift is on its way.</h2>
            <p>Your simulated fiat payment has been recorded and linked to the public audit trail.</p>

            <div className="receipt">
              <div><span>Amount</span><strong>{money(receipt.amount)}</strong></div>
              <div><span>Payment reference</span><strong>{receipt.paymentReference}</strong></div>
              <div><span>Donation ID</span><strong>{receipt.id}</strong></div>
              <div><span>Blockchain status</span><strong className="verified">RECORDED</strong></div>
              <div><span>Transaction Hash</span><strong className="mono">{receipt.transactionHash}</strong></div>
            </div>

            <p className="disclaimer" style={{ marginTop: '16px', fontSize: '11px' }}>
              This demonstration uses simulated fiat payments. No cryptocurrency is transferred.
            </p>

            <button className="button primary full" onClick={onClose} style={{ marginTop: '16px' }}>
              Back to campaigns
            </button>
          </div>
        ) : (
          <>
            <div className="section-kicker">SIMULATED FIAT PAYMENT</div>
            <h2>Support {campaign.title}</h2>
            <p className="modal-copy">
              Your donation will be recorded as transparent payment metadata. No cryptocurrency is transferred.
            </p>

            <label className="field-label">Donation amount (₹ INR)</label>
            <div className="amount-input">
              <span>₹</span>
              <input
                value={amount}
                onChange={e => setAmount(e.target.value.replace(/\D/g, ''))}
                aria-label="Donation amount"
              />
            </div>

            <div className="quick-amounts">
              {['1000', '2500', '5000', '10000'].map(v => (
                <button
                  key={v}
                  className={amount === v ? 'selected' : ''}
                  onClick={() => setAmount(v)}
                >
                  ₹{Number(v).toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            <button
              className="button primary full"
              onClick={handlePay}
              disabled={!amount || Number(amount) < 100 || isProcessing}
              style={{ marginTop: '16px' }}
            >
              {isProcessing ? 'Processing payment & recording on-chain...' : 'Proceed to payment'} <ArrowRight size={15} />
            </button>

            <div className="secure-note" style={{ marginTop: '12px' }}>
              <ShieldCheck size={14} /> Demo environment · Secure by design
            </div>
          </>
        )}
      </div>
    </div>
  );
}
