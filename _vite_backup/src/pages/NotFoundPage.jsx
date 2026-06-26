import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', gap: '16px', textAlign: 'center',
      background: 'var(--bg-base)',
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36,
      }}>🌌</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>404 — Lost in Space</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>This page doesn't exist in the Neo GPT universe.</p>
      <Link to="/" style={{
        padding: '10px 24px', borderRadius: '9999px',
        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: 14,
        boxShadow: '0 0 16px rgba(124,58,237,0.4)',
      }}>
        ← Back to Home
      </Link>
    </div>
  );
}
