import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LearningPhase } from "@/components/LearningPhase";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsCard } from "@/components/ResultsCard";
import { Timer } from "@/components/Timer";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { caseRecognitionData, pictureWordData, pronunciationData, learningContent } from "@/data/testData";
import { LevelResult, TestResult } from "@/types/test";
import { useUserResults } from "@/hooks/useUserResults";

type TestType = "case-recognition" | "picture-word" | "pronunciation";
type Phase = "learning" | "testing" | "level-result" | "test-result";

const testTitles: Record<TestType, string> = {
  "case-recognition": "Letter Recognition",
  "picture-word": "Picture Matching",
  "pronunciation": "Pronunciation",
};

// Emoji mappings for images
const imageEmojis: Record<string, string> = {
  // Level 1: 2-3 letter words
  cat: "🐱", dog: "🐶", sun: "☀️", cup: "☕", bed: "🛏️",
  // Level 2: 3-4 letter easy
  ball: "⚽", fish: "🐟", hat: "🎩", star: "⭐", cake: "🎂",
  // Level 3: 3-4 letter harder
  frog: "🐸", bird: "🐦", moon: "🌙", tree: "🌳", book: "📚",
  // Level 4: 4-5 letter easy
  apple: "🍎", house: "🏠", heart: "❤️", flower: "🌸", cloud: "☁️",
  // Level 5: Slightly harder
  tiger: "🐯", rabbit: "🐰", rainbow: "🌈", banana: "🍌", orange: "🍊",
  // Uppercase versions
  CAT: "🐱", DOG: "🐶", SUN: "☀️", CUP: "☕", BED: "🛏️",
  BALL: "⚽", FISH: "🐟", HAT: "🎩", STAR: "⭐", CAKE: "🎂",
  FROG: "🐸", BIRD: "🐦", MOON: "🌙", TREE: "🌳", BOOK: "📚",
  APPLE: "🍎", HOUSE: "🏠", HEART: "❤️", FLOWER: "🌸", CLOUD: "☁️",
  TIGER: "🐯", RABBIT: "🐰", RAINBOW: "🌈", BANANA: "🍌", ORANGE: "🍊",
  HAPPY: "😊",
};

const getImageEmoji = (key: string): string => {
  return imageEmojis[key] || imageEmojis[key.toUpperCase()] || "❓";
};

