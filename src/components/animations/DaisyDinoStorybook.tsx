import React from 'react';

interface StorybookProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export const DaisyDinoStorybook: React.FC<StorybookProps> = ({ currentTime, isPlaying }) => {
  const act =
    currentTime < 35 ? 1 :
    currentTime < 65 ? 2 :
    currentTime < 100 ? 3 :
    currentTime < 135 ? 4 : 5;

  const breathCycle = (currentTime % 4.5) / 4.5;
  const isInhaling = breathCycle < 0.5;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '240px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background:
          act === 1
            ? 'linear-gradient(180deg, #4c1d95 0%, #831843 50%, #b45309 100%)'
            : 'linear-gradient(180deg, #090924 0%, #171544 50%, #064e3b 100%)',
        transition: 'background 2s ease',
        border: '2px solid rgba(16, 185, 129, 0.35)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 30px rgba(16, 185, 129, 0.15)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <svg viewBox="0 0 420 240" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        {/* Prehistoric Mountain Ridges */}
        <path d="M 0 160 L 90 90 L 190 155 L 290 80 L 420 170 L 420 240 L 0 240 Z" fill="#1e1035" opacity="0.8" />

        {/* Great Fern Valley Floor */}
        <path d="M 0 180 Q 140 160 280 175 Q 360 185 420 170 L 420 240 L 0 240 Z" fill="#064e3b" />

        {/* Giant Palm Fronds overhead swaying like lullabies */}
        <path d="M -20 110 Q 50 70 120 90 Q 50 110 -20 130 Z" fill="#047857" className="animate-leaf-sway" />
        <path d="M 320 80 Q 380 50 440 70 Q 380 90 320 110 Z" fill="#047857" className="animate-leaf-sway" />

        {/* Stars */}
        <circle cx="50" cy="35" r="1.5" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="160" cy="25" r="1.8" fill="#a7f3d0" className="animate-star-twinkle-2" />
        <circle cx="270" cy="30" r="1.5" fill="#fef08a" className="animate-star-twinkle-3" />

        {/* Mama Diplodocus (Graceful Long Neck nuzzling Daisy) */}
        {act >= 2 && (
          <g transform="translate(40, 110)">
            <ellipse cx="60" cy="55" rx="55" ry="38" fill="#065f46" />
            {/* Long Neck curving down tenderly */}
            <path
              d="M 100 45 Q 150 10 200 45 Q 170 30 115 55 Z"
              fill="#065f46"
            />
            {/* Mama Head nuzzling */}
            <circle cx="205" cy="46" r="12" fill="#065f46" />
            <path d="M 198 44 Q 202 48 206 44" stroke="#022c22" strokeWidth="1.6" fill="none" />
          </g>
        )}

        {/* Little Daisy Diplodocus */}
        <g
          transform="translate(200, 140)"
          className={isPlaying ? 'animate-barnaby-breathe' : ''}
        >
          {/* Sturdy Body */}
          <ellipse cx="40" cy="38" rx="34" ry="24" fill="#059669" />
          {/* Belly expands on breath */}
          <ellipse
            cx="38"
            cy="38"
            rx={isInhaling ? 26 + breathCycle * 6 : 29 - (breathCycle - 0.5) * 6}
            ry={isInhaling ? 19 + breathCycle * 4 : 21 - (breathCycle - 0.5) * 4}
            fill="#34d399"
          />

          {/* Sturdy legs resting like warm stones */}
          <rect x="18" y="52" width="10" height="18" rx="4" fill="#047857" />
          <rect x="48" y="52" width="10" height="18" rx="4" fill="#047857" />

          {/* Long neck - up in Act 1, gently lowered resting on moss in Act 3-5 */}
          {act <= 2 ? (
            <path d="M 16 32 Q 5 -10 10 -25 Q 18 -10 26 30 Z" fill="#059669" />
          ) : (
            /* Curved down resting on warm moss */
            <path d="M 16 34 Q -10 20 -20 38 Q -5 45 18 42 Z" fill="#059669" />
          )}

          {/* Daisy Head */}
          <circle cx={act <= 2 ? 8 : -22} cy={act <= 2 ? -26 : 38} r="11" fill="#059669" />
          {/* Sleepy curved eye */}
          <path
            d={act <= 2 ? 'M 6 -28 Q 9 -25 12 -28' : 'M -25 36 Q -22 39 -19 36'}
            stroke="#022c22"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Long tail curled around feet in Act 5 */}
          <path d="M 70 38 Q 95 32 85 52 Q 65 58 45 56" fill="#059669" />
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
          backgroundColor: 'rgba(6, 30, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          fontSize: '0.74rem',
          color: '#a7f3d0',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#10b981' : '#94a3b8',
            boxShadow: isPlaying ? '0 0 8px #10b981' : 'none',
          }}
        />
        <span>
          {act === 1 && '🦕 Act 1: Nibbling sweet clover in Great Fern Valley'}
          {act === 2 && '🌄 Act 2: Sun setting behind purple mountains'}
          {act === 3 && '💚 Act 3: Mama nuzzles Daisy’s warm cheek'}
          {act === 4 && '🌿 Act 4: Sleepy dinosaur breath... in & out'}
          {act === 5 && '⭐ Act 5: Long neck resting on warm moss... goodnight'}
        </span>
      </div>
    </div>
  );
};
