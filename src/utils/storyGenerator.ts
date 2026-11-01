export interface StoryGenerationParams {
  childName: string;
  topic: string;
  companionName: string;
  companionEmoji: string;
  theme: string;
  milestone: string;
}

export function weaveBedtimeStory(params: StoryGenerationParams): {
  title: string;
  tagline: string;
  synopsis: string;
  fullText: string;
} {
  const name = params.childName.trim() || 'Little Star';
  const rawTopic = params.topic.trim() || 'a gentle journey through starry dreamland';
  const topic = rawTopic.charAt(0).toLowerCase() + rawTopic.slice(1);
  const companion = params.companionName || 'Cozy Bear';
  const emoji = params.companionEmoji || '⭐';
  const shortSubject = extractShortSubject(rawTopic);

  const title = `${name} & ${shortSubject}`;
  const tagline = `A gentle bedtime journey with ${companion}`;
  const synopsis = `Tonight, ${name} and ${companion} embark on a calm, dreamy adventure through ${shortSubject.toLowerCase()}, letting go of daytime worries and drifting peacefully to sleep.`;

  // Dynamic bedtime text with hypnotic soothing pauses and pediatric wind-down sequence
  const fullText = `Tonight... the velvet evening sky was dusted with millions of quiet, twinkling stars. 
Right outside ${name}’s cozy bedroom window, the cool night breeze hummed a soft, peaceful lullaby. 
And just beyond the edge of sleep... a gentle dream was waiting... a magical journey all about ${topic}.

${name} curled up under the warmest, softest blanket, feeling the cozy weight of the pillows. 
Nearby... ${companion} ${emoji} looked up with warm, smiling eyes. 
"Are you ready for tonight's quiet adventure, ${name}?" whispered ${companion} in a voice as gentle as falling snowflakes. 

Together, they stepped softly into the dream... exploring ${topic}. 
Every sound in this world was muffled and peaceful... like stepping onto a carpet of thick green moss. 
The colors were calm and muted... soft lavenders... gentle amber lanterns... and deep twilight blues. 
There was no rush... no hurry at all... just the gentle rocking rhythm of the night.

"${name} had such a big, wondrous day," whispered ${companion} softly. 
"Your legs did so much walking... your hands did so much building... and your brilliant mind did so much thinking. 
Now... every part of you gets to rest and recharge."

${companion} sat down beside ${name} and gently placed a warm paw over their chest. 
"Let’s take our calming starlight breath together... 
Breathe in the cool, sweet starlight... one... two... three... 
and slowly blow out all the busy wiggles... four... five... six."
${name} took a slow, deep breath in... and let it all drift away into the night sky. 

With every breath... ${name}’s body felt heavier and warmer... melting softly into the cozy bed. 
The journey through ${topic} grew quieter... and quieter... 
until the stars themselves seemed to blink with heavy, sleepy eyelids.

"You did wonderful today, precious ${name}," whispered the night breeze through the sleepy dream. 
"You are safe... you are deeply loved... and it is time for the sweetest sleep."
${name} let out one long, happy yawn... closed their eyes... and drifted into deep... peaceful dreams. 
Goodnight, ${companion}... Goodnight, starry world... Goodnight, sweet ${name}.`;

  return {
    title,
    tagline,
    synopsis,
    fullText,
  };
}

function extractShortSubject(rawTopic: string): string {
  const lower = rawTopic.toLowerCase();
  if (lower.includes('dino')) return 'The Sleepy Dinosaur';
  if (lower.includes('space') || lower.includes('spaceship')) return 'The Starlight Spaceship';
  if (lower.includes('train')) return 'The Cloud Train';
  if (lower.includes('turtle')) return 'The Ocean Turtle';
  if (lower.includes('castle')) return 'The Cloud Castle';
  if (lower.includes('dragon')) return 'The Friendly Dragon';
  if (lower.includes('unicorn')) return 'The Starlight Unicorn';
  if (lower.includes('forest') || lower.includes('woods')) return 'The Whispering Forest';

  // Fallback: pick first 2-3 meaningful words
  const words = rawTopic
    .replace(/^(a|an|the|about)\s+/i, '')
    .split(/\s+/)
    .slice(0, 3)
    .join(' ');
  return capitalizeWords(words || 'The Starlit Journey');
}

function capitalizeWords(str: string): string {
  if (!str) return 'The Starlit Journey';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
