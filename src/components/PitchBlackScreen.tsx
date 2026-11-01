import React from 'react';
import type { Story } from '../data/stories';
import { Play, Pause } from 'lucide-react';

interface PitchBlackScreenProps {
  story: Story | null;
  isPlaying: boolean;
  timerMinutesRemaining: number | null;
  onTogglePlayPause: () => void;
  onExit: () => void;
}

export const PitchBlackScreen: React.FC<PitchBlackScreenProps> = ({
  story,
  isPlaying,
  timerMinutesRemaining,
  onTogglePlayPause,
  onExit,
}) => {
  return (
    <div
      onClick={onExit}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '24px',
        userSelect: 'none',
      }}
    >
      {/* Extremely faint breathing moon */}
      <div
        className="animate-sleep-breath"
        style={{
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.2))',
          opacity: 0.65,
          marginBottom: '20px',
        }}
      >
        🌙
      </div>

      {/* Dim status text (non-disruptive red/amber/dim grey) */}
      <div style={{ textAlign: 'center', maxWidth: '320px' }}>
        <h4 style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.35)', fontWeight: 500, marginBottom: '6px' }}>
          {story?.title || 'Bedtime Sleep Story'}
        </h4>

        <div style={{ fontSize: '0.78rem', color: 'rgba(251, 191, 36, 0.45)', marginBottom: '28px' }}>
          {timerMinutesRemaining !== null
            ? `⏱ Auto-sleep in ${timerMinutesRemaining}m (Gentle Fade)`
            : '🌙 Playing quietly...'}
        </div>
      </div>

      {/* Dim Play/Pause button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlayPause();
        }}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.4)',
          cursor: 'pointer',
          marginBottom: '40px',
        }}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
      </button>

      {/* Tap anywhere hint */}
      <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.2)', position: 'absolute', bottom: '32px' }}>
        Tap anywhere to brighten screen
      </span>
    </div>
  );
};
