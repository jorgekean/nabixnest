import React from 'react';
import type { Story } from '../../data/stories';

interface StoryAnimationSceneProps {
  story: Story;
  isPlaying: boolean;
}

export const StoryAnimationScene: React.FC<StoryAnimationSceneProps> = ({ story, isPlaying }) => {
  const isBarnaby = story.id === 'barnaby-bear';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '380px',
        height: '220px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #09061e 0%, #170d38 65%, #1f144a 100%)',
        border: `1.5px solid ${story.themeColor}55`,
        boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 25px ${story.themeColor}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Starry Sky */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 380 220"
      >
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="fireflyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="mossHill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a2b" />
            <stop offset="100%" stopColor="#0f1f17" />
          </linearGradient>

          <linearGradient id="barkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2c1810" />
            <stop offset="100%" stopColor="#422517" />
          </linearGradient>
        </defs>

        {/* Moon */}
        <circle cx="320" cy="50" r="32" fill="url(#moonGlow)" className="animate-moon-pulse" />
        <path
          d="M 320 28 A 22 22 0 1 0 342 50 A 18 18 0 1 1 320 28 Z"
          fill="#fef08a"
          style={{ filter: 'drop-shadow(0 0 8px rgba(254, 240, 138, 0.6))' }}
        />

        {/* Twinkling Stars */}
        <circle cx="45" cy="35" r="1.5" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="95" cy="65" r="1.2" fill="#e0e7ff" className="animate-star-twinkle-2" />
        <circle cx="160" cy="25" r="1.8" fill="#fef08a" className="animate-star-twinkle-3" />
        <circle cx="220" cy="45" r="1.2" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="265" cy="20" r="1.5" fill="#e0e7ff" className="animate-star-twinkle-2" />
        <circle cx="130" cy="85" r="1" fill="#ffffff" className="animate-star-twinkle-3" />
        <circle cx="60" cy="110" r="1.2" fill="#fef08a" className="animate-star-twinkle-2" />

        {/* Distant Trees/Clouds silhouette */}
        <path
          d="M 0 175 Q 80 155 180 168 Q 280 180 380 160 L 380 220 L 0 220 Z"
          fill="#0c0724"
          opacity="0.8"
        />

        {isBarnaby ? (
          /* ================= BARNABY BEAR & THE WHISPERING WOODS SCENE ================= */
          <g>
            {/* Ancient Hollow Oak Trunk on the Left */}
            <path
              d="M -20 220 L -20 40 Q 25 80 35 140 Q 45 180 80 220 Z"
              fill="url(#barkGradient)"
            />
            {/* Tree Branch with soft hanging leaves */}
            <path
              d="M 20 80 Q 80 60 140 75 Q 80 70 25 95 Z"
              fill="#2c1810"
              className="animate-leaf-sway"
            />
            <circle cx="85" cy="68" r="6" fill="#1e3a2b" opacity="0.8" />
            <circle cx="115" cy="72" r="7" fill="#2d523e" opacity="0.7" />
            <circle cx="140" cy="76" r="5" fill="#1e3a2b" opacity="0.8" />

            {/* Moss Hill Ground */}
            <path
              d="M 0 185 Q 120 165 240 178 Q 330 188 380 175 L 380 220 L 0 220 Z"
              fill="url(#mossHill)"
            />
            <path
              d="M 60 190 Q 150 175 280 185"
              stroke="#34d399"
              strokeWidth="1.5"
              strokeDasharray="2 6"
              opacity="0.35"
            />

            {/* --- MAMA BEAR (Protecting, curled warm and cozy) --- */}
            <g transform="translate(145, 125)">
              {/* Mama Body / Back */}
              <ellipse cx="65" cy="45" rx="52" ry="38" fill="#5c3826" />
              {/* Mama Fluffy Highlights */}
              <ellipse cx="62" cy="40" rx="42" ry="30" fill="#6d432e" opacity="0.6" />
              {/* Mama Head */}
              <circle cx="32" cy="32" r="24" fill="#5c3826" />
              {/* Mama Ears */}
              <circle cx="20" cy="14" r="8" fill="#4a2d1e" />
              <circle cx="20" cy="14" r="4.5" fill="#a06346" />
              <circle cx="44" cy="16" r="7" fill="#4a2d1e" />
              <circle cx="44" cy="16" r="3.5" fill="#a06346" />
              {/* Mama Muzzle */}
              <ellipse cx="22" cy="38" rx="10" ry="8" fill="#c48b68" />
              <ellipse cx="19" cy="36" rx="3" ry="2" fill="#23140c" />
              {/* Mama Sleepy Closed Eye */}
              <path
                d="M 28 30 Q 33 34 38 30"
                stroke="#2c1810"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Mama Gentle Arm wrapping Barnaby */}
              <path
                d="M 40 46 Q 48 68 85 64 Q 75 52 50 42 Z"
                fill="#6d432e"
                opacity="0.9"
              />
            </g>

            {/* --- BABY BARNABY BEAR (With Rhythmic Diaphragmatic Belly Breathing!) --- */}
            <g
              transform="translate(195, 142)"
              className={isPlaying ? 'animate-barnaby-breathe' : ''}
              style={{ transformOrigin: '35px 45px' }}
            >
              {/* Barnaby Back & Bottom */}
              <ellipse cx="35" cy="32" rx="28" ry="22" fill="#8d5437" />
              {/* Barnaby Belly (expands on inhale!) */}
              <ellipse
                cx="32"
                cy="32"
                rx="21"
                ry="17"
                fill="#b87853"
                className={isPlaying ? 'animate-belly-expand' : ''}
                style={{ transformOrigin: '32px 32px' }}
              />
              {/* Barnaby Little Head resting on Mama's shoulder */}
              <circle cx="16" cy="20" r="16" fill="#8d5437" />
              {/* Barnaby Ears */}
              <circle cx="8" cy="8" r="6" fill="#71422a" />
              <circle cx="8" cy="8" r="3.5" fill="#e2a784" />
              <circle cx="24" cy="9" r="5.5" fill="#71422a" />
              <circle cx="24" cy="9" r="3" fill="#e2a784" />
              {/* Barnaby Muzzle */}
              <ellipse cx="10" cy="24" rx="7.5" ry="6" fill="#e2a784" />
              <ellipse cx="8" cy="22" rx="2.5" ry="1.8" fill="#2c1810" />
              {/* Barnaby Sleepy Curved Eyelid */}
              <path
                d="M 14 18 Q 18 22 22 18"
                stroke="#2c1810"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sweet sleepy smile */}
              <path
                d="M 8 26 Q 11 28 13 26"
                stroke="#2c1810"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Little Paws tucked warm */}
              <circle cx="24" cy="42" r="7" fill="#71422a" />
              <circle cx="50" cy="38" r="8" fill="#71422a" />
              <circle cx="50" cy="38" r="5" fill="#e2a784" opacity="0.6" />
            </g>

            {/* Floating Soft Amber Fireflies */}
            <g className="animate-firefly-1">
              <circle cx="110" cy="140" r="10" fill="url(#fireflyGlow)" />
              <circle cx="110" cy="140" r="2.5" fill="#fef08a" />
            </g>
            <g className="animate-firefly-2">
              <circle cx="280" cy="120" r="12" fill="url(#fireflyGlow)" />
              <circle cx="280" cy="120" r="3" fill="#fef08a" />
            </g>
            <g className="animate-firefly-3">
              <circle cx="200" cy="90" r="8" fill="url(#fireflyGlow)" />
              <circle cx="200" cy="90" r="2" fill="#fef08a" />
            </g>
          </g>
        ) : (
          /* ================= UNIVERSAL CHARACTER STARLIGHT SCENE ================= */
          <g>
            {/* Cozy Cloud Bed */}
            <path
              d="M 70 175 Q 110 145 150 160 Q 190 140 230 160 Q 270 145 310 175 Q 320 200 290 210 L 90 210 Z"
              fill="rgba(255, 255, 255, 0.08)"
            />
            {/* Sleep Breathing Ring around Character */}
            <circle
              cx="190"
              cy="125"
              r="48"
              fill="none"
              stroke={story.themeColor}
              strokeWidth="2"
              opacity="0.4"
              className={isPlaying ? 'animate-sleep-pulse' : ''}
              style={{ transformOrigin: '190px 125px' }}
            />
            <circle
              cx="190"
              cy="125"
              r="40"
              fill={`radial-gradient(circle, ${story.themeColor}33, transparent 70%)`}
              className={isPlaying ? 'animate-sleep-breath' : ''}
              style={{ transformOrigin: '190px 125px' }}
            />

            {/* Character Sleep Emblem Floating in Center */}
            <g transform="translate(162, 97)" className={isPlaying ? 'animate-gentle-float' : ''}>
              <text fontSize="56" textAnchor="middle" x="28" y="44">
                {story.characterEmoji}
              </text>
            </g>

            {/* Floating Soft Amber Fireflies */}
            <g className="animate-firefly-1">
              <circle cx="100" cy="110" r="10" fill="url(#fireflyGlow)" />
              <circle cx="100" cy="110" r="2.5" fill="#fef08a" />
            </g>
            <g className="animate-firefly-2">
              <circle cx="280" cy="100" r="12" fill="url(#fireflyGlow)" />
              <circle cx="280" cy="100" r="3" fill="#fef08a" />
            </g>
          </g>
        )}
      </svg>

      {/* Gentle Floating Sleep Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: '999px',
          backgroundColor: 'rgba(7, 5, 26, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          fontSize: '0.72rem',
          color: '#fef08a',
          fontWeight: 500,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#34d399' : '#94a3b8',
            boxShadow: isPlaying ? '0 0 8px #34d399' : 'none',
          }}
        />
        <span>{isPlaying ? (isBarnaby ? 'Breathe with Barnaby... in & out' : 'Sleeping peacefully...') : 'Resting'}</span>
      </div>
    </div>
  );
};
