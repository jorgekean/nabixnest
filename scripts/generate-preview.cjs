const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const storiesDir = path.join(__dirname, '..', 'public', 'audio', 'stories');

async function generateBarnabyPreview() {
  const tts = new MsEdgeTTS();
  // Using en-US-JennyNeural - renowned for maternal warmth, gentle bedside cadence, and emotional softness
  await tts.setMetadata('en-US-JennyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

  const emotionalScript = `Once upon a quiet, starry evening—deep in the heart of the Whispering Woods—lived a little brown bear named Barnaby.

Barnaby had spent the long afternoon tumbling through fields of sweet clover, chasing golden dragonflies, and splashing in the cool mountain brook. Now, his little paws felt heavy—like warm river stones resting in the sun. But inside his head, his busy thoughts were still buzzing, like tiny golden bees.

"Come sit with me by the ancient hollow oak," whispered Mama Bear softly, her voice as warm and comforting as a bowl of sweet honey.

Barnaby waddled over on his sleepy paws, resting his chin right against Mama's warm, fluffy shoulder. Above them, the sky was slowly turning from gentle lavender... to a deep, peaceful indigo. High above the whispering branches, tiny silver stars began to blink awake—one by one—like cozy nightlights in the sky.

"Do you feel your busy thoughts, little one?" Mama asked tenderly, brushing a stray pine needle from his ear.

"Yes, Mama," whispered Barnaby with a soft, tired sigh. "My legs want to rest... but my heart is still playing."

"That is okay, my sweet bear," Mama murmured, wrapping her big, protective arms all the way around him. "Let us practice our sleepy bear breath together. Close your eyes... feel how soft the green moss is beneath you... and breathe in slowly with me... one... two... three... and gently sigh it all out into the night... one... two... three... four."

Barnaby took a long, gentle breath. In... and out. His soft, round tummy rose up... and slowly melted down.

With every quiet breath, his shoulders relaxed. His paws grew warm and heavy. All around them, the gentle night crickets hummed a soft, rhythmic lullaby.

"You did so much today," Mama whispered into his ear. "And now—you have nothing left to do. The whole forest is resting with you. You are completely safe... and deeply loved."

Barnaby let out one long, happy, sleepy yawn. He nestled deeper into Mama's warm fur... closed his heavy eyes... and drifted gently into a peaceful, starry dream.`;

  console.log('Generating emotional audio preview for Barnaby Bear...');
  const tempDir = path.join(__dirname, 'temp_preview');
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });

  // Pacing: rate -18% gives melodic flow and emotion while keeping relaxed bedtime tone
  // pitch -2% gives warm chest resonance without sounding sluggish
  await tts.toFile(tempDir, emotionalScript, { rate: '-18%', pitch: '-2%', volume: '-4%' });

  const tempFile = path.join(tempDir, 'audio.mp3');
  const targetFile = path.join(storiesDir, 'barnaby-bear.mp3');
  fs.copyFileSync(tempFile, targetFile);
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('SUCCESS! Barnaby Bear emotional preview generated at:', targetFile);
  console.log('File size:', fs.statSync(targetFile).size, 'bytes');
}

generateBarnabyPreview().catch(console.error);
