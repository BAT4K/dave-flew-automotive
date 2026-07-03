import React from 'react';

export default function Reviews() {
  const reviews = [
    {
      name: "David Robertson",
      text: "Excellent quality work and repairs by a man who really cares about cars. I have three classic Toyotas which he has recommissioned and maintains.",
    },
    {
      name: "Yara Mckinen",
      text: "Dave is the most genuine guy you will ever meet at a garage. Always has your best interests at heart, and will work out the best options and prices for you.",
    },
    {
      name: "Richard Baker",
      text: "I cannot praise Dave Flew enough for the thoroughness of the job, complete with photos/video of the various stages, and his passion for his work.",
    }
  ];

  return (
    <section className="mt-20 md:mt-24">
      <div className="mb-8 md:mb-10 text-center md:text-left">
        <div className="inline-block bg-red-100 text-red-800 px-3 py-1 text-sm font-bold uppercase tracking-widest mb-4 border border-red-200 shadow-sm">
          Testimonials
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[1.1]">
          What Our Customers Say
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white p-6 md:p-8 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
            <div className="mb-6 pl-2">
              <div className="flex text-amber-500 text-lg mb-4">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed italic">&quot;{review.text}&quot;</p>
            </div>
            <div className="font-black text-slate-900 uppercase tracking-wide pt-4 border-t-2 border-slate-100 pl-2">
              {review.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
