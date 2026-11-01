import React, { useState } from 'react';
import { X, Sparkles, Heart, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Story } from '../data/stories';
import { weaveBedtimeStory } from '../utils/storyGenerator';

interface CustomStoryCreatorModalProps {
  onClose: () => void;
  onSaveCustomStory: (story: Story) => void;
}

export const CustomStoryCreatorModal: React.FC<CustomStoryCreatorModalProps> = ({
  onClose,
  onSaveCustomStory,
}) => {
  const [childName, setChildName] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [character, setCharacter] = useState<string>('Cozy Bear');
  const [theme, setTheme] = useState<string>('Calming a busy body');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);

  const characters = [
    { name: 'Cozy Bear', emoji: '🐻', color: '#f59e0b' },
    { name: 'Starry Owl', emoji: '🦉', color: '#38bdf8' },
    { name: 'Sleepy Otter', emoji: '🦦', color: '#34d399' },
    { name: 'Spark Fox', emoji: '🦊', color: '#c084fc' },
  ];

  const themes = [
    { title: 'Calming a busy body', milestone: 'Diaphragmatic belly breathing' },
    { title: 'Feeling safe in the dark', milestone: 'Nighttime anxiety relief' },
    { title: 'Excited or nervous about tomorrow', milestone: 'Emotional grounding' },
    { title: 'Sharing & kindness with siblings', milestone: 'Empathy & gentle connection' },
  ];

  const inspirationPills = [
    { label: '🦕 Sleepy Dinosaur', topic: 'a gentle dinosaur finding a warm glowing cave' },
    { label: '🚀 Moonlit Space Voyage', topic: 'floating softly in a quiet starlight spaceship' },
    { label: '🚂 Cloud Train', topic: 'a cozy train gliding across fluffy marshmallow clouds' },
    { label: '🌊 Ocean Sea Turtle', topic: 'a wise sea turtle swimming gently under starry waves' },
    { label: '🏰 Floating Cloud Castle', topic: 'a secret castle made of soft feather clouds' },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = childName.trim() || 'Little Star';
    const char = characters.find(c => c.name === character) || characters[0];
    const th = themes.find(t => t.title === theme) || themes[0];
    const chosenTopic = topic.trim() || 'a peaceful voyage through the starry night';

    const woven = weaveBedtimeStory({
      childName: name,
      topic: chosenTopic,
      companionName: char.name,
      companionEmoji: char.emoji,
      theme: th.title,
      milestone: th.milestone,
    });

    const newStory: Story = {
      id: `custom-${Date.now()}`,
      title: woven.title,
      character: char.name,
      characterEmoji: char.emoji,
      durationMinutes: 4,
      audioUrl: 'tts:custom', // Triggers live bedtime speech synthesis of the custom story
      theme: th.title,
      themeColor: char.color,
      tagline: woven.tagline,
      synopsis: woven.synopsis,
      learningMilestone: th.milestone,
      fullText: woven.fullText,
    };

    setGeneratedStory(newStory);
    setIsGenerated(true);

    // Gentle star confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#fde68a', '#38bdf8', '#c084fc'],
    });
  };

  const handleSaveAndListen = () => {
    if (generatedStory) {
      onSaveCustomStory(generatedStory);
      onClose();
    }
  };

  return (
    <div
      className="safe-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 5, 26, 0.88)',
        backdropFilter: 'blur(20px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        // Close if tapping backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          position: 'relative',
          overflowY: 'auto',
        }}
      >
        {/* Dedicated Non-Overlapping Header with Large Touch Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', minWidth: 0 }}>
            <Sparkles size={20} style={{ flexShrink: 0 }} />
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {isGenerated ? 'Generated Story' : 'Generate Bedtime Story'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: '42px',
              height: '42px',
              minWidth: '42px',
              minHeight: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              zIndex: 10,
              transition: 'background 0.15s ease',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {!isGenerated ? (
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '-6px' }}>
              Type any story idea your child dreams about tonight, and we’ll weave it into a gentle, relaxing bedtime tale.
            </p>

            {/* Child's Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600, marginBottom: '6px' }}>
                Child’s Name
              </label>
              <input
                type="text"
                placeholder="e.g. Liam, Emma, Noah..."
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Freeform Story Topic / Dream Idea */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600, marginBottom: '6px' }}>
                What should tonight’s story be about?
              </label>
              <input
                type="text"
                placeholder="e.g. A sleepy dinosaur in a crystal cave, cloud train, space voyage..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  marginBottom: '8px',
                }}
              />

              {/* Inspiration Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: '#fbbf24', fontSize: '0.74rem', fontWeight: 600 }}>
                <Lightbulb size={13} />
                <span>Quick Dream Ideas (Tap to fill):</span>
              </div>
              <div className="no-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                {inspirationPills.map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => setTopic(pill.topic)}
                    className="glass-pill"
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.74rem',
                      color: topic === pill.topic ? '#fbbf24' : '#cbd5e1',
                      border: topic === pill.topic ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.12)',
                      background: topic === pill.topic ? 'rgba(251, 191, 36, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Animal Companion Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600, marginBottom: '6px' }}>
                Bedtime Companion
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {characters.map((c) => {
                  const isSelected = character === c.name;
                  return (
                    <button
                      type="button"
                      key={c.name}
                      onClick={() => setCharacter(c.name)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '14px',
                        background: isSelected ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: isSelected ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: isSelected ? '#fbbf24' : '#cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{c.emoji}</span>
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bedtime Challenge / Theme */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600, marginBottom: '6px' }}>
                Tonight’s Emotional Milestone
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {themes.map((th) => {
                  const isSelected = theme === th.title;
                  return (
                    <button
                      type="button"
                      key={th.title}
                      onClick={() => setTheme(th.title)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: isSelected ? '#38bdf8' : '#e2e8f0',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{th.title}</span>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{th.milestone}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(192, 132, 252, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={18} />
              <span>Weave Tonight’s Story</span>
            </button>
          </form>
        ) : (
          /* Generated Story Preview Screen */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '42px' }}>{generatedStory?.characterEmoji}</span>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginTop: '6px' }}>
                {generatedStory?.title}
              </h3>
              <span style={{ fontSize: '0.82rem', color: '#fbbf24' }}>
                {generatedStory?.tagline}
              </span>
            </div>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '16px',
                maxHeight: '260px',
                overflowY: 'auto',
                fontSize: '0.88rem',
                color: '#e2e8f0',
                lineHeight: 1.7,
              }}
            >
              {generatedStory?.fullText.split('\n\n').map((p, i) => (
                <p key={i} style={{ marginBottom: '12px' }}>{p}</p>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsGenerated(false)}
                className="glass-pill"
                style={{ flex: 1, padding: '12px', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleSaveAndListen}
                style={{
                  flex: 2,
                  padding: '12px 18px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#07051a',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <Heart size={16} fill="#07051a" />
                <span>Save to Nightstand & Play</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
