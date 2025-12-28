import { LevelData } from '@/types/test';

// Test 1: Case Recognition & Spelling
// Level 1: 2-3 letter simple words
// Level 2: 3-4 letter easy words
// Level 3: 3-4 letter harder words
// Level 4: 4-5 letter easy words
// Level 5: Slightly harder than level 4

export const caseRecognitionData: LevelData[] = [
  {
    level: 1,
    items: [
      { id: '1-1', type: 'letter-match', question: 'Match the uppercase letter: A', options: ['a', 'b', 'c', 'd'], correctAnswer: 'a' },
      { id: '1-2', type: 'letter-match', question: 'Match the uppercase letter: B', options: ['d', 'b', 'a', 'c'], correctAnswer: 'b' },
      { id: '1-3', type: 'fill-blank', question: 'C_T (says meow)', options: ['A', 'O', 'U', 'E'], correctAnswer: 'A' },
      { id: '1-4', type: 'letter-match', question: 'Match the lowercase letter: d', options: ['B', 'D', 'P', 'Q'], correctAnswer: 'D' },
      { id: '1-5', type: 'fill-blank', question: 'D_G (says woof)', options: ['O', 'A', 'U', 'I'], correctAnswer: 'O' },
    ]
  },
  {
    level: 2,
    items: [
      { id: '2-1', type: 'letter-match', question: 'Match the uppercase letter: S', options: ['s', 'z', 'c', 'o'], correctAnswer: 's' },
      { id: '2-2', type: 'fill-blank', question: 'S_N (shines bright)', options: ['U', 'A', 'O', 'I'], correctAnswer: 'U' },
      { id: '2-3', type: 'letter-match', question: 'Match the lowercase letter: h', options: ['H', 'N', 'M', 'K'], correctAnswer: 'H' },
      { id: '2-4', type: 'fill-blank', question: 'H_T (on your head)', options: ['A', 'O', 'U', 'I'], correctAnswer: 'A' },
      { id: '2-5', type: 'fill-blank', question: 'C_P (for drinking)', options: ['U', 'A', 'O', 'I'], correctAnswer: 'U' },
    ]
  },
  {
    level: 3,
    items: [
      { id: '3-1', type: 'fill-blank', question: 'FR_G (says ribbit)', options: ['O', 'A', 'U', 'I'], correctAnswer: 'O' },
      { id: '3-2', type: 'letter-match', question: 'Match the lowercase letter: p', options: ['P', 'B', 'D', 'Q'], correctAnswer: 'P' },
      { id: '3-3', type: 'fill-blank', question: 'ST_R (twinkles at night)', options: ['A', 'E', 'O', 'U'], correctAnswer: 'A' },
      { id: '3-4', type: 'letter-match', question: 'Match the uppercase letter: M', options: ['n', 'm', 'w', 'u'], correctAnswer: 'm' },
      { id: '3-5', type: 'fill-blank', question: 'F_SH (swims in water)', options: ['I', 'A', 'O', 'U'], correctAnswer: 'I' },
    ]
  },
  {
    level: 4,
    items: [
      { id: '4-1', type: 'letter-match', question: 'Match the uppercase letter: T', options: ['t', 'l', 'i', 'f'], correctAnswer: 't' },
      { id: '4-2', type: 'fill-blank', question: 'M_ON (in the sky at night)', options: ['O', 'A', 'U', 'I'], correctAnswer: 'O' },
      { id: '4-3', type: 'letter-match', question: 'Match the lowercase letter: r', options: ['R', 'P', 'K', 'N'], correctAnswer: 'R' },
      { id: '4-4', type: 'fill-blank', question: 'TR_E (has leaves)', options: ['E', 'A', 'I', 'O'], correctAnswer: 'E' },
      { id: '4-5', type: 'fill-blank', question: 'B_RD (has wings)', options: ['I', 'A', 'O', 'U'], correctAnswer: 'I' },
    ]
  },
  {
    level: 5,
    items: [
      { id: '5-1', type: 'fill-blank', question: 'H_USE (where we live)', options: ['O', 'A', 'E', 'I'], correctAnswer: 'O' },
      { id: '5-2', type: 'letter-match', question: 'Match the lowercase letter: g', options: ['G', 'Q', 'P', 'D'], correctAnswer: 'G' },
      { id: '5-3', type: 'fill-blank', question: 'APP_E (red fruit)', options: ['L', 'R', 'N', 'M'], correctAnswer: 'L' },
      { id: '5-4', type: 'letter-match', question: 'Match the uppercase letter: W', options: ['w', 'm', 'v', 'u'], correctAnswer: 'w' },
      { id: '5-5', type: 'fill-blank', question: 'H_PPY (when you smile)', options: ['A', 'E', 'I', 'O'], correctAnswer: 'A' },
    ]
  }
];

