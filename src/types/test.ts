export interface LevelData {
  level: number;
  items: LevelItem[];
  timeLimit?: number;
}

export interface LevelItem {
  id: string;
  type: 'letter-match' | 'fill-blank' | 'picture-word' | 'pronunciation';
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string;
  audio?: string;
}

export interface LevelResult {
  level: number;
  timeTaken: number;
  correctAnswers: number;
  totalQuestions: number;
  errors: number;
}

export interface TestResult {
  testName: string;
  levels: LevelResult[];
  averageTime: number;
  totalErrors: number;
  errorPercentage: number;
  passed: boolean;
}

export interface ChildProgress {
  currentTest: number;
  currentLevel: number;
  results: TestResult[];
}
