import React from 'react';

interface StorybookProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export const ZunoFoxStorybook: React.FC<StorybookProps> = ({ currentTime, isPlaying }) => {
  const act =
    currentTime < 35 ? 1 :
    currentTime < 65 ? 2 :
    currentTime < 100 ? 3 :
    currentTime < 130 ? 4 : 5;

  // Tail glow intensity dims as bedtime progresses
  const sparkGlow =
    act === 1 ? '#f59e0b' :
    act === 2 ? '#fbbf24' :
    act === 3 ? '#fde68a' :
    act === 4 ? '#fef08a' : '#d97706';

  const countdown =
    act === 4 ? Math.max(1, 3 - Math.floor((currentTime - 100) / 9)) : null;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '240px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #130a2a 0%, #210d3d 50%, #2e104d 100%)',
        border: '2px solid rgba(192, 132, 252, 0.35)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 30px rgba(192, 132, 252, 0.15)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <svg viewBox="0 0 420 240" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="zunoSparkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={sparkGlow} stopOpacity={act >= 4 ? 0.5 : 0.9} />
            <stop offset="70%" stopColor="#c084fc" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Velvet Forest Backdrop */}
        <path d="M 0 155 Q 120 135 240 148 Q 330 135 420 150 L 420 240 L 0 240 Z" fill="#0d051c" />

        {/* Ancient Roots of Whispering Tree */}
        <path d="M -20 240 L -20 10 Q 40 70 50 140 Q 60 190 100 240 Z" fill="#200e1f" />
        <path d="M 30 130 Q 90 150 120 240" stroke="#200e1f" strokeWidth="12" fill="none" />
        <path d="M 50 140 Q 140 130 180 240" stroke="#200e1f" strokeWidth="8" fill="none" />

        {/* Velvet Green Moss Bed */}
        <ellipse cx="230" cy="195" rx="100" ry="32" fill="#143324" />
        <ellipse cx="230" cy="190" rx="85" ry="24" fill="#1c4531" />

        {/* Twinkling Stars */}
        <circle cx="60" cy="35" r="1.5" fill="#ffffff" className="animate-star-twinkle-1" />
        <circle cx="150" cy="45" r="1.8" fill="#e9d5ff" className="animate-star-twinkle-2" />
        <circle cx="280" cy="30" r="1.5" fill="#fef08a" className="animate-star-twinkle-3" />
        <circle cx="370" cy="55" r="1.8" fill="#ffffff" className="animate-star-twinkle-1" />

        {/* Zuno the Spark-Fox */}
        <g
          transform="translate(190, 140)"
          className={isPlaying ? 'animate-barnaby-breathe' : ''}
        >
          {/* Glowing Tail wrapping around him! */}
          <g>
            {/* Ambient Spark Glow */}
            <circle
              cx={act <= 2 ? 65 : 15}
              cy={act <= 2 ? 15 : 28}
              r={act === 1 ? 28 : 20}
              fill="url(#zunoSparkGlow)"
              className={act === 1 ? 'animate-sleep-pulse' : ''}
            />

            {/* Fluffy Tail */}
            {act <= 2 ? (
              /* Standing/Trotting Tail with playful spark at tip */
              <path
                d="M 40 28 Q 75 0 85 15 Q 70 38 42 36 Z"
                fill="#f97316"
              />
            ) : (
              /* Curled Tail wrapping around nose like a sleeping scarf */
              <path
                d="M 35 34 C 65 30 55 52 20 50 C -5 48 -10 32 10 28 C 22 26 28 32 35 34 Z"
                fill="#f97316"
              />
            )}
            {/* White tip of tail */}
            <circle cx={act <= 2 ? 80 : 8} cy={act <= 2 ? 18 : 34} r="6" fill="#ffffff" />
          </g>

          {/* Fox Body */}
          <ellipse cx="25" cy="30" rx="26" ry="19" fill="#ea580c" />
          <ellipse cx="22" cy="30" rx="18" ry="14" fill="#fb923c" />

          {/* Fox Head */}
          <circle cx="10" cy="18" r="15" fill="#ea580c" />
          <ellipse cx="4" cy="22" rx="7" ry="5.5" fill="#ffffff" />
          <polygon points="1,20 6,20 3,24" fill="#18181b" />

          {/* Fox Ears (Tall & Pointed) */}
          <polygon points="5,5 12,5 7,-8" fill="#c2410c" />
          <polygon points="6,4 11,4 8,-4" fill="#fed7aa" />
          <polygon points="17,6 23,7 21,-6" fill="#c2410c" />
          <polygon points="18,5 22,6 20,-3" fill="#fed7aa" />

          {/* Sleepy Eyes */}
          {act >= 3 ? (
            <path d="M 6 15 Q 10 18 14 15" stroke="#18181b" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          ) : (
            <circle cx="9" cy="14" r="2.2" fill="#18181b" />
          )}

          {/* Power Down Countdown Text in Act 4 */}
          {act === 4 && (
            <text
              x="25"
              y="-12"
              fill="#fef08a"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
              style={{ filter: 'drop-shadow(0 0 6px rgba(254, 240, 138, 0.8))' }}
            >
              Powering Down... {countdown}
            </text>
          )}
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
          backgroundColor: 'rgba(19, 10, 42, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(192, 132, 252, 0.35)',
          fontSize: '0.74rem',
          color: '#e9d5ff',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#c084fc' : '#94a3b8',
            boxShadow: isPlaying ? '0 0 8px #c084fc' : 'none',
          }}
        />
        <span>
          {act === 1 && '🦊 Act 1: Golden spark tail crackling softly'}
          {act === 2 && '🌲 Act 2: Trotting into the secret moss hollow'}
          {act === 3 && '🧣 Act 3: Wrapping spark tail like a sleeping scarf'}
          {act === 4 && '⚡ Act 4: 3... 2... 1... Powering down'}
          {act === 5 && '✨ Act 5: Dimmed to a bedtime nightlight... sweet dreams'}
        </span>
      </div>
    </div>
  );
};
