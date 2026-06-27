import BookingForm from "@/components/BookingForm";
import Reviews from "@/components/Reviews";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-600 selection:text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b-4 border-red-600 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">Dave Flew <span className="text-red-600">Automotive</span></h1>
          </div>
          <a href="tel:+447936598298" className="flex items-center gap-2 text-white hover:text-red-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <span className="font-bold tracking-wider text-lg">+44 7936 598298</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-black border-b-8 border-red-600 overflow-hidden group">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/car.jpg"
            alt="Dave Flew Automotive Garage"
            fill
            sizes="100vw"
            quality={60}
            className="object-cover object-center grayscale contrast-125 opacity-30 animate-zoom-in"
            priority
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center z-10 animate-fade-up">
          <div className="inline-block bg-red-600 text-white px-6 py-2 text-sm font-black uppercase tracking-widest mb-8 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transform -rotate-2 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all cursor-default">
            Professional Garage Services
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.95] drop-shadow-2xl">
            Expert Auto Repair <br />
            <span className="text-red-600">You Can Trust</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-200 leading-relaxed max-w-3xl font-bold bg-slate-900/90 p-6 md:p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] mb-10">
            Quality service, honest pricing, and quick turnaround. Serving our local community with dedication and precision.
          </p>

          <div className="flex items-center gap-4 bg-white p-4 md:p-5 inline-flex border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transform hover:scale-105 transition-transform">
            <div className="flex text-amber-500 text-2xl">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <span className="text-slate-900 font-black tracking-tight text-xl">4.8 Rating <span className="font-bold text-slate-500 ml-1 text-base">(14 Google Reviews)</span></span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          {/* Info Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 md:mb-16 text-left">
            <div className="bg-white p-6 md:p-8 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden transition-transform hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900"></div>
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-wide mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Location
              </h3>
              <p className="text-slate-600 font-medium mb-4">Unit 1 Box Bush Ln<br/>Hewish, Weston-super-Mare<br/>BS24 6UA, United Kingdom</p>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Dave+Flew+Automotive,+Unit+1+Box+Bush+Ln,+Hewish,+Weston-super-Mare,+BS24+6UA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-900 text-white font-black text-xs uppercase tracking-widest px-4 py-2 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[1px] hover:translate-x-[1px] transition-all"
              >
                Get Directions
              </a>
            </div>
            <div className="bg-white p-6 md:p-8 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden transition-transform hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900"></div>
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-wide mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Opening Hours
              </h3>
              <ul className="text-slate-600 font-medium space-y-1">
                <li className="flex justify-between"><span>Mon - Wed</span><span>9am - 6pm</span></li>
                <li className="flex justify-between"><span>Thu - Fri</span><span>9am - 6pm</span></li>
                <li className="flex justify-between"><span>Saturday</span><span>9am - 1pm</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="text-red-600 font-bold">Closed</span></li>
              </ul>
            </div>
          </div>

        {/* Gallery Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
            <span className="w-8 h-1 bg-red-600 inline-block"></span>
            Inside the Shop
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="relative aspect-square border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden group transition-transform hover:-translate-y-1">
              <Image src="/images/chunkofmetal.jpg" alt="Welding work" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale contrast-125 group-hover:grayscale-0 active:grayscale-0 transition-all duration-500" />
            </div>
            <div className="relative aspect-square border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden group transition-transform hover:-translate-y-1">
              <Image src="/images/fancyengine.jpg" alt="Engine repair" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale contrast-125 group-hover:grayscale-0 active:grayscale-0 transition-all duration-500" />
            </div>
            <div className="relative aspect-square border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden group transition-transform hover:-translate-y-1">
              <Image src="/images/wheel.jpg" alt="Wheel service" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale contrast-125 group-hover:grayscale-0 active:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 uppercase tracking-tight">Book an Appointment</h2>
            <p className="text-slate-600 font-medium text-lg max-w-xl">Fill in the details below and our team will be in touch to confirm your slot.</p>
          </div>
          
          <BookingForm />
        </div>

        <Reviews />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t-4 border-red-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase mb-4">Dave Flew <span className="text-red-600">Automotive</span></h2>
          <p className="text-slate-400 font-medium mb-6 uppercase tracking-widest text-sm">Expert Auto Repair You Can Trust</p>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-sm font-medium mb-2">
            Call us: <a href="tel:+447936598298" className="text-white hover:text-red-400 transition-colors">+44 7936 598298</a>
          </p>
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()} Dave Flew Automotive. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
