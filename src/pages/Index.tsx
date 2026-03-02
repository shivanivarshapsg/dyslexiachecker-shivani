import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserResults } from "@/hooks/useUserResults";
import { TestCard } from "@/components/TestCard";
import { Button } from "@/components/ui/button";
import { Type, Image, Mic, Sparkles, BookOpen, Trophy, ChevronRight, LogIn, LogOut, User, BarChart3, Smartphone } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const { getUserResults } = useUserResults();
  
  const [allTestsDone, setAllTestsDone] = useState(false);
  const [progress, setProgress] = useState({
    caseRecognition: { completed: 0, unlocked: true },
    pictureWord: { completed: 0, unlocked: false },
    pronunciation: { completed: 0, unlocked: false },
  });

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      const { data } = await getUserResults();
      if (data) {
        const letterDone = (data.letter_recognition_tests_completed ?? 0) >= 5;
        const pictureDone = (data.picture_matching_tests_completed ?? 0) >= 5;
        const pronDone = (data.pronunciation_tests_completed ?? 0) >= 5;
        setAllTestsDone(letterDone && pictureDone && pronDone);
        setProgress({
          caseRecognition: { completed: data.letter_recognition_tests_completed ?? 0, unlocked: true },
          pictureWord: { completed: data.picture_matching_tests_completed ?? 0, unlocked: letterDone },
          pronunciation: { completed: data.pronunciation_tests_completed ?? 0, unlocked: pictureDone },
        });
      }
    };
    fetchProgress();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const openFlutterApp = async () => {
    const { data } = await getUserResults();
    const params = new URLSearchParams();
    
    if (data) {
      params.set("user_id", data.user_id || "");
      params.set("picture_matching_accuracy", String(data.picture_matching_accuracy ?? 0));
      params.set("picture_matching_avg_time", String(data.picture_matching_avg_time ?? 0));
      params.set("letter_recognition_confusion", String(data.letter_recognition_confusion ?? 0));
      params.set("letter_recognition_avg_time", String(data.letter_recognition_avg_time ?? 0));
      params.set("pronunciation_wpm", String(data.pronunciation_wpm ?? 0));
      params.set("pronunciation_phoneme_error", String(data.pronunciation_phoneme_error ?? 0));
      params.set("pronunciation_risk_score", String(data.pronunciation_risk_score ?? 0));
      params.set("overall_risk_score", String(data.overall_risk_score ?? 0));
      params.set("dyslexia_result", data.dyslexia_result || "");
    }

    window.location.href = `dyslexiaapp://open?${params.toString()}`;
    setTimeout(() => {
      window.location.href = "https://play.google.com/store/apps/details?id=com.example.dygraphia_localization";
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* User status bar */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-bold text-foreground">DyslexiCheck</span>
          </div>
          
          {!loading && (
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.email}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login / Sign Up
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hero section */}
      <header className="relative overflow-hidden px-4 py-12 sm:py-20">
        <div className="absolute inset-0 gradient-warm opacity-10" />
        <div className="absolute top-10 left-10 w-20 h-20 bg-accent/30 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-card mb-6 animate-pop">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="font-bold text-foreground">Fun Learning Adventure!</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground mb-4">
            DyslexiCheck
            <span className="block text-primary">for Kids</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Fun games and activities to help identify reading challenges early. 
            Learn letters, match pictures, and practice speaking!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="hero" 
              onClick={() => navigate("/test/case-recognition")}
              className="animate-bounce-soft"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              Start Learning
            </Button>
            {!user && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign Up to Save Progress
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Tests section */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Your Learning Path
            </h2>
            <p className="text-muted-foreground">
              Complete each test to unlock the next one!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <TestCard
              title="Letter Recognition"
              description="Match uppercase and lowercase letters, and fill in missing letters in words."
              icon={Type}
              gradient="warm"
              completedLevels={progress.caseRecognition.completed}
              totalLevels={5}
              isLocked={!progress.caseRecognition.unlocked}
              onClick={() => navigate("/test/case-recognition")}
            />

            <TestCard
              title="Picture Matching"
              description="Look at pictures and match them with the correct words."
              icon={Image}
              gradient="cool"
              completedLevels={progress.pictureWord.completed}
              totalLevels={5}
              isLocked={!progress.pictureWord.unlocked}
              onClick={() => navigate("/test/picture-word")}
            />

            <TestCard
              title="Pronunciation"
              description="Practice saying words correctly and check your pronunciation."
              icon={Mic}
              gradient="sunny"
              completedLevels={progress.pronunciation.completed}
              totalLevels={5}
              isLocked={!progress.pronunciation.unlocked}
              onClick={() => navigate("/test/pronunciation")}
            />
          </div>

          {allTestsDone && user && (
            <div className="mt-10 text-center animate-pop">
              <Button
                onClick={openFlutterApp}
                className="text-lg px-8 py-6 gap-2"
                variant="hero"
              >
                <Smartphone className="w-6 h-6" />
                Proceed to Mobile Analysis
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                All tests completed! Continue with handwriting analysis on the mobile app.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-12 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">
            How It Works
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">1. Learn First</h3>
              <p className="text-muted-foreground">
                Each level starts with a learning phase where you'll see and hear the words.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-cool rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">2. Take the Test</h3>
              <p className="text-muted-foreground">
                Answer questions about what you learned. Your time is tracked!
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-sunny rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">3. See Results</h3>
              <p className="text-muted-foreground">
                Get 60% or more correct to unlock the next level!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center">
        <p className="text-muted-foreground text-sm">
          Designed with ❤️ to help children learn and grow
        </p>
      </footer>
    </div>
  );
};

export default Index;
