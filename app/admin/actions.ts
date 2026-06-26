"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateJobStatus(jobId: string, newStatus: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({ status: newStatus })
    .eq("id", jobId);

  if (error) {
    console.error("Failed to update job status:", error);
    throw new Error("Could not update job status");
  }

  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
