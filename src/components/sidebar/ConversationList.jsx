'use client';

import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import styles from './ConversationList.module.css';

function groupByDate(conversations) {
  const now = new Date();
  const today     = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const week      = new Date(today); week.setDate(week.getDate() - 7);

  const groups = { Today: [], Yesterday: [], 'Last 7 days': [], Older: [] };

  conversations.forEach(c => {
    const d = new Date(c.updatedAt);
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (day >= today)          groups['Today'].push(c);
    else if (day >= yesterday) groups['Yesterday'].push(c);
    else if (day >= week)      groups['Last 7 days'].push(c);
    else                       groups['Older'].push(c);
  });

  return groups;
}

export default function ConversationList({ filter = '' }) {
  const { conversations, activeConversationId, selectConversation, deleteConversation, renameConversation } = useChat();

  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(filter.toLowerCase())
  );
  const groups = groupByDate(filtered);

  if (conversations.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No chats yet.</p>
        <p>Start a new conversation!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {Object.entries(groups).map(([group, items]) =>
        items.length > 0 && (
          <div key={group} className={styles.group}>
            <p className={styles.groupLabel}>{group}</p>
            {items.map(conv => (
              <ConvItem
                key={conv.id}
                conv={conv}
                isActive={conv.id === activeConversationId}
                onSelect={() => selectConversation(conv.id)}
                onDelete={() => deleteConversation(conv.id)}
                onRename={(t) => renameConversation(conv.id, t)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

function ConvItem({ conv, isActive, onSelect, onDelete, onRename }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conv.title);
  const [showActions, setShowActions] = useState(false);

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) { onRename(editTitle.trim()); setIsEditing(false); }
  };

  return (
    <div
      id={`conv-${conv.id}`}
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={onSelect}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {isEditing ? (
        <form onSubmit={handleRenameSubmit} onClick={e => e.stopPropagation()}>
          <input
            className={styles.renameInput}
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            autoFocus
            onBlur={handleRenameSubmit}
          />
        </form>
      ) : (
        <>
          <span className={styles.title}>{conv.title}</span>
          {(showActions || isActive) && (
            <div className={styles.actions} onClick={e => e.stopPropagation()}>
              <button
                title="Rename"
                className={styles.actionBtn}
                onClick={() => { setIsEditing(true); setEditTitle(conv.title); }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button
                title="Delete"
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={onDelete}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
