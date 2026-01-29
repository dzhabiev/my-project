-- Fix RLS policies for super admin support

-- First, disable RLS temporarily
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stickers DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.profiles';
    END LOOP;
    
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'user_stickers') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.user_stickers';
    END LOOP;
END $$;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.is_super_admin();

-- Create a secure function to check super admin status
-- SECURITY DEFINER means it runs with the privileges of the function owner, bypassing RLS
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(
    (SELECT is_super_admin FROM public.profiles WHERE id = auth.uid() LIMIT 1),
    false
  );
$$;

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stickers ENABLE ROW LEVEL SECURITY;

-- Create index for super admin checks
CREATE INDEX IF NOT EXISTS idx_profiles_is_super_admin ON public.profiles(is_super_admin);

-- PROFILES policies - now using the secure function
CREATE POLICY "profiles_select_policy"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR 
    public.is_super_admin()
  );

CREATE POLICY "profiles_update_policy"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- USER_STICKERS policies - now using the secure function
CREATE POLICY "user_stickers_select_policy"
  ON public.user_stickers FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    public.is_super_admin()
  );

CREATE POLICY "user_stickers_insert_policy"
  ON public.user_stickers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_stickers_update_policy"
  ON public.user_stickers FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    public.is_super_admin()
  )
  WITH CHECK (
    user_id = auth.uid() OR
    public.is_super_admin()
  );
