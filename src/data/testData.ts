import { LevelData } from '@/types/test';

// Test 1: Case Recognition & Spelling
export const caseRecognitionData: LevelData[] = [
  {
    level: 1,
    items: [
      { id: '1-1', type: 'letter-match', question: 'Match the uppercase letter: A', options: ['a', 'b', 'c', 'd'], correctAnswer: 'a' },
      { id: '1-2', type: 'letter-match', question: 'Match the uppercase letter: B', options: ['d', 'b', 'a', 'c'], correctAnswer: 'b' },
      { id: '1-3', type: 'fill-blank', question: 'C_T (animal that meows)', options: ['A', 'O', 'U', 'E'], correctAnswer: 'A' },
      { id: '1-4', type: 'letter-match', question: 'Match the lowercase letter: d', options: ['B', 'D', 'P', 'Q'], correctAnswer: 'D' },
      { id: '1-5', type: 'fill-blank', question: 'D_G (animal that barks)', options: ['O', 'A', 'U', 'I'], correctAnswer: 'O' },
    ]
  },
  {
    level: 2,
    items: [
      { id: '2-1', type: 'letter-match', question: 'Match the uppercase letter: E', options: ['e', 'f', 'a', 'c'], correctAnswer: 'e' },
      { id: '2-2', type: 'fill-blank', question: 'F_SH (lives in water)', options: ['I', 'A', 'O', 'U'], correctAnswer: 'I' },
      { id: '2-3', type: 'letter-match', question: 'Match the lowercase letter: g', options: ['G', 'Q', 'C', 'O'], correctAnswer: 'G' },
      { id: '2-4', type: 'fill-blank', question: 'H_N (bird on farm)', options: ['E', 'A', 'I', 'O'], correctAnswer: 'E' },
      { id: '2-5', type: 'letter-match', question: 'Match the uppercase letter: I', options: ['l', 'i', 'j', 't'], correctAnswer: 'i' },
    ]
  },
  {
    level: 3,
    items: [
      { id: '3-1', type: 'fill-blank', question: 'B_RD (has wings)', options: ['I', 'E', 'A', 'O'], correctAnswer: 'I' },
      { id: '3-2', type: 'letter-match', question: 'Match the lowercase letter: k', options: ['K', 'X', 'Y', 'H'], correctAnswer: 'K' },
      { id: '3-3', type: 'fill-blank', question: 'L_ON (king of jungle)', options: ['I', 'E', 'A', 'O'], correctAnswer: 'I' },
      { id: '3-4', type: 'letter-match', question: 'Match the uppercase letter: M', options: ['n', 'm', 'w', 'u'], correctAnswer: 'm' },
      { id: '3-5', type: 'fill-blank', question: 'N_ST (bird home)', options: ['E', 'A', 'I', 'O'], correctAnswer: 'E' },
    ]
  },
  {
    level: 4,
    items: [
      { id: '4-1', type: 'letter-match', question: 'Match the uppercase letter: P', options: ['q', 'b', 'p', 'd'], correctAnswer: 'p' },
      { id: '4-2', type: 'fill-blank', question: 'R_IN (falls from sky)', options: ['A', 'E', 'I', 'O'], correctAnswer: 'A' },
      { id: '4-3', type: 'letter-match', question: 'Match the lowercase letter: s', options: ['S', 'Z', 'C', '5'], correctAnswer: 'S' },
      { id: '4-4', type: 'fill-blank', question: 'TR_E (has leaves)', options: ['E', 'A', 'I', 'O'], correctAnswer: 'E' },
      { id: '4-5', type: 'letter-match', question: 'Match the uppercase letter: W', options: ['w', 'm', 'v', 'u'], correctAnswer: 'w' },
    ]
  },
  {
    level: 5,
    items: [
      { id: '5-1', type: 'fill-blank', question: 'FL_WER (pretty plant)', options: ['O', 'A', 'E', 'I'], correctAnswer: 'O' },
      { id: '5-2', type: 'letter-match', question: 'Match the lowercase letter: q', options: ['Q', 'O', 'P', 'G'], correctAnswer: 'Q' },
      { id: '5-3', type: 'fill-blank', question: 'H_USE (where we live)', options: ['O', 'A', 'E', 'I'], correctAnswer: 'O' },
      { id: '5-4', type: 'letter-match', question: 'Match the uppercase letter: Z', options: ['s', 'z', 'n', 'x'], correctAnswer: 'z' },
      { id: '5-5', type: 'fill-blank', question: 'ST_R (shines at night)', options: ['A', 'E', 'I', 'O'], correctAnswer: 'A' },
    ]
  }
];

