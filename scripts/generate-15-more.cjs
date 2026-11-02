const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const storiesDir = path.join(__dirname, '..', 'public', 'audio', 'stories');
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

// 15 New Bedtime stories with clear, slow, soothing neural bedtime diction for young children
const newStories = [
  {
    id: 'daisy-dinosaur',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Daisy the Little Diplodocus & The Warm Valley',
    character: 'Daisy Dinosaur',
    characterEmoji: '🦕',
    durationMinutes: 4,
    theme: 'Gentle Belly Breathing',
    themeColor: '#10b981',
    tagline: 'Swaying softly like a sleepy willow tree',
    synopsis: 'High above the prehistoric fern fields, little Daisy practices slow dinosaur breaths until her long neck gently rests on the warm moss.',
    learningMilestone: 'Diaphragmatic breathing & physical relaxation',
    text: `Deep inside the Great Fern Valley... where the evening mist curled softly around ancient giant trees... lived a little dinosaur named Daisy. 
    Daisy was a baby Diplodocus with four sturdy green feet and a long, gentle neck. 
    All day long, Daisy had wandered through the warm meadows, nibbling sweet tender clover and watching golden dragonflies dance in the sunshine. 
    Now, the sun was sinking behind the purple mountains, painting the sky with calm shades of peach, lavender, and starry indigo. 
    Daisy's legs felt very heavy, like warm stones resting in the sand. 
    Mama Diplodocus leaned her long neck down, nuzzling Daisy's warm cheek. 
    "It is time to settle down, little Daisy," Mama whispered softly. "Let us take our sleepy dinosaur breaths together. Breathe in the cool mountain breeze... one... two... three... and breathe out like a warm evening sigh... one... two... three... four." 
    Daisy took a long, slow breath. Her little round tummy filled with quiet calm and gently sank down. 
    She listened to the quiet rustle of the giant palm fronds above her head, swaying like gentle lullabies. 
    Her eyelids felt heavier and heavier. 
    She tucked her long tail around her sleepy paws, closed her big gentle eyes, and drifted into deep, peaceful sleep beneath the glowing stars.`
  },
  {
    id: 'sammy-turtle',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-27%', pitch: '-4%', volume: '-6%' },
    title: 'Sammy the Sea Turtle & The Coral Lagoon',
    character: 'Sammy Turtle',
    characterEmoji: '🐢',
    durationMinutes: 4,
    theme: 'Slowing Down & Floating',
    themeColor: '#06b6d4',
    tagline: 'Floating gently in a calm turquoise sea',
    synopsis: 'Sammy drifts lazily across the moonlit lagoon where gentle ocean currents rock him into dreamland.',
    learningMilestone: 'Sensory grounding & release of daytime tension',
    text: `Out in the peaceful blue ocean, beneath the silver glow of the rising full moon, lived a gentle little green sea turtle named Sammy. 
    Sammy spent his sunny days paddling playfully through turquoise waves and exploring colorful coral gardens. 
    Now, the ocean was becoming very calm, as smooth and still as a giant mirror reflecting the quiet night sky. 
    Sammy glided into his favorite quiet lagoon, surrounded by soft purple sea fans that swayed gently back and forth. 
    Grandpa Turtle floated beside him, his voice as soothing as the ocean tide. 
    "Let the water hold you, little one," Grandpa murmured. "You do not need to paddle anymore. Just let the gentle current rock you to sleep." 
    Sammy relaxed his flippers, letting them drift loosely in the warm sea water. 
    A school of tiny glowing lantern fish swam quietly beneath him, twinkling like little underwater stars. 
    Rock and sway... rock and sway... 
    The rhythm of the ocean was so comforting and safe. 
    Sammy tucked his little head gently into his smooth shell, let out a tiny trail of sleepy bubbles, and floated peacefully into sweet underwater dreams.`
  },
  {
    id: 'benny-bunny',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Benny Bunny & The Meadow of Soft Dreams',
    character: 'Benny Bunny',
    characterEmoji: '🐰',
    durationMinutes: 4,
    theme: 'Relaxing Busy Muscles',
    themeColor: '#f43f5e',
    tagline: 'Letting twitchy paws melt into clover',
    synopsis: 'After a hopping afternoon, Benny learns to soften his twitchy nose and long ears until he melts into a cozy dandelion nest.',
    learningMilestone: 'Progressive muscle relaxation for restless bodies',
    text: `At the edge of Sunny Hollow Meadow, where sweet dandelion puffs floated on the quiet evening breeze, lived a fluffy little bunny named Benny. 
    Benny had two long velvety ears and a round cotton-ball tail. 
    All afternoon, Benny had been hopping, skipping, and leaping over flowerpots. 
    His little paws were still twitching with leftover energy, and his pink nose was wiggling fast. 
    Mama Bunny hopped over and sat softly in their cozy underground burrow, lined with dry clover and sweet-smelling lavender. 
    "Let us relax our bunny bodies, Benny," whispered Mama gently. "First, relax your long ears... let them flop down, soft and warm. Now relax your little nose... quiet and still. Now let your little hopping paws sink deep into the warm clover." 
    Benny let his ears drop softly beside his cheeks. 
    He slowed his breathing down, breathing in the sweet scent of lavender, and blowing out a slow, quiet breath. 
    The underground burrow was warm, safe, and cozy. 
    Outside, the crickets began playing their quiet nighttime song. 
    Benny snuggled right against Mama's warm fur, closed his sleepy eyes, and hopped peacefully into dreamland.`
  },
  {
    id: 'pip-cloud-train',
    voice: 'en-US-AriaNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Pip & The Marshmallow Cloud Train',
    character: 'Pip & The Cloud Train',
    characterEmoji: '🚂',
    durationMinutes: 4,
    theme: 'Peaceful Nighttime Journey',
    themeColor: '#a855f7',
    tagline: 'Chugging softly across violet twilight clouds',
    synopsis: 'All aboard the sleepy Cloud Train! Gliding softly across marshmallow clouds while the moon stamps your ticket to dreamland.',
    learningMilestone: 'Visualization & positive sleep association',
    text: `High up in the evening sky, where the clouds turn to pink cotton candy and golden honey, runs the coziest train in the world: the Marshmallow Cloud Train. 
    The little engine, named Pip, had shiny brass lanterns that glowed with a warm, sleepy amber light. 
    Pip did not make loud whistles. Instead, his chimney blew out soft, puffy rings of lavender mist with a quiet, soothing sound: hush... hush... chug... chug... hush... hush... 
    The train cars were filled with plush velvet cushions and warm knitted blankets. 
    Every sleepy creature in the world was invited aboard. 
    As the train glided smoothly along tracks made of starlight, the moon looked down and smiled with a gentle silver glow. 
    With every gentle click-clack of the wheels, the night grew quieter and calmer. 
    The train floated over sleepy mountains and quiet valleys, rocking every passenger like a cradle. 
    Chug... chug... hush... hush... 
    Close your eyes, little traveler, and let the cloud train carry you all the way to sweet, happy dreams.`
  },
  {
    id: 'clara-koala',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Clara the Baby Koala’s High Treetop Cradle',
    character: 'Clara Koala',
    characterEmoji: '🐨',
    durationMinutes: 4,
    theme: 'Attachment & Feeling Secure',
    themeColor: '#64748b',
    tagline: 'Tucked warm in Mama’s gentle pouch',
    synopsis: 'High in the fragrant eucalyptus canopy, baby Clara snuggles close to Mama’s heartbeat while the wind hums a sleepy lullaby.',
    learningMilestone: 'Emotional security & co-regulation with caregiver',
    text: `High up in the branches of the ancient Eucalyptus Tree, where the leaves smell of fresh mint and sweet rain, lived a tiny baby koala named Clara. 
    Clara had round fuzzy ears and soft grey fur as gentle as down. 
    The evening shadows were stretching across the quiet Australian bush. 
    The kookaburras had finished their songs, and the forest was turning peaceful and still. 
    Clara climbed into the warm crook of Mama Koala's arm, pressing her little round ear right against Mama's chest. 
    Thump... thump... thump... went Mama's steady, calm heartbeat. 
    It was the most comforting sound in the entire world. 
    Mama gently stroked Clara's soft fuzzy head with her gentle paws. 
    "You are safe here, my little one," Mama murmured in a slow, whispery voice. "The branches are strong, the stars are watching, and Mama is right beside you." 
    A cool, fresh evening breeze rustled the silver eucalyptus leaves, singing a quiet hush-a-bye song. 
    Clara let out a tiny contented sigh, closed her round dark eyes, and fell asleep feeling completely loved and protected.`
  },
  {
    id: 'milo-monkey',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-27%', pitch: '-4%', volume: '-6%' },
    title: 'Milo the Little Monkey & The Starlight Counting',
    character: 'Milo Monkey',
    characterEmoji: '🐒',
    durationMinutes: 4,
    theme: 'Calming an Active Mind',
    themeColor: '#eab308',
    tagline: 'Counting slow blinking fireflies from a hammock',
    synopsis: 'Milo’s energetic mind learns to slow down by counting warm fireflies until his sleepy eyelids float closed.',
    learningMilestone: 'Mindfulness & sensory countdown for bedtime',
    text: `In the heart of the Emerald Rainforest, where giant green leaves formed cozy natural umbrellas, lived a playful little monkey named Milo. 
    Milo had a long curly tail and bright, curious eyes. 
    All day long, Milo had swung from vine to vine, doing loop-de-loops and collecting sweet wild mangoes. 
    Now, the twilight was deepening into velvet blue. 
    Milo was lying in his soft mossy tree hammock, but his little brain was still thinking of all the games he had played. 
    Papa Monkey sat beside him and pointed up through the forest canopy. 
    "Look up at the quiet night, Milo," Papa said softly. "Let us count the sleepy fireflies blinking in the trees. One gentle light blinking yellow... two little fireflies glowing gold... three fireflies resting softly on a mossy branch... four sleepy lights dimming down." 
    With each number, Milo felt his busy thoughts slowing down, floating away like tiny leaves on a calm river. 
    His arms felt heavy and relaxed. His curly tail rested limp and still. 
    Five fireflies... six fireflies... 
    Milo did not even reach ten. His heavy eyelids fluttered softly closed, and he was fast asleep.`
  },
  {
    id: 'hazel-hedgehog',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Hazel the Hedgehog’s Velvet Moss Bed',
    character: 'Hazel Hedgehog',
    characterEmoji: '🦔',
    durationMinutes: 4,
    theme: 'Uncurling & Letting Go',
    themeColor: '#d97706',
    tagline: 'Softening little prickles into cozy blankets',
    synopsis: 'Hazel learns that at bedtime, she doesn’t need her protective spikes. She uncurls softly into warm cedar shavings and falls asleep.',
    learningMilestone: 'Nervous system down-regulation & letting guard down',
    text: `At the bottom of the Grand Oak Tree, tucked beneath a carpet of golden autumn leaves, lived a sweet little hedgehog named Hazel. 
    When Hazel felt worried or startled during the day, she would curl into a tight little ball with all her soft prickles sticking out to protect herself. 
    Now, the evening was very calm. The autumn wind was blowing a gentle lullaby through the oak branches. 
    Grandma Hedgehog was preparing their soft winter nest, fluffing up dry cedar shavings and velvety green forest moss. 
    "You do not need your little shield tonight, Hazel," Grandma whispered with a warm, loving smile. "Tonight, you are completely safe. You can uncurl your little paws, relax your back, and let all your prickles lay flat and soft." 
    Hazel took a deep, slow breath. 
    Very gently, she uncurled her tight little ball. 
    She stretched out her tiny paws. Her little prickles flattened down, as soft as velvet fur. 
    The moss bed was so warm and comfortable. 
    She burrowed her nose into the cozy pile of dry leaves, let out a tiny sleepy yawn, and drifted into the sweetest winter dreams.`
  },
  {
    id: 'toby-tugboat',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-27%', pitch: '-4%', volume: '-6%' },
    title: 'Toby the Sleepy Little Tugboat',
    character: 'Toby Tugboat',
    characterEmoji: '🚢',
    durationMinutes: 4,
    theme: 'Calming Rhythm of the Waves',
    themeColor: '#3b82f6',
    tagline: 'Rocking softly at harbor dock after a big day',
    synopsis: 'Toby worked hard guiding big ocean ships into port. Now his engine cools to a quiet purr as the harbor tide gently rocks him to sleep.',
    learningMilestone: 'Transitioning from work/play to deep restorative rest',
    text: `In the calm waters of Sleepy Harbor, where the lighthouse sent a slow, golden beam of light across the sea, lived Toby the Tugboat. 
    Toby was small, but he had a strong, cheerful heart. 
    All morning and afternoon, Toby had helped tall sailboats and giant cargo ships glide safely into the harbor docks. 
    Now, his little smokestack was cooling down, puffing only a tiny, gentle ring of warm steam into the evening air. 
    The big harbor bell rang with a soft, slow chime: gong... gong... 
    Toby was tied safely to his wooden slip at Dock Number Four. 
    The water in the harbor was calm and gentle, lapping against his wooden hull with a steady, rhythmic splash: lap... lap... sway... sway... 
    Toby turned off his bright yellow deck lights, leaving only a tiny amber nightlight on his wheelhouse. 
    His engine gave one last quiet purr and fell completely silent. 
    The water rocked him up, and gently settled him down. 
    Toby closed his little porthole eyes, perfectly safe in his harbor home, and drifted peacefully into dreamland.`
  },
  {
    id: 'ella-elephant',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Ella the Elephant Calf & The Moonlit River',
    character: 'Ella Elephant',
    characterEmoji: '🐘',
    durationMinutes: 4,
    theme: 'Gentle Mama Rocking',
    themeColor: '#8b5cf6',
    tagline: 'Walking softly in Mama’s big gentle footsteps',
    synopsis: 'Ella’s heavy elephant footsteps slow down at the watering hole as Mama wraps her gentle trunk around her sleepy ears.',
    learningMilestone: 'Attachment reassurance & grounding weight',
    text: `Across the wide, golden African savanna, where the sun had dipped below the acacia trees in a warm magenta glow, walked a baby elephant named Ella. 
    Ella had giant velvety ears and four big, padded feet that made soft rustling sounds in the dry grass. 
    All day long, the herd had walked across the plains. 
    Ella had splashed in the mud and chased fluttering yellow butterflies. 
    Now, her little legs felt wonderfully heavy, like warm velvet pillows. 
    The herd stopped beside the peaceful Silver River, where the cool water reflected the bright evening stars. 
    Mama Elephant stepped close beside Ella, standing like a tall, protective wall against the cool night breeze. 
    Mama gently curved her long, warm trunk around Ella's back, stroking her softly behind her sleepy ears. 
    "Rest your heavy head, little Ella," Mama rumbled in a deep, soothing vibration that Ella felt all the way in her toes. 
    Ella leaned her warm shoulder right against Mama's sturdy side. 
    She listened to the quiet murmur of the river water flowing over smooth pebbles. 
    Her big ears relaxed. She closed her eyes, took one long, slow breath, and fell into a deep, happy sleep.`
  },
  {
    id: 'finn-firefly',
    voice: 'en-US-AriaNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Finn the Little Firefly’s Bedtime Twinkle',
    character: 'Finn Firefly',
    characterEmoji: '✨',
    durationMinutes: 4,
    theme: 'Dimming Down for Sleep',
    themeColor: '#fbbf24',
    tagline: 'Learning to turn down your inner spark at bedtime',
    synopsis: 'Finn is so excited to shine! Grandpa Firefly teaches him the bedtime secret: dimming your light into a cozy nightlight.',
    learningMilestone: 'Self-regulation & transitioning from high to low arousal',
    text: `In a quiet glade of tall blue wildflowers, lived a tiny, magical firefly named Finn. 
    Finn had delicate wings that fluttered like whispers, and a little spark in his tail that could glow as bright as a golden star. 
    Finn loved glowing! But sometimes at bedtime, his spark was so bright and excited that he couldn't settle down. 
    Grandpa Firefly hovered down beside him, resting on the velvety petal of an evening primrose flower. 
    "Listen carefully, little spark," Grandpa said with a warm, gentle hum. "Being bright is wonderful for daytime and twilight. But the night is a quiet blanket made for resting. Let us practice our bedtime dimming." 
    Grandpa showed Finn how to take a long, slow breath in... and as he blew out, Grandpa's bright light dimmed from sunny gold... to soft honey amber... to a tiny, gentle bedside candle glow. 
    Finn took a deep breath. He let his fluttering wings fold flat against his back. 
    He blew out a soft breath... and watched his little spark dim down to a cozy, sleepy nightlight. 
    It felt so peaceful and warm inside. 
    He tucked himself under the curve of a soft green leaf, closed his little eyes, and drifted into sweet starlit dreams.`
  },
  {
    id: 'penny-penguin',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Penny the Penguin & The Snow Lantern Cave',
    character: 'Penny Penguin',
    characterEmoji: '🐧',
    durationMinutes: 4,
    theme: 'Warmth & Emotional Safety',
    themeColor: '#0ea5e9',
    tagline: 'Cozy warmth in the center of the loving huddle',
    synopsis: 'Amidst the snowy hills, Penny snuggles into the very center of the warm penguin colony while northern lights dance across the sky.',
    learningMilestone: 'Emotional warmth & community connection',
    text: `Far away in the sparkling snowy lands, where emerald and violet northern lights danced quietly across the starry sky, lived a little emperor penguin chick named Penny. 
    Penny was covered in the fluffiest, softest grey down feathers you have ever seen. 
    All day long, Penny had slid on her tummy across smooth snow slides and splashed in the chilly blue sea with her penguin friends. 
    Now, the polar night was falling, crisp and quiet. 
    The penguin colony was gathering together for bedtime. 
    All the big penguins stepped close, forming a giant, loving circle called the Penguin Huddle. 
    Penny waddled into the very center of the huddle, where it was completely sheltered from the chilly wind, as warm and toasty as a bedtime hug. 
    Mama Penguin gently stepped forward, letting Penny rest her cold little feet right on top of Mama's warm feet, covered by Mama's warm feather blanket. 
    "You are in the warm center of our world, little Penny," Mama whispered softly. 
    Penny felt the steady, gentle swaying of the penguins around her, all breathing together in harmony. 
    Hush... and breathe... hush... and breathe... 
    Penny rested her fuzzy chin on Mama's chest, closed her eyes, and drifted into deep, cozy, winter dreams.`
  },
  {
    id: 'rory-panda',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-27%', pitch: '-4%', volume: '-6%' },
    title: 'Rory the Red Panda & The Bamboo Hammock',
    character: 'Rory Red Panda',
    characterEmoji: '🐼',
    durationMinutes: 4,
    theme: 'Releasing the Day’s Energy',
    themeColor: '#ef4444',
    tagline: 'Wrapping in a striped tail high in the misty mountains',
    synopsis: 'Rory stretches his reddish paws along a mossy branch, wraps his fluffy striped tail like a sleeping scarf, and snoozes.',
    learningMilestone: 'Physical comfort & somatic relaxation',
    text: `High on the misty slopes of the Cloud Mountains, where bamboo forests rustled in the cool breeze, lived a little red panda named Rory. 
    Rory had rusty red fur, white furry ears, and a magnificent, extra-fluffy ringed tail as long as his whole body. 
    Rory had spent the sunny afternoon climbing mossy tree branches, foraging for sweet bamboo shoots, and doing funny acrobatic tumbles. 
    Now, the evening mist was rolling in, wrapping the mountain in a soft, white cotton blanket. 
    Rory climbed up to his favorite sleeping perch: a sturdy, moss-covered horizontal branch of an ancient fir tree. 
    He lay down on his tummy, letting all four paws dangle loosely over the sides of the branch. 
    He gave one long, luxurious stretch: stretching his front paws forward... and his hind paws back... then letting every muscle melt like warm butter. 
    Then, he took his big, fluffy striped tail and curled it all the way around his nose, like the coziest furry scarf. 
    The breeze whispered softly through the bamboo leaves: shhh... shhh... shhh... 
    Rory took a slow, deep breath into his warm tail, let out a tiny, contented sigh, and drifted into peaceful, misty dreams.`
  },
  {
    id: 'rosie-deer',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Rosie the Fawn & The Twilight Glade',
    character: 'Rosie Deer',
    characterEmoji: '🦌',
    durationMinutes: 4,
    theme: 'Quiet Stillness & Peace',
    themeColor: '#ca8a04',
    tagline: 'Resting softly beside a quiet crystal brook',
    synopsis: 'Rosie folds her long slender legs and curls into dry fern leaves as evening wild roses close their petals for the night.',
    learningMilestone: 'Mindful stillness & transition to quietness',
    text: `In a quiet glade surrounded by whispering birch trees, lived a sweet little fawn named Rosie. 
    Rosie had a coat of soft golden-brown spotted with tiny white stars, and big, gentle brown eyes. 
    All day long, Rosie had scampered through fields of daisies, following Mama Deer through the sunny woodlands. 
    Now, the long shadows of the trees were melting into the peaceful twilight. 
    The wild roses along the brook were slowly folding their pink petals closed, getting ready to sleep until morning. 
    Mama Deer stepped into a sheltered hollow lined with dry, soft fern leaves. 
    "Come rest your long legs, little fawn," Mama whispered in a warm, gentle voice. 
    Rosie stepped softly into the ferns. 
    She folded her front legs, then her back legs, curling into a neat, round circle right beside Mama's warm flank. 
    Mama gently licked the top of Rosie's head, smoothing her soft spotted fur. 
    Nearby, the crystal brook murmured a continuous, peaceful lullaby over smooth stones: hush-a-bye... hush-a-bye... 
    Rosie felt completely safe and at peace. 
    She let her heavy chin sink down into the soft ferns, closed her gentle eyes, and fell sound asleep under the watching stars.`
  },
  {
    id: 'leo-lion',
    voice: 'en-US-GuyNeural',
    prosody: { rate: '-27%', pitch: '-4%', volume: '-6%' },
    title: 'Leo the Lion Cub & The Savanna Stars',
    character: 'Leo Lion',
    characterEmoji: '🦁',
    durationMinutes: 4,
    theme: 'Growing Rested & Strong',
    themeColor: '#f97316',
    tagline: 'Even the bravest little lions need deep rest to leap high',
    synopsis: 'Papa Lion teaches little Leo that sleep is where bravery and strength are built, curling onto the sun-warmed Pride Rock.',
    learningMilestone: 'Positive bedtime framing for energetic children',
    text: `On top of the great stone hill known as Pride Rock, looking out over the wide savanna, lived a brave little lion cub named Leo. 
    Leo had a golden furry coat, big paws that he hadn't grown into yet, and a tiny tuft of brown fur at the tip of his tail. 
    Leo had spent the whole day practicing his mighty pounces: leaping over logs, chasing grasshoppers, and giving his best baby roars: squeak-roar! 
    Now, the blazing savanna sun had turned into a gentle lavender sunset, and the warm rock beneath his paws was radiating cozy heat from the afternoon sun. 
    Leo gave a big yawn, showing his tiny white teeth, but he said, "Papa, I want to keep leaping!" 
    Papa Lion smiled with a deep, rumbling purr that rumbled like a warm thunderstorm. 
    "Even the strongest kings of the savanna must rest, little Leo," Papa explained gently. "When you sleep, your muscles grow stronger, your paws grow bigger, and your brave heart recharges for tomorrow's adventures." 
    Leo thought about that. He liked the idea of waking up even stronger. 
    He padded over to the warmest spot on the rock, right between Papa's big paws and Mama's warm belly. 
    He curled his paws under his chest and let out one huge, happy yawn. 
    The savanna stars blinked overhead like millions of tiny nightlights. 
    Leo closed his eyes, purred softly, and drifted into deep, powerful, restful sleep.`
  },
  {
    id: 'kiki-kitten',
    voice: 'en-US-JennyNeural',
    prosody: { rate: '-26%', pitch: '-3%', volume: '-6%' },
    title: 'Kiki the Kitten & The Cozy Wool Blanket',
    character: 'Kiki Kitten',
    characterEmoji: '🐱',
    durationMinutes: 4,
    theme: 'Softness & Pure Comfort',
    themeColor: '#ec4899',
    tagline: 'Kneading sleepy paws on a sun-warmed quilt',
    synopsis: 'Kiki finds the coziest woolen quilt by the hearth fire, kneading her soft paws until her rhythmic purr lulls her to sleep.',
    learningMilestone: 'Rhythmic relaxation & tactile soothing',
    text: `Inside a quiet, cozy cottage at the foot of the sleepy hills, lived an adorable little calico kitten named Kiki. 
    Kiki had patches of ginger, black, and white fur, and tiny velvet paws that were as soft as rose petals. 
    All day long, Kiki had batted at balls of colorful yarn, explored under armchairs, and looked out the window at singing bluebirds. 
    Now, the cottage was peaceful and dim. 
    In the stone hearth, a gentle fire crackled with a warm, steady glow, popping softly: snap... crackle... glow... 
    On the rocking chair was Kiki's favorite thing in the whole house: a thick, fluffy blanket made of soft knitted sheep's wool. 
    Kiki hopped up onto the chair. The wool was warm from the fire and smelled of sweet cedar and clean cotton. 
    Kiki began to knead the blanket with her front paws: press left... press right... press left... press right... 
    As she kneaded, a tiny motor started in her chest: purr... purr... purr... purr... 
    It was the happiest, most relaxing sound in the world. 
    She turned around three times, curled into a perfect little furry circle, and tucked her nose under her front paw. 
    The steady warmth of the blanket soaked into her sleepy fur. 
    Her purring grew slower... and softer... until Kiki was fast asleep in sweet, happy dreams.`
  }
];

