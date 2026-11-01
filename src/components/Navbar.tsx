import React from 'react';
import { Moon, Sparkles, Flame } from 'lucide-react';

interface NavbarProps {
  streak: number;
  onOpenCustomCreator: () => void;
  onToggleBlackScreen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  streak,
  onOpenCustomCreator,
  onToggleBlackScreen,
}) => {
  return (
    <header
      className="glass-panel"
      style={{
        margin: '12px 12px 0 12px',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 30,
        gap: '8px',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flexShrink: 1 }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(251, 191, 36, 0.4)',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '20px' }}>🌙</span>
        </div>
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontSize: '1.25rem',
              color: '#fff',
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #ffffff 0%, #fde68a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            BedtimeNest
          </h1>
          <span
            className="navbar-subtitle"
            style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.04em', display: 'block', whiteSpace: 'nowrap' }}
          >
            SCREEN-FREE SLEEP STORIES
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* Streak Pill */}
        <div
          className="glass-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            fontSize: '0.8rem',
            color: '#fbbf24',
          }}
          title="Peaceful bedtime streak"
        >
          <Flame size={15} />
          <span style={{ fontWeight: 600 }}>{streak}</span>
          <span className="navbar-streak-label" style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>nights</span>
        </div>

        {/* Custom Story Creator */}
        <button
          onClick={onOpenCustomCreator}
          className="glass-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 10px',
            fontSize: '0.8rem',
            color: '#c084fc',
            cursor: 'pointer',
            border: '1px solid rgba(192, 132, 252, 0.35)',
            background: 'rgba(192, 132, 252, 0.12)',
            minHeight: '36px',
          }}
          title="Create a personalized story for your child"
        >
          <Sparkles size={15} />
          <span className="navbar-personalize-text">Create Story</span>
        </button>

        {/* Black Screen Sleep Mode Quick Trigger */}
        <button
          onClick={onToggleBlackScreen}
          className="glass-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            color: '#38bdf8',
            cursor: 'pointer',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'rgba(56, 189, 248, 0.12)',
            flexShrink: 0,
          }}
          title="Pitch-Black OLED Sleep Mode (Dims screen completely)"
        >
          <Moon size={16} />
        </button>
      </div>
    </header>
  );
};
