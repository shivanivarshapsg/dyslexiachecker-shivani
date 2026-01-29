-- Create a single user results table with aggregated metrics for each test type
CREATE TABLE public.user_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Picture Matching metrics
  picture_matching_accuracy DECIMAL(5,2) DEFAULT 0,
  picture_matching_avg_time DECIMAL(10,2) DEFAULT 0,
  picture_matching_tests_completed INTEGER DEFAULT 0,
  
  -- Letter Recognition metrics
  letter_recognition_confusion DECIMAL(5,2) DEFAULT 0,
  letter_recognition_avg_time DECIMAL(10,2) DEFAULT 0,
  letter_recognition_tests_completed INTEGER DEFAULT 0,
  
  -- Pronunciation metrics
  pronunciation_wpm DECIMAL(5,2) DEFAULT 0,
  pronunciation_phoneme_error DECIMAL(5,2) DEFAULT 0,
  pronunciation_risk_score DECIMAL(5,2) DEFAULT 0,
  pronunciation_tests_completed INTEGER DEFAULT 0,
  
  -- Overall risk assessment
  overall_risk_score DECIMAL(5,2) DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.user_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own results"
ON public.user_results
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
ON public.user_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own results"
ON public.user_results
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_results_updated_at
BEFORE UPDATE ON public.user_results
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Drop the old test_scores table since we're using aggregated results now
DROP TABLE IF EXISTS public.test_scores;