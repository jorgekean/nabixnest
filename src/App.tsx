import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StoryCard } from './components/StoryCard';
import { AudioPlayerModal } from './components/AudioPlayerModal';
import { PitchBlackScreen } from './components/PitchBlackScreen';
import { CustomStoryCreatorModal } from './components/CustomStoryCreatorModal';
import { BEDTIME_STORIES } from './data/stories';
import type { Story } from './data/stories';
import { sleepPlayer } from './audio/sleepPlayer';
import type { PlayerState } from './audio/sleepPlayer';
import type { AmbientType } from './audio/ambientSynth';
import { Moon, CloudRain, Wind, Music, Waves, Volume2, ShieldCheck, Heart } from 'lucide-react';

export function App() {
  const [stories, setStories] = useState<Story[]>(BEDTIME_STORIES);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bedtimenest_favorites');
      return saved ? JSON.parse(saved) : ['barnaby-bear'];
    } catch {
      return ['barnaby-bear'];
    }
  });
  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bedtimenest_streak');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [playerState, setPlayerState] = useState<PlayerState>(sleepPlayer.getState());
  const [showPlayerModal, setShowPlayerModal] = useState<boolean>(false);
  const [showCustomCreator, setShowCustomCreator] = useState<boolean>(false);

  // Subscribe to Audio Player Controller
  useEffect(() => {
    const unsubscribe = sleepPlayer.subscribe((newState) => {
      setPlayerState(newState);
      if (newState.currentStory && !showPlayerModal) {
        setShowPlayerModal(true);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [showPlayerModal]);

  // Load custom saved stories
  useEffect(() => {
    try {
      const customSaved = localStorage.getItem('bedtimenest_custom_stories');
      if (customSaved) {
        const parsed = JSON.parse(customSaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStories([...BEDTIME_STORIES, ...parsed]);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleToggleFavorite = (storyId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId];
      localStorage.setItem('bedtimenest_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleSaveCustomStory = (newStory: Story) => {
    setStories((prev) => {
      const next = [newStory, ...prev];
      const customOnly = next.filter((s) => s.id.startsWith('custom-'));
      localStorage.setItem('bedtimenest_custom_stories', JSON.stringify(customOnly));
      return next;
    });
    sleepPlayer.playStory(newStory);
    setShowPlayerModal(true);
  };

  const handlePlayStory = (story: Story) => {
    if (playerState.currentStory?.id === story.id) {
      sleepPlayer.togglePlayPause();
    } else {
      sleepPlayer.playStory(story);
      // Increment streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('bedtimenest_streak', newStreak.toString());
    }
    setShowPlayerModal(true);
  };

  // Filtered stories
  const filteredStories = stories.filter((s) => {
    if (activeFilter === 'favorites') return favorites.includes(s.id);
    if (activeFilter === 'busy-body') return s.theme.toLowerCase().includes('busy');
    if (activeFilter === 'dark-safe') return s.theme.toLowerCase().includes('dark');
    if (activeFilter === 'worries') return s.theme.toLowerCase().includes('worries');
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Navbar */}
      <Navbar
        streak={streak}
        onOpenCustomCreator={() => setShowCustomCreator(true)}
        onToggleBlackScreen={() => sleepPlayer.toggleBlackScreen(true)}
      />

      {/* Main Content Container */}
      <main style={{ flex: 1, maxWidth: '1080px', width: '100%', margin: '0 auto', padding: '24px 16px 120px 16px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* Hero Bedtime Greeting Card */}
        <section
          className="glass-panel"
          style={{
            padding: '32px 24px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'radial-gradient(ellipse 90% 80% at 90% 10%, rgba(251, 191, 36, 0.12), rgba(18, 12, 45, 0.8))',
            border: '1px solid rgba(251, 191, 36, 0.25)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ maxWidth: '640px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>
                <Moon size={14} fill="#fbbf24" /> Screen-Free Nightstand Audio
              </div>
              <h2 style={{ fontSize: '2.1rem', color: '#ffffff', lineHeight: 1.15, marginBottom: '8px' }}>
                Good evening, little dreamers.
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.55 }}>
                Gentle, whisper-paced bedtime stories read by soothing neural voices. 
                Paired with soft rain, starlight crickets, and a pitch-black sleep screen to protect melatonin.
              </p>
            </div>

            {/* Quick Start Routine Button */}
            <button
              onClick={() => handlePlayStory(stories[0])}
              style={{
                padding: '14px 22px',
                borderRadius: '18px',
                border: 'none',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#07051a',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4)',
              }}
            >
              <span>🌙 Play Tonight’s Sleep Story</span>
            </button>
          </div>

          {/* Value Props Row */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#94a3b8' }}>
              <ShieldCheck size={16} color="#34d399" />
              <span>Zero Screen Stimulation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#94a3b8' }}>
              <Volume2 size={16} color="#38bdf8" />
              <span>Smooth 60s Fade-Out Timer</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#94a3b8' }}>
              <Heart size={16} color="#fbbf24" />
              <span>Pediatric Sleep Psychology</span>
            </div>
          </div>
        </section>

        {/* Ambient Soundscape Quick-Bar */}
        <section className="glass-panel" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fde68a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🌧️ Ambient Sleep Sounds (Plays In Background)
            </span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Active: <strong style={{ color: '#38bdf8' }}>{playerState.ambientType}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { type: 'rain' as AmbientType, label: 'Soft Warm Rain', icon: CloudRain, color: '#38bdf8' },
              { type: 'crickets' as AmbientType, label: 'Night Crickets', icon: Wind, color: '#34d399' },
              { type: 'lullaby' as AmbientType, label: 'Music Box', icon: Music, color: '#c084fc' },
              { type: 'waves' as AmbientType, label: 'Ocean Waves', icon: Waves, color: '#60a5fa' },
              { type: 'none' as AmbientType, label: 'Mute', icon: Moon, color: '#94a3b8' },
            ].map((sound) => {
              const isSelected = playerState.ambientType === sound.type;
              const Icon = sound.icon;
              return (
                <button
                  key={sound.type}
                  onClick={() => sleepPlayer.setAmbientType(sound.type)}
                  style={{
                    flex: '1 0 auto',
                    padding: '10px 16px',
                    borderRadius: '14px',
                    background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? `1px solid ${sound.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isSelected ? sound.color : '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                  }}
                >
                  <Icon size={16} />
                  <span>{sound.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Story Shelf Header & Filter Tabs */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Tonight’s Sleep Stories</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Calming tales designed to slow down heart rates and guide heavy eyelids.
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { id: 'all', label: '🌟 All' },
                { id: 'favorites', label: `⭐ Favorites (${favorites.length})` },
                { id: 'busy-body', label: '🐻 Busy Body' },
                { id: 'dark-safe', label: '🦉 Dark Safety' },
                { id: 'worries', label: '🦦 Worries' },
              ].map((tab) => {
                const isSelected = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className="glass-pill"
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(251, 191, 36, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      border: isSelected ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: isSelected ? '#fbbf24' : '#cbd5e1',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stories Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                isCurrentlyPlaying={playerState.isPlaying && playerState.currentStory?.id === story.id}
                isFavorite={favorites.includes(story.id)}
                onSelectStory={handlePlayStory}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Full Audio Player Modal */}
      {showPlayerModal && playerState.currentStory && (
        <AudioPlayerModal
          story={playerState.currentStory}
          isPlaying={playerState.isPlaying}
          currentTime={playerState.currentTime}
          duration={playerState.duration}
          voiceVolume={playerState.voiceVolume}
          ambientVolume={playerState.ambientVolume}
          ambientType={playerState.ambientType}
          timerMinutesRemaining={playerState.timerMinutesRemaining}
          onTogglePlayPause={() => sleepPlayer.togglePlayPause()}
          onSeek={(sec) => sleepPlayer.seek(sec)}
          onSeekRelative={(d) => sleepPlayer.seekRelative(d)}
          onSetVoiceVolume={(v) => sleepPlayer.setVoiceVolume(v)}
          onSetAmbientVolume={(v) => sleepPlayer.setAmbientVolume(v)}
          onSetAmbientType={(t) => sleepPlayer.setAmbientType(t)}
          onSetSleepTimer={(m) => sleepPlayer.setSleepTimer(m)}
          onToggleBlackScreen={() => sleepPlayer.toggleBlackScreen(true)}
          onClose={() => setShowPlayerModal(false)}
        />
      )}

      {/* OLED Pitch-Black Screen Mode */}
      {playerState.isBlackScreen && (
        <PitchBlackScreen
          story={playerState.currentStory}
          isPlaying={playerState.isPlaying}
          timerMinutesRemaining={playerState.timerMinutesRemaining}
          onTogglePlayPause={() => sleepPlayer.togglePlayPause()}
          onExit={() => sleepPlayer.toggleBlackScreen(false)}
        />
      )}

      {/* Custom Personalized Story Creator Modal */}
      {showCustomCreator && (
        <CustomStoryCreatorModal
          onClose={() => setShowCustomCreator(false)}
          onSaveCustomStory={handleSaveCustomStory}
        />
      )}
    </div>
  );
}

export default App;
