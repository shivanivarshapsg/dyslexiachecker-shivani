import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface SaveScoreParams {
  testType: string;
  level: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  passed: boolean;
}

export function useTestScores() {
  const { user } = useAuth();

  const saveScore = async (params: SaveScoreParams) => {
    if (!user) {
      console.log("No user logged in, score not saved");
      return { error: new Error("Not authenticated") };
    }

    const { error } = await supabase.from("test_scores").insert({
      user_id: user.id,
      test_type: params.testType,
      level: params.level,
      correct_answers: params.correctAnswers,
      total_questions: params.totalQuestions,
      time_taken: params.timeTaken,
      passed: params.passed,
    });

    if (error) {
      console.error("Error saving score:", error);
    }

    return { error };
  };

  const getScores = async () => {
    if (!user) {
      return { data: null, error: new Error("Not authenticated") };
    }

    const { data, error } = await supabase
      .from("test_scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    return { data, error };
  };

  const getBestScores = async () => {
    if (!user) {
      return { data: null, error: new Error("Not authenticated") };
    }

    const { data, error } = await supabase
      .from("test_scores")
      .select("*")
      .eq("user_id", user.id)
      .eq("passed", true)
      .order("created_at", { ascending: false });

    return { data, error };
  };

  return { saveScore, getScores, getBestScores };
}
