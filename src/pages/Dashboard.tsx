import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserResults, UserResults } from "@/hooks/useUserResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Clock, Target, TrendingUp, AlertTriangle, Brain, Volume2, Image } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { getUserResults } = useUserResults();
  const [results, setResults] = useState<UserResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchResults = async () => {
      if (user) {
        const { data, error } = await getUserResults();
        if (!error && data) {
          setResults(data);
        }
        setLoading(false);
      }
    };
    fetchResults();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center">
        <div className="animate-bounce text-4xl">📊</div>
      </div>
    );
  }

  const totalTests = results ? 
    results.picture_matching_tests_completed + 
    results.letter_recognition_tests_completed + 
    results.pronunciation_tests_completed : 0;

  const getRiskLevel = (score: number) => {
    if (score < 30) return { label: "Low Risk", color: "text-success", bg: "bg-success" };
    if (score < 60) return { label: "Moderate Risk", color: "text-warning", bg: "bg-warning" };
    return { label: "High Risk", color: "text-destructive", bg: "bg-destructive" };
  };

  const overallRisk = getRiskLevel(results?.overall_risk_score || 0);

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

        {/* Overall Risk Score */}
        <Card className="mb-8 bg-card/80 backdrop-blur border-2" style={{ borderColor: `hsl(var(--${overallRisk.bg.replace('bg-', '')}))` }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${overallRisk.bg}/20`}>
                  <AlertTriangle className={`h-8 w-8 ${overallRisk.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Overall Assessment</h2>
                  <p className={`text-lg font-semibold ${overallRisk.color}`}>{overallRisk.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">{Math.round(results?.overall_risk_score || 0)}%</p>
                <p className="text-sm text-muted-foreground">Risk Score</p>
              </div>
            </div>
            <Progress value={results?.overall_risk_score || 0} className="mt-4 h-3" />
          </CardContent>
        </Card>

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
                <Image className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(results?.picture_matching_accuracy || 0)}%</p>
                <p className="text-xs text-muted-foreground">Picture Accuracy</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-secondary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(results?.letter_recognition_confusion || 0)}%</p>
                <p className="text-xs text-muted-foreground">Letter Confusion</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-accent/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <Volume2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(results?.pronunciation_wpm || 0)}</p>
                <p className="text-xs text-muted-foreground">Words/Min</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results Tabs */}
        <Tabs defaultValue="picture" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="picture">Picture Match</TabsTrigger>
            <TabsTrigger value="letter">Letters</TabsTrigger>
            <TabsTrigger value="pronunciation">Pronunciation</TabsTrigger>
          </TabsList>

          <TabsContent value="picture">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Picture Matching Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
                    <p className="text-3xl font-bold">{Math.round(results?.picture_matching_accuracy || 0)}%</p>
                    <Progress value={results?.picture_matching_accuracy || 0} className="mt-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Average Response Time</p>
                    <p className="text-3xl font-bold">{Math.round(results?.picture_matching_avg_time || 0)}s</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Tests Completed: {results?.picture_matching_tests_completed || 0}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="letter">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Letter Recognition Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Confusion Score</p>
                    <p className="text-3xl font-bold">{Math.round(results?.letter_recognition_confusion || 0)}%</p>
                    <Progress value={results?.letter_recognition_confusion || 0} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Average Time</p>
                    <p className="text-3xl font-bold">{Math.round(results?.letter_recognition_avg_time || 0)}s</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Tests Completed: {results?.letter_recognition_tests_completed || 0}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pronunciation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Pronunciation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Words Per Minute</p>
                    <p className="text-3xl font-bold">{Math.round(results?.pronunciation_wpm || 0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Phoneme Error Rate</p>
                    <p className="text-3xl font-bold">{Math.round(results?.pronunciation_phoneme_error || 0)}%</p>
                    <Progress value={results?.pronunciation_phoneme_error || 0} className="mt-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Risk Score</p>
                    <p className="text-3xl font-bold">{Math.round(results?.pronunciation_risk_score || 0)}%</p>
                    <Progress value={results?.pronunciation_risk_score || 0} className="mt-2" />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Tests Completed: {results?.pronunciation_tests_completed || 0}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
