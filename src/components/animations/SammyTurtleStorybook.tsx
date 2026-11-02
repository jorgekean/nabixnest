import React from 'react';

interface StorybookProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export const SammyTurtleStorybook: React.FC<StorybookProps> = ({ currentTime, isPlaying }) => {
  const act =
    currentTime < 35 ? 1 :
    currentTime < 65 ? 2 :
    currentTime < 105 ? 3 :
    currentTime < 135 ? 4 : 5;

  const currentSway = Math.sin(currentTime * 1.5) * 4;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '240px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #05192d 0%, #082f49 50%, #0e7490 100%)',
        border: '2px solid rgba(6, 182, 212, 0.35)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 30px rgba(6, 182, 212, 0.15)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <svg viewBox="0 0 420 240" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="lagoonMoon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#cffafe" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lanternFishGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Moon shining down into lagoon */}
        <circle cx="340" cy="45" r="32" fill="url(#lagoonMoon)" className="animate-moon-pulse" />
        <circle cx="340" cy="45" r="16" fill="#ecfeff" />

        {/* Coral Lagoon Reef Bed */}
        <path d="M 0 190 Q 110 170 210 185 Q 320 165 420 180 L 420 240 L 0 240 Z" fill="#042033" />

        {/* Purple Sea Fans swaying gently */}
        <path d="M 40 220 Q 30 160 50 125 Q 70 170 55 220" fill="#a855f7" opacity="0.8" className="animate-leaf-sway" />
        <path d="M 70 230 Q 85 170 100 135 Q 90 185 80 230" fill="#c084fc" opacity="0.6" className="animate-leaf-sway" />
        <path d="M 370 220 Q 350 160 365 125 Q 385 170 375 220" fill="#a855f7" opacity="0.8" className="animate-leaf-sway" />

        {/* School of Tiny Glowing Lantern Fish beneath him */}
        <g transform={`translate(${Math.sin(currentTime) * 20}, ${Math.cos(currentTime * 0.8) * 8})`}>
          <circle cx="120" cy="180" r="8" fill="url(#lanternFishGlow)" />
          <ellipse cx="120" cy="180" rx="4" ry="2.2" fill="#22d3ee" />

          <circle cx="150" cy="195" r="7" fill="url(#lanternFishGlow)" />
          <ellipse cx="150" cy="195" rx="3.5" ry="1.8" fill="#22d3ee" />

          <circle cx="280" cy="185" r="9" fill="url(#lanternFishGlow)" />
          <ellipse cx="280" cy="185" rx="4.5" ry="2.2" fill="#22d3ee" />
        </g>

        {/* Grandpa Turtle Floating (Act 1 & 2) */}
        {act <= 2 && (
          <g transform="translate(100, 115)">
            <ellipse cx="25" cy="20" rx="30" ry="22" fill="#0f766e" />
            <ellipse cx="25" cy="20" rx="24" ry="17" fill="#14b8a6" />
            <ellipse cx="-12" cy="16" rx="10" ry="7.5" fill="#0d9488" />
            <circle cx="-16" cy="14" r="2" fill="#042f2e" />
          </g>
        )}

        {/* Little Sammy Sea Turtle */}
        <g
          transform={`translate(${act <= 2 ? 180 : 170}, ${110 + (isPlaying ? currentSway : 0)})`}
          className={isPlaying ? 'animate-barnaby-breathe' : ''}
        >
          {/* Smooth Green Shell */}
          <ellipse cx="30" cy="24" rx="28" ry="20" fill="#0d9488" />
          <ellipse cx="30" cy="24" rx="23" ry="16" fill="#14b8a6" />
          {/* Shell Pattern */}
          <polygon points="30,12 38,18 35,28 25,28 22,18" fill="#0f766e" opacity="0.6" />

          {/* Front & Hind Flippers */}
          {/* Relaxed flippers drifting in warm water */}
          <ellipse
            cx="14"
            cy="40"
            rx="14"
            ry="6"
            fill="#0f766e"
            transform={act === 1 ? `rotate(${Math.sin(currentTime * 3) * 15})` : 'rotate(20)'}
          />
          <ellipse cx="46" cy="38" rx="11" ry="5" fill="#0f766e" transform="rotate(-15)" />

          {/* Turtle Head */}
          {act === 5 ? (
            /* Tucked safely inside smooth shell */
            <g>
              <circle cx="2" cy="22" r="6" fill="#0f766e" />
              {/* Sleepy bubbles rising */}
              <circle cx="-6" cy="12" r="2" fill="#cffafe" opacity="0.7" />
              <circle cx="-10" cy="2" r="3" fill="#cffafe" opacity="0.5" />
            </g>
          ) : (
            /* Head out, eyes watching lantern fish */
            <g>
              <ellipse cx="-4" cy="18" rx="10" ry="7.5" fill="#0f766e" />
              {act >= 3 ? (
                /* Sleepy closed eye */
                <path d="M -8 15 Q -5 18 -2 15" stroke="#042f2e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              ) : (
                /* Happy round eye */
                <circle cx="-5" cy="15" r="2" fill="#042f2e" />
              )}
            </g>
          )}
        </g>
      </svg>

      {/* Subtitle Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 14px',
          borderRadius: '999px',
          backgroundColor: 'rgba(5, 25, 45, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          fontSize: '0.74rem',
          color: '#cffafe',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#06b6d4' : '#94a3b8',
            boxShadow: isPlaying ? '0 0 8px #06b6d4' : 'none',
          }}
        />
        <span>
          {act === 1 && '🐢 Act 1: Gliding into the calm turquoise lagoon'}
          {act === 2 && '🌊 Act 2: Grandpa: "Let the water hold you..."'}
          {act === 3 && '🐠 Act 3: Lantern fish twinkling like underwater stars'}
          {act === 4 && '💙 Act 4: Rock and sway... relaxing all flippers'}
          {act === 5 && '💤 Act 5: Tucking into shell... sweet water dreams'}
        </span>
      </div>
    </div>
  );
};
