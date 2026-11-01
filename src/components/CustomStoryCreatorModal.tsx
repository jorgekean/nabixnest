import React, { useState } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Story } from '../data/stories';

interface CustomStoryCreatorModalProps {
  onClose: () => void;
  onSaveCustomStory: (story: Story) => void;
}

export const CustomStoryCreatorModal: React.FC<CustomStoryCreatorModalProps> = ({
  onClose,
  onSaveCustomStory,
}) => {
  const [childName, setChildName] = useState<string>('');
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

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = childName.trim() || 'Little Star';
    const char = characters.find(c => c.name === character) || characters[0];
    const th = themes.find(t => t.title === theme) || themes[0];

    const customText = `Tonight... the silver stars twinkled especially bright right over ${name}'s cozy bedroom window. 
Far away in the Whispering Woods, ${char.name} was also getting ready for bed. 

"${name} had such a big, adventurous day," whispered Mama softly... smoothing the blankets over ${name}'s warm shoulders. 
"And just like ${char.name}... your body has done so much climbing, running, and learning today."

${char.name} tucked in beside the warm moss... taking a slow, deep breath in... one... two... three... and letting out a gentle evening sigh... four... five... six. 
${name} did the exact same breath. 
In went the calm starlight... out went all the busy wiggles.

"Whenever you close your eyes, ${name}," whispered the gentle night breeze... "you are warm... you are loved... and you are completely safe."
The room was quiet and peaceful. 
${name}'s eyelids grew heavy... like soft velvet curtains. 
Goodnight, ${char.name}... Goodnight, world... Sweet dreams, precious ${name}.`;

    const newStory: Story = {
      id: `custom-${Date.now()}`,
      title: `${name} & ${char.name}’s Starlit Journey`,
      character: char.name,
      characterEmoji: char.emoji,
      durationMinutes: 3,
      audioUrl: '/audio/stories/barnaby-bear.mp3', // Uses ambient / soothing voice fallback
      theme: th.title,
      themeColor: char.color,
      tagline: `A personalized bedtime story for ${name}`,
      synopsis: `A gentle sleepy bedtime adventure personalized for ${name} to help unwind and feel cozy and safe.`,
      learningMilestone: th.milestone,
      fullText: customText,
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
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 5, 26, 0.88)',
        backdropFilter: 'blur(20px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '24px', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={22} />
        </button>

        {!isGenerated ? (
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', marginBottom: '6px' }}>
                <Sparkles size={18} />
                <h3 style={{ fontSize: '1.3rem', color: '#ffffff' }}>Personalize Bedtime Story</h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Enter your child’s name and emotional milestone to weave them into tonight’s sleep story.
              </p>
            </div>

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
