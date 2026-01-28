import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTestScores } from "@/hooks/useTestScores";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Clock, Target, TrendingUp } from "lucide-react";
import { TestHistoryTable } from "@/components/dashboard/TestHistoryTable";
import { BestScoresGrid } from "@/components/dashboard/BestScoresGrid";
import { PerformanceStats } from "@/components/dashboard/PerformanceStats";

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

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { getScores } = useTestScores();
  const [scores, setScores] = useState<TestScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchScores = async () => {
      if (user) {
        const { data, error } = await getScores();
        if (!error && data) {
          setScores(data as TestScore[]);
        }
        setLoading(false);
      }
    };
    fetchScores();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center">
        <div className="animate-bounce text-4xl">📊</div>
      </div>
    );
  }

  const totalTests = scores.length;
  const passedTests = scores.filter((s) => s.passed).length;
  const avgAccuracy = totalTests > 0
    ? Math.round(
        (scores.reduce((acc, s) => acc + (s.correct_answers / s.total_questions) * 100, 0) / totalTests)
      )
    : 0;
  const avgTime = totalTests > 0
    ? Math.round(scores.reduce((acc, s) => acc + s.time_taken, 0) / totalTests)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Progress Dashboard
            </h1>
            <p className="text-muted-foreground">Track your learning journey</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/80 backdrop-blur border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalTests}</p>
                <p className="text-xs text-muted-foreground">Tests Taken</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-success/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-success/10">
                <Trophy className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{passedTests}</p>
                <p className="text-xs text-muted-foreground">Tests Passed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-secondary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgAccuracy}%</p>
                <p className="text-xs text-muted-foreground">Avg Accuracy</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-accent/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <Clock className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgTime}s</p>
                <p className="text-xs text-muted-foreground">Avg Time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="best">Best Scores</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Test History</CardTitle>
              </CardHeader>
              <CardContent>
                <TestHistoryTable scores={scores} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="best">
            <Card>
              <CardHeader>
                <CardTitle>Best Scores by Test & Level</CardTitle>
              </CardHeader>
              <CardContent>
                <BestScoresGrid scores={scores} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Performance Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceStats scores={scores} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