// Test 2: Picture to Word Matching
export const pictureWordData: LevelData[] = [
  {
    level: 1,
    // 2-3 letter words: cat, dog, sun, cup, bed
    items: [
      { id: 'p1-1', type: 'picture-word', question: 'What is this?', options: ['CAT', 'DOG', 'COW', 'PIG'], correctAnswer: 'CAT', image: 'cat' },
      { id: 'p1-2', type: 'picture-word', question: 'What is this?', options: ['DOG', 'CAT', 'COW', 'PIG'], correctAnswer: 'DOG', image: 'dog' },
      { id: 'p1-3', type: 'picture-word', question: 'What is this?', options: ['SUN', 'CUP', 'HAT', 'BED'], correctAnswer: 'SUN', image: 'sun' },
      { id: 'p1-4', type: 'picture-word', question: 'What is this?', options: ['CUP', 'MUG', 'JAR', 'POT'], correctAnswer: 'CUP', image: 'cup' },
      { id: 'p1-5', type: 'picture-word', question: 'What is this?', options: ['BED', 'COT', 'MAT', 'RUG'], correctAnswer: 'BED', image: 'bed' },
    ]
  },
  {
    level: 2,
    // 3-4 letter easy words: ball, fish, hat, star, cake
    items: [
      { id: 'p2-1', type: 'picture-word', question: 'What is this?', options: ['BALL', 'BELL', 'BULL', 'BILL'], correctAnswer: 'BALL', image: 'ball' },
      { id: 'p2-2', type: 'picture-word', question: 'What is this?', options: ['FISH', 'DISH', 'WISH', 'BIRD'], correctAnswer: 'FISH', image: 'fish' },
      { id: 'p2-3', type: 'picture-word', question: 'What is this?', options: ['HAT', 'CAT', 'BAT', 'RAT'], correctAnswer: 'HAT', image: 'hat' },
      { id: 'p2-4', type: 'picture-word', question: 'What is this?', options: ['STAR', 'MOON', 'SUN', 'BALL'], correctAnswer: 'STAR', image: 'star' },
      { id: 'p2-5', type: 'picture-word', question: 'What is this?', options: ['CAKE', 'BAKE', 'LAKE', 'MAKE'], correctAnswer: 'CAKE', image: 'cake' },
    ]
  },
  {
    level: 3,
    // 3-4 letter harder words: frog, bird, moon, tree, book
    items: [
      { id: 'p3-1', type: 'picture-word', question: 'What is this?', options: ['FROG', 'FLOG', 'FRIG', 'FRAG'], correctAnswer: 'FROG', image: 'frog' },
      { id: 'p3-2', type: 'picture-word', question: 'What is this?', options: ['BIRD', 'WORD', 'HERD', 'NERD'], correctAnswer: 'BIRD', image: 'bird' },
      { id: 'p3-3', type: 'picture-word', question: 'What is this?', options: ['MOON', 'NOON', 'SOON', 'BOON'], correctAnswer: 'MOON', image: 'moon' },
      { id: 'p3-4', type: 'picture-word', question: 'What is this?', options: ['TREE', 'FREE', 'THEE', 'KNEE'], correctAnswer: 'TREE', image: 'tree' },
      { id: 'p3-5', type: 'picture-word', question: 'What is this?', options: ['BOOK', 'LOOK', 'COOK', 'HOOK'], correctAnswer: 'BOOK', image: 'book' },
    ]
  },
  {
    level: 4,
    // 4-5 letter easy words: apple, house, heart, flower, cloud
    items: [
      { id: 'p4-1', type: 'picture-word', question: 'What is this?', options: ['APPLE', 'MAPLE', 'GRAPE', 'SHAPE'], correctAnswer: 'APPLE', image: 'apple' },
      { id: 'p4-2', type: 'picture-word', question: 'What is this?', options: ['HOUSE', 'MOUSE', 'HORSE', 'HOUND'], correctAnswer: 'HOUSE', image: 'house' },
      { id: 'p4-3', type: 'picture-word', question: 'What is this?', options: ['HEART', 'EARTH', 'SMART', 'START'], correctAnswer: 'HEART', image: 'heart' },
      { id: 'p4-4', type: 'picture-word', question: 'What is this?', options: ['FLOWER', 'SHOWER', 'TOWER', 'POWER'], correctAnswer: 'FLOWER', image: 'flower' },
      { id: 'p4-5', type: 'picture-word', question: 'What is this?', options: ['CLOUD', 'CLOWN', 'CROWD', 'PROUD'], correctAnswer: 'CLOUD', image: 'cloud' },
    ]
  },
  {
    level: 5,
    // Slightly harder: tiger, rabbit, rainbow, banana, orange
    items: [
      { id: 'p5-1', type: 'picture-word', question: 'What is this?', options: ['TIGER', 'LIGER', 'RIDER', 'CIDER'], correctAnswer: 'TIGER', image: 'tiger' },
      { id: 'p5-2', type: 'picture-word', question: 'What is this?', options: ['RABBIT', 'HOBBIT', 'RIBBIT', 'BOBBIT'], correctAnswer: 'RABBIT', image: 'rabbit' },
      { id: 'p5-3', type: 'picture-word', question: 'What is this?', options: ['RAINBOW', 'ELBOW', 'WINDOW', 'PILLOW'], correctAnswer: 'RAINBOW', image: 'rainbow' },
      { id: 'p5-4', type: 'picture-word', question: 'What is this?', options: ['BANANA', 'CABANA', 'IGUANA', 'NIRVANA'], correctAnswer: 'BANANA', image: 'banana' },
      { id: 'p5-5', type: 'picture-word', question: 'What is this?', options: ['ORANGE', 'CHANGE', 'RANGE', 'STRANGE'], correctAnswer: 'ORANGE', image: 'orange' },
    ]
  }
];

