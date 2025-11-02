-- Fix user_roles RLS policy - users should only see their own roles
DROP POLICY IF EXISTS "Anyone can view user roles" ON public.user_roles;

CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (
  user_id = auth.uid() OR
  has_role(auth.uid(), 'manager'::app_role) OR
  has_role(auth.uid(), 'factory_admin'::app_role)
);

-- Add UPDATE policy for quality_assessments
CREATE POLICY "Managers and admins can update assessments"
ON public.quality_assessments
FOR UPDATE
USING (
  has_role(auth.uid(), 'manager'::app_role) OR
  has_role(auth.uid(), 'factory_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'manager'::app_role) OR
  has_role(auth.uid(), 'factory_admin'::app_role)
);

-- Add DELETE policy for quality_assessments
CREATE POLICY "Managers and admins can delete assessments"
ON public.quality_assessments
FOR DELETE
USING (
  has_role(auth.uid(), 'manager'::app_role) OR
  has_role(auth.uid(), 'factory_admin'::app_role)
);

-- Add UPDATE policy for feedbacks
CREATE POLICY "Users can update own feedback"
ON public.feedbacks
FOR UPDATE
USING (from_user_id = auth.uid())
WITH CHECK (from_user_id = auth.uid());

-- Add DELETE policy for feedbacks
CREATE POLICY "Users can delete own feedback"
ON public.feedbacks
FOR DELETE
USING (from_user_id = auth.uid());