// Test 2: Picture to Word Matching
export const pictureWordData: LevelData[] = [
  {
    level: 1,
    items: [
      { id: 'p1-1', type: 'picture-word', question: 'What animal is this?', options: ['CAT', 'DOG', 'BIRD', 'FISH'], correctAnswer: 'CAT', image: 'cat' },
      { id: 'p1-2', type: 'picture-word', question: 'What animal is this?', options: ['CAT', 'DOG', 'COW', 'PIG'], correctAnswer: 'DOG', image: 'dog' },
      { id: 'p1-3', type: 'picture-word', question: 'What is this?', options: ['TREE', 'SUN', 'STAR', 'MOON'], correctAnswer: 'SUN', image: 'sun' },
      { id: 'p1-4', type: 'picture-word', question: 'What is this?', options: ['STAR', 'SUN', 'BALL', 'MOON'], correctAnswer: 'MOON', image: 'moon' },
      { id: 'p1-5', type: 'picture-word', question: 'What is this?', options: ['HOUSE', 'CAR', 'TREE', 'BIRD'], correctAnswer: 'TREE', image: 'tree' },
    ]
  },
  {
    level: 2,
    items: [
      { id: 'p2-1', type: 'picture-word', question: 'What animal is this?', options: ['FISH', 'BIRD', 'CAT', 'DOG'], correctAnswer: 'FISH', image: 'fish' },
      { id: 'p2-2', type: 'picture-word', question: 'What animal is this?', options: ['BIRD', 'FISH', 'BEE', 'FLY'], correctAnswer: 'BIRD', image: 'bird' },
      { id: 'p2-3', type: 'picture-word', question: 'What is this?', options: ['FLOWER', 'TREE', 'GRASS', 'LEAF'], correctAnswer: 'FLOWER', image: 'flower' },
      { id: 'p2-4', type: 'picture-word', question: 'What is this?', options: ['BALL', 'EGG', 'SUN', 'APPLE'], correctAnswer: 'BALL', image: 'ball' },
      { id: 'p2-5', type: 'picture-word', question: 'What is this?', options: ['APPLE', 'BALL', 'ORANGE', 'CHERRY'], correctAnswer: 'APPLE', image: 'apple' },
    ]
  },
  {
    level: 3,
    items: [
      { id: 'p3-1', type: 'picture-word', question: 'What is this?', options: ['HOUSE', 'TENT', 'CASTLE', 'HUT'], correctAnswer: 'HOUSE', image: 'house' },
      { id: 'p3-2', type: 'picture-word', question: 'What is this?', options: ['CAR', 'BUS', 'TRAIN', 'BIKE'], correctAnswer: 'CAR', image: 'car' },
      { id: 'p3-3', type: 'picture-word', question: 'What is this?', options: ['BOOK', 'BOX', 'BAG', 'BED'], correctAnswer: 'BOOK', image: 'book' },
      { id: 'p3-4', type: 'picture-word', question: 'What animal is this?', options: ['LION', 'TIGER', 'CAT', 'DOG'], correctAnswer: 'LION', image: 'lion' },
      { id: 'p3-5', type: 'picture-word', question: 'What is this?', options: ['STAR', 'MOON', 'SUN', 'CLOUD'], correctAnswer: 'STAR', image: 'star' },
    ]
  },
  {
    level: 4,
    items: [
      { id: 'p4-1', type: 'picture-word', question: 'What animal is this?', options: ['ELEPHANT', 'HIPPO', 'RHINO', 'BEAR'], correctAnswer: 'ELEPHANT', image: 'elephant' },
      { id: 'p4-2', type: 'picture-word', question: 'What is this?', options: ['RAINBOW', 'CLOUD', 'RAIN', 'SUN'], correctAnswer: 'RAINBOW', image: 'rainbow' },
      { id: 'p4-3', type: 'picture-word', question: 'What is this?', options: ['BUTTERFLY', 'BIRD', 'BEE', 'BAT'], correctAnswer: 'BUTTERFLY', image: 'butterfly' },
      { id: 'p4-4', type: 'picture-word', question: 'What animal is this?', options: ['FROG', 'FISH', 'SNAKE', 'TURTLE'], correctAnswer: 'FROG', image: 'frog' },
      { id: 'p4-5', type: 'picture-word', question: 'What is this?', options: ['UMBRELLA', 'HAT', 'CLOUD', 'RAIN'], correctAnswer: 'UMBRELLA', image: 'umbrella' },
    ]
  },
  {
    level: 5,
    items: [
      { id: 'p5-1', type: 'picture-word', question: 'What is this?', options: ['GUITAR', 'PIANO', 'DRUM', 'VIOLIN'], correctAnswer: 'GUITAR', image: 'guitar' },
      { id: 'p5-2', type: 'picture-word', question: 'What is this?', options: ['BICYCLE', 'CAR', 'TRAIN', 'PLANE'], correctAnswer: 'BICYCLE', image: 'bicycle' },
      { id: 'p5-3', type: 'picture-word', question: 'What animal is this?', options: ['PENGUIN', 'DUCK', 'CHICKEN', 'OWL'], correctAnswer: 'PENGUIN', image: 'penguin' },
      { id: 'p5-4', type: 'picture-word', question: 'What is this?', options: ['ROBOT', 'TOY', 'DOLL', 'CAR'], correctAnswer: 'ROBOT', image: 'robot' },
      { id: 'p5-5', type: 'picture-word', question: 'What is this?', options: ['ROCKET', 'PLANE', 'BALLOON', 'KITE'], correctAnswer: 'ROCKET', image: 'rocket' },
    ]
  }
];

