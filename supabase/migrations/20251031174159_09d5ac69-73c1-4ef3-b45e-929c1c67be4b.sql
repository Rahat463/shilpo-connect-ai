-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('factory_admin', 'manager', 'worker');

-- Create profiles table for worker/manager information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  factory_id UUID,
  position TEXT,
  department TEXT,
  skills TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create manager_workers relationship table
CREATE TABLE public.manager_workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  worker_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (manager_id, worker_id)
);

ALTER TABLE public.manager_workers ENABLE ROW LEVEL SECURITY;

-- Create feedbacks table
CREATE TABLE public.feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('worker_to_worker', 'manager_to_worker', 'worker_to_manager')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comments TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Create monitoring_logs table
CREATE TABLE public.monitoring_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT,
  location TEXT,
  status TEXT CHECK (status IN ('active', 'idle', 'offline')),
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.monitoring_logs ENABLE ROW LEVEL SECURITY;

-- Create quality_assessments table
CREATE TABLE public.quality_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assessed_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  work_completed INTEGER DEFAULT 0,
  quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 10),
  efficiency_score INTEGER CHECK (efficiency_score >= 1 AND efficiency_score <= 10),
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (worker_id, date)
);

ALTER TABLE public.quality_assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Anyone can view user roles"
  ON public.user_roles FOR SELECT
  USING (true);

CREATE POLICY "Factory admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'factory_admin'));

-- RLS Policies for manager_workers
CREATE POLICY "Managers can view their workers"
  ON public.manager_workers FOR SELECT
  USING (
    manager_id = auth.uid() OR
    worker_id = auth.uid() OR
    public.has_role(auth.uid(), 'factory_admin')
  );

CREATE POLICY "Factory admins can manage relationships"
  ON public.manager_workers FOR ALL
  USING (public.has_role(auth.uid(), 'factory_admin'));

-- RLS Policies for feedbacks
CREATE POLICY "Users can view feedback involving them"
  ON public.feedbacks FOR SELECT
  USING (
    from_user_id = auth.uid() OR
    to_user_id = auth.uid() OR
    public.has_role(auth.uid(), 'factory_admin') OR
    public.has_role(auth.uid(), 'manager')
  );

CREATE POLICY "Workers can create feedback"
  ON public.feedbacks FOR INSERT
  WITH CHECK (from_user_id = auth.uid());

-- RLS Policies for monitoring_logs
CREATE POLICY "Workers can view own monitoring logs"
  ON public.monitoring_logs FOR SELECT
  USING (
    worker_id = auth.uid() OR
    public.has_role(auth.uid(), 'manager') OR
    public.has_role(auth.uid(), 'factory_admin')
  );

CREATE POLICY "System can insert monitoring logs"
  ON public.monitoring_logs FOR INSERT
  WITH CHECK (true);

-- RLS Policies for quality_assessments
CREATE POLICY "Users can view quality assessments"
  ON public.quality_assessments FOR SELECT
  USING (
    worker_id = auth.uid() OR
    assessed_by = auth.uid() OR
    public.has_role(auth.uid(), 'manager') OR
    public.has_role(auth.uid(), 'factory_admin')
  );

CREATE POLICY "Managers and admins can create assessments"
  ON public.quality_assessments FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'manager') OR
    public.has_role(auth.uid(), 'factory_admin')
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add trigger to profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();