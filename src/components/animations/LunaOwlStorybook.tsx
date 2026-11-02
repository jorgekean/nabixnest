import React from 'react';

interface StorybookProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export const LunaOwlStorybook: React.FC<StorybookProps> = ({ currentTime, isPlaying }) => {
  // Act 1 (0-35s): Grand Willow perch & bright full moon
  // Act 2 (35-65s): Grandpa Owl comforting with warm chuckle ("The dark is just the world's blanket")
  // Act 3 (65-105s): Floating glide over sleepy rabbits & humming silvery brook
  // Act 4 (105-135s): Golden firefly blinking "Goodnight Luna"
  // Act 5 (135s+): Tucking beak under wing in cedar nest, sleeping safe
  const act =
    currentTime < 35 ? 1 :
    currentTime < 65 ? 2 :
    currentTime < 105 ? 3 :
    currentTime < 135 ? 4 : 5;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '240px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #070921 0%, #111a3d 50%, #1e2c56 100%)',
        border: '2px solid rgba(56, 189, 248, 0.35)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 30px rgba(56, 189, 248, 0.15)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <svg viewBox="0 0 420 240" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="lunaMoonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fireflyAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brookStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Luminous Silver Full Moon */}
        <circle cx="340" cy="55" r="42" fill="url(#lunaMoonGlow)" className="animate-moon-pulse" />
        <circle cx="340" cy="55" r="22" fill="#f0f9ff" style={{ filter: 'drop-shadow(0 0 12px rgba(224, 242, 254, 0.8))' }} />

        {/* Twinkling Stars */}
        <circle cx="45" cy="35" r="1.5" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="110" cy="50" r="1.8" fill="#e0f2fe" className="animate-star-twinkle-2" />
        <circle cx="190" cy="25" r="1.5" fill="#fef08a" className="animate-star-twinkle-3" />
        <circle cx="260" cy="40" r="1.8" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="295" cy="80" r="1.2" fill="#bae6fd" className="animate-star-twinkle-2" />

        {/* Distant Forest Silhouettes */}
        <path d="M 0 165 Q 90 145 190 155 Q 310 140 420 160 L 420 240 L 0 240 Z" fill="#060c22" opacity="0.85" />

        {/* Silvery Forest Brook */}
        <path d="M 0 210 Q 120 190 240 215 Q 340 195 420 215 L 420 240 L 0 240 Z" fill="url(#brookStream)" opacity="0.65" />

