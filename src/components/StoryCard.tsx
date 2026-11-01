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
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: `4px solid ${story.themeColor}`,
        borderRadius: '18px',
      }}
    >
      {/* Background glow circle */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: story.themeColor,
          opacity: 0.12,
          filter: 'blur(28px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          {/* Character Emoji Emblem */}
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: `1px solid ${story.themeColor}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: `0 4px 14px ${story.themeColor}25`,
              flexShrink: 0,
            }}
          >
            {story.characterEmoji}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Duration pill */}
            <span
              className="glass-pill"
              style={{
                fontSize: '0.72rem',
                color: '#cbd5e1',
                padding: '3px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <Clock size={11} />
              {story.durationMinutes}m
            </span>

            {/* Favorite Button */}
            <button
              type="button"
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
              <Star size={16} fill={isFavorite ? '#fbbf24' : 'none'} />
            </button>
          </div>
        </div>

        {/* Title (capped to 2 lines max with refined readable font) */}
        <h3
          style={{
            fontSize: '1.05rem',
            color: '#ffffff',
            marginBottom: '4px',
            lineHeight: 1.3,
            fontWeight: 600,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {story.title}
        </h3>

        {/* Tagline (single line teaser) */}
        <p
          style={{
            fontSize: '0.76rem',
            color: story.themeColor,
            fontWeight: 500,
            marginBottom: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {story.tagline}
        </p>

        {/* Synopsis (strictly 2 lines max, never shows full story text on the card) */}
        <p
          style={{
            fontSize: '0.78rem',
            color: '#94a3b8',
            lineHeight: 1.45,
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {story.synopsis}
        </p>
      </div>

      {/* Footer & Play Button */}
      <div>
        <div
          style={{
            fontSize: '0.7rem',
            color: '#cbd5e1',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '5px 10px',
            borderRadius: '10px',
            marginBottom: '12px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          💡 <span style={{ color: '#fde68a' }}>Milestone:</span> {story.learningMilestone}
        </div>

        <button
          type="button"
          onClick={() => onSelectStory(story)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '14px',
            border: 'none',
            background: isCurrentlyPlaying
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            color: '#07051a',
            fontWeight: 700,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: isCurrentlyPlaying
              ? '0 6px 18px rgba(16, 185, 129, 0.35)'
              : '0 6px 18px rgba(251, 191, 36, 0.3)',
            transition: 'transform 0.15s ease',
          }}
        >
          {isCurrentlyPlaying ? (
            <>
              <Pause size={16} fill="#07051a" />
              <span>Playing...</span>
            </>
          ) : (
            <>
              <Play size={16} fill="#07051a" />
              <span>Listen Now ({story.durationMinutes}m)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
