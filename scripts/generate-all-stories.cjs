const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const storiesDir = path.join(__dirname, '..', 'public', 'audio', 'stories');
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

// All 19 Bedtime Stories enhanced with deep emotional scoring, dialogue inflections, em-dashes, and sleepy ellipses
const allStories = [
  {
    id: 'barnaby-bear',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `Once upon a quiet, starry evening—deep in the heart of the Whispering Woods—lived a little brown bear named Barnaby.

Barnaby had spent the long afternoon tumbling through fields of sweet clover, chasing golden dragonflies, and splashing in the cool mountain brook. Now, his little paws felt heavy—like warm river stones resting in the sun. But inside his head, his busy thoughts were still buzzing, like tiny golden bees.

"Come sit with me by the ancient hollow oak," whispered Mama Bear softly, her voice as warm and comforting as a bowl of sweet honey.

Barnaby waddled over on his sleepy paws, resting his chin right against Mama's warm, fluffy shoulder. Above them, the sky was slowly turning from gentle lavender... to a deep, peaceful indigo. High above the whispering branches, tiny silver stars began to blink awake—one by one—like cozy nightlights in the sky.

"Do you feel your busy thoughts, little one?" Mama asked tenderly, brushing a stray pine needle from his ear.

"Yes, Mama," whispered Barnaby with a soft, tired sigh. "My legs want to rest... but my heart is still playing."

"That is okay, my sweet bear," Mama murmured, wrapping her big, protective arms all the way around him. "Let us practice our sleepy bear breath together. Close your eyes... feel how soft the green moss is beneath you... and breathe in slowly with me... one... two... three... and gently sigh it all out into the night... one... two... three... four."

Barnaby took a long, gentle breath. In... and out. His soft, round tummy rose up... and slowly melted down.

With every quiet breath, his shoulders relaxed. His paws grew warm and heavy. All around them, the gentle night crickets hummed a soft, rhythmic lullaby.

"You did so much today," Mama whispered into his ear. "And now—you have nothing left to do. The whole forest is resting with you. You are completely safe... and deeply loved."

Barnaby let out one long, happy, sleepy yawn. He nestled deeper into Mama's warm fur... closed his heavy eyes... and drifted gently into a peaceful, starry dream.`
  },
  {
    id: 'luna-owl',
    voice: 'en-GB-SoniaNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `High up in the leafy crown of the Grand Willow Tree—where the silver river whispered to the reeds below—lived Luna, a tiny barn owl with feathers as soft as downy clouds.

Tonight was a magical, quiet night. The full moon hung round and bright in the sky, casting a gentle, protective silver glow across the sleeping forest.

Luna leaned out from her cozy wooden hollow. Below her, the shadows beneath the tall trees looked wide and mysterious. Her little wings gave a nervous flutter.

"Grandpa?" she whispered softly, her big amber eyes shining in the moonlight. "Why does the forest look so shadowy at night?"

Grandpa Owl settled gently onto the branch beside her, his warm, rumbling chuckle as soothing as an evening song. "Remember, little Luna—the dark is never something to fear. The night is simply the world's cozy blanket... tucking all the sleepy wild roses, the mossy paths, and the baby deer in for a peaceful rest."

Luna looked down again. "A blanket?" she whispered with gentle wonder.

"Yes, my darling," Grandpa smiled warmly. "Spread your wings, and glide with me into the calm evening breeze. Feel how peaceful the night truly is."

Luna took a soft breath... spread her downy wings... and floated into the cool, silent air. Below them, baby rabbits were curled in their burrows, their little noses twitching in sweet dreams. The forest brook hummed a gentle lullaby over smooth stones: hush-a-bye... hush-a-bye...

A friendly golden firefly blinked beside her, whispering softly: "Goodnight, Luna."

Luna glided back into her nest, lined with warm cedar bark. She nestled deep into her feathers, tucked her beak under her wing, and sighed with pure comfort.

"Goodnight, quiet woods," she murmured softly. "Goodnight, glowing moon... Goodnight, sweet dreamer."`
  },
  {
    id: 'oliver-otter',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-20%', pitch: '-3%', volume: '-4%' },
    fullText: `Along the gentle, winding curves of Whispering River—where weeping willows dip their green leaves into the water—lived Oliver, a playful little river otter.

All day long, Oliver had slid down muddy riverbanks, splashed in the eddies, and collected smooth river pebbles with his friends. But now... the golden sunset had melted into a quiet twilight of soft violet and peach.

Oliver floated onto his back, lazily paddling his webbed hind paws. Around him, the river was completely still—like a giant silver mirror reflecting the first evening stars.

"Come close, Oliver," called Mama Otter gently, floating right beside him. Her warm, velvety paw reached out and held Oliver's little paw tight.

Oliver smiled, feeling the safe warmth of Mama's touch. "Mama," he asked quietly, "what if the river currents carry us away while we sleep?"

Mama gently squeezed his paw, her voice deep and steady like the river stones. "Whenever we hold hands, little one—you are never floating alone. And look around you... our cozy green river reeds are wrapped around us, keeping us safe, snug, and anchored."

Oliver looked down at the soft ribbons of river grass loosely wrapped around his tummy. He relaxed his paws.

The gentle water began to rock them back and forth... rhythmic and calm... like a warm floating cradle. Rock... and sway... rock... and sway...

Oliver let out a soft, sleepy sigh. With every gentle wave, his eyelids grew heavier and heavier. The cool river mist kissed his whiskers.

"Sleep soundly, my little otter," whispered Mama. "The river will hold us safely until the morning sun."

Oliver closed his eyes... nestled close to Mama's paw... and drifted into sweet, floating dreams.`
  },
  {
    id: 'zuno-nap',
    voice: 'en-US-AndrewNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `After a busy day helping young woodland friends practice their patience and focus—Zuno the Spark-Fox was finally ready for a cozy rest.

His fluffy golden coat was warm from the afternoon sun, and his bright electric tail—which had crackled with bright, playful sparks all day long—was beginning to soften into a calm, sleepy amber glow.

Zuno trotted quietly along the mossy path toward his favorite resting spot: a hidden, cozy hollow nestled deep beneath the roots of the ancient Whispering Tree.

Inside, the forest floor was covered in a thick blanket of velvety green moss—softer than the fluffiest bedtime pillow.

Zuno circled three times... finding the perfect snuggle spot. He curled his body into a soft, round crescent. He tucked his little black paws close to his chest, and wrapped his fluffy golden tail all the way around his nose—like a warm, glowing sleeping scarf.

"Ahhh..." Zuno sighed happily, feeling the soft moss beneath him.

He took a slow, deep breath in—filling his chest with the sweet scent of autumn pine and sleepy night air. And as he breathed out... he whispered: "Three... two... one... powering down."

With each quiet breath, the bright spark in his tail dimmed down... from golden ember... to warm candle flame... to a soft, comforting bedtime nightlight.

"You worked so hard today, little spark," whispered the night breeze gently through the willow branches. "Now, it is your turn to recharge."

Zuno closed his bright eyes. His ears dropped softly back. And nestled in his velvet moss nest, he drifted into the sweetest, sparkliest dreams.`
  },
  {
    id: 'daisy-dinosaur',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `Deep inside the Great Fern Valley—where evening mist curled softly around giant redwood trees—lived a baby dinosaur named Daisy.

Daisy was a little Diplodocus with four sturdy, rounded feet and a long, gentle neck that reached all the way up to the first leaves of the forest canopy.

All day long, Daisy had wandered through the warm meadows, nibbling sweet tender clover and watching golden dragonflies dance in the sunshine. But now, the blazing sun was sinking behind the purple prehistoric mountains, painting the clouds in shades of peach, lavender, and starry indigo.

Daisy's four legs felt so heavy—like warm stones resting peacefully in the sand.

Mama Diplodocus lowered her long, elegant neck down to the ground, gently nuzzling Daisy's warm cheek with a soft, affectionate rumble.

"It is time to settle down, my sweet Daisy," Mama whispered tenderly. "Let us take our sleepy dinosaur breaths together. Feel the cool evening breeze... breathe in slowly... one... two... three... and let it all out like a gentle, warm sigh... one... two... three... four."

Daisy followed Mama's lead. Her little round belly filled with calm, cool air—and slowly sank down as she exhaled.

Above them, the giant palm fronds rustled in the twilight breeze, swaying back and forth like a bedtime lullaby.

Daisy's long neck gently curled down until her sleepy head rested against the soft, cool green moss. She tucked her long tail around her sleepy paws.

"You are safe here in our valley," Mama whispered. "Rest now, little dinosaur."

Daisy let out a soft, contented puff of air, closed her gentle dark eyes, and fell sound asleep beneath the prehistoric stars.`
  },
  {
    id: 'sammy-turtle',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-20%', pitch: '-3%', volume: '-4%' },
    fullText: `Out in the peaceful blue ocean—beneath the silver glow of the rising full moon—lived a gentle little green sea turtle named Sammy.

Sammy had spent his sunny afternoon paddling playfully through turquoise waves, chasing colorful reef fish, and gliding over bright coral gardens. But now, the great ocean was growing calm and still—as smooth as glass beneath the twinkling night sky.

Sammy glided into his favorite quiet coral lagoon, where soft purple sea fans swayed back and forth with the gentle tide.

Grandpa Turtle floated quietly beside him, his wise old shell glistening in the moonlight.

"Grandpa," whispered Sammy softly, "my flippers still feel like they want to keep paddling."

Grandpa smiled with a warm, rumbling chuckle. "Ah, little one—you do not need to paddle anymore. The daytime is for swimming, but the night is for letting the ocean hold you. Just relax your flippers, and let the gentle current rock you to sleep."

Sammy let his flippers drop loosely into the warm sea water. He stopped kicking.

A school of tiny glowing lantern fish swam quietly beneath them, lighting up the coral like little underwater stars.

Rock and sway... rock and sway...

The rhythm of the ocean tide was so soothing and steady. Sammy felt all the tiredness from his long day float away into the warm water.

He tucked his little head gently inside his smooth shell, let out a tiny trail of sleepy bubbles, and floated peacefully into sweet underwater dreams.`
  },
  {
    id: 'benny-bunny',
    voice: 'en-US-AvaNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `At the sunny edge of Clover Hollow—where white dandelion seeds floated like tiny parachutes on the evening breeze—lived a little rabbit named Benny.

Benny had two long, velvety ears, soft caramel fur, and a tiny cotton-ball tail.

All afternoon, Benny had been hopping, skipping, and leaping over flowerpots in the meadow. But now, the evening sun had slipped behind the hills. Benny was tucked inside his cozy underground burrow, lined with dried clover and sweet-smelling lavender.

Yet his little front paws were still twitching with leftover energy, and his little pink nose was wiggling fast.

Mama Bunny hopped softly over and sat right beside him, her warm fur brushing against his cheek.

"Let us help your busy bunny body relax, my sweet Benny," Mama whispered with a tender smile. "First... let us relax those long, velvety ears. Let them flop down softly beside your cheeks... soft, warm, and heavy."

Benny let his ears drop. They felt so wonderfully relaxed.

"Now," Mama continued softly, "relax your little twitchy nose. Take a slow, sweet breath of lavender... and let your nose be completely still."

Benny took a long breath in... and let it out. His little nose stopped wiggling.

"And now, let those bouncy hopping paws sink deep into the warm clover bed. You have hopped your very best today—and now, your paws can rest."

Benny felt his whole body melt into the soft clover. Outside the burrow, the night crickets began playing their gentle lullaby. Benny snuggled his nose into Mama's warm fur, closed his sleepy eyes, and hopped peacefully into dreamland.`
  },
  {
    id: 'pip-cloud-train',
    voice: 'en-US-AvaNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `High up in the twilight sky—where the evening clouds turn into soft pink cotton candy and warm golden honey—runs the coziest train in the entire world: the Marshmallow Cloud Train.

The little steam engine, named Pip, had shiny brass lanterns that glowed with a warm, sleepy amber light.

Pip was a very special train. He never blew loud, shrill whistles. Instead, his little smokestack puffed out soft, fluffy rings of lavender mist with the gentlest, most soothing sound: hush... hush... chug... chug... hush... hush...

Inside the train cars, the seats were made of plush velvet cushions, lined with warm knitted wool blankets and fluffy marshmallow pillows.

"All aboard for dreamland," whispered Pip softly as the silver moon stamped every passenger's ticket with starlight.

The train glided smoothly along tracks woven entirely of starlight. With every gentle click-clack of the wheels, the worries of the daytime simply melted away.

Over quiet purple mountains the train floated... over peaceful sleeping valleys... rocking back and forth like a gentle cradle.

Chug... chug... hush... hush...

"Close your eyes, little traveler," whispered Pip through the quiet night air. "You are safe, you are cozy, and the cloud train is carrying you straight into the sweetest, most peaceful dreams."`
  },
  {
    id: 'clara-koala',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `High in the fragrant treetops of the ancient Eucalyptus Forest—where the leaves smell of sweet mint and gentle rain—lived a tiny baby koala named Clara.

Clara had round, fuzzy ears, a soft button nose, and gentle grey fur as soft as a cloud.

The long shadows of evening were stretching across the Australian bush. The laughing kookaburras had finished their daytime songs, and the forest had grown still and peaceful.

Clara climbed into the warm, snug curve of Mama Koala's arm, pressing her little fuzzy ear right against Mama's chest.

Thump... thump... thump...

Went Mama's steady, calm heartbeat. It was the most comforting, reassuring sound in the whole world.

Mama gently stroked Clara's soft forehead with her velvety paw. "You are completely safe here, my sweet little Clara," Mama murmured in a slow, soothing whisper. "These branches are strong, the stars are watching over us, and Mama is holding you close."

A fresh evening breeze rustled the silver eucalyptus leaves, singing a quiet hush-a-bye lullaby through the canopy.

"Breathe with me, little one," Mama whispered. "Slowly in... and gently out."

Clara took a deep breath of the cool, minty night air. She let out a tiny, contented sigh. Feeling the steady rhythm of Mama's heartbeat beneath her ear, she closed her round dark eyes and drifted into deep, loving sleep.`
  },
  {
    id: 'milo-monkey',
    voice: 'en-US-AndrewNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `In the heart of the lush Emerald Rainforest—where giant green leaves formed wide, leafy umbrellas against the stars—lived a little monkey named Milo.

All day long, Milo had swung from vine to vine, doing funny loop-de-loops, chasing colorful parrots, and collecting sweet yellow mangoes.

Now, twilight had deepened into velvet blue. Milo was lying in his woven vine hammock, but his little brain was still bouncing from branch to branch, thinking about all the fun games he had played.

Papa Monkey climbed up and sat gently on the branch beside the hammock.

"Papa," Milo whispered with a little fidget, "my thoughts are still swinging on the vines."

Papa smiled warmly, placing a gentle hand on Milo's forehead. "I know, little adventurer. When our day is full of fun, our minds need a gentle countdown to rest. Look up through the canopy... and let us count the sleepy fireflies together."

Milo looked up into the peaceful shadows.

"One gentle firefly... blinking soft amber in the leaves," Papa whispered slowly. "Two little fireflies... glowing like warm golden stars... Three sleepy fireflies... resting quietly on the mossy bark... Four little lights... dimming down for the night..."

With each slow number, Milo felt the energetic bounce in his body melt away. His long curly tail fell still and limp. His little monkey hands uncurled, soft and relaxed.

"Five fireflies... six fireflies..." Papa murmured.

Milo didn't even hear number seven. His heavy eyelids fluttered gently closed, and he was fast, peacefully asleep.`
  },
  {
    id: 'hazel-hedgehog',
    voice: 'en-US-AvaNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `At the foot of the Grand Oak Tree—tucked beneath a cozy blanket of crisp autumn leaves—lived a gentle little hedgehog named Hazel.

During the daytime, whenever something surprised or worried little Hazel, she would curl into a tight, prickly little ball to protect her soft belly.

Now, the evening had arrived, cool and still. The autumn wind was singing a soft, rustling lullaby through the oak branches.

Grandma Hedgehog was smoothing their winter nest, fluffing up dry cedar shavings and velvety green forest moss.

Hazel climbed into the nest, but she was still curled tight, her little quills standing up straight.

"Oh, my sweet little Hazel," Grandma whispered with a warm, tender smile, gently stroking the soft fur on Hazel's forehead. "You do not need your little shield tonight. Tonight, there is nothing to guard against. You are completely safe inside our burrow."

Grandma's voice was as soft as down. "You can uncurl your little paws now... relax your shoulders... and let all your prickles lay flat, smooth, and soft."

Hazel listened to Grandma's gentle words. She took a long, slow breath in... and let it softly out.

Slowly, carefully... she uncurled her tight little ball. She stretched her tiny paws out onto the velvety moss. Her quills relaxed, flattening down until they felt as soft as a brushed velvet blanket.

"Ahhh..." Hazel sighed. It felt so wonderful to let her guard down.

She nestled her little nose into the dry cedar leaves, closed her eyes, and drifted into the coziest, safest sleep.`
  },
  {
    id: 'toby-tugboat',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-20%', pitch: '-3%', volume: '-4%' },
    fullText: `In the calm, protected waters of Sleepy Harbor—where the tall white lighthouse sent a slow, golden beam of light across the waves—lived Toby the Tugboat.

Toby was small, but he had a big, cheerful engine. All morning and afternoon, Toby had chugged bravely back and forth, guiding giant ocean cargo ships and tall white sailboats safely into their harbor docks.

Now, his little iron boiler was cooling down, puffing only a tiny, gentle ring of warm white steam into the cool evening air.

The harbor bell chimed across the quiet water with a slow, soothing tone: bong... bong... bong...

Toby was tied safely to his wooden slip at Dock Number Four.

Around him, the harbor water was as calm as glass, lapping gently against his sturdy wooden hull with a rhythmic, comforting sound: lap... lap... sway... sway...

Captain Jack came out onto the wheelhouse deck, patting Toby's shiny brass wheel. "You worked hard today, little Toby," Captain Jack said with a warm smile. "Every ship is docked, the harbor is peaceful, and your work is done."

Toby clicked off his bright deck lights, leaving only a tiny amber lantern glowing at his stern.

His little engine gave one last, quiet, contented purr—and fell completely silent.

The gentle tide lifted him up... and settled him softly down.

Toby closed his porthole eyes, perfectly safe in his harbor home, and drifted peacefully into dreamland.`
  },
  {
    id: 'ella-elephant',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-20%', pitch: '-3%', volume: '-4%' },
    fullText: `Across the wide, golden African savanna—where the evening sun had dipped behind the acacia trees in a glow of warm peach and magenta—walked a baby elephant named Ella.

Ella had big velvety ears, a tiny trunk that loved exploring, and four sturdy, padded feet that made soft rustling sounds in the dry grass.

All day long, the herd had journeyed across the plains. Ella had splashed in the watering hole, chased yellow butterflies, and trumpeted her little baby greeting. Now, her legs felt delightfully heavy—like warm bags of sand.

The herd came to a rest beside the quiet Silver River, where the cool water reflected the first twinkling evening stars.

Mama Elephant stepped close beside Ella, standing like a tall, protective wall against the cool night breeze.

Mama curved her long, warm trunk tenderly around Ella's back, stroking her softly behind her big sleepy ears.

"Rest your heavy head, my little Ella," Mama rumbled. Her deep, soothing voice resonated through the ground like a warm, comforting hug that Ella felt all the way down to her toes.

Ella leaned her warm shoulder right against Mama's sturdy side.

"Do you hear the river, Ella?" Mama whispered. "It flows so smoothly over the pebbles. Let your breath flow just like the river... in... and out."

Ella took a long, deep breath. Her big ears drooped softly down. She closed her gentle eyes, feeling completely sheltered in the center of the herd, and fell into a deep, happy sleep.`
  },
  {
    id: 'finn-firefly',
    voice: 'en-US-AvaNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `In a quiet glade surrounded by tall wildflowers—where sweet honeysuckle perfumed the evening air—lived a tiny, cheerful firefly named Finn.

Finn had delicate, translucent wings and a little spark in his tail that could glow as bright as a golden star. Finn loved shining! He loved darting between dew-covered leaves and doing loop-de-loops in the air.

But tonight, it was bedtime—and Finn's little spark was still pulsing bright, yellow, and excited.

"Grandpa," Finn buzzed softly, hovering near a wild violet, "my spark won't turn off! It's too excited to sleep."

Grandpa Firefly hovered gently down beside him, landing softly on the velvety petal of an evening primrose.

"Ah, little spark," Grandpa said with a warm, comforting hum. "Being bright is wonderful for playing at twilight. But bedtime is not about turning off your light—it is about turning it down into a cozy nightlight."

Grandpa showed Finn how to take a slow, deep breath in... and as he gently exhaled, Grandpa's bright yellow light softened... from bright gold... to warm honey amber... to a tiny, sleepy bedside candle glow.

"Now you try, Finn," whispered Grandpa. "Fold your wings softly against your back. Take a deep breath of honeysuckle... and let your spark dim down to sleep."

Finn took a slow, gentle breath. He blew it out softly into the cool night.

Slowly, gently... his bright spark dimmed. From electric gold... to warm amber... to a soft, cozy bedtime glow.

Finn felt a wave of sweet warmth wash through him. He tucked himself under the curve of a broad green leaf, closed his little eyes, and drifted into sweet, glowing dreams.`
  },
  {
    id: 'penny-penguin',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `Far away across the sparkling white snowfields of Antarctica—where emerald and violet northern lights danced quietly across the starry sky—lived a little penguin chick named Penny.

Penny was covered in the softest, fluffiest grey down feathers in the entire colony.

All afternoon, Penny had slid on her tummy across smooth ice slides and splashed in the crystal blue waters with her penguin friends. But now, the polar night was falling—crisp, quiet, and cold.

Across the snow, the colony was gathering for bedtime.

All the adult penguins stepped close together, forming a giant, loving circle known as the Penguin Huddle.

Penny waddled right into the very center of the huddle. In the center, there was no wind at all. It was as warm, cozy, and toasty as a giant bedtime hug.

Mama Penguin gently stepped forward. She nudged Penny softly with her beak, letting Penny step her chilly little feet right on top of Mama's warm feet, covered completely by Mama's thick, downy feather blanket.

"You are safe in the warm heart of our family, little Penny," Mama whispered softly against her cheek.

Penny felt the steady, gentle swaying of the penguins all around her, all breathing together in peaceful harmony.

Hush... and sway... hush... and breathe...

Penny rested her fuzzy chin on Mama's warm chest. She let out a tiny, contented chirp, closed her eyes, and drifted into deep, warm, winter dreams.`
  },
  {
    id: 'rory-panda',
    voice: 'en-US-AndrewNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `High on the misty slopes of the Cloud Mountains—where tall bamboo forests rustle in the cool evening breeze—lived a playful little red panda named Rory.

Rory had rusty cinnamon fur, white furry eyebrows, and a magnificent, extra-fluffy ringed tail that was as long as his entire body.

Rory had spent his sunny day climbing mossy tree trunks, nibbling sweet bamboo shoots, and doing funny acrobatic somersaults. But now, the evening mountain mist was rolling in, wrapping the fir trees in a soft, white cotton blanket.

Rory climbed up to his favorite sleeping perch: a wide, moss-covered branch of an ancient fir tree, high above the forest floor.

He lay down on his tummy, letting his four little paws dangle loosely over the sides of the branch.

Then, Rory gave one long, luxurious stretch: stretching his front paws forward... stretching his back paws behind him... and then letting every single muscle melt into the warm bark like soft butter.

"And now for the best part," Rory murmured happily to himself.

He took his big, fluffy striped tail and curled it all the way around his nose—like the coziest furry sleeping scarf in the world.

The mountain breeze whispered softly through the bamboo: shhh... shhh... shhh...

Rory took a slow, deep breath into his warm tail. His little paws sank deeper into the moss. He let out a soft, sleepy sigh, and drifted into peaceful, misty dreams.`
  },
  {
    id: 'rosie-deer',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `In a quiet forest glade surrounded by whispering silver birch trees—lived a sweet little fawn named Rosie.

Rosie had a coat of soft golden-brown spotted with tiny white stars, and big, gentle brown eyes that looked at the world with quiet wonder.

All day long, Rosie had scampered through fields of daisies, following Mama Deer along the sunny woodland paths. But now, the long shadows of the trees were melting into the peaceful twilight.

Along the edge of the brook, the wild pink roses were slowly folding their petals closed, getting ready to sleep until morning.

Mama Deer stepped into a sheltered hollow beneath the ferns, where the ground was lined with dry, sweet-smelling oak leaves.

"Come rest your slender legs, my little fawn," Mama whispered in a voice as soft as falling leaves.

Rosie stepped delicately into the ferns. She folded her front legs, then her back legs, curling into a neat, round circle right beside Mama's warm flank.

Mama gently smoothed the spotted fur on Rosie's forehead with her warm tongue.

Nearby, the crystal forest brook sang its continuous, peaceful bedtime lullaby over smooth river stones: hush-a-bye... hush-a-bye...

"You did so much walking today, little Rosie," Mama whispered. "Now the forest is resting with you. Close your eyes, and feel the stars watching over us."

Rosie let her chin sink softly onto the ferns. She closed her gentle eyes, took one slow breath, and fell sound asleep in the peaceful woods.`
  },
  {
    id: 'leo-lion',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-20%', pitch: '-3%', volume: '-4%' },
    fullText: `On top of the great stone hill known as Pride Rock—looking out across the wide, peaceful savanna—lived a brave little lion cub named Leo.

Leo had a coat of warm golden fur, big paws that he hadn't quite grown into yet, and a tiny tuft of dark fur at the tip of his tail.

Leo had spent the whole day practicing his mighty pounces: leaping over logs, chasing grasshoppers through the tall grass, and practicing his best baby roars: squeak-roar!

Now, the blazing sun had melted into a soft violet twilight, and the great flat rock beneath his paws was radiating gentle, cozy warmth from the afternoon sunshine.

Leo let out a big yawn, showing his tiny white teeth. But then he looked at his papa and whispered: "Papa, I want to keep playing! What if I miss something exciting?"

Papa Lion smiled with a deep, rumbling purr that vibrated like a warm thunderstorm.

"Listen closely, little Leo," Papa explained gently, placing a massive, protective paw beside him. "Even the strongest kings of the savanna must sleep. Rest is not missing out—rest is where your muscles grow stronger, your paws grow bigger, and your brave heart recharges for tomorrow's adventures."

Leo looked at Papa's big, strong paws. He liked the idea of growing big and strong.

He padded over to the warmest hollow on the rock, right between Papa's protective paws and Mama's warm flank. He curled his paws under his chest and let out one huge, happy, sleepy yawn.

High above, the savanna stars began to sparkle like millions of tiny nightlights.

"Goodnight, brave little lion," whispered Papa.

Leo closed his eyes, purred softly, and drifted into deep, powerful, restful sleep.`
  },
  {
    id: 'kiki-kitten',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-18%', pitch: '-2%', volume: '-4%' },
    fullText: `Inside a quiet, cozy cottage at the foot of the sleepy hills—lived an adorable little calico kitten named Kiki.

Kiki had patches of warm ginger, velvety black, and snowy white fur, with tiny pink paws as soft as rose petals.

All afternoon, Kiki had batted at balls of colorful yarn, explored under armchairs, and watched singing bluebirds from the sunny windowsill. But now, the cottage had grown quiet and dim.

In the stone hearth, a gentle fireplace crackled with a warm, steady glow, popping softly: snap... crackle... glow...

On the big wooden rocking chair sat Kiki's favorite thing in the whole house: a thick, fluffy blanket made of soft knitted sheep's wool.

Kiki hopped lightly onto the chair. The wool was warm from the fire and smelled of sweet cedar and clean cotton.

Kiki began to knead the blanket with her front paws: press left... press right... press left... press right...

As she kneaded, a tiny motor started in her chest: purr... purr... purr... purr...

It was the happiest, most relaxing sound in the whole world.

She turned around three times in a little circle, curled into a perfect furry ball, and tucked her little pink nose under her front paw.

The steady warmth of the wool blanket soaked into her sleepy fur. Her purring grew slower... and softer... until Kiki was fast asleep, purring quietly into sweet, happy dreams.`
  }
];

async function generateAll() {
  console.log(`Starting emotional re-synthesis for all ${allStories.length} stories...`);
  const tts = new MsEdgeTTS();

  for (let i = 0; i < allStories.length; i++) {
    const s = allStories[i];
    console.log(`[${i + 1}/${allStories.length}] Synthesizing: ${s.id} using voice ${s.voice}...`);
    
    await tts.setMetadata(s.voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    
    const tempDir = path.join(__dirname, `temp_${s.id}`);
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    fs.mkdirSync(tempDir, { recursive: true });

    await tts.toFile(tempDir, s.fullText, s.prosody);

    const tempFile = path.join(tempDir, 'audio.mp3');
    const targetFile = path.join(storiesDir, `${s.id}.mp3`);
    fs.copyFileSync(tempFile, targetFile);
    fs.rmSync(tempDir, { recursive: true, force: true });

    const stats = fs.statSync(targetFile);
    console.log(`   -> OK: ${targetFile} (${Math.round(stats.size / 1024)} KB)`);
  }

  console.log('\nAll 19 stories synthesized successfully with rich emotional prosody and punctuation!');
}

generateAll().catch(err => {
  console.error('Error generating stories:', err);
  process.exit(1);
});