// Test 3: Audio Pronunciation
export const pronunciationData: LevelData[] = [
  {
    level: 1,
    // 2-3 letter simple words
    items: [
      { id: 'a1-1', type: 'pronunciation', question: 'Say this word: CAT', options: [], correctAnswer: 'CAT', audio: 'cat' },
      { id: 'a1-2', type: 'pronunciation', question: 'Say this word: DOG', options: [], correctAnswer: 'DOG', audio: 'dog' },
      { id: 'a1-3', type: 'pronunciation', question: 'Say this word: SUN', options: [], correctAnswer: 'SUN', audio: 'sun' },
      { id: 'a1-4', type: 'pronunciation', question: 'Say this word: CUP', options: [], correctAnswer: 'CUP', audio: 'cup' },
      { id: 'a1-5', type: 'pronunciation', question: 'Say this word: BED', options: [], correctAnswer: 'BED', audio: 'bed' },
    ]
  },
  {
    level: 2,
    // 3-4 letter easy words
    items: [
      { id: 'a2-1', type: 'pronunciation', question: 'Say this word: BALL', options: [], correctAnswer: 'BALL', audio: 'ball' },
      { id: 'a2-2', type: 'pronunciation', question: 'Say this word: FISH', options: [], correctAnswer: 'FISH', audio: 'fish' },
      { id: 'a2-3', type: 'pronunciation', question: 'Say this word: STAR', options: [], correctAnswer: 'STAR', audio: 'star' },
      { id: 'a2-4', type: 'pronunciation', question: 'Say this word: CAKE', options: [], correctAnswer: 'CAKE', audio: 'cake' },
      { id: 'a2-5', type: 'pronunciation', question: 'Say this word: HAT', options: [], correctAnswer: 'HAT', audio: 'hat' },
    ]
  },
  {
    level: 3,
    // 3-4 letter harder words
    items: [
      { id: 'a3-1', type: 'pronunciation', question: 'Say this word: FROG', options: [], correctAnswer: 'FROG', audio: 'frog' },
      { id: 'a3-2', type: 'pronunciation', question: 'Say this word: BIRD', options: [], correctAnswer: 'BIRD', audio: 'bird' },
      { id: 'a3-3', type: 'pronunciation', question: 'Say this word: MOON', options: [], correctAnswer: 'MOON', audio: 'moon' },
      { id: 'a3-4', type: 'pronunciation', question: 'Say this word: TREE', options: [], correctAnswer: 'TREE', audio: 'tree' },
      { id: 'a3-5', type: 'pronunciation', question: 'Say this word: BOOK', options: [], correctAnswer: 'BOOK', audio: 'book' },
    ]
  },
  {
    level: 4,
    // 4-5 letter easy words
    items: [
      { id: 'a4-1', type: 'pronunciation', question: 'Say this word: APPLE', options: [], correctAnswer: 'APPLE', audio: 'apple' },
      { id: 'a4-2', type: 'pronunciation', question: 'Say this word: HOUSE', options: [], correctAnswer: 'HOUSE', audio: 'house' },
      { id: 'a4-3', type: 'pronunciation', question: 'Say this word: HEART', options: [], correctAnswer: 'HEART', audio: 'heart' },
      { id: 'a4-4', type: 'pronunciation', question: 'Say this word: FLOWER', options: [], correctAnswer: 'FLOWER', audio: 'flower' },
      { id: 'a4-5', type: 'pronunciation', question: 'Say this word: CLOUD', options: [], correctAnswer: 'CLOUD', audio: 'cloud' },
    ]
  },
  {
    level: 5,
    // Slightly harder 5-6 letter words
    items: [
      { id: 'a5-1', type: 'pronunciation', question: 'Say this word: TIGER', options: [], correctAnswer: 'TIGER', audio: 'tiger' },
      { id: 'a5-2', type: 'pronunciation', question: 'Say this word: RABBIT', options: [], correctAnswer: 'RABBIT', audio: 'rabbit' },
      { id: 'a5-3', type: 'pronunciation', question: 'Say this word: RAINBOW', options: [], correctAnswer: 'RAINBOW', audio: 'rainbow' },
      { id: 'a5-4', type: 'pronunciation', question: 'Say this word: BANANA', options: [], correctAnswer: 'BANANA', audio: 'banana' },
      { id: 'a5-5', type: 'pronunciation', question: 'Say this word: ORANGE', options: [], correctAnswer: 'ORANGE', audio: 'orange' },
    ]
  }
];

