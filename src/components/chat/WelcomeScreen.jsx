'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { useApp } from '../../context/AppContext';
import styles from './WelcomeScreen.module.css';

const RATIO_OPTIONS = [
  {
    value: 'auto',
    label: 'Auto',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    )
  },
  {
    value: 'square',
    label: 'Square 1:1',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="5" width="14" height="14" rx="2" />
      </svg>
    )
  },
  {
    value: 'portrait',
    label: 'Portrait 3:4',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="4" width="12" height="16" rx="2" />
      </svg>
    )
  },
  {
    value: 'story',
    label: 'Story 9:16',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="7" y="3" width="10" height="18" rx="2" />
      </svg>
    )
  },
  {
    value: 'landscape',
    label: 'Landscape 4:3',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="6" width="16" height="12" rx="2" />
      </svg>
    )
  },
  {
    value: 'widescreen',
    label: 'Widescreen 16:9',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="7" width="18" height="10" rx="2" />
      </svg>
    )
  }
];

const getRatioOption = (val) => RATIO_OPTIONS.find(o => o.value === val) || RATIO_OPTIONS[0];

const SUGGESTIONS = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    label: "Explain this news headline",
    prompt: "Here is a mock news headline: 'Scientists discover new particle that defies gravity.' Can you explain what this headline implies in simple terms?"
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    label: "Message my child's school",
    prompt: "Write a polite note to my child's teacher explaining that they will be late tomorrow due to a doctor appointment."
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    label: "Explain today's news simply",
    prompt: "Summarize today's general global news highlights in a short, simple paragraph for quick reading."
  }
];

