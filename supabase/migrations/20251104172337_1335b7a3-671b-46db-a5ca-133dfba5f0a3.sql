-- Enable pgvector extension for RAG first
CREATE EXTENSION IF NOT EXISTS vector;

-- Create messages table for inbox functionality
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  conversation_id UUID
);

-- Create job_posts table
CREATE TABLE public.job_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  factory_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements JSONB,
  salary_range TEXT,
  location TEXT,
  employment_type TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create references table
CREATE TABLE public.worker_references (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  worker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  factory_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reference_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified BOOLEAN DEFAULT FALSE
);

-- Create video_call_sessions table
CREATE TABLE public.video_call_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  factory_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  room_id TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'scheduled',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create document_embeddings table for RAG pipeline
CREATE TABLE public.document_embeddings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_type TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_call_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_embeddings ENABLE ROW LEVEL SECURITY;

-- RLS policies for messages
CREATE POLICY "Users can view their own messages"
ON public.messages
FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages"
ON public.messages
FOR UPDATE
USING (auth.uid() = receiver_id);

-- RLS policies for job_posts
CREATE POLICY "Everyone can view active job posts"
ON public.job_posts
FOR SELECT
USING (status = 'active' OR factory_id = auth.uid());

CREATE POLICY "Factory admins can create job posts"
ON public.job_posts
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'factory_admin'::app_role) AND factory_id = auth.uid());

CREATE POLICY "Factory admins can update their job posts"
ON public.job_posts
FOR UPDATE
USING (factory_id = auth.uid());

CREATE POLICY "Factory admins can delete their job posts"
ON public.job_posts
FOR DELETE
USING (factory_id = auth.uid());

-- RLS policies for worker_references
CREATE POLICY "Workers can view their references"
ON public.worker_references
FOR SELECT
USING (worker_id = auth.uid() OR factory_id = auth.uid() OR has_role(auth.uid(), 'factory_admin'::app_role));

CREATE POLICY "Factory admins can create references"
ON public.worker_references
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'factory_admin'::app_role) AND factory_id = auth.uid());

-- RLS policies for video_call_sessions
CREATE POLICY "Participants can view their video calls"
ON public.video_call_sessions
FOR SELECT
USING (factory_id = auth.uid() OR worker_id = auth.uid());

CREATE POLICY "Factory admins can create video calls"
ON public.video_call_sessions
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'factory_admin'::app_role) AND factory_id = auth.uid());

CREATE POLICY "Participants can update their video calls"
ON public.video_call_sessions
FOR UPDATE
USING (factory_id = auth.uid() OR worker_id = auth.uid());

-- RLS policies for document_embeddings
CREATE POLICY "Authenticated users can view embeddings"
ON public.document_embeddings
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Service role can manage embeddings"
ON public.document_embeddings
FOR ALL
USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- Add trigger for job_posts updated_at
CREATE TRIGGER update_job_posts_updated_at
BEFORE UPDATE ON public.job_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add more fields to profiles for worker information
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS national_id TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS education TEXT,
ADD COLUMN IF NOT EXISTS certifications JSONB,
ADD COLUMN IF NOT EXISTS work_history JSONB,
ADD COLUMN IF NOT EXISTS preferred_salary_min INTEGER,
ADD COLUMN IF NOT EXISTS preferred_salary_max INTEGER,
ADD COLUMN IF NOT EXISTS availability TEXT,
ADD COLUMN IF NOT EXISTS profile_visibility TEXT DEFAULT 'public';

-- Create index on embeddings for faster similarity search
CREATE INDEX IF NOT EXISTS document_embeddings_embedding_idx ON public.document_embeddings USING ivfflat (embedding vector_cosine_ops);