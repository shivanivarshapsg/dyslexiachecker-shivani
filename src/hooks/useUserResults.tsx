import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UserResults {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  
  // Picture Matching metrics
  picture_matching_accuracy: number;
  picture_matching_avg_time: number;
  picture_matching_tests_completed: number;
  
  // Letter Recognition metrics
  letter_recognition_confusion: number;
  letter_recognition_avg_time: number;
  letter_recognition_tests_completed: number;
  
  // Pronunciation metrics
  pronunciation_wpm: number;
  pronunciation_phoneme_error: number;
  pronunciation_risk_score: number;
  pronunciation_tests_completed: number;
  
  // Overall
  overall_risk_score: number;
}

interface UpdatePictureMatchingParams {
  accuracy: number;
  avgTime: number;
}

interface UpdateLetterRecognitionParams {
  confusion: number;
  avgTime: number;
}

interface UpdatePronunciationParams {
  wpm: number;
  phonemeError: number;
  riskScore: number;
}

export function useUserResults() {
  const { user } = useAuth();

  const getOrCreateUserResults = async (): Promise<UserResults | null> => {
    if (!user) return null;

    // Try to get existing results
    const { data: existing, error: fetchError } = await supabase
      .from("user_results")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) return existing as UserResults;

    // Create new results row if doesn't exist
    const { data: newResults, error: insertError } = await supabase
      .from("user_results")
      .insert({ user_id: user.id })
      .select()
      .single();

    if (insertError) {
      console.error("Error creating user results:", insertError);
      return null;
    }

    return newResults as UserResults;
  };

  const getUserResults = async (): Promise<{ data: UserResults | null; error: Error | null }> => {
    if (!user) {
      return { data: null, error: new Error("Not authenticated") };
    }

    const results = await getOrCreateUserResults();
    return { data: results, error: results ? null : new Error("Failed to fetch results") };
  };

  const updatePictureMatching = async (params: UpdatePictureMatchingParams) => {
    if (!user) return { error: new Error("Not authenticated") };

    const current = await getOrCreateUserResults();
    if (!current) return { error: new Error("Failed to get current results") };

    const testsCompleted = current.picture_matching_tests_completed + 1;
    
    // Calculate running average
    const newAccuracy = ((current.picture_matching_accuracy * current.picture_matching_tests_completed) + params.accuracy) / testsCompleted;
    const newAvgTime = ((current.picture_matching_avg_time * current.picture_matching_tests_completed) + params.avgTime) / testsCompleted;

    const { error } = await supabase
      .from("user_results")
      .update({
        picture_matching_accuracy: newAccuracy,
        picture_matching_avg_time: newAvgTime,
        picture_matching_tests_completed: testsCompleted,
      })
      .eq("user_id", user.id);

    if (error) console.error("Error updating picture matching:", error);
    return { error };
  };

  const updateLetterRecognition = async (params: UpdateLetterRecognitionParams) => {
    if (!user) return { error: new Error("Not authenticated") };

    const current = await getOrCreateUserResults();
    if (!current) return { error: new Error("Failed to get current results") };

    const testsCompleted = current.letter_recognition_tests_completed + 1;
    
    // Calculate running average
    const newConfusion = ((current.letter_recognition_confusion * current.letter_recognition_tests_completed) + params.confusion) / testsCompleted;
    const newAvgTime = ((current.letter_recognition_avg_time * current.letter_recognition_tests_completed) + params.avgTime) / testsCompleted;

    const { error } = await supabase
      .from("user_results")
      .update({
        letter_recognition_confusion: newConfusion,
        letter_recognition_avg_time: newAvgTime,
        letter_recognition_tests_completed: testsCompleted,
      })
      .eq("user_id", user.id);

    if (error) console.error("Error updating letter recognition:", error);
    return { error };
  };

  const updatePronunciation = async (params: UpdatePronunciationParams) => {
    if (!user) return { error: new Error("Not authenticated") };

    const current = await getOrCreateUserResults();
    if (!current) return { error: new Error("Failed to get current results") };

    const testsCompleted = current.pronunciation_tests_completed + 1;
    
    // Calculate running average
    const newWpm = ((current.pronunciation_wpm * current.pronunciation_tests_completed) + params.wpm) / testsCompleted;
    const newPhonemeError = ((current.pronunciation_phoneme_error * current.pronunciation_tests_completed) + params.phonemeError) / testsCompleted;
    const newRiskScore = ((current.pronunciation_risk_score * current.pronunciation_tests_completed) + params.riskScore) / testsCompleted;

    const { error } = await supabase
      .from("user_results")
      .update({
        pronunciation_wpm: newWpm,
        pronunciation_phoneme_error: newPhonemeError,
        pronunciation_risk_score: newRiskScore,
        pronunciation_tests_completed: testsCompleted,
      })
      .eq("user_id", user.id);

    if (error) console.error("Error updating pronunciation:", error);
    return { error };
  };

  const updateOverallRiskScore = async () => {
    if (!user) return { error: new Error("Not authenticated") };

    const current = await getOrCreateUserResults();
    if (!current) return { error: new Error("Failed to get current results") };

    // Calculate overall risk score based on all test metrics
    // Higher confusion, phoneme errors = higher risk; lower accuracy = higher risk
    let riskFactors = 0;
    let totalWeight = 0;

    if (current.picture_matching_tests_completed > 0) {
      // Lower accuracy = higher risk (invert accuracy)
      riskFactors += (100 - current.picture_matching_accuracy) * 0.3;
      totalWeight += 0.3;
    }

    if (current.letter_recognition_tests_completed > 0) {
      // Higher confusion = higher risk
      riskFactors += current.letter_recognition_confusion * 0.4;
      totalWeight += 0.4;
    }

    if (current.pronunciation_tests_completed > 0) {
      // Use pronunciation risk score directly
      riskFactors += current.pronunciation_risk_score * 0.3;
      totalWeight += 0.3;
    }

    const overallRisk = totalWeight > 0 ? riskFactors / totalWeight : 0;

    const { error } = await supabase
      .from("user_results")
      .update({ overall_risk_score: overallRisk })
      .eq("user_id", user.id);

    if (error) console.error("Error updating overall risk:", error);
    return { error };
  };

  return {
    getUserResults,
    updatePictureMatching,
    updateLetterRecognition,
    updatePronunciation,
    updateOverallRiskScore,
  };
}
