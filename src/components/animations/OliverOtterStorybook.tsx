import React from 'react';

interface StorybookProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export const OliverOtterStorybook: React.FC<StorybookProps> = ({ currentTime, isPlaying }) => {
  const act =
    currentTime < 35 ? 1 :
    currentTime < 65 ? 2 :
    currentTime < 105 ? 3 :
    currentTime < 135 ? 4 : 5;

  const waveRock = Math.sin(currentTime * 1.8) * 3;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '240px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #091326 0%, #0d283e 50%, #134e4a 100%)',
        border: '2px solid rgba(52, 211, 153, 0.35)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 30px rgba(52, 211, 153, 0.15)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <svg viewBox="0 0 420 240" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="otterMoonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#a7f3d0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="riverWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="50%" stopColor="#042f2e" />
            <stop offset="100%" stopColor="#021f1e" />
          </linearGradient>
        </defs>

        {/* Crescent Moon reflecting on water */}
        <circle cx="340" cy="50" r="35" fill="url(#otterMoonGlow)" className="animate-moon-pulse" />
        <path d="M 340 30 A 20 20 0 1 0 360 50 A 16 16 0 1 1 340 30 Z" fill="#ecfdf5" />

        {/* Stars */}
        <circle cx="50" cy="35" r="1.5" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="120" cy="45" r="1.8" fill="#a7f3d0" className="animate-star-twinkle-2" />
        <circle cx="210" cy="30" r="1.5" fill="#fef08a" className="animate-star-twinkle-3" />
        <circle cx="280" cy="40" r="1.8" fill="#ffffff" className="animate-star-twinkle-1" />

        {/* Whispering River Shoreline */}
        <path d="M 0 120 Q 140 105 280 115 Q 360 125 420 110 L 420 240 L 0 240 Z" fill="url(#riverWater)" />

        {/* Swaying River Reeds on the banks */}
        <path d="M 30 140 Q 25 90 20 60 Q 28 90 35 140" fill="#047857" className="animate-leaf-sway" />
        <path d="M 45 145 Q 40 100 38 75 Q 44 100 50 145" fill="#10b981" opacity="0.8" className="animate-leaf-sway" />
        <path d="M 380 135 Q 385 85 390 55 Q 384 85 375 135" fill="#047857" className="animate-leaf-sway" />
        <path d="M 365 140 Q 370 95 372 70 Q 368 95 360 140" fill="#10b981" opacity="0.8" className="animate-leaf-sway" />

        {/* Gentle Water Waves */}
        <path
          d={`M 0 ${165 + waveRock} Q 105 ${160 - waveRock} 210 ${165 + waveRock} Q 315 ${170 - waveRock} 420 ${165 + waveRock}`}
          stroke="#34d399"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />

        {/* ================= CHARACTERS: MAMA OTTER & BABY OLIVER ================= */}
        <g transform={`translate(150, ${150 + (isPlaying ? waveRock : 0)})`}>
          {/* Green River Reeds wrapping around their tummies in Act 2-5 */}
          {act >= 2 && (
            <path
              d="M -30 20 Q 35 5 110 22 Q 35 -5 -30 20 Z"
              fill="#059669"
              opacity="0.85"
            />
          )}

          {/* Mama Otter Floating beside him (Act 3, 4, 5) */}
          {act >= 3 && (
            <g transform="translate(-40, -5)">
              {/* Mama Body Floating on back */}
              <ellipse cx="25" cy="18" rx="35" ry="16" fill="#573822" />
              <ellipse cx="22" cy="18" rx="26" ry="12" fill="#784b2e" />
              {/* Mama Head */}
              <circle cx="-12" cy="12" r="14" fill="#573822" />
              <ellipse cx="-16" cy="12" rx="6" ry="4.5" fill="#d6a782" />
              <circle cx="-18" cy="11" r="2" fill="#1c1109" />
              {/* Mama Gentle closed eye */}
              <path d="M -12 7 Q -9 10 -6 7" stroke="#1c1109" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Mama Holding Oliver's Paw! */}
              <circle cx="28" cy="14" r="5.5" fill="#422a19" />
            </g>
          )}

          {/* Oliver Floating on his back */}
          <g transform="translate(30, 0)">
            {/* Oliver Sleek Body */}
            <ellipse cx="22" cy="16" rx="26" ry="13" fill="#6d462a" />
            <ellipse cx="20" cy="16" rx="20" ry="9" fill="#8c5a36" />
            {/* Oliver Head resting on water surface */}
            <circle cx="-8" cy="12" r="12" fill="#6d462a" />
            <ellipse cx="-12" cy="12" rx="5" ry="4" fill="#e2ba99" />
            <circle cx="-14" cy="11" r="1.8" fill="#1c1109" />
            {/* Oliver Webbed Hind Paws (lazy paddle in Act 1) */}
            <ellipse
              cx="45"
              cy="16"
              rx="7"
              ry="4"
              fill="#52341f"
              transform={act === 1 ? `rotate(${Math.sin(currentTime * 3) * 15})` : 'none'}
            />
            {/* Oliver Front Paws - holding Mama's paw in Act 3+ */}
            <circle cx="2" cy="14" r="4.5" fill="#52341f" />

            {/* Oliver Eyes */}
            {act >= 4 ? (
              /* Peaceful closed sleepy eyes */
              <path d="M -8 7 Q -5 10 -2 7" stroke="#1c1109" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            ) : (
              /* Curious happy eyes watching the twilight */
              <circle cx="-6" cy="7" r="2" fill="#1c1109" />
            )}
          </g>
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
          backgroundColor: 'rgba(9, 19, 38, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(52, 211, 153, 0.35)',
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
            backgroundColor: isPlaying ? '#34d399' : '#94a3b8',
            boxShadow: isPlaying ? '0 0 8px #34d399' : 'none',
          }}
        />
        <span>
          {act === 1 && '🦦 Act 1: Floating lazy on the mirror river'}
          {act === 2 && '🌿 Act 2: Wrapping in soft green reeds'}
          {act === 3 && '🤝 Act 3: Holding Mama’s paw... never alone'}
          {act === 4 && '🌊 Act 4: Rock and sway... rock and sway...'}
          {act === 5 && '🌙 Act 5: Sleeping peaceful under the river stars'}
        </span>
      </div>
    </div>
  );
};
