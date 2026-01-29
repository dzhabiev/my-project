-- Add is_super_admin column to profiles table
ALTER TABLE public.profiles
ADD COLUMN is_super_admin BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX idx_profiles_is_super_admin ON public.profiles(is_super_admin);

-- Example: Make a user super admin (replace with your email)
-- UPDATE public.profiles
-- SET is_super_admin = true
-- WHERE email = 'your-email@example.com';

-- Grant super admin privileges to view all user data
CREATE POLICY "Super admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_super_admin = true
    )
  );

CREATE POLICY "Super admins can view all user stickers"
  ON public.user_stickers
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_super_admin = true
    )
  );

-- Super admins can unlock any sticker
CREATE POLICY "Super admins can unlock any sticker"
  ON public.user_stickers
  FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_super_admin = true
    )
  )
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_super_admin = true
    )
  );
