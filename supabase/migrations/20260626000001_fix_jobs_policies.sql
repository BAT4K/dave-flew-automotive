-- Fix 1: Grant SELECT to anon to satisfy PostgREST implicit returns and prevent permission denied errors
GRANT SELECT ON public.jobs TO anon;

-- Fix 2: Allow authenticated users (admin) to insert rows (so Dave can test the form while logged in)
CREATE POLICY "Allow authenticated insert" ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (status = 'Requested');
