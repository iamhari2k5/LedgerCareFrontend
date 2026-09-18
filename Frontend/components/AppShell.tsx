'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight, BarChart3, Bell, ChevronDown, CircleDollarSign, ClipboardCheck,
  FileCheck2, HeartHandshake, LayoutDashboard, Menu, ShieldCheck, Sparkles, WalletCards, Zap, LogOut
} from 'lucide-react';
import { useAuth } from './AuthContext';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, setRole, logout } = useAuth();
  const [mobileNav, setMobileNav] = useState(false);

  const isCharityView = role === 'CHARITY' || pathname.startsWith('/charity');

  const navItems = [
    { label: 'Overview', href: isCharityView ? '/charity' : '/donor', icon: LayoutDashboard },
    { label: 'Campaigns', href: '/campaigns', icon: HeartHandshake },
    { label: 'My donations', href: '/donor/donations', icon: WalletCards, count: '15' },
    { label: 'Transparency', href: '/transparency', icon: ShieldCheck },
    { label: 'Blockchain records', href: '/blockchain', icon: Zap },
    { label: 'Charity dashboard', href: '/charity', icon: BarChart3 },
    { label: 'Create campaign', href: '/charity/campaign/create', icon: ClipboardCheck },
    { label: 'Funds & evidence', href: '/charity/evidence', icon: FileCheck2 }
  ];

  const handleWorkspaceToggle = () => {
    const nextRole = role === 'DONOR' ? 'CHARITY' : 'DONOR';
    setRole(nextRole);
    router.push(nextRole === 'CHARITY' ? '/charity' : '/donor');
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="brand">
          <Link href="/" className="brand-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
            <div className="brand-mark"><Sparkles size={17} /></div>
            <span>ledger<span className="brand-dot">.</span>care</span>
          </Link>
        </div>

        <div className="workspace" onClick={handleWorkspaceToggle} style={{ cursor: 'pointer' }}>
          <span className="workspace-avatar">{isCharityView ? 'HF' : 'D'}</span>
          <div>
            <strong>{isCharityView ? 'Hope Foundation' : (user?.name || 'Demo Donor')}</strong>
            <small>{isCharityView ? 'Charity workspace' : 'Personal workspace'}</small>
          </div>
          <ChevronDown size={15} />
        </div>

        <div className="side-label">Navigation</div>
        <nav>
          {navItems.map(({ label, href, icon: Icon, count }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href) && href.length > 2);
            return (
              <Link
                key={label}
                href={href}
                className={isActive ? 'nav-active' : ''}
                onClick={() => setMobileNav(false)}
              >
                <Icon size={17} />
                {label}
                {count && <span className="nav-count">{count}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="trust-card">
            <ShieldCheck size={18} />
            <div>
              <strong>On-chain verified</strong>
              <span>All records are public</span>
            </div>
          </div>
          <button className="nav-item" onClick={logout} style={{ marginTop: '8px', color: 'var(--muted)' }}>
            <LogOut size={17} />
            Switch user / Logout
          </button>
          <div className="sidebar-footer">
            LedgerCare v1.0.4<br />
            <span>Built for accountable giving</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu">
            <Menu size={20} />
          </button>

          <div className="breadcrumb">
            <span>{isCharityView ? 'Charity workspace' : 'Donor workspace'}</span>
            <ChevronDown size={14} />
          </div>

          <div className="top-actions">
            <Link href="/transparency" className="text-button" style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} /> Public Audit
            </Link>
            <button className="top-icon" aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className="profile" onClick={handleWorkspaceToggle} style={{ cursor: 'pointer' }}>
              <span>{isCharityView ? 'HF' : 'DK'}</span>
              <strong>{isCharityView ? 'Hope Foundation' : (user?.name || 'Demo Donor')}</strong>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="page-wrap">
          {children}
        </div>
      </main>
    </div>
  );
}
