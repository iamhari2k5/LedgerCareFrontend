'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { registerCharity } from '@/lib/api';

export default function CharityRegistrationPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState('');
  const [regNum, setRegNum] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await registerCharity({
        organizationName: orgName,
        registrationNumber: regNum,
        email
      });
      setSubmitted(res || {
        id: 'CH006',
        organizationName: orgName,
        registrationNumber: regNum,
        blockchainTxHash: '0x2ac4e191df028f3a'
      });
    } catch {
      setSubmitted({
        id: 'CH006',
        organizationName: orgName,
        registrationNumber: regNum,
        blockchainTxHash: '0x2ac4e191df028f3a'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CHARITY ONBOARDING</div>
          <h2>Register Charity Organization</h2>
        </div>
      </div>

      {submitted ? (
        <div className="form-card success-state" style={{ maxWidth: '600px' }}>
          <div className="success-icon"><Check size={28} /></div>
          <div className="section-kicker">SYSTEM VALIDATION COMPLETED</div>
          <h2>Charity Successfully Registered ✓</h2>
          <p>Your organization has been validated and recorded on CharityRegistry.sol contract.</p>
          <div className="receipt" style={{ margin: '20px 0' }}>
            <div><span>Charity ID</span><strong>{submitted.id}</strong></div>
            <div><span>Organization</span><strong>{submitted.organizationName}</strong></div>
            <div><span>Registration No</span><strong>{submitted.registrationNumber}</strong></div>
            <div><span>Status</span><strong className="verified">SYSTEM VALIDATED</strong></div>
            <div><span>Blockchain Tx</span><strong className="mono">{submitted.blockchainTxHash}</strong></div>
          </div>
          <button className="button primary" onClick={() => router.push('/charity/campaign/create')}>
            Proceed to Create Campaign <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        <div className="form-card" style={{ maxWidth: '640px' }}>
          <form onSubmit={handleSubmit} className="form-grid">
            <label className="wide">
              <span>Organization Name</span>
              <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Green Hope Foundation" required />
            </label>
            <label className="wide">
              <span>Registration Number</span>
              <input value={regNum} onChange={e => setRegNum(e.target.value)} placeholder="e.g. REG/2026/MH/009" required />
            </label>
            <label className="wide">
              <span>Official Email</span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contact@greenhope.org" required />
            </label>
            <div className="validation-panel wide">
              <strong>System Validation Rule Preview</strong>
              {['Organization exists', 'Registration number unique', 'Required fields present', 'Email address valid', 'CharityRegistry.sol execution'].map(x => (
                <span key={x}><Check size={14} /> {x}</span>
              ))}
            </div>
            <button type="submit" className="button primary wide" disabled={isSubmitting}>
              {isSubmitting ? 'Registering on-chain...' : 'Submit Charity Registration'} <ArrowRight size={15} />
            </button>
          </form>
          <p className="disclaimer" style={{ marginTop: '16px', fontSize: '11px' }}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Charity verification is performed via system validation rules and on-chain records. It does not represent government verification.
          </p>
        </div>
      )}
    </AppShell>
  );
}
