export interface Story {
  id: string;
  title: string;
  character: string;
  characterEmoji: string;
  durationMinutes: number;
  audioUrl: string;
  theme: string;
  themeColor: string;
  tagline: string;
  synopsis: string;
  learningMilestone: string;
  fullText: string;
}

export const BEDTIME_STORIES: Story[] = [
  {
    id: 'barnaby-bear',
    title: 'Barnaby Bear & The Whispering Woods',
    character: 'Barnaby Bear',
    characterEmoji: '🐻',
    durationMinutes: 4,
    audioUrl: '/audio/stories/barnaby-bear.mp3',
    theme: 'Calming a Busy Body',
    themeColor: '#f59e0b',
    tagline: 'Learning sleepy bear belly breathing',
    synopsis: 'Barnaby had a busy day of tumbling and playing. When his little mind is still buzzing, Mama Bear teaches him the sleepy bear breath to help his heavy paws sink into the moss.',
    learningMilestone: 'Nervous system down-regulation & deep diaphragmatic breathing',
    fullText: `Once upon a quiet evening, deep in the Whispering Woods, lived a little bear named Barnaby. Barnaby had spent the entire sunny afternoon tumbling through wildflower fields and chasing golden bumblebees. His little paws were tired, but his mind was still buzzing like a tiny drum.

"Come sit with me by the hollow oak," whispered Mama Bear softly. Barnaby waddled over, resting his heavy chin right on Mama's warm, fluffy shoulder. The evening sky was turning from violet to deep, velvet indigo. The stars were beginning to blink awake, one by one, like tiny lanterns in the night.

"Let's practice our sleepy bear breath," Mama whispered. "Breathe in the sweet pine needles... one, two, three... and gently blow out like a quiet evening breeze... one, two, three, four." Barnaby took a deep, slow breath. His little round tummy rose up, and sank gently down.

He listened to the dry autumn leaves rustling above them, singing a soft hush-a-bye song. With every breath, his paws felt heavier and warmer, sinking softly into the cool green moss. "You are safe, little bear," Mama murmured, wrapping her big gentle arm around him. "The woods are resting, the stars are watching, and it is time to dream." Barnaby closed his eyes, let out one long, happy yawn, and drifted into deep, peaceful sleep.`
  },
  {
    id: 'luna-owl',
    title: 'Luna the Little Owl’s Starlit Journey',
    character: 'Luna Owl',
    characterEmoji: '🦉',
    durationMinutes: 4,
    audioUrl: '/audio/stories/luna-owl.mp3',
    theme: 'Feeling Safe in the Dark',
    themeColor: '#38bdf8',
    tagline: 'The dark is just the world’s blanket',
    synopsis: 'Luna the tiny owl wonders why the shadows look so mysterious. Grandpa Owl explains that the night is just nature’s blanket tucking the flowers and deer in for sleep.',
    learningMilestone: 'Nighttime anxiety relief & emotional security',
    fullText: `High up in the branches of the Grand Willow Tree lived Luna, a tiny barn owl with feathers as soft as downy clouds. Tonight was a special night. The moon was round and bright, casting a gentle silver glow across the sleepy forest.

Luna looked down from her cozy perch. Sometimes, the shadows under the trees looked mysterious. "Remember, little Luna," said Grandpa Owl with a warm, rumbling chuckle. "The dark is just the world's blanket, tucking all the flowers and sleepy deer in for the night."

Luna spread her wings and took a gentle, floating glide into the cool night air. She saw the baby rabbits curled up in their burrows, noses twitching peacefully. She saw the silvery brook humming a quiet lullaby over smooth river stones. The night wasn't scary at all; it was peaceful, calm, and protective.

A friendly firefly blinked nearby, whispering: "Goodnight, Luna." Luna glided back to her soft hollow nest lined with cedar bark. She tucked her beak under her warm wing. The silver moonlight kissed her feathers, and she knew she was completely safe. Goodnight, woods. Goodnight, moon. Goodnight, sweet dreamer.`
  },
  {
    id: 'oliver-otter',
    title: 'Oliver the Sea Otter & The Moonlit Stream',
    character: 'Oliver Otter',
    characterEmoji: '🦦',
    durationMinutes: 4,
    audioUrl: '/audio/stories/oliver-otter.mp3',
    theme: 'Letting Go of Worries',
    themeColor: '#34d399',
    tagline: 'Holding hands and floating softly',
    synopsis: 'Floating on the peaceful river, Oliver holds Mama Otter’s paw and lets the rhythmic swaying water rock him into dreamland.',
    learningMilestone: 'Sensory relaxation & attachment comfort',
    fullText: `Along the winding banks of Whispering River lived Oliver, a playful little river otter. All day long, Oliver had slid down muddy riverbanks and collected smooth river pebbles. Now, the golden sunset had melted into calm twilight.

The river water was calm and still, like a giant mirror reflecting the gentle stars. Oliver floated onto his back, paddling his hind paws lazily. His favorite bedtime routine was wrapping himself loosely in soft green river reeds so he wouldn't drift away in his sleep.

His mama floated beside him and gently held his paw. "Hold tight, little one," she smiled softly. "Whenever you hold hands, you're never floating alone." Oliver felt the gentle rocking of the water, rhythmic and steady, like a warm cradle. Rock... and sway... rock... and sway.

He let go of all the day's busy thoughts. With every gentle wave, his eyelids felt heavier and heavier. The cool river mist kissed his nose. Oliver squeezed Mama's paw one last time, let out a tiny squeak of comfort, and drifted asleep under the stars.`
  },
  {
    id: 'zuno-nap',
    title: 'Zuno’s Cozy Starlight Nap',
    character: 'Zuno Fox',
    characterEmoji: '🦊',
    durationMinutes: 3,
    audioUrl: '/audio/stories/zuno-nap.mp3',
    theme: 'Resting to Recharge',
    themeColor: '#c084fc',
    tagline: 'Dimming your spark for sweet dreams',
    synopsis: 'After a bright day of focus, Zuno curls into a velvet moss nest and dims his electric tail into a gentle, sleepy amber nightlight.',
    learningMilestone: 'Self-regulation & positive bedtime association',
    fullText: `After a busy day helping young foxes practice their Wait-Power and focus, Zuno the Spark-Fox was ready for a rest. His bright electric tail, which crackled with energy all afternoon, was beginning to glow with a calm, gentle amber light, like a warm bedside candle.

Zuno trotted softly toward his favorite secret hollow beneath the ancient roots of the Whispering Tree. The ground was covered in a thick blanket of velvety green moss, softer than the coziest pillow.

Zuno circled three times, finding the perfect snuggle spot. He curled his body into a warm, fluffy crescent. He wrapped his golden spark tail all the way around his nose, keeping him cozy and snug. He took one deep breath in... filling his chest with calm forest air... and let it all out.

"You did wonderful work today, little spark," whispered the night breeze through the leaves. Zuno’s amber tail dimmed to a soft, sleepy twinkle. His ears relaxed, his paws sank into the moss, and he drifted into the sweetest, sparkliest dreams.`
  }
];
