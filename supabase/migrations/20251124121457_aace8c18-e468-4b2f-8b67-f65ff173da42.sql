-- Create function to safely set the current user's role
CREATE OR REPLACE FUNCTION public.set_user_role(_role public.app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Remove any existing roles for this user
  DELETE FROM public.user_roles WHERE user_id = auth.uid();

  -- Assign the new role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), _role);
END;
$$;

-- Allow authenticated users to call this function
GRANT EXECUTE ON FUNCTION public.set_user_role(public.app_role) TO authenticated;