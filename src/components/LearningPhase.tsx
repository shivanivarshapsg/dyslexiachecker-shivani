import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningPhaseProps {
  testType: "caseRecognition" | "pictureWord" | "pronunciation";
  level: number;
  content: {
    letters?: string[];
    words: string[];
  };
  onComplete: () => void;
  getImageEmoji: (word: string) => string;
}

export const LearningPhase = ({
  testType,
  level,
  content,
  onComplete,
  getImageEmoji,
}: LearningPhaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = testType === "caseRecognition" && content.letters 
    ? [...content.letters, ...content.words]
    : content.words;

  const isLetter = testType === "caseRecognition" && currentIndex < (content.letters?.length || 0);

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word.toLowerCase());
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItem = items[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-accent-foreground" />
            <span className="font-bold text-accent-foreground">Learning Time!</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Level {level} - Let's Learn!
          </h1>
          <p className="text-muted-foreground">
            Study these {isLetter ? "letters" : "words"} before the test
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {items.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-8"
                  : index < currentIndex
                  ? "bg-success"
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Content card */}
        <div className="bg-card rounded-3xl shadow-card p-8 sm:p-12 text-center mb-8 animate-pop">
          {testType === "pictureWord" || (testType === "pronunciation") ? (
            <>
              <div className="text-8xl sm:text-9xl mb-6 animate-float">
                {getImageEmoji(currentItem)}
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-4">
                {currentItem}
              </h2>
            </>
          ) : isLetter ? (
            <div className="py-8">
              <h2 className="text-6xl sm:text-8xl font-bold text-foreground mb-4 animate-float">
                {currentItem}
              </h2>
              <p className="text-xl text-muted-foreground">
                Uppercase and lowercase pair
              </p>
            </div>
          ) : (
            <>
              <div className="text-8xl sm:text-9xl mb-6 animate-float">
                {getImageEmoji(currentItem)}
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-4">
                {currentItem}
              </h2>
            </>
          )}

          {/* Speak button for pronunciation */}
          {(testType === "pronunciation" || !isLetter) && (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => speakWord(currentItem)}
              className="mt-4"
            >
              <Volume2 className="w-6 h-6 mr-2" />
              Listen
            </Button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            Previous
          </Button>

          <span className="text-lg font-bold text-muted-foreground">
            {currentIndex + 1} of {items.length}
          </span>

          {currentIndex === items.length - 1 ? (
            <Button variant="success" size="lg" onClick={onComplete}>
              Start Test!
            </Button>
          ) : (
            <Button variant="default" size="lg" onClick={handleNext}>
              Next
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
