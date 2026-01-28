import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

interface PerformanceStatsProps {
  scores: TestScore[];
}

const testTypes = [
  { id: "case-recognition", label: "Case Recognition", emoji: "🔤", color: "bg-primary" },
  { id: "picture-word", label: "Picture to Word", emoji: "🖼️", color: "bg-secondary" },
  { id: "pronunciation", label: "Pronunciation", emoji: "🎤", color: "bg-accent" },
];

export function PerformanceStats({ scores }: PerformanceStatsProps) {
  if (scores.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-4xl mb-2">📈</p>
        <p>Complete tests to see your performance statistics!</p>
      </div>
    );
  }

  // Calculate stats per test type
  const getTestTypeStats = (testType: string) => {
    const typeScores = scores.filter((s) => s.test_type === testType);
    if (typeScores.length === 0) return null;

    const totalQuestions = typeScores.reduce((acc, s) => acc + s.total_questions, 0);
    const totalCorrect = typeScores.reduce((acc, s) => acc + s.correct_answers, 0);
    const avgAccuracy = Math.round((totalCorrect / totalQuestions) * 100);
    const passRate = Math.round(
      (typeScores.filter((s) => s.passed).length / typeScores.length) * 100
    );
    const avgTime = Math.round(
      typeScores.reduce((acc, s) => acc + s.time_taken, 0) / typeScores.length
    );
    const levelsCompleted = new Set(
      typeScores.filter((s) => s.passed).map((s) => s.level)
    ).size;

    return {
      testsCompleted: typeScores.length,
      avgAccuracy,
      passRate,
      avgTime,
      levelsCompleted,
    };
  };

  // Overall improvement (compare first half to second half of tests)
  const halfIndex = Math.floor(scores.length / 2);
  const olderScores = scores.slice(halfIndex);
  const newerScores = scores.slice(0, halfIndex);

  const olderAvg =
    olderScores.length > 0
      ? olderScores.reduce(
          (acc, s) => acc + (s.correct_answers / s.total_questions) * 100,
          0
        ) / olderScores.length
      : 0;

  const newerAvg =
    newerScores.length > 0
      ? newerScores.reduce(
          (acc, s) => acc + (s.correct_answers / s.total_questions) * 100,
          0
        ) / newerScores.length
      : 0;

  const improvement = Math.round(newerAvg - olderAvg);

  return (
    <div className="space-y-6">
      {/* Improvement indicator */}
      {scores.length >= 4 && (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Overall Progress</h4>
                <p className="text-sm text-muted-foreground">
                  Comparing your recent tests to earlier ones
                </p>
              </div>
              <div
                className={`text-2xl font-bold ${
                  improvement >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {improvement >= 0 ? "+" : ""}
                {improvement}%
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats per test type */}
      <div className="grid gap-4 md:grid-cols-3">
        {testTypes.map((testType) => {
          const stats = getTestTypeStats(testType.id);
          if (!stats) return null;

          return (
            <Card key={testType.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{testType.emoji}</span>
                  <h4 className="font-semibold">{testType.label}</h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span className="font-medium">{stats.avgAccuracy}%</span>
                    </div>
                    <Progress value={stats.avgAccuracy} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pass Rate</span>
                      <span className="font-medium">{stats.passRate}%</span>
                    </div>
                    <Progress value={stats.passRate} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Levels Mastered</span>
                      <span className="font-medium">{stats.levelsCompleted}/5</span>
                    </div>
                    <Progress value={(stats.levelsCompleted / 5) * 100} className="h-2" />
                  </div>

                  <div className="pt-2 border-t text-sm text-muted-foreground">
                    <span>{stats.testsCompleted} tests</span>
                    <span className="mx-2">•</span>
                    <span>Avg {stats.avgTime}s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips based on performance */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">💡 Tips for Improvement</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {scores.some((s) => !s.passed) && (
              <li>• Practice levels you haven't passed yet to build confidence</li>
            )}
            {scores.length < 10 && (
              <li>• Keep practicing! More attempts help track your progress better</li>
            )}
            {improvement < 0 && (
              <li>• Take your time on each question for better accuracy</li>
            )}
            {improvement >= 10 && <li>• Great progress! Keep up the good work! 🌟</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
