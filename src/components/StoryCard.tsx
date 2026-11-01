import React from 'react';
import { Play, Pause, Star, Clock } from 'lucide-react';
import type { Story } from '../data/stories';

interface StoryCardProps {
  story: Story;
  isCurrentlyPlaying: boolean;
  isFavorite: boolean;
  onSelectStory: (story: Story) => void;
  onToggleFavorite: (storyId: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isCurrentlyPlaying,
  isFavorite,
  onSelectStory,
  onToggleFavorite,
}) => {
  return (
    <div
      className="glass-card-interactive"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: `4px solid ${story.themeColor}`,
      }}
    >
      {/* Background glow circle */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: story.themeColor,
          opacity: 0.12,
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          {/* Character Emoji Emblem */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: `1px solid ${story.themeColor}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: `0 4px 16px ${story.themeColor}25`,
            }}
          >
            {story.characterEmoji}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Duration pill */}
            <span
              className="glass-pill"
              style={{
                fontSize: '0.75rem',
                color: '#cbd5e1',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Clock size={12} />
              {story.durationMinutes}m
            </span>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(story.id);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: isFavorite ? '#fbbf24' : '#64748b',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.2s ease',
              }}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorite bedtime list'}
            >
              <Star size={18} fill={isFavorite ? '#fbbf24' : 'none'} />
            </button>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3
          style={{
            fontSize: '1.25rem',
            color: '#ffffff',
            marginBottom: '6px',
            lineHeight: 1.25,
          }}
        >
          {story.title}
        </h3>
        <p style={{ fontSize: '0.88rem', color: story.themeColor, fontWeight: 500, marginBottom: '10px' }}>
          {story.tagline}
        </p>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.45, marginBottom: '16px' }}>
          {story.synopsis}
        </p>
      </div>

      {/* Footer & Play Button */}
      <div>
        <div style={{ fontSize: '0.74rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 12px', borderRadius: '10px', marginBottom: '16px' }}>
          💡 <span style={{ color: '#fde68a' }}>Milestone:</span> {story.learningMilestone}
        </div>

        <button
          onClick={() => onSelectStory(story)}
          style={{
            width: '100%',
            padding: '12px 18px',
            borderRadius: '16px',
            border: 'none',
            background: isCurrentlyPlaying
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            color: '#07051a',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: isCurrentlyPlaying
              ? '0 6px 20px rgba(16, 185, 129, 0.4)'
              : '0 6px 20px rgba(251, 191, 36, 0.35)',
            transition: 'transform 0.15s ease',
          }}
        >
          {isCurrentlyPlaying ? (
            <>
              <Pause size={18} fill="#07051a" />
              <span>Playing Bedtime Story...</span>
            </>
          ) : (
            <>
              <Play size={18} fill="#07051a" />
              <span>Listen Now ({story.durationMinutes} min)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