// Test 3: Audio Pronunciation
export const pronunciationData: LevelData[] = [
  {
    level: 1,
    items: [
      { id: 'a1-1', type: 'pronunciation', question: 'Say this word: CAT', options: [], correctAnswer: 'CAT', audio: 'cat' },
      { id: 'a1-2', type: 'pronunciation', question: 'Say this word: DOG', options: [], correctAnswer: 'DOG', audio: 'dog' },
      { id: 'a1-3', type: 'pronunciation', question: 'Say this word: SUN', options: [], correctAnswer: 'SUN', audio: 'sun' },
      { id: 'a1-4', type: 'pronunciation', question: 'Say this word: BALL', options: [], correctAnswer: 'BALL', audio: 'ball' },
      { id: 'a1-5', type: 'pronunciation', question: 'Say this word: TREE', options: [], correctAnswer: 'TREE', audio: 'tree' },
    ]
  },
  {
    level: 2,
    items: [
      { id: 'a2-1', type: 'pronunciation', question: 'Say this word: FISH', options: [], correctAnswer: 'FISH', audio: 'fish' },
      { id: 'a2-2', type: 'pronunciation', question: 'Say this word: BIRD', options: [], correctAnswer: 'BIRD', audio: 'bird' },
      { id: 'a2-3', type: 'pronunciation', question: 'Say this word: FLOWER', options: [], correctAnswer: 'FLOWER', audio: 'flower' },
      { id: 'a2-4', type: 'pronunciation', question: 'Say this word: APPLE', options: [], correctAnswer: 'APPLE', audio: 'apple' },
      { id: 'a2-5', type: 'pronunciation', question: 'Say this word: HOUSE', options: [], correctAnswer: 'HOUSE', audio: 'house' },
    ]
  },
  {
    level: 3,
    items: [
      { id: 'a3-1', type: 'pronunciation', question: 'Say this word: ELEPHANT', options: [], correctAnswer: 'ELEPHANT', audio: 'elephant' },
      { id: 'a3-2', type: 'pronunciation', question: 'Say this word: BUTTERFLY', options: [], correctAnswer: 'BUTTERFLY', audio: 'butterfly' },
      { id: 'a3-3', type: 'pronunciation', question: 'Say this word: RAINBOW', options: [], correctAnswer: 'RAINBOW', audio: 'rainbow' },
      { id: 'a3-4', type: 'pronunciation', question: 'Say this word: UMBRELLA', options: [], correctAnswer: 'UMBRELLA', audio: 'umbrella' },
      { id: 'a3-5', type: 'pronunciation', question: 'Say this word: GUITAR', options: [], correctAnswer: 'GUITAR', audio: 'guitar' },
    ]
  },
  {
    level: 4,
    items: [
      { id: 'a4-1', type: 'pronunciation', question: 'Say this word: BEAUTIFUL', options: [], correctAnswer: 'BEAUTIFUL', audio: 'beautiful' },
      { id: 'a4-2', type: 'pronunciation', question: 'Say this word: CROCODILE', options: [], correctAnswer: 'CROCODILE', audio: 'crocodile' },
      { id: 'a4-3', type: 'pronunciation', question: 'Say this word: STRAWBERRY', options: [], correctAnswer: 'STRAWBERRY', audio: 'strawberry' },
      { id: 'a4-4', type: 'pronunciation', question: 'Say this word: HELICOPTER', options: [], correctAnswer: 'HELICOPTER', audio: 'helicopter' },
      { id: 'a4-5', type: 'pronunciation', question: 'Say this word: CATERPILLAR', options: [], correctAnswer: 'CATERPILLAR', audio: 'caterpillar' },
    ]
  },
  {
    level: 5,
    items: [
      { id: 'a5-1', type: 'pronunciation', question: 'Say this word: HIPPOPOTAMUS', options: [], correctAnswer: 'HIPPOPOTAMUS', audio: 'hippopotamus' },
      { id: 'a5-2', type: 'pronunciation', question: 'Say this word: ENCYCLOPEDIA', options: [], correctAnswer: 'ENCYCLOPEDIA', audio: 'encyclopedia' },
      { id: 'a5-3', type: 'pronunciation', question: 'Say this word: REFRIGERATOR', options: [], correctAnswer: 'REFRIGERATOR', audio: 'refrigerator' },
      { id: 'a5-4', type: 'pronunciation', question: 'Say this word: CATERPILLAR', options: [], correctAnswer: 'CATERPILLAR', audio: 'caterpillar' },
      { id: 'a5-5', type: 'pronunciation', question: 'Say this word: CHRYSANTHEMUM', options: [], correctAnswer: 'CHRYSANTHEMUM', audio: 'chrysanthemum' },
    ]
  }
];

