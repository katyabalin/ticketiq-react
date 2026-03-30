import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">Ticket<span>IQ</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a href="/case-study" style={{ fontSize: '0.8rem', color: '#388bfd', textDecoration: 'none', fontWeight: 500 }}>Case Study</a>
        <div className="header-tag">Powered by Claude AI</div>
      </div>
    </header>
  );
}

export default Header;

