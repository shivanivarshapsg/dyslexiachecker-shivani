import { LevelData, LevelItem } from '@/types/test';

// Utility function to shuffle an array (Fisher-Yates shuffle)
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to shuffle options in test items
export const shuffleTestItems = (data: LevelData[]): LevelData[] => {
  return data.map(level => ({
    ...level,
    items: shuffleArray(level.items.map(item => ({
      ...item,
      options: item.options.length > 0 ? shuffleArray(item.options) : item.options
    })))
  }));
};

// All 26 letters distributed across 5 levels (approximately 5-6 letters per level)
// Each question shows uppercase and asks for lowercase match (or vice versa)
const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Generate confusing distractors for each letter
const getDistractors = (letter: string, isUpperToLower: boolean): string[] => {
  const confusingPairs: Record<string, string[]> = {
    'A': ['a', 'e', 'o', 'u'],
    'B': ['b', 'd', 'p', 'q'],
    'C': ['c', 'o', 'e', 's'],
    'D': ['d', 'b', 'p', 'q'],
    'E': ['e', 'a', 'i', 'o'],
    'F': ['f', 't', 'l', 'i'],
    'G': ['g', 'q', 'p', 'j'],
    'H': ['h', 'n', 'm', 'u'],
    'I': ['i', 'l', 'j', 't'],
    'J': ['j', 'i', 'l', 'g'],
    'K': ['k', 'x', 'h', 'l'],
    'L': ['l', 'i', 't', 'j'],
    'M': ['m', 'n', 'w', 'h'],
    'N': ['n', 'm', 'h', 'u'],
    'O': ['o', 'c', 'e', 'a'],
    'P': ['p', 'b', 'd', 'q'],
    'Q': ['q', 'p', 'g', 'b'],
    'R': ['r', 'n', 'k', 'p'],
    'S': ['s', 'z', 'c', 'o'],
    'T': ['t', 'l', 'i', 'f'],
    'U': ['u', 'v', 'n', 'w'],
    'V': ['v', 'u', 'w', 'y'],
    'W': ['w', 'm', 'v', 'u'],
    'X': ['x', 'k', 'z', 'y'],
    'Y': ['y', 'v', 'u', 'g'],
    'Z': ['z', 's', 'x', 'n'],
  };
  
  const distractorsLower = confusingPairs[letter.toUpperCase()] || ['a', 'b', 'c', 'd'];
  
  if (isUpperToLower) {
    // Return lowercase options (correct answer is lowercase of the letter)
    return distractorsLower;
  } else {
    // Return uppercase options (correct answer is uppercase of the letter)
    return distractorsLower.map(l => l.toUpperCase());
  }
};

// Create letter matching items for each letter
const createLetterItems = (letters: string[], levelNum: number): LevelItem[] => {
  const items: LevelItem[] = [];
  
  letters.forEach((letter, index) => {
    // Alternate between uppercase-to-lowercase and lowercase-to-uppercase
    const isUpperToLower = index % 2 === 0;
    const questionLetter = isUpperToLower ? letter.toUpperCase() : letter.toLowerCase();
    const correctAnswer = isUpperToLower ? letter.toLowerCase() : letter.toUpperCase();
    const questionType = isUpperToLower ? 'uppercase' : 'lowercase';
    
    const distractors = getDistractors(letter, isUpperToLower);
    // Make sure correct answer is in options and we have exactly 4 options
    const optionsSet = new Set(distractors);
    optionsSet.add(correctAnswer);
    const optionsArray = Array.from(optionsSet).slice(0, 4);
    
    // Ensure we have exactly 4 options
    while (optionsArray.length < 4) {
      const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      const option = isUpperToLower ? randomLetter : randomLetter.toUpperCase();
      if (!optionsArray.includes(option)) {
        optionsArray.push(option);
      }
    }
    
    items.push({
      id: `${levelNum}-${index + 1}`,
      type: 'letter-match',
      question: `Match the ${questionType} letter: ${questionLetter}`,
      options: optionsArray,
      correctAnswer: correctAnswer,
    });
  });
  
  return items;
};

// Level 1: A-E (5 letters)
// Level 2: F-K (6 letters)
// Level 3: L-Q (6 letters)
// Level 4: R-V (5 letters)
// Level 5: W-Z (4 letters) + confusing pairs review (B/D, P/Q)

const level1Letters = ['A', 'B', 'C', 'D', 'E'];
const level2Letters = ['F', 'G', 'H', 'I', 'J', 'K'];
const level3Letters = ['L', 'M', 'N', 'O', 'P', 'Q'];
const level4Letters = ['R', 'S', 'T', 'U', 'V'];
const level5Letters = ['W', 'X', 'Y', 'Z'];

// Test 1: Complete Case Recognition (all 26 letters across 5 levels)
export const caseRecognitionData: LevelData[] = [
  {
    level: 1,
    items: createLetterItems(level1Letters, 1)
  },
  {
    level: 2,
    items: createLetterItems(level2Letters, 2)
  },
  {
    level: 3,
    items: createLetterItems(level3Letters, 3)
  },
  {
    level: 4,
    items: createLetterItems(level4Letters, 4)
  },
  {
    level: 5,
    items: createLetterItems(level5Letters, 5)
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

// Learning content for each level - updated for complete alphabet
export const learningContent = {
  caseRecognition: [
    { level: 1, letters: ['A-a', 'B-b', 'C-c', 'D-d', 'E-e'], words: [] },
    { level: 2, letters: ['F-f', 'G-g', 'H-h', 'I-i', 'J-j', 'K-k'], words: [] },
    { level: 3, letters: ['L-l', 'M-m', 'N-n', 'O-o', 'P-p', 'Q-q'], words: [] },
    { level: 4, letters: ['R-r', 'S-s', 'T-t', 'U-u', 'V-v'], words: [] },
    { level: 5, letters: ['W-w', 'X-x', 'Y-y', 'Z-z'], words: [] },
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