export default function TestScreen() {
  const navigate = useNavigate();
  const { testType } = useParams<{ testType: TestType }>();
  const { updatePictureMatching, updateLetterRecognition, updatePronunciation, updateOverallRiskScore, getUserResults } = useUserResults();
  
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [phase, setPhase] = useState<Phase>("learning");
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [levelResults, setLevelResults] = useState<LevelResult[]>([]);
  const [currentLevelResult, setCurrentLevelResult] = useState<LevelResult | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Resume from the next incomplete level
  useEffect(() => {
    const fetchStartLevel = async () => {
      const { data } = await getUserResults();
      if (data) {
        let completed = 0;
        switch (testType) {
          case "case-recognition":
            completed = data.letter_recognition_tests_completed ?? 0;
            break;
          case "picture-word":
            completed = data.picture_matching_tests_completed ?? 0;
            break;
          case "pronunciation":
            completed = data.pronunciation_tests_completed ?? 0;
            break;
        }
        if (completed >= 5) {
          navigate("/");
          return;
        }
        setCurrentLevel(completed + 1);
      }
      setInitialLoading(false);
    };
    fetchStartLevel();
  }, [testType]);

  // Get test data based on type
  const getTestData = useCallback(() => {
    switch (testType) {
      case "case-recognition":
        return caseRecognitionData;
      case "picture-word":
        return pictureWordData;
      case "pronunciation":
        return pronunciationData;
      default:
        return caseRecognitionData;
    }
  }, [testType]);

  const getLearningContent = useCallback(() => {
    switch (testType) {
      case "case-recognition":
        return learningContent.caseRecognition[currentLevel - 1];
      case "picture-word":
        return learningContent.pictureWord[currentLevel - 1];
      case "pronunciation":
        return learningContent.pronunciation[currentLevel - 1];
      default:
        return learningContent.caseRecognition[currentLevel - 1];
    }
  }, [testType, currentLevel]);

  const testData = getTestData();
  const currentLevelData = testData[currentLevel - 1];
  const currentItem = currentLevelData?.items[currentQuestion];

  const handleLearningComplete = () => {
    setPhase("testing");
    setTimerRunning(true);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
  };

  // Save results to database based on test type
  const saveTestResults = async (finalCorrectAnswers: number, totalQuestions: number, timeTaken: number) => {
    const accuracy = (finalCorrectAnswers / totalQuestions) * 100;
    const errorRate = ((totalQuestions - finalCorrectAnswers) / totalQuestions) * 100;
    
    switch (testType) {
      case "picture-word":
        await updatePictureMatching({
          accuracy,
          avgTime: timeTaken,
        });
        break;
      case "case-recognition":
        await updateLetterRecognition({
          confusion: errorRate, // Confusion = error rate for letter matching
          avgTime: timeTaken,
        });
        break;
      case "pronunciation":
        // Calculate WPM based on total questions and time
        const wpm = totalQuestions > 0 && timeTaken > 0 ? (totalQuestions / timeTaken) * 60 : 0;
        await updatePronunciation({
          wpm,
          phonemeError: errorRate,
          riskScore: errorRate, // Higher error = higher risk
        });
        break;
    }
    
    // Update overall risk score after each test
    await updateOverallRiskScore();
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentQuestion < currentLevelData.items.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Level complete
      setTimerRunning(false);
      const finalCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;
      const result: LevelResult = {
        level: currentLevel,
        timeTaken: currentTime,
        correctAnswers: finalCorrectAnswers,
        totalQuestions: currentLevelData.items.length,
        errors: currentLevelData.items.length - finalCorrectAnswers,
      };
      setCurrentLevelResult(result);
      setPhase("level-result");
      
      // Save results to database
      saveTestResults(finalCorrectAnswers, currentLevelData.items.length, currentTime);
    }
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleLevelContinue = () => {
    if (currentLevelResult) {
      setLevelResults((prev) => [...prev, currentLevelResult]);
      
      if (currentLevel < 5) {
        setCurrentLevel((prev) => prev + 1);
        setPhase("learning");
        setCurrentQuestion(0);
        setCorrectAnswers(0);
        setCurrentTime(0);
      } else {
        setPhase("test-result");
      }
    }
  };

  const handleTestComplete = () => {
  navigate("/");
};

const openFlutterApp = () => {
  window.location.href = "dyslexiaapp://open";

  setTimeout(() => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.example.dygraphia_localization";
  }, 2000);
};

  const getTestResult = (): TestResult | null => {
    if (levelResults.length === 0 && !currentLevelResult) return null;
    
    const allResults = currentLevelResult 
      ? [...levelResults, currentLevelResult]
      : levelResults;
    
    const totalTime = allResults.reduce((sum, r) => sum + r.timeTaken, 0);
    const totalErrors = allResults.reduce((sum, r) => sum + r.errors, 0);
    const totalQuestions = allResults.reduce((sum, r) => sum + r.totalQuestions, 0);
    
    return {
      testName: testTitles[testType as TestType] || "Test",
      levels: allResults,
      averageTime: Math.round(totalTime / allResults.length),
      totalErrors,
      errorPercentage: (totalErrors / totalQuestions) * 100,
      passed: allResults.every((r) => (r.correctAnswers / r.totalQuestions) >= 0.6),
    };
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!testType || !currentLevelData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Test not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {testTitles[testType as TestType]}
              </h1>
              <p className="text-sm text-muted-foreground">Level {currentLevel} of 5</p>
            </div>
          </div>

          {phase === "testing" && (
            <Timer
              isRunning={timerRunning}
              onTimeUpdate={handleTimeUpdate}
            />
          )}
        </div>

        {phase === "testing" && (
          <div className="max-w-4xl mx-auto mt-4">
            <ProgressBar
              current={currentQuestion + 1}
              total={currentLevelData.items.length}
              label="Progress"
            />
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {phase === "learning" && (
          <LearningPhase
            testType={testType === "case-recognition" ? "caseRecognition" : testType === "picture-word" ? "pictureWord" : "pronunciation"}
            level={currentLevel}
            content={getLearningContent()}
            onComplete={handleLearningComplete}
            getImageEmoji={getImageEmoji}
          />
        )}

        {phase === "testing" && currentItem && (
          <div className="max-w-2xl mx-auto py-8">
            <QuestionCard
              key={currentItem.id}
              item={currentItem}
              questionNumber={currentQuestion + 1}
              totalQuestions={currentLevelData.items.length}
              onAnswer={handleAnswer}
              getImageEmoji={getImageEmoji}
            />
          </div>
        )}

        {phase === "level-result" && currentLevelResult && (
          <div className="py-8">
            <ResultsCard
              result={null}
              levelResult={currentLevelResult}
              isLevelComplete={true}
              onContinue={handleLevelContinue}
            />
          </div>
        )}

        {phase === "test-result" && (
  <div className="py-8 flex flex-col items-center gap-6">
    <ResultsCard
      result={getTestResult()}
      onContinue={handleTestComplete}
    />

    {testType === "pronunciation" && (
      <Button
        onClick={openFlutterApp}
        className="text-lg px-8 py-6"
      >
        Proceed to Mobile Analysis
      </Button>
    )}
  </div>
)}
      </main>
    </div>
  );
}