// Learning content for each level - matches the test words
export const learningContent = {
  caseRecognition: [
    { level: 1, letters: ['A-a', 'B-b', 'C-c', 'D-d'], words: ['CAT', 'DOG'] },
    { level: 2, letters: ['S-s', 'H-h', 'U-u', 'C-c', 'P-p'], words: ['SUN', 'HAT', 'CUP'] },
    { level: 3, letters: ['F-f', 'R-r', 'O-o', 'G-g', 'P-p', 'M-m'], words: ['FROG', 'STAR', 'FISH'] },
    { level: 4, letters: ['T-t', 'R-r', 'E-e', 'I-i', 'B-b'], words: ['MOON', 'TREE', 'BIRD'] },
    { level: 5, letters: ['H-h', 'O-o', 'U-u', 'S-s', 'E-e', 'W-w', 'G-g'], words: ['HOUSE', 'APPLE', 'HAPPY'] },
  ],
  pictureWord: [
    { level: 1, words: ['CAT', 'DOG', 'SUN', 'CUP', 'BED'] },
    { level: 2, words: ['BALL', 'FISH', 'HAT', 'STAR', 'CAKE'] },
    { level: 3, words: ['FROG', 'BIRD', 'MOON', 'TREE', 'BOOK'] },
    { level: 4, words: ['APPLE', 'HOUSE', 'HEART', 'FLOWER', 'CLOUD'] },
    { level: 5, words: ['TIGER', 'RABBIT', 'RAINBOW', 'BANANA', 'ORANGE'] },
  ],
  pronunciation: [
    { level: 1, words: ['CAT', 'DOG', 'SUN', 'CUP', 'BED'] },
    { level: 2, words: ['BALL', 'FISH', 'STAR', 'CAKE', 'HAT'] },
    { level: 3, words: ['FROG', 'BIRD', 'MOON', 'TREE', 'BOOK'] },
    { level: 4, words: ['APPLE', 'HOUSE', 'HEART', 'FLOWER', 'CLOUD'] },
    { level: 5, words: ['TIGER', 'RABBIT', 'RAINBOW', 'BANANA', 'ORANGE'] },
  ],
};
