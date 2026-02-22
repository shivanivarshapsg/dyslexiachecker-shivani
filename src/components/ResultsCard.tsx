import { Button } from "./ui/button";
import { LevelResult, TestResult } from "@/types/test";
import { Trophy, Clock, Target, AlertCircle, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsCardProps {
  result: TestResult | null;
  levelResult?: LevelResult;
  isLevelComplete?: boolean;
  onContinue: () => void;
  onRetry?: () => void;
}

export const ResultsCard = ({
  result,
  levelResult,
  isLevelComplete,
  onContinue,
  onRetry,
}: ResultsCardProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Level completion view
  if (levelResult && isLevelComplete !== undefined) {
    const percentage = (levelResult.correctAnswers / levelResult.totalQuestions) * 100;
    return (
      <div className="w-full max-w-lg mx-auto animate-pop">
        <div className="bg-card rounded-3xl shadow-card p-8 text-center">
          {/* Trophy icon */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-success/20">
            <Trophy className="w-12 h-12 text-success animate-bounce-soft" />
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-2">
            Level Complete!
          </h2>
          <p className="text-muted-foreground mb-6">
            Great job! You're ready for the next level!
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-muted rounded-2xl p-4">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{formatTime(levelResult.timeTaken)}</p>
              <p className="text-xs text-muted-foreground">Time Taken</p>
            </div>
            <div className="bg-muted rounded-2xl p-4">
              <Target className="w-6 h-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{levelResult.correctAnswers}/{levelResult.totalQuestions}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="bg-muted rounded-2xl p-4">
              <AlertCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{Math.round(100 - percentage)}%</p>
              <p className="text-xs text-muted-foreground">Error Rate</p>
            </div>
          </div>

          <Button variant="success" size="lg" onClick={onContinue} className="w-full">
            Continue
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Full test results view
  if (result) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-pop">
        <div className="bg-card rounded-3xl shadow-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
              result.passed ? "bg-success/20" : "bg-accent/20"
            )}>
              <Trophy className={cn(
                "w-12 h-12",
                result.passed ? "text-success" : "text-accent"
              )} />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {result.testName} Complete!
            </h2>
            <p className="text-muted-foreground">
              {result.passed 
                ? "Excellent work! You've mastered this test!"
                : "Good effort! Keep practicing to improve!"}
            </p>
          </div>

          {/* Overall stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-muted rounded-2xl p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground">{formatTime(result.averageTime)}</p>
              <p className="text-sm text-muted-foreground">Average Time/Level</p>
            </div>
            <div className="bg-muted rounded-2xl p-6 text-center">
              <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground">{result.errorPercentage.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Error Rate</p>
            </div>
          </div>

          {/* Level breakdown */}
          <h3 className="text-xl font-bold text-foreground mb-4">Level Breakdown</h3>
          <div className="space-y-3 mb-8">
            {result.levels.map((level) => {
              const percentage = (level.correctAnswers / level.totalQuestions) * 100;
              return (
                <div key={level.level} className="bg-muted rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-foreground">Level {level.level}</span>
                    <span className={cn(
                      "text-sm font-bold px-2 py-1 rounded-full",
                      percentage >= 60 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                    )}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Time: {formatTime(level.timeTaken)}</span>
                    <span>Correct: {level.correctAnswers}/{level.totalQuestions}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Button variant="default" size="lg" onClick={onContinue} className="w-full">
            {result.passed ? "Continue to Next Test" : "Back to Home"}
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
