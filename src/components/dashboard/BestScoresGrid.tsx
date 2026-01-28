import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star } from "lucide-react";

interface TestScore {
  id: string;
  test_type: string;
  level: number;
  correct_answers: number;
  total_questions: number;
  time_taken: number;
  passed: boolean;
  created_at: string;
}

interface BestScoresGridProps {
  scores: TestScore[];
}

const testTypes = [
  { id: "case-recognition", label: "Case Recognition", emoji: "🔤" },
  { id: "picture-word", label: "Picture to Word", emoji: "🖼️" },
  { id: "pronunciation", label: "Pronunciation", emoji: "🎤" },
];

export function BestScoresGrid({ scores }: BestScoresGridProps) {
  // Group best scores by test type and level
  const getBestScore = (testType: string, level: number) => {
    const levelScores = scores.filter(
      (s) => s.test_type === testType && s.level === level
    );
    if (levelScores.length === 0) return null;

    return levelScores.reduce((best, current) => {
      const currentAccuracy = current.correct_answers / current.total_questions;
      const bestAccuracy = best.correct_answers / best.total_questions;
      if (currentAccuracy > bestAccuracy) return current;
      if (currentAccuracy === bestAccuracy && current.time_taken < best.time_taken)
        return current;
      return best;
    });
  };

  if (scores.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-4xl mb-2">🏆</p>
        <p>Complete tests to see your best scores!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {testTypes.map((testType) => {
        const hasScores = scores.some((s) => s.test_type === testType.id);
        if (!hasScores) return null;

        return (
          <div key={testType.id}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span>{testType.emoji}</span>
              {testType.label}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((level) => {
                const best = getBestScore(testType.id, level);
                const accuracy = best
                  ? Math.round((best.correct_answers / best.total_questions) * 100)
                  : 0;
                const isPerfect = accuracy === 100;

                return (
                  <Card
                    key={level}
                    className={`${
                      best
                        ? isPerfect
                          ? "border-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20"
                          : best.passed
                          ? "border-success/30 bg-success/5"
                          : "border-muted"
                        : "border-dashed border-muted-foreground/30"
                    }`}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-sm font-medium">Level {level}</span>
                        {isPerfect && (
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      {best ? (
                        <>
                          <div className="text-2xl font-bold text-primary">
                            {accuracy}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {best.time_taken}s
                          </div>
                          {best.passed && (
                            <Badge
                              variant="outline"
                              className="mt-1 text-xs px-1.5 py-0"
                            >
                              <Trophy className="h-3 w-3 mr-1" />
                              Passed
                            </Badge>
                          )}
                        </>
                      ) : (
                        <div className="text-muted-foreground text-sm py-2">
                          Not attempted
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
