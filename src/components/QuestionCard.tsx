import { useState } from "react";
import { Button } from "./ui/button";
import { LevelItem } from "@/types/test";
import { cn } from "@/lib/utils";
import { Check, X, Volume2, Mic, MicOff } from "lucide-react";

interface QuestionCardProps {
  item: LevelItem;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  getImageEmoji: (word: string) => string;
}

export const QuestionCard = ({
  item,
  questionNumber,
  totalQuestions,
  onAnswer,
  getImageEmoji,
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState<string>("");

  const isCorrect = selectedAnswer === item.correctAnswer;

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(answer === item.correctAnswer);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1500);
  };

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word.toLowerCase());
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 3;

    let bestTranscript = "";
    let hasMatched = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const normalizeWord = (word: string) => {
      return word.toUpperCase().trim().replace(/[^A-Z]/g, '');
    };

    const normalizedCorrect = normalizeWord(item.correctAnswer);

    const finalize = (matched: boolean, displayText: string) => {
      if (hasMatched) return;
      hasMatched = true;
      if (timeoutId) clearTimeout(timeoutId);
      recognition.stop();
      setIsRecording(false);

      setTranscription(displayText);
      setSelectedAnswer(matched ? item.correctAnswer : displayText);
      setShowResult(true);

      setTimeout(() => {
        onAnswer(matched);
        setSelectedAnswer(null);
        setShowResult(false);
        setTranscription("");
      }, 2500);
    };

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscription("");
      // Auto-stop after 6 seconds if no match
      timeoutId = setTimeout(() => {
        if (!hasMatched) {
          finalize(false, bestTranscript || "No speech detected");
        }
      }, 6000);
    };

    recognition.onresult = (event: any) => {
      if (hasMatched) return;

      // Check ALL results and alternatives for a match
      for (let i = 0; i < event.results.length; i++) {
        for (let j = 0; j < event.results[i].length; j++) {
          const transcript = event.results[i][j].transcript;
          const normalized = normalizeWord(transcript);

          // Update best transcript with highest confidence final result
          if (event.results[i].isFinal && (!bestTranscript || event.results[i][j].confidence > 0.5)) {
            bestTranscript = transcript.toUpperCase().trim();
          }

          // Check if any alternative matches
          if (normalized === normalizedCorrect) {
            finalize(true, transcript.toUpperCase().trim());
            return;
          }
        }
      }

      // Show interim text as feedback
      const latestTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscription(latestTranscript.toUpperCase().trim());
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      if (!hasMatched) {
        finalize(false, bestTranscript || "Could not hear you");
      }
    };

    recognition.onend = () => {
      if (!hasMatched) {
        // If ended without match and we have a transcript, finalize
        if (bestTranscript) {
          finalize(false, bestTranscript);
        }
        setIsRecording(false);
      }
    };

    recognition.start();
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-pop">
      {/* Question header */}
      <div className="text-center mb-6">
        <span className="text-sm font-bold text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      {/* Question card */}
      <div className="bg-card rounded-3xl shadow-card p-6 sm:p-8">
        {/* Image for picture-word matching */}
        {item.type === "picture-word" && item.image && (
          <div className="text-center mb-6">
            <div className="text-8xl sm:text-9xl animate-float">
              {getImageEmoji(item.image)}
            </div>
          </div>
        )}

        {/* Question text */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
          {item.question}
        </h2>

        {/* Pronunciation test */}
        {item.type === "pronunciation" ? (
          <div className="text-center space-y-6">
            <div className="text-6xl sm:text-8xl font-bold text-primary mb-4 animate-float">
              {item.correctAnswer}
            </div>
            
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="lg"
              onClick={startRecording}
              disabled={showResult}
              className={cn(isRecording && "animate-pulse")}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-6 h-6 mr-2" />
                  Recording...
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6 mr-2" />
                  Say It!
                </>
              )}
            </Button>

            {transcription && (
              <div className={cn(
                "mt-4 p-4 rounded-2xl text-xl font-bold",
                showResult && isCorrect ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
              )}>
                You said: "{transcription}"
              </div>
            )}
          </div>
        ) : (
          /* Options grid for other question types */
          <div className="grid grid-cols-2 gap-4">
            {item.options.map((option, index) => (
              <Button
                key={index}
                variant="game"
                size="xl"
                onClick={() => handleSelectAnswer(option)}
                disabled={showResult}
                className={cn(
                  "h-20 text-2xl sm:text-3xl transition-all duration-300",
                  showResult && option === item.correctAnswer && "bg-success border-success text-success-foreground",
                  showResult && selectedAnswer === option && option !== item.correctAnswer && "bg-destructive border-destructive text-destructive-foreground animate-wiggle"
                )}
              >
                {option}
                {showResult && option === item.correctAnswer && (
                  <Check className="w-8 h-8 ml-2" />
                )}
                {showResult && selectedAnswer === option && option !== item.correctAnswer && (
                  <X className="w-8 h-8 ml-2" />
                )}
              </Button>
            ))}
          </div>
        )}

        {/* Result feedback */}
        {showResult && (
          <div
            className={cn(
              "mt-6 p-4 rounded-2xl text-center text-xl font-bold animate-pop",
              isCorrect ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            )}
          >
            {isCorrect ? "🎉 Great job!" : "😊 Keep trying!"}
          </div>
        )}
      </div>
    </div>
  );
};
