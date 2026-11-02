import React from 'react';
import type { Story } from '../../data/stories';

interface StorybookProps {
  story: Story;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export const AnimatedStorybookSuite: React.FC<StorybookProps> = ({
  story,
  currentTime,
  duration,
  isPlaying,
}) => {
  const progress = duration > 0 ? currentTime / duration : 0;
  const act =
    progress < 0.22 ? 1 :
    progress < 0.44 ? 2 :
    progress < 0.68 ? 3 :
    progress < 0.88 ? 4 : 5;

  const id = story.id;

  // Customized Act Subtitle based on story narrative
  const getActTitle = () => {
    switch (id) {
      case 'benny-bunny':
        return [
          '🐰 Act 1: Hopping & leaping through sunny clover',
          '🥕 Act 2: Tucking into underground lavender burrow',
          '👂 Act 3: Flopping long velvety ears down soft',
          '💤 Act 4: Twitchy nose still... paws sinking in clover',
          '🌙 Act 5: Snuggled in Mama’s warm fur... fast asleep',
        ][act - 1];

      case 'pip-cloud-train':
        return [
          '🚂 Act 1: Gliding across sunset marshmallow clouds',
          '💨 Act 2: Smokestack puffing soft lavender mist: hush... hush...',
          '✨ Act 3: Moon stamping tickets with silver starlight',
          '🛋️ Act 4: Rocking gently along tracks of stars',
          '🌙 Act 5: All cozy passengers carried to sweet dreams',
        ][act - 1];

      case 'clara-koala':
        return [
          '🐨 Act 1: High in the fragrant minty eucalyptus canopy',
          '🌿 Act 2: Snuggling into the warm crook of Mama’s arm',
          '💓 Act 3: Thump... thump... Mama’s steady heartbeat',
          '🍃 Act 4: Silver leaves singing a quiet hush-a-bye',
          '🌙 Act 5: Safe in Mama’s arms... deeply loved',
        ][act - 1];

      case 'milo-monkey':
        return [
          '🐒 Act 1: Swinging on vines & doing loop-de-loops',
          '🌴 Act 2: Resting in the woven rainforest vine hammock',
          '🌟 Act 3: Counting slow blinking fireflies: 1, 2, 3, 4...',
          '🧘 Act 4: Curly tail relaxes... thoughts float away',
          '🌙 Act 5: Heavy eyelids flutter closed... peaceful sleep',
        ][act - 1];

      case 'hazel-hedgehog':
        return [
          '🦔 Act 1: Tucked in a tight prickly ball of worry',
          '🍂 Act 2: Grandma smoothing the soft cedar nest',
          '🛡️ Act 3: "You do not need your shield tonight..."',
          '🛏️ Act 4: Uncurling paws... prickles laying flat as velvet',
          '🌙 Act 5: Buried snug in warm oak leaves... safe dreams',
        ][act - 1];

      case 'toby-tugboat':
        return [
          '🚢 Act 1: Guiding giant ships safely into harbor docks',
          '💨 Act 2: Iron boiler cooling... tiny puff of warm steam',
          '🔔 Act 3: Harbor bell chiming slow: bong... bong... bong...',
          '🌊 Act 4: Harbor tide rocking: lap... lap... sway... sway...',
          '🌙 Act 5: Amber lantern glowing... sleeping safe at Dock 4',
        ][act - 1];

      case 'ella-elephant':
        return [
          '🐘 Act 1: Big padded feet walking across African savanna',
          '🌅 Act 2: Herd resting beside the quiet Silver River',
          '🤗 Act 3: Mama curving warm trunk around sleepy ears',
          '🌊 Act 4: Breathing slow like the river current: in & out',
          '🌙 Act 5: Leaning warm against Mama... sound asleep',
        ][act - 1];

      case 'finn-firefly':
        return [
          '✨ Act 1: Buzzing & glowing bright gold in wildflower glade',
          '🌸 Act 2: Grandpa Firefly lands on evening primrose petal',
          '🕯️ Act 3: Practicing the bedtime dimming breath...',
          '💡 Act 4: Bright spark softens to a cozy bedside nightlight',
          '🌙 Act 5: Tucked under a broad green leaf... glowing dreams',
        ][act - 1];

      case 'penny-penguin':
        return [
          '🐧 Act 1: Sliding on tummy across smooth ice slides',
          '🌌 Act 2: Northern lights dancing violet & emerald in the sky',
          '🫂 Act 3: Nestling into the center of the warm Penguin Huddle',
          '👣 Act 4: Resting chilly feet on Mama’s warm feather blanket',
          '🌙 Act 5: Gentle huddle swaying in harmony... winter dreams',
        ][act - 1];

      case 'rory-panda':
        return [
          '🐼 Act 1: Climbing misty Cloud Mountains bamboo trees',
          '🌲 Act 2: Lying on ancient fir branch, dangling four paws',
          '🧘 Act 3: Long luxurious stretch... melting like warm butter',
          '🧣 Act 4: Wrapping big fluffy striped tail around nose',
          '🌙 Act 5: Breathing warm into furry scarf... misty dreams',
        ][act - 1];

      case 'rosie-deer':
        return [
          '🦌 Act 1: Scampering through sunny daisy fields',
          '🌸 Act 2: Wild pink roses slowly folding petals closed',
          '🌿 Act 3: Stepping soft into sweet-smelling oak ferns',
          '🤍 Act 4: Curling round circle beside Mama’s warm flank',
          '🌙 Act 5: Crystal brook sings hush-a-bye... peaceful slumber',
        ][act - 1];

      case 'leo-lion':
        return [
          '🦁 Act 1: Practicing mighty pounces & baby squeak-roars',
          '🌅 Act 2: Sun-warmed Pride Rock radiating gentle cozy heat',
          '👑 Act 3: Papa: "Sleep is where brave lions build strength"',
          '🐾 Act 4: Big happy yawn... curling between Papa’s big paws',
          '🌙 Act 5: Savanna stars sparkling... deep powerful rest',
        ][act - 1];

      case 'kiki-kitten':
        return [
          '🐱 Act 1: Batting colorful yarn balls in cozy cottage',
          '🔥 Act 2: Stone fireplace crackles with warm steady glow',
          '🧶 Act 3: Kneading thick fluffy wool blanket: left... right...',
          '🎶 Act 4: Chest motor starts: purr... purr... purr... purr...',
          '🌙 Act 5: Furry circle, nose tucked under paw... sweet dreams',
        ][act - 1];

      default:
        return `🌟 Act ${act}: Peaceful Bedtime Journey`;
    }
  };

  // Themed Background Gradient
  const getThemeBg = () => {
    switch (id) {
      case 'kiki-kitten':
        return 'linear-gradient(180deg, #1f1118 0%, #3d1b2a 50%, #571e2c 100%)'; // Cottage fire glow
      case 'penny-penguin':
        return 'linear-gradient(180deg, #071728 0%, #0d344d 40%, #044343 80%, #052e2e 100%)'; // Aurora Borealis
      case 'pip-cloud-train':
        return 'linear-gradient(180deg, #1b0a2a 0%, #3b134d 50%, #6b21a8 100%)'; // Cloud twilight
      case 'toby-tugboat':
        return 'linear-gradient(180deg, #0a192f 0%, #1e3a8a 50%, #172554 100%)'; // Harbor night
      case 'ella-elephant':
      case 'leo-lion':
        return 'linear-gradient(180deg, #241029 0%, #4a1d3b 50%, #7c2d12 100%)'; // Savanna twilight
      case 'clara-koala':
      case 'rory-panda':
        return 'linear-gradient(180deg, #061e1f 0%, #0d3b38 50%, #134e4a 100%)'; // Mist forest
      default:
        return 'linear-gradient(180deg, #09061e 0%, #170d38 60%, #1e1344 100%)';
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '240px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: getThemeBg(),
        border: `2px solid ${story.themeColor}55`,
        boxShadow: `0 12px 35px rgba(0,0,0,0.6), 0 0 30px ${story.themeColor}22`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <svg viewBox="0 0 420 240" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="suiteMoon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#fde047" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ================= SPECIALIZED BACKGROUNDS ================= */}
        {id === 'penny-penguin' ? (
          /* Northern Lights Aurora Wave */
          <g>
            <path
              d={`M 0 40 Q 110 ${30 + Math.sin(currentTime) * 15} 210 40 Q 320 ${50 - Math.sin(currentTime) * 15} 420 35 L 420 90 L 0 90 Z`}
              fill="#10b981"
              opacity="0.35"
              className="animate-gentle-float"
            />
            <path
              d={`M 0 60 Q 140 ${45 - Math.sin(currentTime) * 12} 280 65 Q 360 ${75 + Math.sin(currentTime) * 12} 420 55 L 420 110 L 0 110 Z`}
              fill="#8b5cf6"
              opacity="0.25"
            />
            {/* Snowy Shelf Floor */}
            <path d="M 0 170 Q 130 150 260 165 Q 350 175 420 160 L 420 240 L 0 240 Z" fill="#e0f2fe" opacity="0.9" />
          </g>
        ) : id === 'kiki-kitten' ? (
          /* Cozy Stone Fireplace Hearth */
          <g>
            {/* Stone Wall */}
            <rect x="0" y="0" width="420" height="240" fill="#1c1017" />
            {/* Hearth Arch */}
            <path d="M 120 220 L 120 130 Q 210 100 300 130 L 300 220 Z" fill="#0f070c" />
            {/* Gentle Fireplace Flame */}
            <circle cx="210" cy="180" r="38" fill="url(#fireGlow)" className="animate-sleep-pulse" />
            <polygon points="190,195 230,195 210,145" fill="#facc15" className="animate-gentle-float" />
            <polygon points="198,195 222,195 210,160" fill="#f97316" />
          </g>
        ) : id === 'pip-cloud-train' ? (
          /* Marshmallow Cloud Banks & Starlight Tracks */
          <g>
            {/* Cloud Puffs */}
            <path d="M 40 180 Q 90 140 150 165 Q 210 135 270 160 Q 330 140 390 180 L 420 240 L 0 240 Z" fill="#f3e8ff" opacity="0.25" />
            {/* Starlight Track */}
            <path d="M 0 175 Q 140 160 280 170 Q 360 175 420 165" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="6 4" fill="none" opacity="0.8" />
            {/* Puffs of Lavender Steam */}
            <circle cx="150" cy="95" r="12" fill="#d8b4fe" opacity="0.6" className="animate-gentle-float" />
            <circle cx="125" cy="80" r="16" fill="#c084fc" opacity="0.4" className="animate-gentle-float" />
          </g>
        ) : id === 'toby-tugboat' ? (
          /* Sleepy Harbor with Lighthouse Beam */
          <g>
            {/* Rotating Lighthouse Beam */}
            <polygon points="370,55 0,110 0,150" fill="#fef08a" opacity="0.15" />
            {/* Lighthouse Tower */}
            <polygon points="360,140 380,140 375,60 365,60" fill="#ffffff" />
            <rect x="362" y="55" width="16" height="8" rx="2" fill="#ef4444" />
            <circle cx="370" cy="55" r="6" fill="#fef08a" />
            {/* Harbor Water */}
            <path d="M 0 165 Q 120 150 240 160 Q 340 170 420 155 L 420 240 L 0 240 Z" fill="#0f172a" />
          </g>
        ) : (
          /* Standard Bedtime Horizon */
          <g>
            <circle cx="345" cy="50" r="32" fill="url(#suiteMoon)" className="animate-moon-pulse" />
            <path d="M 345 30 A 20 20 0 1 0 365 50 A 16 16 0 1 1 345 30 Z" fill="#fef08a" />
            <circle cx="50" cy="35" r="1.5" fill="#ffffff" className="animate-star-twinkle-1" />
            <circle cx="140" cy="45" r="1.8" fill="#fef08a" className="animate-star-twinkle-2" />
            <circle cx="240" cy="30" r="1.5" fill="#ffffff" className="animate-star-twinkle-3" />
            {/* Floor Hill */}
            <path d="M 0 175 Q 120 155 240 168 Q 340 180 420 165 L 420 240 L 0 240 Z" fill="rgba(0,0,0,0.5)" />
          </g>
        )}

        {/* ================= CENTER CHARACTER STAGE ================= */}
        <g transform="translate(160, 95)" className={isPlaying ? 'animate-barnaby-breathe' : ''}>
          {/* Sleep Aura Circle */}
          <circle
            cx="50"
            cy="45"
            r={act >= 4 ? 46 : 40}
            fill="none"
            stroke={story.themeColor}
            strokeWidth="2"
            opacity={act >= 4 ? 0.6 : 0.3}
            strokeDasharray="4 4"
            className={isPlaying ? 'animate-sleep-pulse' : ''}
          />

          {/* Large Expressive Emoji Character */}
          <text fontSize="62" textAnchor="middle" x="50" y="58">
            {story.characterEmoji}
          </text>

          {/* Floating Zzz in Act 4 and 5 */}
          {act >= 4 && (
            <g className="animate-gentle-float">
              <text x="75" y="10" fill="#fef08a" fontSize="13" fontWeight="bold">Z</text>
              <text x="86" y="0" fill="#fef08a" fontSize="10" fontWeight="bold" opacity="0.8">z</text>
              <text x="94" y="-8" fill="#fef08a" fontSize="8" fontWeight="bold" opacity="0.6">z</text>
            </g>
          )}
        </g>
      </svg>

      {/* Synchronized Narration Subtitle Badge */}
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
          backgroundColor: 'rgba(7, 4, 24, 0.85)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${story.themeColor}55`,
          fontSize: '0.74rem',
          color: '#fef08a',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? story.themeColor : '#94a3b8',
            boxShadow: isPlaying ? `0 0 8px ${story.themeColor}` : 'none',
          }}
        />
        <span>{getActTitle()}</span>
      </div>
    </div>
  );
};
