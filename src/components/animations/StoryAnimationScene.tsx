import React from 'react';
import type { Story } from '../../data/stories';
import { BarnabyNarratedStorybook } from './BarnabyNarratedStorybook';

interface StoryAnimationSceneProps {
  story: Story;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export const StoryAnimationScene: React.FC<StoryAnimationSceneProps> = ({
  story,
  isPlaying,
  currentTime,
  duration,
}) => {
  // If Barnaby Bear, render the full synchronized cartoon storybook scene
  if (story.id === 'barnaby-bear') {
    return (
      <BarnabyNarratedStorybook
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
      />
    );
  }

  // Universal Character Bedtime Scene for other characters
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '240px',
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
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 420 240"
      >
        <defs>
          <radialGradient id="moonGlowUniversal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="fireflyGlowUniversal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Crescent Moon */}
        <circle cx="350" cy="55" r="35" fill="url(#moonGlowUniversal)" className="animate-moon-pulse" />
        <path
          d="M 350 32 A 23 23 0 1 0 373 55 A 18 18 0 1 1 350 32 Z"
          fill="#fef08a"
          style={{ filter: 'drop-shadow(0 0 8px rgba(254, 240, 138, 0.6))' }}
        />

        {/* Twinkling Stars */}
        <circle cx="50" cy="35" r="1.5" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="100" cy="65" r="1.2" fill="#e0e7ff" className="animate-star-twinkle-2" />
        <circle cx="170" cy="25" r="1.8" fill="#fef08a" className="animate-star-twinkle-3" />
        <circle cx="240" cy="45" r="1.2" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="285" cy="20" r="1.5" fill="#e0e7ff" className="animate-star-twinkle-2" />
        <circle cx="130" cy="95" r="1" fill="#ffffff" className="animate-star-twinkle-3" />

        {/* Distant Trees/Clouds silhouette */}
        <path
          d="M 0 185 Q 90 165 200 178 Q 300 190 420 170 L 420 240 L 0 240 Z"
          fill="#0c0724"
          opacity="0.8"
        />

        {/* Cozy Cloud Bed */}
        <path
          d="M 90 185 Q 130 155 170 170 Q 210 150 250 170 Q 290 155 330 185 Q 340 210 310 220 L 110 220 Z"
          fill="rgba(255, 255, 255, 0.08)"
        />

        {/* Sleep Breathing Ring around Character */}
        <circle
          cx="210"
          cy="135"
          r="48"
          fill="none"
          stroke={story.themeColor}
          strokeWidth="2"
          opacity="0.4"
          className={isPlaying ? 'animate-sleep-pulse' : ''}
          style={{ transformOrigin: '210px 135px' }}
        />

        {/* Character Sleep Emblem Floating in Center */}
        <g transform="translate(182, 107)" className={isPlaying ? 'animate-gentle-float' : ''}>
          <text fontSize="56" textAnchor="middle" x="28" y="44">
            {story.characterEmoji}
          </text>
        </g>

        {/* Floating Soft Amber Fireflies */}
        <g className="animate-firefly-1">
          <circle cx="110" cy="120" r="10" fill="url(#fireflyGlowUniversal)" />
          <circle cx="110" cy="120" r="2.5" fill="#fef08a" />
        </g>
        <g className="animate-firefly-2">
          <circle cx="310" cy="110" r="12" fill="url(#fireflyGlowUniversal)" />
          <circle cx="310" cy="110" r="3" fill="#fef08a" />
        </g>
      </svg>

      {/* Sleep Badge */}
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
        <span>{isPlaying ? 'Sleeping peacefully...' : 'Resting'}</span>
      </div>
    </div>
  );
};
