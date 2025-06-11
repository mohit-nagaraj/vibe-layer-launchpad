
-- Create a simple waitlist table to store emails and signup timestamps
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (since this is a public waitlist, we'll allow inserts but restrict reads)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their email (for public waitlist signup)
CREATE POLICY "Anyone can sign up for waitlist" 
  ON public.waitlist 
  FOR INSERT 
  WITH CHECK (true);

-- Only authenticated users can view waitlist entries (you can adjust this based on your needs)
CREATE POLICY "Only authenticated users can view waitlist" 
  ON public.waitlist 
  FOR SELECT 
  USING (auth.role() = 'authenticated');