        {act === 3 ? (
          /* ================= ACT 3: LUNA GLIDING THROUGH THE NIGHT AIR ================= */
          <g>
            {/* Sleeping Baby Rabbits in their Burrow on the ground */}
            <g transform="translate(80, 185)">
              <ellipse cx="25" cy="15" rx="18" ry="12" fill="#78716c" />
              <circle cx="14" cy="10" r="8" fill="#78716c" />
              <ellipse cx="8" cy="6" rx="4" ry="1.5" fill="#57534e" transform="rotate(-25)" />
              <path d="M 12 10 Q 15 12 18 10" stroke="#44403c" strokeWidth="1.2" fill="none" />
            </g>

            {/* Luna Gliding with Outstretched Wings */}
            <g
              transform={`translate(${180 + Math.sin(currentTime * 1.5) * 45}, ${75 + Math.cos(currentTime) * 15})`}
              className={isPlaying ? 'animate-gentle-float' : ''}
            >
              {/* Outstretched Wings */}
              <path d="M -35 -4 Q 0 -18 35 -4 Q 0 8 -35 -4 Z" fill="#e0f2fe" opacity="0.9" />
              {/* Body */}
              <ellipse cx="0" cy="0" rx="14" ry="18" fill="#ffffff" />
              <ellipse cx="0" cy="4" rx="10" ry="12" fill="#bae6fd" opacity="0.6" />
              {/* Head */}
              <circle cx="0" cy="-14" r="13" fill="#ffffff" />
              {/* Owl Face Heart */}
              <path d="M -8 -16 C -8 -22 0 -22 0 -14 C 0 -22 8 -22 8 -16 C 8 -8 0 -4 0 -4 C 0 -4 -8 -8 -8 -16 Z" fill="#f0f9ff" />
              {/* Beak */}
              <polygon points="-2.5,-12 2.5,-12 0,-7" fill="#fbbf24" />
              {/* Big Gentle Eyes */}
              <circle cx="-5" cy="-14" r="3.5" fill="#0369a1" />
              <circle cx="-4" cy="-15" r="1.2" fill="#ffffff" />
              <circle cx="5" cy="-14" r="3.5" fill="#0369a1" />
              <circle cx="6" cy="-15" r="1.2" fill="#ffffff" />
            </g>
          </g>
        ) : (
          /* ================= ACT 1, 2, 4, 5: GRAND WILLOW PERCH & NEST ================= */
          <g>
            {/* Grand Willow Tree Trunk & Branch */}
            <path d="M -20 240 L -20 30 Q 30 80 40 140 Q 50 190 90 240 Z" fill="#1c1917" />
            {/* Hanging Willow Vines with leaves */}
            <path d="M 25 75 Q 90 55 160 70 Q 230 60 290 85" stroke="#1c1917" strokeWidth="6" fill="none" />
            <path d="M 80 72 Q 75 120 70 160" stroke="#15803d" strokeWidth="1.5" opacity="0.6" fill="none" />
            <path d="M 120 68 Q 115 110 110 145" stroke="#15803d" strokeWidth="1.5" opacity="0.6" fill="none" />
            <path d="M 180 65 Q 175 115 170 150" stroke="#15803d" strokeWidth="1.5" opacity="0.6" fill="none" />

            {/* Cedar Bark Hollow Nest */}
            <ellipse cx="185" cy="155" rx="55" ry="24" fill="#292524" />
            <ellipse cx="185" cy="152" rx="46" ry="18" fill="#44403c" />

            {/* Grandpa Owl (Present in Act 1 & 2) */}
            {act <= 2 && (
              <g transform="translate(145, 100)">
                <ellipse cx="0" cy="15" rx="18" ry="22" fill="#78716c" />
                <circle cx="0" cy="-6" r="16" fill="#78716c" />
                <polygon points="-3,-4 3,-4 0,2" fill="#f59e0b" />
                <circle cx="-6" cy="-8" r="4.5" fill="#1c1917" />
                <circle cx="6" cy="-8" r="4.5" fill="#1c1917" />
                <circle cx="-5" cy="-9" r="1.5" fill="#ffffff" />
                <circle cx="7" cy="-9" r="1.5" fill="#ffffff" />
              </g>
            )}

            {/* Little Luna Owl */}
            <g
              transform={act <= 2 ? 'translate(205, 115)' : 'translate(185, 125)'}
              className={isPlaying ? 'animate-barnaby-breathe' : ''}
            >
              {/* Downy Body */}
              <ellipse cx="0" cy="12" rx="15" ry="18" fill="#ffffff" />
              <ellipse cx="0" cy="14" rx="11" ry="13" fill="#bae6fd" opacity="0.5" />
              {/* Downy Head */}
              <circle cx="0" cy="-6" r="14" fill="#ffffff" />
              {/* Beak */}
              <polygon points="-2.5,-4 2.5,-4 0,1" fill="#fbbf24" />

              {/* Eyes / Eyelids */}
              {act === 5 ? (
                /* Sleeping with beak tucked under wing */
                <g>
                  <path d="M -7 -8 Q -4 -5 -1 -8" stroke="#0369a1" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <path d="M 1 -8 Q 4 -5 7 -8" stroke="#0369a1" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  {/* Folded wing covering beak */}
                  <path d="M -12 2 Q 0 -6 12 2 Q 0 16 -12 2 Z" fill="#e0f2fe" />
                </g>
              ) : (
                /* Big curious, gentle owl eyes */
                <g>
                  <circle cx="-5" cy="-7" r="4" fill="#0369a1" />
                  <circle cx="-4" cy="-8" r="1.4" fill="#ffffff" />
                  <circle cx="5" cy="-7" r="4" fill="#0369a1" />
                  <circle cx="6" cy="-8" r="1.4" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* Floating Goodnight Firefly in Act 4 & 5 */}
            {act >= 4 && (
              <g
                transform={`translate(${250 + Math.sin(currentTime * 2) * 15}, ${110 + Math.cos(currentTime * 2) * 10})`}
              >
                <circle cx="0" cy="0" r="12" fill="url(#fireflyAmber)" opacity="0.8" />
                <circle cx="0" cy="0" r="3" fill="#fef08a" />
              </g>
            )}
          </g>
        )}
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
          backgroundColor: 'rgba(7, 9, 33, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          fontSize: '0.74rem',
          color: '#bae6fd',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#38bdf8' : '#94a3b8',
            boxShadow: isPlaying ? '0 0 8px #38bdf8' : 'none',
          }}
        />
        <span>
          {act === 1 && '🦉 Act 1: Perched high in the Grand Willow'}
          {act === 2 && '🌙 Act 2: Grandpa Owl explains the night’s blanket'}
          {act === 3 && '✨ Act 3: Gliding softly over peaceful burrows'}
          {act === 4 && '🌟 Act 4: Firefly whispers "Goodnight, Luna"'}
          {act === 5 && '💤 Act 5: Tucked warm in cedar nest... safe & loved'}
        </span>
      </div>
    </div>
  );
};
