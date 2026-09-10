import { useSiteCopy } from "@/lib/site-content";
import React from "react";
import { useListTestimonials } from "@workspace/api-client-react";
import { Reveal, StaggerChildren } from "@/components/animations";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const copy = useSiteCopy("testimonials");

  const { data: testimonials, isLoading } = useListTestimonials();

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              {copy("001", "Client ")}
              <span className="text-primary dark:text-accent">
                {copy("002", "Success")}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {copy(
                "003",
                "We measure our success entirely by the impact we have on our clients' businesses. Here is what they have to say.",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800"
                ></div>
              ))}
            </div>
          ) : (
            <StaggerChildren className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials?.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="break-inside-avoid bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover-elevate transition-all relative group"
                >
                  <Quote className="w-8 h-8 text-slate-100 dark:text-slate-800 absolute top-6 right-6 group-hover:text-primary/10 dark:group-hover:text-accent/10 transition-colors" />

                  <div className="flex items-center gap-1 text-amber-500 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "fill-current" : "text-slate-200 dark:text-slate-800"}`}
                      />
                    ))}
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 mb-8 font-serif leading-relaxed text-lg relative z-10">
                    {copy("004", '"')}
                    {testimonial.quote}
                    {copy("005", '"')}
                  </p>

                  <div className="flex items-center gap-4 mt-auto border-t border-slate-100 dark:border-slate-800 pt-6">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-primary dark:text-white border border-primary/20 dark:border-slate-700">
                      {testimonial.clientName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {testimonial.clientName}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-accent mt-1">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  {testimonial.service && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-4 px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {testimonial.service}
                    </div>
                  )}
                </div>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>
    </div>
  );
}
