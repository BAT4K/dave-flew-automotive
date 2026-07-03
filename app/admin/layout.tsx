import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <header className="bg-black border-b-4 border-black sticky top-0 z-10 text-white shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <Link href="/admin" className="font-extrabold uppercase tracking-widest text-white text-lg sm:text-xl truncate">
            Dave Flew Automotive
          </Link>
          <div className="text-xs sm:text-sm font-bold bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-black truncate shrink-0 max-w-[140px] sm:max-w-none">
            {session.user.email}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
}
