'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './AssistantMessage.module.css';

export default function AssistantMessage({ message }) {
  return (
    <div className={styles.wrap} style={{ animation: 'messageIn 300ms ease' }}>
      <div className={styles.avatar}>
        <svg viewBox="0 0 32 32" fill="none" width="18" height="18">
          <circle cx="16" cy="16" r="14" fill="url(#aiGrad)"/>
          <circle cx="16" cy="16" r="5" fill="white" opacity="0.9"/>
          <defs>
            <radialGradient id="aiGrad" cx="30%" cy="25%">
              <stop offset="0%" stopColor="#b4a4ff"/>
              <stop offset="100%" stopColor="#5b21b6"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className={styles.content}>
        <span className={styles.name}>Neo GPT</span>

        <div className={styles.markdown}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ code: CodeBlock }}
          >
            {message.content || '\u00a0'}
          </ReactMarkdown>
          {message.isStreaming && <span className={styles.cursor} />}
        </div>

        {!message.isStreaming && message.content && (
          <MessageActions content={message.content} />
        )}
      </div>
    </div>
  );
}

/* ── Syntax-highlighted code block ── */
function CodeBlock({ node, inline, className, children, ...props }) {
  const [copied, setCopied] = useState(false);
  const lang = /language-(\w+)/.exec(className || '')?.[1] || 'text';
  const code = String(children).replace(/\n$/, '');

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) return <code className={styles.inlineCode}>{children}</code>;

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLang}>{lang}</span>
        <button className={styles.copyCodeBtn} onClick={copy}>
          {copied ? '✓ Copied' : '⧉ Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={lang}
        PreTag="div"
        customStyle={{ margin: 0, borderRadius: '0 0 10px 10px', background: '#0d0d18', fontSize: '13px', padding: '16px 18px' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

/* ── Message action buttons ── */
function MessageActions({ content }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.actions}>
      <button className={styles.actionBtn} onClick={copy} title="Copy response">
        {copied
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        }
      </button>
      <button
        className={`${styles.actionBtn} ${feedback === 'up' ? styles.activeUp : ''}`}
        onClick={() => setFeedback(f => f === 'up' ? null : 'up')}
        title="Good response"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
      </button>
      <button
        className={`${styles.actionBtn} ${feedback === 'down' ? styles.activeDown : ''}`}
        onClick={() => setFeedback(f => f === 'down' ? null : 'down')}
        title="Bad response"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
      </button>
    </div>
  );
}