async function generateAll() {
  console.log(`Synthesizing ${newStories.length} new bedtime stories with pediatric calming prosody (rate=-26% / -27%, clear diction)...`);
  const tts = new MsEdgeTTS();

  for (let i = 0; i < newStories.length; i++) {
    const story = newStories[i];
    const targetFile = path.join(storiesDir, `${story.id}.mp3`);

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 10000) {
      console.log(`[${i+1}/${newStories.length}] Already exists: ${story.id}.mp3 (${(fs.statSync(targetFile).size / 1024).toFixed(1)} KB) - skipping`);
      continue;
    }

    console.log(`\n[${i+1}/${newStories.length}] Synthesizing: ${story.title} (${story.voice})...`);
    await tts.setMetadata(story.voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

    const tempDir = path.join(storiesDir, `temp_${story.id}`);
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    fs.mkdirSync(tempDir, { recursive: true });

    try {
      await tts.toFile(tempDir, story.text, story.prosody);
      const generated = path.join(tempDir, 'audio.mp3');
      if (fs.existsSync(generated)) {
        fs.copyFileSync(generated, targetFile);
        const size = fs.statSync(targetFile).size;
        console.log(`✓ Saved ${story.id}.mp3 (${(size / 1024).toFixed(1)} KB)`);
      }
    } catch (err) {
      console.error(`Error generating ${story.id}:`, err);
    } finally {
      if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  console.log("\n✨ All stories generated in public/audio/stories!");
}

generateAll().catch(err => {
  console.error("Batch synthesis failed:", err);
  process.exit(1);
});
