import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestCard } from "@/components/TestCard";
import { Button } from "@/components/ui/button";
import { Type, Image, Mic, Sparkles, BookOpen, Trophy, ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  // In a real app, this would come from a database/localStorage
  const [progress] = useState({
    caseRecognition: { completed: 0, unlocked: true },
    pictureWord: { completed: 0, unlocked: true },
    pronunciation: { completed: 0, unlocked: true },
  });

  return (
    <div className="min-h-screen">
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
              Choose any test to begin your adventure!
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
