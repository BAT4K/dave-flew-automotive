"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createClient } from "@/lib/supabase/client";
import { sendBookingNotification } from "@/app/actions/sendBookingNotification";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferredDay, setPreferredDay] = useState<Date | null>(null);
  const [preferredTimeFrame, setPreferredTimeFrame] = useState("Anytime");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!preferredDay) {
      setError("Please select a preferred day.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      customer_name: formData.get("customer_name") as string,
      customer_phone: formData.get("customer_phone") as string,
      car_reg: (formData.get("car_reg") as string).toUpperCase(),
      car_make_model: formData.get("car_make_model") as string,
      problem_description: formData.get("problem_description") as string,
      preferred_day: preferredDay ? new Date(preferredDay.getTime() - preferredDay.getTimezoneOffset() * 60000).toISOString().split("T")[0] : "",
      preferred_time_frame: preferredTimeFrame,
      status: "Requested",
    };

    const { error: supabaseError } = await supabase.from("jobs").insert([data]);

    if (supabaseError) {
      console.error(supabaseError);
      setError("An error occurred while submitting your request. Please try again.");
      setLoading(false);
    } else {
      // Send email notification
      await sendBookingNotification(data).catch(err => console.error("Failed to send email notification", err));
      
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 text-center bg-white border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.2)] rounded-none transition-all duration-300 ease-in-out relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">Booking Request Sent</h3>
        <p className="text-neutral-600 font-medium">Thanks, Dave will confirm your slot shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
      {error && (
        <div className="p-4 text-sm font-bold text-red-800 bg-red-100 border-2 border-red-500 rounded-none relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="customer_name" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Full Name
          </label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            required
            autoComplete="name"
            maxLength={100}
            className="w-full px-4 py-3.5 bg-white border-2 border-black rounded-none focus:bg-white focus:ring-0 focus:border-red-600 outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] focus:-translate-y-[2px] focus:-translate-x-[2px] text-black font-medium peer"
            placeholder="JOHN DOE"
          />
          <span className="hidden peer-[:user-invalid]:block text-red-600 text-sm font-bold mt-2">
            Please enter your full name.
          </span>
        </div>

        <div>
          <label htmlFor="customer_phone" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Phone Number
          </label>
          <input
            type="tel"
            id="customer_phone"
            name="customer_phone"
            required
            autoComplete="tel"
            minLength={10}
            maxLength={20}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^\d\s\+\-\(\)]/g, "");
            }}
            pattern="^(?:0|\+44)[0-9\s\-\(\)]{9,18}$"
            title="Please enter a valid UK phone number starting with 0 or +44"
            className="w-full px-4 py-3.5 bg-white border-2 border-black rounded-none focus:bg-white focus:ring-0 focus:border-red-600 outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] focus:-translate-y-[2px] focus:-translate-x-[2px] text-black font-medium peer"
            placeholder="07700 900000"
          />
          <span className="hidden peer-[:user-invalid]:block text-red-600 text-sm font-bold mt-2">
            Must be a valid UK number (e.g. 07700 900000).
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="car_reg" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Car Registration
          </label>
          <input
            type="text"
            id="car_reg"
            name="car_reg"
            required
            maxLength={10}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9\s]/g, "");
            }}
            pattern="^[A-Z0-9\s]+$"
            title="Please enter a valid UK car registration (letters and numbers only)"
            className="w-full px-4 py-3.5 bg-white border-2 border-black rounded-none focus:bg-white focus:ring-0 focus:border-red-600 outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] focus:-translate-y-[2px] focus:-translate-x-[2px] text-black font-bold placeholder:font-normal peer"
            placeholder="AB12 CDE"
          />
          <span className="hidden peer-[:user-invalid]:block text-red-600 text-sm font-bold mt-2">
            Letters and numbers only.
          </span>
        </div>
        
        <div>
          <label htmlFor="car_make_model" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Vehicle Make & Model
          </label>
          <input
            type="text"
            id="car_make_model"
            name="car_make_model"
            required
            maxLength={100}
            className="w-full px-4 py-3.5 bg-white border-2 border-black rounded-none focus:bg-white focus:ring-0 focus:border-red-600 outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] focus:-translate-y-[2px] focus:-translate-x-[2px] text-black font-medium peer"
            placeholder="e.g. Ford Transit 2018 or VW Golf"
          />
          <span className="hidden peer-[:user-invalid]:block text-red-600 text-sm font-bold mt-2">
            Please enter your vehicle make and model.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label htmlFor="preferred_day" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Preferred Day
          </label>
          <DatePicker
            selected={preferredDay}
            onChange={(date: Date | null) => setPreferredDay(date)}
            id="preferred_day"
            name="preferred_day"
            required
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            calendarStartDay={1}
            className="w-full px-4 py-3.5 bg-white border-2 border-black rounded-none focus:bg-white focus:ring-0 focus:border-red-600 outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] focus:-translate-y-[2px] focus:-translate-x-[2px] text-black font-medium"
            placeholderText="DD/MM/YYYY"
          />
          <span className="hidden group-has-[:user-invalid]:block text-red-600 text-sm font-bold mt-2">
            Please select a preferred day.
          </span>
        </div>

        <div>
          <label htmlFor="preferred_time_frame" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Preferred Drop-off Time
          </label>
          <select
            id="preferred_time_frame"
            name="preferred_time_frame"
            value={preferredTimeFrame}
            onChange={(e) => setPreferredTimeFrame(e.target.value)}
            className="w-full px-4 py-3.5 bg-white border-2 border-black rounded-none focus:bg-white focus:ring-0 focus:border-red-600 outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] focus:-translate-y-[2px] focus:-translate-x-[2px] text-black font-medium appearance-none cursor-pointer"
          >
            <option value="Anytime">Anytime</option>
            <option value="Morning (Before 12pm)">Morning (Before 12pm)</option>
            <option value="Early Afternoon (12pm - 2pm)">Early Afternoon (12pm - 2pm)</option>
            <option value="Late Afternoon (2pm - 5pm)">Late Afternoon (2pm - 5pm)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="problem_description" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
          Problem Description
        </label>
        <textarea
          id="problem_description"
          name="problem_description"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          className="w-full px-4 py-3.5 bg-white border-2 border-black rounded-none focus:bg-white focus:ring-0 focus:border-red-600 outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] focus:-translate-y-[2px] focus:-translate-x-[2px] resize-none text-black font-medium peer"
          placeholder="Please describe what needs fixing..."
        />
        <span className="hidden peer-[:user-invalid]:block text-red-600 text-sm font-bold mt-2">
          Please provide a description (at least 10 characters).
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 text-white font-black py-4 px-3 sm:px-6 uppercase tracking-widest text-base md:text-lg hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:translate-y-[2px] hover:translate-x-[2px] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] border-2 border-black mt-8"
      >
        {loading ? (
          <span className="w-6 h-6 border-4 border-red-800 border-t-white rounded-full animate-spin"></span>
        ) : (
          "Submit Booking Request"
        )}
      </button>
    </form>
  );
}
