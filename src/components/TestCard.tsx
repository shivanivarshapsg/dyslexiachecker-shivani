import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface TestCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: "warm" | "cool" | "sunny";
  completedLevels: number;
  totalLevels: number;
  isLocked: boolean;
  onClick: () => void;
}

export const TestCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  completedLevels,
  totalLevels,
  isLocked,
  onClick,
}: TestCardProps) => {
  const gradientClass = {
    warm: "gradient-warm",
    cool: "gradient-cool",
    sunny: "gradient-sunny",
  }[gradient];

  const isCompleted = completedLevels === totalLevels;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 transition-all duration-300",
        "bg-card shadow-card border border-border",
        !isLocked && "hover:shadow-glow hover:scale-[1.02]",
        isLocked && "opacity-60"
      )}
    >
      {/* Header with icon */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center",
            gradientClass
          )}
        >
          <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
        
        {isCompleted && (
          <span className="px-3 py-1 bg-success text-success-foreground text-sm font-bold rounded-full">
            Complete!
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-bold text-foreground">{completedLevels}/{totalLevels} levels</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", gradientClass)}
            style={{ width: `${(completedLevels / totalLevels) * 100}%` }}
          />
        </div>
      </div>

      {/* Action button */}
      <Button
        onClick={onClick}
        disabled={isLocked}
        variant={isLocked ? "outline" : "default"}
        className="w-full"
      >
        {isLocked ? "Complete previous test" : isCompleted ? "Review" : "Start Test"}
      </Button>
    </div>
  );
};
