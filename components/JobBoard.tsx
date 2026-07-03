"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Job = {
  id: string;
  customer_name: string;
  customer_phone: string;
  car_reg: string;
  problem_description: string;
  preferred_day: string;
  preferred_time_frame: string | null;
  scheduled_datetime: string | null;
  status: "Requested" | "Scheduled" | "In Progress" | "Ready" | "Collected";
  diagnosis_notes: string | null;
  estimated_hours: number | null;
  final_price: number | null;
  created_at: string;
  updated_at: string;
};

const STATUS_OPTIONS = ["Requested", "Scheduled", "In Progress", "Ready", "Collected"] as const;

const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='4' stroke='%230f172a'%3E%3Cpath stroke-linecap='square' stroke-linejoin='miter' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

function formatWhatsAppNumber(phone: string) {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }
  if (!cleaned.startsWith("44")) {
    cleaned = "44" + cleaned;
  }
  return cleaned;
}

function JobCard({ job, isExpanded, onToggleExpand }: { job: Job; isExpanded: boolean; onToggleExpand: () => void }) {
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(
    job.scheduled_datetime ? new Date(job.scheduled_datetime) : null
  );
  
  const supabase = createClient();
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      status: formData.get("status") as string,
      scheduled_datetime: scheduledDate ? scheduledDate.toISOString() : null,
      estimated_hours: formData.get("estimated_hours") ? parseFloat(formData.get("estimated_hours") as string) : null,
      final_price: formData.get("final_price") ? parseFloat(formData.get("final_price") as string) : null,
      diagnosis_notes: formData.get("diagnosis_notes") as string,
    };

    const { error } = await supabase.from("jobs").update(updates).eq("id", job.id);
    
    setLoading(false);
    
    if (error) {
      alert("Failed to update job.");
      console.error(error);
    } else {
      onToggleExpand();
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete this booking?")) {
      setIsDeleting(true);
      const { error } = await supabase.from("jobs").delete().eq("id", job.id);
      
      if (error) {
        alert("Failed to delete job.");
        console.error(error);
        setIsDeleting(false);
      } else {
        router.refresh();
      }
    }
  };

  const formattedPhone = formatWhatsAppNumber(job.customer_phone);
  
  const [prefYear, prefMonth, prefDay] = job.preferred_day.split("-");
  const formattedPrefDate = `${prefDay}/${prefMonth}/${prefYear}${job.preferred_time_frame && job.preferred_time_frame !== "Anytime" ? ` (${job.preferred_time_frame})` : ""}`;

  const formattedDate = job.scheduled_datetime 
    ? new Date(job.scheduled_datetime).toLocaleString("en-GB", { dateStyle: 'short', timeStyle: 'short' })
    : "a time to be confirmed";

  const confirmationMessage = encodeURIComponent(`Hi ${job.customer_name}, you are booked in at Dave Flew Automotive for ${formattedDate}.`);
  const reminderMessage = encodeURIComponent(`Hi ${job.customer_name}, just a quick reminder about your booking at Dave Flew Automotive for ${formattedDate}. Let me know if anything changes!`);
  const rescheduleMessage = encodeURIComponent(`Hi ${job.customer_name}, just a heads up that your car needs further work. We have moved your slot to ${formattedDate}.`);
  const readyMessage = encodeURIComponent(`Hi ${job.customer_name}, your car is ready for collection at Dave Flew Automotive! The final total is £${job.final_price ? job.final_price : "____"}. We accept Cash or Card on arrival. See you soon.`);
  const reviewMessage = encodeURIComponent(`Hi ${job.customer_name}, thanks for choosing Dave Flew Automotive! If you were happy with the service, it would mean the world if you could leave a quick review here: https://g.page/r/YOUR_GOOGLE_ID/review`);

  return (
    <div className="bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden mb-6 transition-all">
      {/* Card Header */}
      <div 
        className="p-4 sm:p-6 cursor-pointer hover:bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        onClick={onToggleExpand}
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-black text-black text-lg sm:text-xl uppercase tracking-widest">{job.car_reg}</span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-none text-[10px] sm:text-xs font-black uppercase tracking-widest bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {job.status}
            </span>
          </div>
          <p className="text-neutral-600 font-medium text-xs sm:text-sm">{job.customer_name} • {job.customer_phone}</p>
        </div>
        <div className="text-left sm:text-right text-xs sm:text-sm flex flex-col gap-1">
          <p className="text-neutral-500">Pref: <span className="text-black font-medium">{formattedPrefDate}</span></p>
          {job.scheduled_datetime && (
            <p className="text-blue-600 font-medium">
              Sch: {formattedDate}
            </p>
          )}
        </div>
      </div>

      {/* Expanded Detail Form */}
      {isExpanded && (
        <div className="p-4 sm:p-6 border-t-4 border-black bg-neutral-50">
          <div className="mb-6">
            <h4 className="text-xs font-black text-black uppercase tracking-widest mb-2">Problem Description</h4>
            <p className="text-black font-medium bg-white p-4 rounded-none border-2 border-black text-sm whitespace-pre-wrap">{job.problem_description}</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-black text-black mb-2 uppercase tracking-widest">Status</label>
                <select 
                  name="status" 
                  defaultValue={job.status}
                  className="w-full h-12 px-4 bg-white border-2 border-black rounded-none focus:bg-neutral-50 focus:outline-none text-sm font-bold text-black appearance-none bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.5rem_1.5rem]"
                  style={{ backgroundImage: chevronSvg }}
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-black text-black mb-2 uppercase tracking-widest">Scheduled Date &amp; Time</label>
                <div className="relative">
                  <DatePicker
                    selected={scheduledDate}
                    onChange={(date: Date | null) => setScheduledDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm"
                    calendarStartDay={1}
                    placeholderText="Select Date & Time"
                    className="w-full h-12 px-4 bg-white border-2 border-black rounded-none focus:bg-neutral-50 focus:outline-none text-sm font-bold text-black"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-black text-black mb-2 uppercase tracking-widest">Estimated Hours</label>
                <input 
                  type="number" 
                  name="estimated_hours"
                  step="0.1"
                  min="0"
                  defaultValue={job.estimated_hours || ""}
                  className="w-full h-12 px-4 bg-white border-2 border-black rounded-none focus:bg-neutral-50 focus:outline-none text-sm font-bold text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                  placeholder="e.g. 2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-black mb-2 uppercase tracking-widest">Final Price (£)</label>
                <input 
                  type="number" 
                  name="final_price"
                  step="0.01"
                  min="0"
                  defaultValue={job.final_price || ""}
                  className="w-full h-12 px-4 bg-white border-2 border-black rounded-none focus:bg-neutral-50 focus:outline-none text-sm font-bold text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                  placeholder="e.g. 450.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-black mb-2 uppercase tracking-widest">Diagnosis Notes</label>
              <textarea 
                name="diagnosis_notes"
                rows={3}
                defaultValue={job.diagnosis_notes || ""}
                placeholder="Dave's internal notes..."
                className="w-full px-4 py-3 bg-white border-2 border-black rounded-none focus:bg-neutral-50 focus:outline-none text-sm font-medium text-black resize-none"
              />
            </div>

            {/* WhatsApp & Save Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 sm:gap-6 pt-6 border-t-4 border-black mt-8">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {(job.status === "Requested" || job.status === "Scheduled") && (
                  <a 
                    href={`https://wa.me/${formattedPhone}?text=${confirmationMessage}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1DA851] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] text-[11px] sm:text-sm font-black uppercase tracking-widest transition-all flex-1 text-center cursor-pointer flex items-center justify-center"
                  >
                    Send Confirmation
                  </a>
                )}

                {job.status === "Scheduled" && (
                  <a 
                    href={`https://wa.me/${formattedPhone}?text=${reminderMessage}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1DA851] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] text-[11px] sm:text-sm font-black uppercase tracking-widest transition-all flex-1 text-center cursor-pointer flex items-center justify-center"
                  >
                    Send Reminder
                  </a>
                )}
                
                {(job.status === "Scheduled" || job.status === "In Progress") && (
                  <a 
                    href={`https://wa.me/${formattedPhone}?text=${rescheduleMessage}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1DA851] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] text-[11px] sm:text-sm font-black uppercase tracking-widest transition-all flex-1 text-center cursor-pointer flex items-center justify-center"
                  >
                    Send Reschedule
                  </a>
                )}
                
                {job.status === "Ready" && (
                  <a 
                    href={`https://wa.me/${formattedPhone}?text=${readyMessage}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1DA851] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] text-[11px] sm:text-sm font-black uppercase tracking-widest transition-all flex-1 text-center cursor-pointer flex items-center justify-center"
                  >
                    Send Ready
                  </a>
                )}

                {job.status === "Collected" && (
                  <a 
                    href={`https://wa.me/${formattedPhone}?text=${reviewMessage}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1DA851] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] text-[11px] sm:text-sm font-black uppercase tracking-widest transition-all flex-1 text-center cursor-pointer flex items-center justify-center"
                  >
                    Request Review
                  </a>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading || isDeleting}
                  className="w-full sm:w-auto h-12 bg-red-600 text-white px-6 rounded-none text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-70 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] cursor-pointer shrink-0"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="submit"
                  disabled={loading || isDeleting}
                  className="w-full sm:w-auto h-12 bg-black text-white px-8 rounded-none text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-neutral-900 transition-all disabled:opacity-70 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] cursor-pointer shrink-0"
                >
                  {loading ? "Saving..." : "Save Updates"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function CalendarView({ jobs }: { jobs: Job[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter and sort jobs with a scheduled date
  const scheduledJobs = jobs
    .filter((j) => j.scheduled_datetime && j.status !== "Collected")
    .sort((a, b) => new Date(a.scheduled_datetime!).getTime() - new Date(b.scheduled_datetime!).getTime());

  // Group by day string
  const groupedJobs: Record<string, Job[]> = {};
  scheduledJobs.forEach(job => {
    const d = new Date(job.scheduled_datetime!);
    const dayStr = d.toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'long' });
    if (!groupedJobs[dayStr]) {
      groupedJobs[dayStr] = [];
    }
    groupedJobs[dayStr].push(job);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {Object.keys(groupedJobs).length === 0 ? (
        <p className="text-black font-bold uppercase tracking-widest bg-white p-8 rounded-none border-2 border-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">No scheduled jobs coming up.</p>
      ) : (
        Object.entries(groupedJobs).map(([dayStr, dayJobs]) => (
          <div key={dayStr} className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black text-white p-4">
              <h3 className="font-black text-xl uppercase tracking-widest">{dayStr}</h3>
            </div>
            <div className="p-4 sm:p-6 space-y-4 bg-neutral-100">
              {dayJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  isExpanded={expandedId === job.id} 
                  onToggleExpand={() => setExpandedId(expandedId === job.id ? null : job.id)} 
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default function JobBoard({ initialJobs }: { initialJobs: Job[] }) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(5);
  const [visibleInboxCount, setVisibleInboxCount] = useState(10);
  const [visibleActiveCount, setVisibleActiveCount] = useState(10);

  const filteredJobs = initialJobs.filter(
    (job) =>
      job.car_reg.toLowerCase().includes(search.toLowerCase()) ||
      job.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const inboxJobs = filteredJobs.filter((job) => job.status === "Requested");
  const activeJobs = filteredJobs.filter((job) => job.status === "Scheduled" || job.status === "In Progress" || job.status === "Ready");
  const historyJobs = filteredJobs.filter((job) => job.status === "Collected");

  const [viewMode, setViewMode] = useState<"pipeline" | "calendar">("pipeline");

  return (
    <div className="space-y-12">
      <div className="flex bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <button 
          onClick={() => setViewMode("pipeline")}
          className={`flex-1 py-4 font-black uppercase tracking-widest transition-colors ${viewMode === "pipeline" ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100"}`}
        >
          Pipeline View
        </button>
        <div className="w-1 bg-black"></div>
        <button 
          onClick={() => setViewMode("calendar")}
          className={`flex-1 py-4 font-black uppercase tracking-widest transition-colors ${viewMode === "calendar" ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100"}`}
        >
          Calendar View
        </button>
      </div>

      {viewMode === "calendar" ? (
        <CalendarView jobs={filteredJobs} />
      ) : (
        <>
          {/* Search Input */}
          <div>
        <input
          type="text"
          placeholder="SEARCH REGISTRATION OR NAME..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-black rounded-none focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm sm:text-base font-bold text-black placeholder-neutral-400"
        />
      </div>

      {/* Inbox Section */}
      <div>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          Inbox <span className="bg-black text-white font-black text-sm py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{inboxJobs.length}</span>
        </h2>
        {inboxJobs.length === 0 ? (
          <p className="text-black font-bold uppercase tracking-widest bg-white p-8 rounded-none border-2 border-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">No new requests.</p>
        ) : (
          <>
            {inboxJobs.slice(0, visibleInboxCount).map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                isExpanded={expandedId === job.id} 
                onToggleExpand={() => setExpandedId(expandedId === job.id ? null : job.id)} 
              />
            ))}
            {inboxJobs.length > visibleInboxCount && (
              <button
                onClick={() => setVisibleInboxCount(prev => prev + 10)}
                className="w-full h-16 bg-black text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:bg-neutral-900 transition-all font-black text-base uppercase tracking-widest cursor-pointer mt-2"
              >
                Load More Requests
              </button>
            )}
          </>
        )}
      </div>

      {/* Active Pipeline Section */}
      <div>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          Active Pipeline <span className="bg-black text-white font-black text-sm py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{activeJobs.length}</span>
        </h2>
        {activeJobs.length === 0 ? (
          <p className="text-black font-bold uppercase tracking-widest bg-white p-8 rounded-none border-2 border-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">No active jobs.</p>
        ) : (
          <>
            {activeJobs.slice(0, visibleActiveCount).map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                isExpanded={expandedId === job.id} 
                onToggleExpand={() => setExpandedId(expandedId === job.id ? null : job.id)} 
              />
            ))}
            {activeJobs.length > visibleActiveCount && (
              <button
                onClick={() => setVisibleActiveCount(prev => prev + 10)}
                className="w-full h-16 bg-black text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:bg-neutral-900 transition-all font-black text-base uppercase tracking-widest cursor-pointer mt-2"
              >
                Load More Active Jobs
              </button>
            )}
          </>
        )}
      </div>

      {/* Service History Section */}
      <div className="border-t-4 border-black pt-8 mt-12 pb-12">
        <button 
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-black">
              Service History
            </h2>
            <span className="bg-black text-white font-black text-sm py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform">
              {historyJobs.length}
            </span>
          </div>
          <div className="text-black text-3xl font-black group-hover:scale-125 transition-transform">
            {isHistoryOpen ? "−" : "+"}
          </div>
        </button>

        {isHistoryOpen && (
          <div className="mt-8 animate-in slide-in-from-top-4 fade-in duration-200">
            {historyJobs.length === 0 ? (
              <p className="text-black font-bold uppercase tracking-widest bg-white p-8 rounded-none border-2 border-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">No completed jobs yet.</p>
            ) : (
              <>
                {historyJobs.slice(0, visibleHistoryCount).map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isExpanded={expandedId === job.id} 
                    onToggleExpand={() => setExpandedId(expandedId === job.id ? null : job.id)} 
                  />
                ))}

                {historyJobs.length > visibleHistoryCount && (
                  <button
                    onClick={() => setVisibleHistoryCount(prev => prev + 10)}
                    className="w-full h-16 bg-black text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:bg-neutral-900 transition-all font-black text-base uppercase tracking-widest cursor-pointer mt-2"
                  >
                    Load More
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}