// Learning content for each level
export const learningContent = {
  caseRecognition: [
    { level: 1, letters: ['A-a', 'B-b', 'C-c', 'D-d'], words: ['CAT', 'DOG'] },
    { level: 2, letters: ['E-e', 'F-f', 'G-g', 'H-h', 'I-i'], words: ['FISH', 'HEN'] },
    { level: 3, letters: ['J-j', 'K-k', 'L-l', 'M-m', 'N-n'], words: ['BIRD', 'LION', 'NEST'] },
    { level: 4, letters: ['O-o', 'P-p', 'Q-q', 'R-r', 'S-s', 'T-t'], words: ['RAIN', 'TREE'] },
    { level: 5, letters: ['U-u', 'V-v', 'W-w', 'X-x', 'Y-y', 'Z-z'], words: ['FLOWER', 'HOUSE', 'STAR'] },
  ],
  pictureWord: [
    { level: 1, words: ['CAT', 'DOG', 'SUN', 'MOON', 'TREE'] },
    { level: 2, words: ['FISH', 'BIRD', 'FLOWER', 'BALL', 'APPLE'] },
    { level: 3, words: ['HOUSE', 'CAR', 'BOOK', 'LION', 'STAR'] },
    { level: 4, words: ['ELEPHANT', 'RAINBOW', 'BUTTERFLY', 'FROG', 'UMBRELLA'] },
    { level: 5, words: ['GUITAR', 'BICYCLE', 'PENGUIN', 'ROBOT', 'ROCKET'] },
  ],
  pronunciation: [
    { level: 1, words: ['CAT', 'DOG', 'SUN', 'BALL', 'TREE'] },
    { level: 2, words: ['FISH', 'BIRD', 'FLOWER', 'APPLE', 'HOUSE'] },
    { level: 3, words: ['ELEPHANT', 'BUTTERFLY', 'RAINBOW', 'UMBRELLA', 'GUITAR'] },
    { level: 4, words: ['BEAUTIFUL', 'CROCODILE', 'STRAWBERRY', 'HELICOPTER', 'CATERPILLAR'] },
    { level: 5, words: ['HIPPOPOTAMUS', 'ENCYCLOPEDIA', 'REFRIGERATOR', 'CATERPILLAR', 'CHRYSANTHEMUM'] },
  ],
};
