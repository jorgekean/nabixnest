import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  CloudRain, 
  Wind, 
  Music, 
  Waves, 
  Moon, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Timer, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import type { Story } from '../data/stories';
import type { AmbientType } from '../audio/ambientSynth';
import { StoryAnimationScene } from './animations/StoryAnimationScene';

interface AudioPlayerModalProps {
  story: Story;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  voiceVolume: number;
  ambientVolume: number;
  ambientType: AmbientType;
  timerMinutesRemaining: number | null;
  playbackRate: number;
  onTogglePlayPause: () => void;
  onSeek: (seconds: number) => void;
  onSeekRelative: (delta: number) => void;
  onSetVoiceVolume: (volume: number) => void;
  onSetAmbientVolume: (volume: number) => void;
  onSetAmbientType: (type: AmbientType) => void;
  onSetSleepTimer: (minutes: number | null) => void;
  onSetPlaybackRate: (rate: number) => void;
  onToggleBlackScreen: () => void;
  onClose: () => void;
}

export const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({
  story,
  isPlaying,
  currentTime,
  duration,
  voiceVolume,
  ambientVolume,
  ambientType,
  timerMinutesRemaining,
  playbackRate,
  onTogglePlayPause,
  onSeek,
  onSeekRelative,
  onSetVoiceVolume,
  onSetAmbientVolume,
  onSetAmbientType,
  onSetSleepTimer,
  onSetPlaybackRate,
  onToggleBlackScreen,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showFullScript, setShowFullScript] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'animated' | 'minimal'>('animated');

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Render Persistent Bottom Mini-Player if collapsed
  // Render Persistent Bottom Mini-Player if collapsed
  if (!isExpanded) {
    return (
      <div
        className="glass-panel safe-bottom-bar"
        style={{
          position: 'fixed',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 40,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
          cursor: 'pointer',
          gap: '10px',
        }}
        onClick={() => setIsExpanded(true)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: '26px', flexShrink: 0 }}>{story.characterEmoji}</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h4
              style={{
                fontSize: '0.92rem',
                color: '#fff',
                marginBottom: '2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {story.title}
            </h4>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {formatTime(currentTime)} / {formatTime(duration)} • {ambientType !== 'none' ? `🎵 ${ambientType}` : 'Voice only'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlayPause();
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#fbbf24',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#07051a',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {isPlaying ? <Pause size={20} fill="#07051a" /> : <Play size={20} fill="#07051a" style={{ marginLeft: '2px' }} />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            aria-label="Expand player"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ChevronUp size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Stop and close player"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Full Expanded Player Modal
  return (
    <div
      className="safe-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 5, 26, 0.94)',
        backdropFilter: 'blur(24px)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        // Tapping backdrop minimizes or dismisses
        if (e.target === e.currentTarget) {
          setIsExpanded(false);
        }
      }}
    >
      <div style={{ width: '100%', maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Top Bar with Clear Sizing & Non-Overlapping Touch Targets */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="glass-pill"
            style={{
              padding: '8px 14px',
              minHeight: '42px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#cbd5e1',
              cursor: 'pointer',
              fontSize: '0.85rem',
              flexShrink: 0,
            }}
          >
            <ChevronDown size={18} />
            <span>Minimize</span>
          </button>

          <span
            style={{
              fontSize: '0.82rem',
              color: '#fbbf24',
              fontWeight: 600,
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              minWidth: 0,
            }}
          >
            {timerMinutesRemaining !== null ? `⏱ ${timerMinutesRemaining}m left` : '🌙 Bedtime Listening'}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close player"
            style={{
              width: '42px',
              height: '42px',
              minWidth: '42px',
              minHeight: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              zIndex: 10,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Character Sleep Emblem / Animated Bedtime Scene */}
        <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', alignItems: 'center', width: '100%', margin: '4px 0' }}>
          {/* Subtle View Mode Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 4px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              marginBottom: '10px',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('animated')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: viewMode === 'animated' ? 600 : 400,
                color: viewMode === 'animated' ? '#07051a' : '#94a3b8',
                backgroundColor: viewMode === 'animated' ? '#fbbf24' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={12} />
              <span>Animated Scene</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('minimal')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: viewMode === 'minimal' ? 600 : 400,
                color: viewMode === 'minimal' ? '#07051a' : '#94a3b8',
                backgroundColor: viewMode === 'minimal' ? '#fbbf24' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Moon size={12} />
              <span>Low-Stim Glow</span>
            </button>
          </div>

          {viewMode === 'animated' ? (
            <StoryAnimationScene story={story} isPlaying={isPlaying} />
          ) : (
            <div
              className="animate-moon-pulse"
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '35px',
                background: 'radial-gradient(circle at 35% 35%, rgba(251, 191, 36, 0.25), rgba(18, 12, 45, 0.8))',
                border: `2px solid ${story.themeColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '54px',
                boxShadow: `0 0 40px ${story.themeColor}33`,
              }}
            >
              {story.characterEmoji}
            </div>
          )}

          <h2 style={{ fontSize: '1.45rem', color: '#ffffff', textAlign: 'center', marginTop: '14px', lineHeight: 1.2 }}>
            {story.title}
          </h2>
          <span style={{ fontSize: '0.88rem', color: story.themeColor, fontWeight: 500, marginTop: '4px' }}>
            {story.tagline}
          </span>
        </div>

        {/* Timeline Progress Scrubber */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              onSeek(pct * duration);
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: '#fbbf24',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8' }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Transport Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px', margin: '4px 0' }}>
          <button
            onClick={() => onSeekRelative(-15)}
            className="glass-pill"
            style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', cursor: 'pointer' }}
            title="Rewind 15 seconds"
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={onTogglePlayPause}
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#07051a',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(251, 191, 36, 0.5)',
              transform: 'scale(1)',
              transition: 'transform 0.1s ease',
            }}
          >
            {isPlaying ? <Pause size={34} fill="#07051a" /> : <Play size={34} fill="#07051a" style={{ marginLeft: '4px' }} />}
          </button>

          <button
            onClick={() => onSeekRelative(15)}
            className="glass-pill"
            style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', cursor: 'pointer' }}
            title="Forward 15 seconds"
          >
            <RotateCw size={20} />
          </button>
        </div>

        {/* Voice Playback Speed / Tempo Options */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', margin: '2px 0 6px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8', marginRight: '2px' }}>Pacing:</span>
            {[
              { label: '0.75x Slower', value: 0.75 },
              { label: '0.85x Gentle', value: 0.85 },
              { label: '1.0x Bedtime', value: 1.0 },
              { label: '1.15x Clear', value: 1.15 },
              { label: '1.25x Brisk', value: 1.25 },
            ].map(speed => {
              const isSelected = Math.abs(playbackRate - speed.value) < 0.04;
              return (
                <button
                  type="button"
                  key={speed.value}
                  onClick={() => onSetPlaybackRate(speed.value)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: '9999px',
                    border: isSelected ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.12)',
                    background: isSelected ? 'rgba(251, 191, 36, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#fbbf24' : '#cbd5e1',
                    fontSize: '0.74rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  title={`Play narration at ${speed.value}x speed`}
                >
                  {speed.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Audio Mixer Controls (Voice + Ambient) */}
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fde68a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🎚️ Sleep Soundscape Mixer
          </div>

          {/* Voiceover Volume */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={15} color="#38bdf8" /> Narrator Voice
              </span>
              <span style={{ color: '#94a3b8' }}>{Math.round(voiceVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={voiceVolume}
              onChange={(e) => onSetVoiceVolume(parseFloat(e.target.value))}
            />
          </div>

          {/* Ambient Soundscape Volume */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CloudRain size={15} color="#34d399" /> Ambient Background
              </span>
              <span style={{ color: '#94a3b8' }}>{Math.round(ambientVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ambientVolume}
              onChange={(e) => onSetAmbientVolume(parseFloat(e.target.value))}
            />
          </div>

          {/* Ambient Sound Preset Buttons */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { type: 'rain' as AmbientType, label: 'Warm Rain', icon: CloudRain },
              { type: 'crickets' as AmbientType, label: 'Crickets', icon: Wind },
              { type: 'lullaby' as AmbientType, label: 'Lullaby', icon: Music },
              { type: 'waves' as AmbientType, label: 'Ocean Waves', icon: Waves },
              { type: 'none' as AmbientType, label: 'Mute Ambient', icon: X },
            ].map((item) => {
              const isSelected = ambientType === item.type;
              const Icon = item.icon;
              return (
                <button
                  key={item.type}
                  onClick={() => onSetAmbientType(item.type)}
                  style={{
                    flex: '1 0 auto',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isSelected ? '#38bdf8' : '#cbd5e1',
                  }}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Smart Sleep Timer Selector */}
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fde68a', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Timer size={16} /> Smart Sleep Timer (Gentle Fadeout)
            </span>
            {timerMinutesRemaining !== null && (
              <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>Active</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { mins: null, label: 'Off' },
              { mins: 10, label: '10 min' },
              { mins: 20, label: '20 min' },
              { mins: 30, label: '30 min' },
              { mins: 45, label: '45 min' },
            ].map((t) => {
              const isSelected = timerMinutesRemaining === t.mins;
              return (
                <button
                  key={String(t.mins)}
                  onClick={() => onSetSleepTimer(t.mins)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(251, 191, 36, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isSelected ? '#fbbf24' : '#cbd5e1',
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pitch-Black Room Sleep Mode Trigger */}
        <button
          onClick={onToggleBlackScreen}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1e1347 0%, #0a0620 100%)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
            fontWeight: 700,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Moon size={20} fill="#38bdf8" />
          <span>Darken Bedroom (Pitch-Black OLED Mode)</span>
        </button>

        {/* Read-Along Script Accordion */}
        <div className="glass-panel" style={{ padding: '16px', borderRadius: '18px' }}>
          <button
            onClick={() => setShowFullScript(!showFullScript)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 600,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={16} color="#fbbf24" /> Read Story Script Along
            </span>
            <span>{showFullScript ? '▲ Hide' : '▼ Read'}</span>
          </button>

          {showFullScript && (
            <div style={{ marginTop: '14px', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.7, maxHeight: '220px', overflowY: 'auto', paddingRight: '8px' }}>
              {story.fullText.split('\n\n').map((para, idx) => (
                <p key={idx} style={{ marginBottom: '12px' }}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
