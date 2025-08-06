-- Create beta_testers table for email collection
CREATE TABLE IF NOT EXISTS beta_testers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'active')),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_beta_testers_email ON beta_testers(email);
CREATE INDEX IF NOT EXISTS idx_beta_testers_created_at ON beta_testers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_beta_testers_status ON beta_testers(status);

-- Enable Row Level Security (RLS)
ALTER TABLE beta_testers ENABLE ROW LEVEL SECURITY;

-- Create policies for beta_testers table
-- Allow insert for anyone (email submission)
CREATE POLICY "Anyone can submit email for beta testing" 
ON beta_testers FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view (admin access)
CREATE POLICY "Only authenticated users can view beta testers" 
ON beta_testers FOR SELECT 
USING (auth.role() = 'authenticated');

-- Only service role can update/delete (admin functions)
CREATE POLICY "Only service role can update beta testers" 
ON beta_testers FOR UPDATE 
USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can delete beta testers" 
ON beta_testers FOR DELETE 
USING (auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_beta_testers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_update_beta_testers_updated_at ON beta_testers;
CREATE TRIGGER trigger_update_beta_testers_updated_at
  BEFORE UPDATE ON beta_testers
  FOR EACH ROW
  EXECUTE FUNCTION update_beta_testers_updated_at();

-- Create function to check for duplicate emails (case-insensitive)
CREATE OR REPLACE FUNCTION check_beta_tester_email_unique()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if email already exists (case-insensitive)
  IF EXISTS (
    SELECT 1 FROM beta_testers 
    WHERE LOWER(email) = LOWER(NEW.email) 
    AND id != COALESCE(NEW.id, gen_random_uuid())
  ) THEN
    RAISE EXCEPTION 'Email already registered for beta testing'
      USING ERRCODE = 'unique_violation';
  END IF;
  
  -- Normalize email to lowercase
  NEW.email = LOWER(TRIM(NEW.email));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for email uniqueness check
DROP TRIGGER IF EXISTS trigger_check_beta_tester_email_unique ON beta_testers;
CREATE TRIGGER trigger_check_beta_tester_email_unique
  BEFORE INSERT OR UPDATE ON beta_testers
  FOR EACH ROW
  EXECUTE FUNCTION check_beta_tester_email_unique();