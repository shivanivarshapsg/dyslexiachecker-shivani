import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export const ProgressBar = ({ current, total, label, className }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">{label}</span>
          <span className="text-sm font-bold text-primary">{current}/{total}</span>
        </div>
      )}
      <div className="h-4 bg-muted rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full gradient-warm rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
