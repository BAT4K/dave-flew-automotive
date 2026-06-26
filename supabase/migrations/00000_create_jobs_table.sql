CREATE TYPE job_status AS ENUM ('Requested', 'Scheduled', 'In Progress', 'Ready', 'Collected');

CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  car_reg TEXT NOT NULL,
  problem_description TEXT NOT NULL,
  preferred_day DATE NOT NULL,
  scheduled_datetime TIMESTAMP,
  status job_status DEFAULT 'Requested' NOT NULL,
  diagnosis_notes TEXT,
  estimated_hours NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert a new job request (anonymous booking) with default status
CREATE POLICY "Allow anonymous insert" ON jobs
  FOR INSERT
  TO anon
  WITH CHECK (status = 'Requested');

-- Policy: Allow authenticated users (admins) full SELECT, UPDATE, DELETE access
CREATE POLICY "Allow authenticated select" ON jobs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update" ON jobs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON jobs
  FOR DELETE
  TO authenticated
  USING (true);

-- Trigger to automatically update 'updated_at'
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_jobs_modtime
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Grant privileges to roles
GRANT INSERT ON public.jobs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.jobs TO authenticated;
GRANT ALL ON public.jobs TO service_role;