export default function WelcomeScreen() {
  const { sendMessage, isLoading } = useChat();
  const { 
    webSearchActive, setWebSearchActive, toggleWebSearch,
    deepResearchActive, setDeepResearchActive, toggleDeepResearch,
    createImageActive, setCreateImageActive, toggleCreateImage,
    thinkingActive, setThinkingActive, toggleThinking,
    openVoiceSession, addToast,
    activeTool, setActiveTool,
    selectedModel, changeModel,
    imageAspectRatio, setImageAspectRatio,
    attachedFiles, setAttachedFiles
  } = useApp();

  const handleRemoveFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const [text, setText] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isRatioPopoverOpen, setIsRatioPopoverOpen] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const isCancelledRef = useRef(false);
  const isCommittedRef = useRef(false);
  const voiceTranscriptRef = useRef('');

  useEffect(() => {
    voiceTranscriptRef.current = voiceTranscript;
  }, [voiceTranscript]);

  const activateOnly = (mode) => {
    setCreateImageActive(mode === 'image');
    setThinkingActive(mode === 'thinking');
    setDeepResearchActive(mode === 'deep');
    setWebSearchActive(mode === 'web');
    setActiveTool(mode === 'github' ? 'github' : mode === 'openai' ? 'openai' : 'none');
  };

  const handleModeClick = (mode) => {
    let isCurrentlyActive = false;
    if (mode === 'image') isCurrentlyActive = createImageActive;
    else if (mode === 'thinking') isCurrentlyActive = thinkingActive;
    else if (mode === 'deep') isCurrentlyActive = deepResearchActive;
    else if (mode === 'web') isCurrentlyActive = webSearchActive;
    else if (mode === 'github') isCurrentlyActive = (activeTool === 'github');
    else if (mode === 'openai') isCurrentlyActive = (activeTool === 'openai');

    if (isCurrentlyActive) {
      activateOnly('none');
    } else {
      activateOnly(mode);
    }
    setIsPopoverOpen(false);
  };

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const popoverRef = useRef(null);
  const recognitionRef = useRef(null);
  const ratioContainerRef = useRef(null);

  // Web Audio visualizer refs
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const streamRef = useRef(null);
  const barRefs = useRef([]);

  const startVisualizer = async () => {
    try {
      stopVisualizer();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64; // 32 frequency bins
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength; i++) {
          const bar = barRefs.current[i];
          if (bar) {
            const value = dataArray[i];
            const percent = value / 255;
            const newHeight = 4 + percent * 28;
            bar.style.height = `${newHeight}px`;
          }
        }
        animationFrameIdRef.current = requestAnimationFrame(draw);
      };

      draw();
    } catch (err) {
      console.warn('Live audio visualizer failed to initialize:', err);
    }
  };

  const stopVisualizer = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    analyserRef.current = null;
    barRefs.current.forEach(bar => {
      if (bar) bar.style.height = '8px';
    });
  };

  useEffect(() => {
    if (isListening) {
      startVisualizer();
    } else {
      stopVisualizer();
    }
    return () => {
      stopVisualizer();
    };
  }, [isListening]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [text]);

  // Click outside to dismiss the popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    }
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  // Click outside to dismiss ratio popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (ratioContainerRef.current && !ratioContainerRef.current.contains(event.target)) {
        setIsRatioPopoverOpen(false);
      }
    }
    if (isRatioPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRatioPopoverOpen]);

  // Click outside to dismiss ratio popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (ratioContainerRef.current && !ratioContainerRef.current.contains(event.target)) {
        setIsRatioPopoverOpen(false);
      }
    }
    if (isRatioPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRatioPopoverOpen]);

  // Speech Recognition hook setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setIsListening(true);
          isCancelledRef.current = false;
          isCommittedRef.current = false;
          setVoiceTranscript('');
          addToast('Listening to voice input...', 'info');
        };

        rec.onresult = (event) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentTranscript += event.results[i][0].transcript;
            }
          }
          if (currentTranscript) {
            setVoiceTranscript(prev => (prev ? prev + ' ' : '') + currentTranscript);
          }
        };

        rec.onerror = (e) => {
          console.warn('Speech recognition error:', e);
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
          if (!isCancelledRef.current && !isCommittedRef.current && voiceTranscriptRef.current) {
            const finalText = voiceTranscriptRef.current;
            setText(prev => (prev ? prev + ' ' : '') + finalText);
            addToast('Transcribed successfully!', 'success');
          }
          setVoiceTranscript('');
        };

        recognitionRef.current = rec;
      }
    }
  }, [addToast]);

  const handleVoiceCancel = () => {
    isCancelledRef.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setVoiceTranscript('');
    addToast('Voice input cancelled', 'info');
  };

  const handleVoiceCommit = () => {
    isCommittedRef.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    const finalText = voiceTranscriptRef.current;
    if (finalText) {
      setText(prev => (prev ? prev + ' ' : '') + finalText);
      addToast('Transcribed successfully!', 'success');
    } else {
      addToast('No speech was detected', 'warning');
    }
    setVoiceTranscript('');
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if ((!text.trim() && attachedFiles.length === 0) || isLoading) return;
    sendMessage(text);
    setText('');
    setActiveTool('none'); // Clear tool tag on send
    setAttachedFiles([]); // Clear attached files on send
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const triggerFileSelect = () => {
    setIsPopoverOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.name.split('.').pop().toLowerCase() || 'file';
      const isImg = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(fileType);
      const newFile = {
        name: file.name,
        type: fileType,
        size: file.size,
        url: isImg ? URL.createObjectURL(file) : null,
      };
      setAttachedFiles(prev => [...prev, newFile]);
      addToast(`Selected file: ${file.name}`, 'success');
    }
  };

  const handleCreateImageClick = () => {
    setIsPopoverOpen(false);
    setText('Create an image of: ');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      addToast('Voice Search is not supported in this browser. Please use Chrome.', 'warning');
      return;
    }

    if (isListening) {
      handleVoiceCommit();
    } else {
      try {
        isCancelledRef.current = false;
        isCommittedRef.current = false;
        setVoiceTranscript('');
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Failed to start recognition:', err);
        setIsListening(false);
      }
    }
  };

  return (
    <div className={styles.wrap}>
      {/* Title */}
      <h1 className={styles.greeting}>What's on the agenda today?</h1>

      <div className={styles.inputContainer}>
        
        {/* Attachment popover action menu */}
        {isPopoverOpen && (
          <div ref={popoverRef} className={styles.popoverMenu}>
            <div className={styles.popoverItem} onClick={triggerFileSelect}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              <span>Add photos & files</span>
            </div>
            
            <div className={styles.popoverItem} onClick={() => { addToast('Recent files is not configured', 'info'); setIsPopoverOpen(false); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>Recent files</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.rightChevron}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>

            <div className={styles.divider} />
            
            <div className={`${styles.popoverItem} ${createImageActive ? styles.popoverItemActive : ''}`} onClick={() => handleModeClick('image')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>Create image</span>
              {createImageActive && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.checkmarkIcon}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>

            <div className={`${styles.popoverItem} ${thinkingActive ? styles.popoverItemActive : ''}`} onClick={() => handleModeClick('thinking')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                <line x1="9" y1="18" x2="15" y2="18"/>
                <line x1="10" y1="22" x2="14" y2="22"/>
              </svg>
              <span>Thinking</span>
              {thinkingActive && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.checkmarkIcon}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>

            <div className={`${styles.popoverItem} ${deepResearchActive ? styles.popoverItemActive : ''}`} onClick={() => handleModeClick('deep')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.08 8.16l8.88-4.44a1 1 0 0 1 1.32 1.32l-4.44 8.88" />
                <path d="m15.76 10.08-5.76-5.76" />
                <path d="m12.96 12.96-5.76-5.76" />
                <path d="m10.08 15.76-5.76-5.76" />
                <path d="M4.32 13.92a1 1 0 0 0-.12 1.15l2.25 4.5a1 1 0 0 0 1.62.18l5.77-5.77" />
                <path d="M22 22v-3a1 1 0 0 0-1-1h-3" />
                <path d="M12 12l9 9" />
              </svg>
              <span>Deep research</span>
              {deepResearchActive && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.checkmarkIcon}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>

            <div className={`${styles.popoverItem} ${webSearchActive ? styles.popoverItemActive : ''}`} onClick={() => handleModeClick('web')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Web search</span>
              {webSearchActive && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.checkmarkIcon}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>

            <div 
              className={`${styles.popoverItem} ${styles.popoverItemWithSubmenu} ${isMoreOpen ? styles.popoverItemActive : ''}`}
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
              onClick={(e) => { e.stopPropagation(); setIsMoreOpen(prev => !prev); }}
            >
              <div className={styles.popoverItemLeft}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
                </svg>
                <span>More</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.rightChevron}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>

              {isMoreOpen && (
                <div className={styles.popoverSubmenu}>
                  <div className={styles.submenuItem} onClick={(e) => { e.stopPropagation(); handleModeClick('github'); setIsMoreOpen(false); }}>
                    <span className={styles.githubIconBadge}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    </span>
                    <span>GitHub</span>
                  </div>
                  <div className={styles.submenuItem} onClick={(e) => { e.stopPropagation(); handleModeClick('openai'); setIsMoreOpen(false); }}>
                    <span className={styles.openaiIconBadge}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M21.7 10.4c.1-.4.2-.8.2-1.2 0-2.2-1.8-4-4-4-.4 0-.7.1-1.1.2C15.8 3.7 14 2 12 2s-3.8 1.7-4.8 3.4c-.4-.1-.7-.2-1.1-.2-2.2 0-4 1.8-4 4 0 .4.1.8.2 1.2C1.2 11.2 0 13 0 15c0 2.2 1.8 4 4 4 .4 0 .7-.1 1.1-.2C6.2 20.3 8 22 10 22s3.8-1.7 4.8-3.4c.4.1.7.2 1.1.2 2.2 0 4-1.8 4-4 0-.4-.1-.8-.2-1.2 1.1-.8 1.8-2.6 1.8-4.6 0-2-1.8-3.8-4-3.8zM12 20c-1.1 0-2.1-.6-2.6-1.6l.9-.5c.4.7 1.1 1.1 1.7 1.1.9 0 1.7-.8 1.7-1.7v-2.3l-2 1.2c-.4.2-.8.3-1.2.3-.9 0-1.7-.8-1.7-1.7 0-.4.1-.8.3-1.2l2-1.2-2-1.2c-.2-.1-.5-.2-.7-.2-.9 0-1.7.8-1.7 1.7v2.4l-.9-.5c-.4-.2-.6-.6-.6-1.1 0-1.6 1.3-2.9 2.9-2.9h2.3l-1.2-2c-.2-.4-.3-.8-.3-1.2 0-.9.8-1.7 1.7-1.7s1.7.8 1.7 1.7v2.3l2-1.2c.4-.2.8-.3 1.2-.3.9 0 1.7-.8 1.7 1.7 0 .4-.1.8-.3 1.2l-2 1.2 2 1.2c.2.1.5.2.7.2.9 0 1.7-.8 1.7-1.7V9.3l.9.5c.4.2.6.6.6 1.1 0 1.6-1.3 2.9-2.9 2.9h-2.3l1.2 2c.2.4.3.8.3 1.2 0 .9-.8 1.7-1.7 1.7z" />
                      </svg>
                    </span>
                    <span>OpenAI Platform</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden Native File Input */}
        <input 
          ref={fileInputRef} 
          type="file" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />

        {/* Search Input Form */}
        {isListening ? (
          <div className={styles.voiceCapsule}>
            <button type="button" className={styles.voicePlusBtn} disabled>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            
            <div className={styles.voiceDottedLine} />
            
            <div className={styles.voiceWaveform}>
              {Array.from({ length: 32 }).map((_, idx) => (
                <div 
                  key={idx} 
                  ref={el => { barRefs.current[idx] = el; }}
                  className={styles.voiceBar} 
                  style={{ height: '8px' }} 
                />
              ))}
            </div>
            
            <div className={styles.voiceRightActions}>
              <button 
                type="button" 
                className={styles.voiceActionBtn} 
                onClick={handleVoiceCancel}
                title="Remove"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <button 
                type="button" 
                className={styles.voiceActionBtn} 
                onClick={handleVoiceCommit}
                title="Process"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.inputCard} onSubmit={handleSubmit}>
            
            {/* File Attachment Previews */}
            {attachedFiles.length > 0 && (
              <div className={styles.attachedFilesList}>
                {attachedFiles.map((file, idx) => {
                  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(file.type.toLowerCase());
                  if (isImage) {
                    return (
                      <div key={idx} className={styles.imagePreviewCard}>
                        <img src={file.url} alt={file.name} className={styles.imagePreview} />
                        <button type="button" className={styles.removeImageBtn} onClick={() => handleRemoveFile(idx)} title="Remove image">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className={styles.filePreviewCard}>
                      <div className={styles.fileIconWrap}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className={styles.fileMeta}>
                        <div className={styles.fileName} title={file.name}>
                          {file.name.length > 25 ? file.name.slice(0, 22) + '...' : file.name}
                        </div>
                        <div className={styles.fileType}>{file.type.toUpperCase()}</div>
                      </div>
                      <button type="button" className={styles.removeFileBtn} onClick={() => handleRemoveFile(idx)} title="Remove file">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Top Row: Input Textarea */}
            <div className={styles.inputTopRow}>
              <textarea
                ref={textareaRef}
                className={styles.textarea}
                placeholder="Ask anything"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isLoading}
              />
            </div>

            {/* Bottom Row: Attach, Tool Badge + Audio Triggers */}
            <div className={styles.inputBottomRow}>
              
              <div className={styles.bottomLeftActions}>
                <button 
                  type="button" 
                  className={`${styles.attachBtn} ${isPopoverOpen ? styles.attachBtnActive : ''}`} 
                  onClick={() => setIsPopoverOpen(p => !p)}
                  title="Attach files & tools"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                {/* Image Pill */}
                {createImageActive && (
                  <div className={`${styles.inputPill} ${styles.imagePill}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span>Image</span>
                    <button type="button" className={styles.removePillBtn} onClick={() => setCreateImageActive(false)} title="Remove tag">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Aspect Ratio Pill & Popover Menu */}
                {createImageActive && (
                  <div className={styles.ratioPillContainer} ref={ratioContainerRef}>
                    <div 
                      className={styles.ratioPill}
                      onClick={() => setIsRatioPopoverOpen(p => !p)}
                      title="Choose image aspect ratio"
                    >
                      {getRatioOption(imageAspectRatio).icon}
                      <span>{getRatioOption(imageAspectRatio).label}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.ratioChevron}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    {isRatioPopoverOpen && (
                      <div className={styles.ratioPopover}>
                        <div className={styles.ratioPopoverTitle}>Choose image aspect ratio</div>
                        {RATIO_OPTIONS.map((opt) => (
                          <div 
                            key={opt.value}
                            className={`${styles.ratioOption} ${imageAspectRatio === opt.value ? styles.ratioOptionActive : ''}`}
                            onClick={() => {
                              setImageAspectRatio(opt.value);
                              setIsRatioPopoverOpen(false);
                            }}
                          >
                            {opt.icon}
                            <span className={styles.ratioOptionLabel}>{opt.label}</span>
                            {imageAspectRatio === opt.value && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.ratioCheckmark}>
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Thinking Pill */}
                {thinkingActive && (
                  <div className={`${styles.inputPill} ${styles.thinkingPill}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                      <line x1="9" y1="18" x2="15" y2="18"/>
                      <line x1="10" y1="22" x2="14" y2="22"/>
                    </svg>
                    <span>Thinking</span>
                    <button type="button" className={styles.removePillBtn} onClick={() => setThinkingActive(false)} title="Remove tag">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Deep Research Pill */}
                {deepResearchActive && (
                  <div className={`${styles.inputPill} ${styles.deepResearchPill}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M10.08 8.16l8.88-4.44a1 1 0 0 1 1.32 1.32l-4.44 8.88" />
                      <path d="m15.76 10.08-5.76-5.76" />
                      <path d="m12.96 12.96-5.76-5.76" />
                      <path d="m10.08 15.76-5.76-5.76" />
                      <path d="M4.32 13.92a1 1 0 0 0-.12 1.15l2.25 4.5a1 1 0 0 0 1.62.18l5.77-5.77" />
                      <path d="M22 22v-3a1 1 0 0 0-1-1h-3" />
                      <path d="M12 12l9 9" />
                    </svg>
                    <span>Deep research</span>
                    <button type="button" className={styles.removePillBtn} onClick={() => setDeepResearchActive(false)} title="Remove tag">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Web Search Pill */}
                {webSearchActive && (
                  <div className={`${styles.inputPill} ${styles.webSearchPill}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span>Web search</span>
                    <button type="button" className={styles.removePillBtn} onClick={() => setWebSearchActive(false)} title="Remove tag">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Active Tool Badge Tag */}
                {activeTool !== 'none' && (
                  <div className={`${styles.toolTag} ${activeTool === 'openai' ? styles.toolTagOpenAI : styles.toolTagGitHub}`}>
                    {activeTool === 'openai' ? (
                      <>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className={styles.toolIcon}>
                          <path d="M21.7 10.4c.1-.4.2-.8.2-1.2 0-2.2-1.8-4-4-4-.4 0-.7.1-1.1.2C15.8 3.7 14 2 12 2s-3.8 1.7-4.8 3.4c-.4-.1-.7-.2-1.1-.2-2.2 0-4 1.8-4 4 0 .4.1.8.2 1.2C1.2 11.2 0 13 0 15c0 2.2 1.8 4 4 4 .4 0 .7-.1 1.1-.2C6.2 20.3 8 22 10 22s3.8-1.7 4.8-3.4c.4.1.7.2 1.1.2 2.2 0 4-1.8 4-4 0-.4-.1-.8-.2-1.2 1.1-.8 1.8-2.6 1.8-4.6 0-2-1.8-3.8-4-3.8zM12 20c-1.1 0-2.1-.6-2.6-1.6l.9-.5c.4.7 1.1 1.1 1.7 1.1.9 0 1.7-.8 1.7-1.7v-2.3l-2 1.2c-.4.2-.8.3-1.2.3-.9 0-1.7-.8-1.7-1.7 0-.4.1-.8.3-1.2l2-1.2-2-1.2c-.2-.1-.5-.2-.7-.2-.9 0-1.7.8-1.7 1.7v2.4l-.9-.5c-.4-.2-.6-.6-.6-1.1 0-1.6 1.3-2.9 2.9-2.9h2.3l-1.2-2c-.2-.4-.3-.8-.3-1.2 0-.9.8-1.7 1.7-1.7s1.7.8 1.7 1.7v2.3l2-1.2c.4-.2.8-.3 1.2-.3.9 0 1.7-.8 1.7 1.7 0 .4-.1.8-.3 1.2l-2 1.2 2 1.2c.2.1.5.2.7.2.9 0 1.7-.8 1.7-1.7V9.3l.9.5c.4.2.6.6.6 1.1 0 1.6-1.3 2.9-2.9 2.9h-2.3l1.2 2c.2.4.3.8.3 1.2 0 .9-.8 1.7-1.7 1.7z" />
                        </svg>
                        <span>OpenAI Platform</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className={styles.toolIcon}>
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        <span>GitHub</span>
                      </>
                    )}
                    <button type="button" className={styles.removeToolBtn} onClick={() => setActiveTool('none')} title="Remove tool">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.bottomRightActions}>
                {/* Voice search button */}
                <button 
                  type="button" 
                  className={`${styles.iconBtn} ${isListening ? styles.micListening : ''}`} 
                  onClick={handleMicClick}
                  title={isListening ? 'Stop Listening' : 'Voice search'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </button>
                
                {/* White Voice Call button */}
                <button 
                  type="button" 
                  className={styles.voiceSessionBtn} 
                  onClick={openVoiceSession}
                  title="Start voice session"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.wavesIconBlack}>
                    <line x1="4" y1="9" x2="4" y2="15" />
                    <line x1="9" y1="6" x2="9" y2="18" />
                    <line x1="14" y1="8" x2="14" y2="16" />
                    <line x1="19" y1="10" x2="19" y2="14" />
                  </svg>
                </button>

                {(text.trim() || attachedFiles.length > 0) && (
                  <button type="submit" className={styles.sendBtn} title="Send message" disabled={isLoading}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                )}
              </div>

            </div>
          </form>
        )}
      </div>

      {/* Suggestions List */}
      <div className={styles.suggestionsList}>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            className={styles.suggestionItem}
            onClick={() => sendMessage(s.prompt)}
          >
            <span className={styles.suggestionIcon}>{s.icon}</span>
            <span className={styles.suggestionLabel}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <div className={styles.disclaimer}>
        ChatGPT can make mistakes. Check important info.
      </div>
    </div>
  );
}
