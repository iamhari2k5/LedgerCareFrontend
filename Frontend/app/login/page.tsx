'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { UserRole } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('donor@ledgercare.org');
  const [password, setPassword] = useState('donor123');
  const [role, setRole] = useState<UserRole>('DONOR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password, role);
      router.push(role === 'CHARITY' ? '/charity' : '/donor');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="form-card" style={{ maxWidth: '440px', width: '100%', backdropFilter: 'blur(20px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="brand-mark" style={{ margin: '0 auto 12px auto' }}><Sparkles size={20} /></div>
          <h2>Welcome back to LedgerCare</h2>
          <p className="muted" style={{ fontSize: '14px' }}>Sign in to track donations and on-chain records.</p>
        </div>

        {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="form-grid">
          <label className="wide">
            <span>Select Role</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                className={`button ${role === 'DONOR' ? 'primary' : 'subtle'}`}
                onClick={() => { setRole('DONOR'); setEmail('donor@ledgercare.org'); setPassword('donor123'); }}
              >
                Donor
              </button>
              <button
                type="button"
                className={`button ${role === 'CHARITY' ? 'primary' : 'subtle'}`}
                onClick={() => { setRole('CHARITY'); setEmail('contact@hopefoundation.org'); setPassword('charity123'); }}
              >
                Charity
              </button>
            </div>
          </label>

          <label className="wide">
            <span>Email address</span>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>

          <label className="wide">
            <span>Password</span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>

          <button type="submit" className="button primary wide" disabled={loading} style={{ marginTop: '12px' }}>
            {loading ? 'Authenticating...' : `Sign in as ${role === 'CHARITY' ? 'Charity' : 'Donor'}`} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }} className="muted">
          Don&apos;t have an account? <Link href="/register" style={{ color: 'white', fontWeight: 600 }}>Register here</Link>
        </div>

        <div className="secure-note" style={{ marginTop: '20px', justifyContent: 'center' }}>
          <ShieldCheck size={14} /> System authentication · Two roles supported
        </div>
      </div>
    </div>
  );
}
