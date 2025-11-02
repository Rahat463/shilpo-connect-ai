-- Fix profiles table RLS policy - restrict to own profile unless manager/admin
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile or managed profiles"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id OR
  has_role(auth.uid(), 'manager'::app_role) OR
  has_role(auth.uid(), 'factory_admin'::app_role)
);

-- Fix monitoring logs INSERT policy - only allow service role
DROP POLICY IF EXISTS "System can insert monitoring logs" ON public.monitoring_logs;

CREATE POLICY "Only service role can insert monitoring logs"
ON public.monitoring_logs
FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');