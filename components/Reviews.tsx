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
        <div className="inline-block bg-black text-white px-4 py-2 text-sm font-black uppercase tracking-widest mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Testimonials
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-[1.1]">
          What Our Customers Say
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white p-6 md:p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-3 h-full bg-red-600"></div>
            <div className="mb-6 pl-4">
              <div className="flex text-amber-500 text-xl mb-6 drop-shadow-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-black font-bold leading-snug text-lg">&quot;{review.text}&quot;</p>
            </div>
            <div className="font-black text-black text-lg uppercase tracking-wider pt-6 border-t-4 border-black pl-4 mt-4">
              {review.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
