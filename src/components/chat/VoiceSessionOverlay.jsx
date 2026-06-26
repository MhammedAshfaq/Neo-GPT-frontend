'use client';

import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import styles from './VoiceSessionOverlay.module.css';

export default function VoiceSessionOverlay() {
  const { voiceSessionActive, closeVoiceSession, addToast } = useApp();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [status, setStatus] = useState('Connecting...'); // 'Connecting...' | 'Listening' | 'Speaking' | 'Muted'
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const orbRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!voiceSessionActive) return;

    setStatus('Listening');
    
    // Attempt to initialize Web Audio microphone analyzer
    async function initAudio() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Microphone access is not supported by this browser.');
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioContextRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Animation loop to dynamically pulse the orb based on mic volume
        function updateVolumeScale() {
          if (!analyserRef.current || isMuted) {
            if (orbRef.current) orbRef.current.style.transform = 'scale(1)';
            if (glowRef.current) glowRef.current.style.opacity = '0.3';
            animationFrameRef.current = requestAnimationFrame(updateVolumeScale);
            return;
          }

          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Calculate average amplitude
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const average = sum / bufferLength;
          
          // Convert average to scale factor (from 1.0 to ~1.6)
          const targetScale = 1 + (average / 255) * 0.7;
          
          // Update status based on speaking/silent threshold
          if (average > 15) {
            setStatus('Listening');
          }

          // Directly modify DOM style properties to prevent React re-render overhead
          if (orbRef.current) {
            orbRef.current.style.transform = `scale(${targetScale})`;
          }
          if (glowRef.current) {
            glowRef.current.style.opacity = `${0.3 + (average / 255) * 0.7}`;
          }

          animationFrameRef.current = requestAnimationFrame(updateVolumeScale);
        }

        animationFrameRef.current = requestAnimationFrame(updateVolumeScale);
      } catch (err) {
        console.warn('Microphone permission or Web Audio API failed. Using CSS animation fallback.', err);
        setStatus('Listening (Simulation)');
        // Fallback pulsing loop using Javascript setInterval if Web Audio is blocked
        let pulseDir = 1;
        let scale = 1.0;
        const fallbackInterval = setInterval(() => {
          if (isMuted) {
            scale = 1.0;
          } else {
            scale += pulseDir * 0.01;
            if (scale > 1.15) pulseDir = -1;
            if (scale < 1.0) pulseDir = 1;
          }
          if (orbRef.current) orbRef.current.style.transform = `scale(${scale})`;
        }, 30);

        return () => clearInterval(fallbackInterval);
      }
    }

    initAudio();

    // Clean up streams and animation contexts on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [voiceSessionActive, isMuted]);

  if (!voiceSessionActive) return null;

  const handleMuteToggle = () => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach(track => {
          track.enabled = !nextMuted;
        });
      }
      setStatus(nextMuted ? 'Muted' : 'Listening');
      return nextMuted;
    });
  };

  const handleSpeakerToggle = () => {
    setIsSpeakerOn(prev => !prev);
    addToast(isSpeakerOn ? 'Speaker output muted' : 'Speaker output active', 'info');
  };

  const handleEndCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    closeVoiceSession();
    addToast('Voice session ended', 'info');
  };

  return (
    <div className={styles.overlay}>
      
      {/* Top Header */}
      <div className={styles.header}>
        <div className={styles.brand}>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2" className={styles.brandIcon}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className={styles.brandText}>Neo GPT Voice</span>
        </div>
        <span className={styles.secureText}>End-to-end encrypted</span>
      </div>

      {/* Main Orb Center */}
      <div className={styles.centerArea}>
        <div ref={glowRef} className={styles.glowBg}></div>
        <div className={styles.orbWrapper}>
          <div ref={orbRef} className={styles.voiceOrb}>
            <div className={styles.orbInner}></div>
          </div>
        </div>
        
        {/* Status text */}
        <div className={styles.statusWrap}>
          <span className={styles.statusText}>{status}</span>
          {status === 'Listening' && <span className={styles.listeningPulse}></span>}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className={styles.footer}>
        <div className={styles.controlsRow}>
          {/* Mute button */}
          <button
            className={`${styles.controlBtn} ${isMuted ? styles.mutedActive : ''}`}
            onClick={handleMuteToggle}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </button>

          {/* End session button */}
          <button
            className={`${styles.controlBtn} ${styles.endCallBtn}`}
            onClick={handleEndCall}
            title="End voice session"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Speaker button */}
          <button
            className={`${styles.controlBtn} ${!isSpeakerOn ? styles.speakerOff : ''}`}
            onClick={handleSpeakerToggle}
            title={isSpeakerOn ? 'Turn speaker off' : 'Turn speaker on'}
          >
            {isSpeakerOn ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
