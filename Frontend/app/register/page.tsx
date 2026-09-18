'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { UserRole } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [role, setRole] = useState<UserRole>('DONOR');
  const [name, setName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register({
        name: role === 'DONOR' ? name : organizationName,
        organizationName,
        email,
        password,
        role
      });
      router.push(role === 'CHARITY' ? '/charity' : '/donor');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="form-card" style={{ maxWidth: '480px', width: '100%', backdropFilter: 'blur(20px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="brand-mark" style={{ margin: '0 auto 12px auto' }}><Sparkles size={20} /></div>
          <h2>Create a LedgerCare Account</h2>
          <p className="muted" style={{ fontSize: '14px' }}>Register as a Donor or a Charity Organization.</p>
        </div>

        {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="form-grid">
          <label className="wide">
            <span>Account Type</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                className={`button ${role === 'DONOR' ? 'primary' : 'subtle'}`}
                onClick={() => setRole('DONOR')}
              >
                Donor Account
              </button>
              <button
                type="button"
                className={`button ${role === 'CHARITY' ? 'primary' : 'subtle'}`}
                onClick={() => setRole('CHARITY')}
              >
                Charity Account
              </button>
            </div>
          </label>

          {role === 'DONOR' ? (
            <label className="wide">
              <span>Full Name</span>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Seetharam Pinninti" required />
            </label>
          ) : (
            <>
              <label className="wide">
                <span>Organization Name</span>
                <input value={organizationName} onChange={e => setOrganizationName(e.target.value)} placeholder="e.g. Green Hope Foundation" required />
              </label>
              <label className="wide">
                <span>Registration Number</span>
                <input value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} placeholder="e.g. REG/2026/MH/009" required />
              </label>
            </>
          )}

          <label className="wide">
            <span>Email Address</span>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.org" required />
          </label>

          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>

          <label>
            <span>Confirm Password</span>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </label>

          <button type="submit" className="button primary wide" disabled={loading} style={{ marginTop: '12px' }}>
            {loading ? 'Registering...' : `Register ${role === 'CHARITY' ? 'Charity' : 'Donor'}`} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }} className="muted">
          Already registered? <Link href="/login" style={{ color: 'white', fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
