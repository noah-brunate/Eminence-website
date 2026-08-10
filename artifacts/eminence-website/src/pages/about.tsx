import React from 'react';
import { Reveal, StaggerChildren } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Target, Award, Shield, Users, ArrowRight } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Radical Focus",
      desc: "We do not get distracted by the latest shiny framework. We choose the right tool for the job, optimizing for stability and maintainability over hype."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Uncompromising Craft",
      desc: "Good enough is a failure condition. We engineer systems designed to withstand edge cases, traffic spikes, and the test of time."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Default Secure",
      desc: "Security is not a feature added at the end of a sprint. It is foundational to every architectural decision we make."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Egoless Collaboration",
      desc: "The best idea wins, regardless of title. We partner closely with our clients, treating their success as our only metric."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                We engineer the <span className="text-primary dark:text-accent">foundation</span> for digital leaders.
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                EMINENCE was founded on a simple premise: enterprise software is too fragile. We assemble elite engineering teams to build resilient systems for companies that cannot afford to fail.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal direction="right">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800">
                <div className="absolute inset-0 bg-primary/5"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12 text-slate-300 dark:text-slate-600 opacity-20">
                  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                    <rect x="20" y="20" width="60" height="60" rx="4" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="4" />
                  </svg>
                </div>
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                  <div className="font-bold text-slate-900 dark:text-white text-xl mb-1">Founded 2018</div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">Born from the frustration of fragile systems.</div>
                </div>
              </div>
            </Reveal>
            
            <Reveal direction="left">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  EMINENCE began when a group of senior infrastructure engineers grew tired of fixing the same architectural mistakes across different companies.
                </p>
                <p>
                  We saw organizations pouring millions into superficial digital transformations while their core infrastructure crumbled under load. Tech debt was treated as a cost of doing business rather than an existential risk.
                </p>
                <p>
                  We built this company to be the antidote. A technology partner that tells the hard truths, writes defensive code, and architects for the worst-case scenario. Over the years, we've rescued failing projects, migrated monoliths to the cloud without downtime, and built zero-to-one products that process billions of events.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Core Values</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                The principles that govern how we write code, design systems, and interact with our partners.
              </p>
            </div>
          </Reveal>

          <StaggerChildren className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover-elevate transition-all">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent rounded-2xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {value.desc}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 bg-primary dark:bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Elite</h2>
            <p className="text-xl text-primary-foreground/80 mb-10 font-light">
              We are always looking for exceptional engineers who care deeply about their craft. If you want to solve hard problems with smart people, we should talk.
            </p>
            <Button asChild size="lg" className="h-14 px-10 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg">
              <Link href="/careers" className="flex items-center">
                View Open Roles <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
