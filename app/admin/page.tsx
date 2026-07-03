import { createClient } from "@/lib/supabase/server";
import JobBoard from "@/components/JobBoard";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div className="p-4 text-red-600">Error loading jobs. Please try again.</div>;
  }

  return (
    <div>
      <div className="mb-10 border-b-4 border-black pb-6">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-black">Mission Control</h1>
        <p className="text-neutral-600 mt-2 font-bold uppercase tracking-wide text-sm">Manage all booking requests and active jobs.</p>
      </div>
      <JobBoard initialJobs={jobs || []} />
    </div>
  );
}
