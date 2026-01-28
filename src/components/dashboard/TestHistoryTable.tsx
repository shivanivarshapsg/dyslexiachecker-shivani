import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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

interface TestHistoryTableProps {
  scores: TestScore[];
}

const testTypeLabels: Record<string, string> = {
  "case-recognition": "Case Recognition",
  "picture-word": "Picture to Word",
  "pronunciation": "Pronunciation",
};

export function TestHistoryTable({ scores }: TestHistoryTableProps) {
  if (scores.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-4xl mb-2">📝</p>
        <p>No tests completed yet. Start practicing to see your history!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Test Type</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((score) => (
            <TableRow key={score.id}>
              <TableCell className="font-medium">
                {format(new Date(score.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {testTypeLabels[score.test_type] || score.test_type}
              </TableCell>
              <TableCell>Level {score.level}</TableCell>
              <TableCell>
                {score.correct_answers}/{score.total_questions}
                <span className="text-muted-foreground ml-1">
                  ({Math.round((score.correct_answers / score.total_questions) * 100)}%)
                </span>
              </TableCell>
              <TableCell>{score.time_taken}s</TableCell>
              <TableCell>
                <Badge variant={score.passed ? "default" : "secondary"}>
                  {score.passed ? "✓ Passed" : "Try Again"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
