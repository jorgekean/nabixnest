import React from 'react';

interface BarnabyNarratedStorybookProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export const BarnabyNarratedStorybook: React.FC<BarnabyNarratedStorybookProps> = ({
  currentTime,
  isPlaying,
}) => {
  // Determine current story act based on narration timestamps
  // Act 1 (0s - 34s): Meadow & Tumbling with Dragonflies
  // Act 2 (34s - 60s): Waddling to the Ancient Oak & Nestling on Mama's Shoulder
  // Act 3 (60s - 98s): Twilight to Indigo, Stars Blinking Awake One by One, Mama's Tender Touch
  // Act 4 (98s - 142s): The Sleepy Bear Belly Breath (Inhale 1-2-3, Exhale 1-2-3-4)
  // Act 5 (142s+): The Big Sleepy Yawn & Deep Loving Slumber
  const act =
    currentTime < 34 ? 1 :
    currentTime < 60 ? 2 :
    currentTime < 98 ? 3 :
    currentTime < 142 ? 4 : 5;

  // Sky background color transitions with the sunset/nightfall narrative
  const skyBackground =
    act === 1
      ? 'linear-gradient(180deg, #5b3266 0%, #a45367 45%, #e07a5f 80%, #f4a261 100%)' // Sunset meadow
      : act === 2
      ? 'linear-gradient(180deg, #2b1f4a 0%, #4a2860 50%, #7b3858 85%, #9d4850 100%)' // Evening twilight
      : 'linear-gradient(180deg, #070418 0%, #11092e 50%, #1b1040 100%)'; // Deep starry indigo

  // Breathing calculation for Act 4 (4-second cycle)
  const breathCycle = (currentTime % 4) / 4; // 0 to 1
  const isInhaling = breathCycle < 0.5;
  const breathCount = isInhaling
    ? Math.min(3, Math.floor(breathCycle * 6) + 1) // 1, 2, 3
    : Math.min(4, Math.floor((breathCycle - 0.5) * 8) + 1); // 1, 2, 3, 4

  // Star appearance progress in Act 3
  const starCount =
    act < 3 ? 2 :
    act === 3 ? Math.min(8, 2 + Math.floor((currentTime - 60) / 4.5)) : 8;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '240px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: skyBackground,
        transition: 'background 2s ease-in-out',
        border: '2px solid rgba(251, 191, 36, 0.3)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 30px rgba(251, 191, 36, 0.15)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <svg
        viewBox="0 0 420 240"
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="moonGlowNarrated" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#fef3c7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="grassMeadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d523e" />
            <stop offset="100%" stopColor="#14281e" />
          </linearGradient>

          <linearGradient id="mossHillBed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a2b" />
            <stop offset="100%" stopColor="#0b1610" />
          </linearGradient>

          <linearGradient id="treeBark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#24140d" />
            <stop offset="100%" stopColor="#3d2216" />
          </linearGradient>
        </defs>

        {/* ================= BACKGROUND SKY / SUN / MOON / STARS ================= */}
        {act === 1 ? (
          /* Act 1 Sunset Sky with setting golden sun */
          <g>
            <circle cx="340" cy="110" r="45" fill="url(#sunGlow)" />
            <circle cx="340" cy="110" r="22" fill="#fef08a" />
            {/* Distant rolling hills */}
            <path d="M 0 160 Q 120 135 240 150 Q 340 135 420 155 L 420 240 L 0 240 Z" fill="#3b2042" opacity="0.7" />
          </g>
        ) : (
          /* Act 2-5 Night Sky with rising silver moon & stars */
          <g>
            {/* Soft Glowing Moon */}
            <circle cx="345" cy="55" r="38" fill="url(#moonGlowNarrated)" />
            <path
              d="M 345 32 A 24 24 0 1 0 369 56 A 19 19 0 1 1 345 32 Z"
              fill="#fef9c3"
              style={{ filter: 'drop-shadow(0 0 10px rgba(254, 249, 195, 0.7))' }}
            />

            {/* Dynamic Stars that pop awake one by one (narrated in Act 3) */}
            {starCount >= 1 && <circle cx="50" cy="40" r="1.8" fill="#ffffff" className="animate-star-twinkle-1" />}
            {starCount >= 2 && <circle cx="110" cy="65" r="1.4" fill="#e0e7ff" className="animate-star-twinkle-2" />}
            {starCount >= 3 && <circle cx="180" cy="30" r="2.2" fill="#fef08a" className="animate-star-twinkle-3" />}
            {starCount >= 4 && <circle cx="240" cy="50" r="1.6" fill="#ffffff" className="animate-star-twinkle-1" />}
            {starCount >= 5 && <circle cx="285" cy="25" r="1.8" fill="#e0e7ff" className="animate-star-twinkle-2" />}
            {starCount >= 6 && <circle cx="140" cy="80" r="1.5" fill="#fef08a" className="animate-star-twinkle-3" />}
            {starCount >= 7 && <circle cx="75" cy="95" r="1.6" fill="#ffffff" className="animate-star-twinkle-2" />}
            {starCount >= 8 && <circle cx="215" cy="75" r="1.4" fill="#fde68a" className="animate-star-twinkle-1" />}
          </g>
        )}

        {/* ================= ACT 1: TUMBLING THROUGH CLOVER & CHASING DRAGONFLIES ================= */}
        {act === 1 && (
          <g>
            {/* Meadow Floor */}
            <path d="M 0 170 Q 140 150 280 165 Q 360 175 420 160 L 420 240 L 0 240 Z" fill="url(#grassMeadow)" />

            {/* Little Wildflowers */}
            <circle cx="60" cy="180" r="4" fill="#f43f5e" />
            <circle cx="130" cy="195" r="5" fill="#fbbf24" />
            <circle cx="210" cy="185" r="4" fill="#c084fc" />
            <circle cx="360" cy="180" r="4" fill="#38bdf8" />

            {/* Golden Dragonfly Fluttering across the sky */}
            <g
              transform={`translate(${180 + Math.sin(currentTime * 1.5) * 60}, ${75 + Math.cos(currentTime * 2) * 20})`}
            >
              {/* Dragonfly Glow */}
              <circle cx="0" cy="0" r="14" fill="url(#amberGlow)" opacity="0.6" />
              {/* Dragonfly Body */}
              <ellipse cx="0" cy="0" rx="6" ry="1.8" fill="#fbbf24" />
              {/* Wings flutter fast */}
              <ellipse
                cx="-2"
                cy="-5"
                rx="7"
                ry="2.2"
                fill="#ffffff"
                opacity="0.8"
                transform={`rotate(${Math.sin(currentTime * 20) * 25})`}
              />
              <ellipse
                cx="2"
                cy="-5"
                rx="7"
                ry="2.2"
                fill="#ffffff"
                opacity="0.8"
                transform={`rotate(${-Math.sin(currentTime * 20) * 25})`}
              />
            </g>

            {/* Barnaby Tumbling & Playing in Clover */}
            <g
              transform="translate(130, 140)"
              className={isPlaying ? 'animate-barnaby-breathe' : ''}
            >
              {/* Little Bear Body tumbling on grass */}
              <ellipse cx="45" cy="40" rx="30" ry="24" fill="#8d5437" />
              <ellipse cx="42" cy="40" rx="22" ry="18" fill="#b87853" />
              {/* Bear Head tilted up watching dragonfly */}
              <circle cx="68" cy="24" r="18" fill="#8d5437" />
              {/* Ears */}
              <circle cx="62" cy="10" r="6.5" fill="#71422a" />
              <circle cx="62" cy="10" r="3.5" fill="#e2a784" />
              <circle cx="78" cy="12" r="6" fill="#71422a" />
              <circle cx="78" cy="12" r="3" fill="#e2a784" />
              {/* Snout */}
              <ellipse cx="76" cy="27" rx="8" ry="6.5" fill="#e2a784" />
              <ellipse cx="78" cy="25" rx="3" ry="2" fill="#2c1810" />
              {/* Big Curious Happy Eye watching the dragonfly */}
              <circle cx="68" cy="20" r="3" fill="#2c1810" />
              <circle cx="69" cy="19" r="1" fill="#ffffff" />
              {/* Happy Smile */}
              <path d="M 74 30 Q 77 33 80 30" stroke="#2c1810" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              {/* Paws reaching up playfully */}
              <circle cx="48" cy="16" r="7.5" fill="#71422a" />
              <circle cx="28" cy="46" r="8" fill="#71422a" />
              <circle cx="56" cy="52" r="8" fill="#71422a" />
            </g>
          </g>
        )}

        {/* ================= ACT 2, 3, 4, 5: THE ANCIENT OAK & MAMA BEAR ================= */}
        {act >= 2 && (
          <g>
            {/* The Ancient Oak Tree Trunk on Left */}
            <path
              d="M -30 240 L -30 20 Q 30 70 42 130 Q 55 180 95 240 Z"
              fill="url(#treeBark)"
            />
            {/* Oak Tree Branch with leaves */}
            <path
              d="M 25 70 Q 100 45 180 62 Q 100 55 35 85 Z"
              fill="#24140d"
              className="animate-leaf-sway"
            />
            <circle cx="95" cy="52" r="8" fill="#1e3a2b" opacity="0.8" />
            <circle cx="130" cy="57" r="9" fill="#2d523e" opacity="0.85" />
            <circle cx="165" cy="62" r="7" fill="#1e3a2b" opacity="0.8" />

            {/* Moss Hill Ground */}
            <path
              d="M 0 180 Q 130 160 260 172 Q 350 182 420 170 L 420 240 L 0 240 Z"
              fill="url(#mossHillBed)"
            />

            {/* --- MAMA BEAR (Sitting by the Hollow Oak) --- */}
            <g transform="translate(160, 118)">
              {/* Mama Big Furry Body */}
              <ellipse cx="75" cy="52" rx="60" ry="44" fill="#543322" />
              <ellipse cx="70" cy="46" rx="48" ry="34" fill="#663e29" opacity="0.6" />
              {/* Mama Head */}
              <circle cx="36" cy="36" r="26" fill="#543322" />
              {/* Mama Ears */}
              <circle cx="22" cy="16" r="8.5" fill="#422517" />
              <circle cx="22" cy="16" r="5" fill="#8f573b" />
              <circle cx="48" cy="18" r="7.5" fill="#422517" />
              <circle cx="48" cy="18" r="4" fill="#8f573b" />
              {/* Mama Snout */}
              <ellipse cx="25" cy="43" rx="11" ry="8.5" fill="#b07858" />
              <ellipse cx="21" cy="40" rx="3.5" ry="2.2" fill="#1c0e08" />
              {/* Mama Sweet Smile */}
              <path d="M 22 47 Q 27 51 32 47" stroke="#1c0e08" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Mama Eyes (Softly blinking in Act 2, lovingly closed in Act 3-5) */}
              {act === 2 ? (
                <circle cx="34" cy="32" r="2.8" fill="#1c0e08" />
              ) : (
                <path d="M 30 33 Q 36 38 42 33" stroke="#1c0e08" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              )}

              {/* Mama's Loving Arm */}
              {act === 3 ? (
                /* Act 3: Mama gently lifting paw to brush Barnaby's ear */
                <path
                  d="M 45 50 Q 55 58 75 42 Q 65 38 48 44 Z"
                  fill="#663e29"
                  className={isPlaying ? 'animate-gentle-float' : ''}
                />
              ) : (
                /* Act 2, 4, 5: Mama's big arm wrapping Barnaby in a warm hug */
                <path
                  d="M 45 52 Q 55 82 105 76 Q 92 60 58 48 Z"
                  fill="#663e29"
                  opacity="0.95"
                />
              )}
            </g>

            {/* --- BARNABY BEAR (Actions matching the storyline!) --- */}
            {act === 2 ? (
              /* Act 2: Barnaby waddling toward Mama with heavy tired paws */
              <g
                transform={`translate(${110 + (currentTime - 34) * 3.8}, 145)`}
                className={isPlaying ? 'animate-gentle-float' : ''}
              >
                {/* Barnaby Waddling Body */}
                <ellipse cx="32" cy="30" rx="24" ry="20" fill="#8d5437" />
                <ellipse cx="28" cy="30" rx="18" ry="15" fill="#b87853" />
                {/* Barnaby Head tilted tiredly */}
                <circle cx="18" cy="18" r="15" fill="#8d5437" />
                <circle cx="10" cy="8" r="5.5" fill="#71422a" />
                <circle cx="24" cy="9" r="5" fill="#71422a" />
                <ellipse cx="12" cy="22" rx="7" ry="5.5" fill="#e2a784" />
                <ellipse cx="10" cy="20" rx="2.5" ry="1.6" fill="#2c1810" />
                {/* Sleepy half-closed eyes */}
                <path d="M 16 16 Q 20 19 24 16" stroke="#2c1810" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                {/* Waddling Paws */}
                <circle cx="20" cy="44" r="6.5" fill="#71422a" />
                <circle cx="44" cy="42" r="7" fill="#71422a" />
              </g>
            ) : act === 4 ? (
              /* Act 4: The Sleepy Bear Belly Breath (Inhale / Exhale Animation!) */
              <g transform="translate(222, 142)">
                {/* Sleepy Breath Aura Ring expanding and deflating */}
                <circle
                  cx="32"
                  cy="32"
                  r={isInhaling ? 36 + breathCycle * 24 : 48 - (breathCycle - 0.5) * 24}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  opacity={isInhaling ? 0.6 : 0.3}
                  strokeDasharray="4 4"
                />

                {/* Barnaby Body */}
                <ellipse cx="35" cy="32" rx="28" ry="22" fill="#8d5437" />
                {/* Animated Belly (scales up on inhale, contracts on exhale) */}
                <ellipse
                  cx="32"
                  cy="32"
                  rx={isInhaling ? 22 + breathCycle * 8 : 26 - (breathCycle - 0.5) * 8}
                  ry={isInhaling ? 18 + breathCycle * 6 : 21 - (breathCycle - 0.5) * 6}
                  fill="#b87853"
                />
                {/* Head resting on Mama */}
                <circle cx="16" cy="20" r="16" fill="#8d5437" />
                <circle cx="8" cy="8" r="6" fill="#71422a" />
                <circle cx="24" cy="9" r="5.5" fill="#71422a" />
                <ellipse cx="10" cy="24" rx="7.5" ry="6" fill="#e2a784" />
                <ellipse cx="8" cy="22" rx="2.5" ry="1.8" fill="#2c1810" />
                {/* Peaceful closed eyes */}
                <path d="M 14 18 Q 18 22 22 18" stroke="#2c1810" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Paws resting */}
                <circle cx="24" cy="42" r="7" fill="#71422a" />
                <circle cx="50" cy="38" r="8" fill="#71422a" />

                {/* Visual Breath Counter floating above */}
                <text
                  x="32"
                  y="-10"
                  fill="#fef08a"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(254, 240, 138, 0.8))' }}
                >
                  {isInhaling ? `Breathe In... ${breathCount}` : `Sigh Out... ${breathCount}`}
                </text>
              </g>
            ) : act === 5 ? (
              /* Act 5: The Big Sleepy Yawn & Deep Loving Slumber */
              <g transform="translate(222, 142)">
                {/* Barnaby Body */}
                <ellipse cx="35" cy="32" rx="28" ry="22" fill="#8d5437" />
                <ellipse cx="32" cy="32" rx="21" ry="17" fill="#b87853" />
                {/* Head snuggled deep in Mama's fur */}
                <circle cx="16" cy="20" r="16" fill="#8d5437" />
                <circle cx="8" cy="8" r="6" fill="#71422a" />
                <circle cx="24" cy="9" r="5.5" fill="#71422a" />
                <ellipse cx="10" cy="24" rx="7.5" ry="6" fill="#e2a784" />
                <ellipse cx="8" cy="22" rx="2.5" ry="1.8" fill="#2c1810" />

                {/* Yawning mouth vs Sweet sleeping smile */}
                {currentTime < 155 ? (
                  /* Big Animated Yawn (Mouth opens round with cute tongue) */
                  <g>
                    <ellipse cx="11" cy="26" rx="4" ry="5.5" fill="#4a181a" />
                    <ellipse cx="11" cy="28" rx="2.5" ry="2" fill="#f43f5e" />
                  </g>
                ) : (
                  /* Sweet sleepy resting smile */
                  <path d="M 8 26 Q 11 29 14 26" stroke="#2c1810" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                )}

                {/* Sleepy closed eyelashes */}
                <path d="M 14 18 Q 18 22 22 18" stroke="#2c1810" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Paws curled cozy */}
                <circle cx="24" cy="42" r="7" fill="#71422a" />
                <circle cx="50" cy="38" r="8" fill="#71422a" />

                {/* Floating Sleepy Zzz into the stars */}
                <g className="animate-gentle-float">
                  <text x="35" y="-12" fill="#fef08a" fontSize="13" fontWeight="bold" opacity="0.9">Z</text>
                  <text x="46" y="-22" fill="#fef08a" fontSize="10" fontWeight="bold" opacity="0.7">z</text>
                  <text x="54" y="-30" fill="#fef08a" fontSize="8" fontWeight="bold" opacity="0.5">z</text>
                </g>
              </g>
            ) : (
              /* Act 3: Resting on Mama's shoulder looking at the stars */
              <g transform="translate(222, 142)">
                <ellipse cx="35" cy="32" rx="28" ry="22" fill="#8d5437" />
                <ellipse cx="32" cy="32" rx="21" ry="17" fill="#b87853" />
                <circle cx="16" cy="20" r="16" fill="#8d5437" />
                <circle cx="8" cy="8" r="6" fill="#71422a" />
                <circle cx="24" cy="9" r="5.5" fill="#71422a" />
                <ellipse cx="10" cy="24" rx="7.5" ry="6" fill="#e2a784" />
                <ellipse cx="8" cy="22" rx="2.5" ry="1.8" fill="#2c1810" />
                <path d="M 14 18 Q 18 22 22 18" stroke="#2c1810" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M 8 26 Q 11 28 13 26" stroke="#2c1810" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <circle cx="24" cy="42" r="7" fill="#71422a" />
                <circle cx="50" cy="38" r="8" fill="#71422a" />
              </g>
            )}

            {/* Glowing Bedtime Fireflies */}
            <g className="animate-firefly-1">
              <circle cx="115" cy="140" r="10" fill="url(#amberGlow)" opacity="0.7" />
              <circle cx="115" cy="140" r="2.5" fill="#fef08a" />
            </g>
            <g className="animate-firefly-2">
              <circle cx="310" cy="130" r="12" fill="url(#amberGlow)" opacity="0.6" />
              <circle cx="310" cy="130" r="3" fill="#fef08a" />
            </g>
            <g className="animate-firefly-3">
              <circle cx="210" cy="95" r="9" fill="url(#amberGlow)" opacity="0.6" />
              <circle cx="210" cy="95" r="2" fill="#fef08a" />
            </g>
          </g>
        )}
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
          backgroundColor: 'rgba(7, 4, 24, 0.82)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(251, 191, 36, 0.35)',
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
            backgroundColor: isPlaying ? '#34d399' : '#fbbf24',
            boxShadow: isPlaying ? '0 0 8px #34d399' : 'none',
          }}
        />
        <span>
          {act === 1 && '🌾 Act 1: Tumbling with dragonflies in clover'}
          {act === 2 && '🐾 Act 2: Waddling on sleepy paws to Mama Bear'}
          {act === 3 && '✨ Act 3: Stars blinking awake... you are safe'}
          {act === 4 && '🐻 Act 4: Sleepy bear belly breath... in & out'}
          {act === 5 && '🌙 Act 5: Big happy yawn & sweet starry dreams'}
        </span>
      </div>
    </div>
  );
};
