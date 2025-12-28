import { Check, Lock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelCardProps {
  level: number;
  isLocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

export const LevelCard = ({
  level,
  isLocked,
  isCompleted,
  isCurrent,
  onClick,
}: LevelCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
        "font-bold text-2xl shadow-card",
        isLocked && "bg-muted text-muted-foreground cursor-not-allowed opacity-60",
        isCompleted && "bg-success text-success-foreground",
        isCurrent && !isCompleted && "gradient-warm text-primary-foreground animate-bounce-soft shadow-glow",
        !isLocked && !isCompleted && !isCurrent && "bg-card text-foreground border-2 border-border hover:border-primary hover:shadow-soft"
      )}
    >
      {isLocked ? (
        <Lock className="w-8 h-8" />
      ) : isCompleted ? (
        <Check className="w-8 h-8" />
      ) : isCurrent ? (
        <Play className="w-8 h-8" />
      ) : (
        level
      )}
      
      {/* Level number badge */}
      <span
        className={cn(
          "absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold",
          isCompleted ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
        )}
      >
        {level}
      </span>
    </button>
  );
};
