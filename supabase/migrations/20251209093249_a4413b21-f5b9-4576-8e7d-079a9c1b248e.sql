-- Fix security issues with RLS policies

-- 1. Fix profiles table - restrict to own profile only
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view own profile or admins view all"
ON public.profiles
FOR SELECT
USING (auth.uid() = id OR is_admin(auth.uid()));

-- 2. Fix crm_contacts - restrict to owner or admin only
DROP POLICY IF EXISTS "Authenticated users can view all contacts" ON public.crm_contacts;
CREATE POLICY "Users can view own contacts or admins view all"
ON public.crm_contacts
FOR SELECT
USING (auth.uid() = created_by OR is_admin(auth.uid()));

-- 3. Fix crm_leads - restrict to owner or admin only
DROP POLICY IF EXISTS "Authenticated users can view all leads" ON public.crm_leads;
CREATE POLICY "Users can view own leads or admins view all"
ON public.crm_leads
FOR SELECT
USING (auth.uid() = created_by OR is_admin(auth.uid()));

-- 4. Fix cms_audit - restrict insert to authenticated users only and add actor tracking
DROP POLICY IF EXISTS "System can insert audit logs" ON public.cms_audit;
CREATE POLICY "Authenticated users can insert audit logs"
ON public.cms_audit
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND actor_id = auth.uid());