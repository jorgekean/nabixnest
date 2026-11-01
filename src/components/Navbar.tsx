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
    <header className="glass-panel" style={{ margin: '16px 16px 0 16px', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 30 }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(251, 191, 36, 0.4)'
        }}>
          <span style={{ fontSize: '24px' }}>🌙</span>
        </div>
        <div>
          <h1 style={{ fontSize: '1.4rem', color: '#fff', lineHeight: 1.1, background: 'linear-gradient(135deg, #ffffff 0%, #fde68a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BedtimeNest
          </h1>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.04em' }}>
            SCREEN-FREE SLEEP STORIES
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Streak Pill */}
        <div className="glass-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '0.85rem', color: '#fbbf24' }} title="Peaceful nights in a row">
          <Flame size={16} />
          <span style={{ fontWeight: 600 }}>{streak}</span>
          <span style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>nights</span>
        </div>

        {/* Custom Story Creator */}
        <button
          onClick={onOpenCustomCreator}
          className="glass-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            fontSize: '0.82rem',
            color: '#c084fc',
            cursor: 'pointer',
            border: '1px solid rgba(192, 132, 252, 0.35)',
            background: 'rgba(192, 132, 252, 0.12)'
          }}
          title="Create a personalized story for your child"
        >
          <Sparkles size={15} />
          <span>Personalize</span>
        </button>

        {/* Black Screen Sleep Mode Quick Trigger */}
        <button
          onClick={onToggleBlackScreen}
          className="glass-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            color: '#38bdf8',
            cursor: 'pointer',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'rgba(56, 189, 248, 0.12)'
          }}
          title="Pitch-Black OLED Sleep Mode (Dims screen completely)"
        >
          <Moon size={18} />
        </button>
      </div>
    </header>
  );
};
