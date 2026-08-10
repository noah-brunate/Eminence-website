import React from 'react';
import { Reveal, StaggerChildren } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Code, Smartphone, Layout, Cpu, GitMerge, FastForward } from 'lucide-react';

export default function SoftwareSolutions() {
  const capabilities = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Enterprise Web Applications",
      description: "Complex, scalable web platforms built with React, Node.js, and modern distributed architectures."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Experiences",
      description: "Native and cross-platform mobile applications that deliver flawless performance on iOS and Android."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "UX/UI System Design",
      description: "Comprehensive design systems that ensure consistency, accessibility, and delight across all touchpoints."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "System Integration",
      description: "Connecting disparate legacy systems into unified, modern APIs via GraphQL and REST."
    },
    {
      icon: <GitMerge className="w-6 h-6" />,
      title: "Legacy Modernization",
      description: "Safe, systematic rewriting of outdated monoliths into modular, maintainable microservices."
    },
    {
      icon: <FastForward className="w-6 h-6" />,
      title: "MVP Acceleration",
      description: "Rapid prototyping and development for startups needing to prove product-market fit quickly."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute right-0 bottom-0 w-2/3 h-full opacity-5 pointer-events-none transform translate-x-1/4">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-primary">
            <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.1,15.3,83.6,30.6,75.4,43.6C67.2,56.6,55.3,67.3,41.7,75.2C28.1,83.2,14.1,88.4,-0.4,89.1C-14.9,89.8,-29.8,86.1,-43.3,78.2C-56.8,70.3,-68.8,58.3,-76.4,44.2C-84.1,30.1,-87.4,15,-85.7,0.9C-84.1,-13.2,-77.4,-26.4,-69.3,-38.3C-61.1,-50.2,-51.5,-60.8,-39.8,-69.1C-28.1,-77.4,-14,-83.5,0.7,-84.8C15.5,-86.1,30.7,-83.7,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent px-3 py-1 text-sm font-medium mb-6">
                Custom Development
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                Software that <span className="text-primary dark:text-accent">Transforms</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
                We don't just write code. We build elegant, robust, and scalable software solutions that drive real business value and outpace the competition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white h-14 px-8 text-base shadow-lg shadow-primary/20">
                  <Link href="/contact?service=software">Start a Project</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Code as Craft</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                At EMINENCE, we treat software engineering as a discipline requiring immense precision. We abhor bloated codebases and technical debt.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Our process is rooted in modern agile methodologies, test-driven development, and continuous integration. The result? Software that works exactly as intended, is easy to maintain, and scales effortlessly.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-primary pl-4">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">0%</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Compromise on Quality</div>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">100%</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Test Coverage Goal</div>
                </div>
              </div>
            </Reveal>
            
            <Reveal direction="left" className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-slate-900 p-8 flex flex-col font-mono text-sm">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <div className="text-blue-400 mb-2">import <span className="text-white">{'{'}</span> core <span className="text-white">{'}'}</span> from <span className="text-amber-300">'@eminence/engine'</span>;</div>
                <div className="text-blue-400 mb-6">import <span className="text-white">{'{'}</span> ScalableArch <span className="text-white">{'}'}</span> from <span className="text-amber-300">'@eminence/patterns'</span>;</div>
                
                <div className="text-purple-400 mb-2">export default function <span className="text-yellow-200">System</span><span className="text-white">() {'{'}</span></div>
                
                <div className="pl-4 text-slate-300 mb-2">
                  <span className="text-purple-400">const</span> architecture = <span className="text-purple-400">new</span> <span className="text-yellow-200">ScalableArch</span>();
                </div>
                
                <div className="pl-4 text-slate-300 mb-2">
                  architecture.<span className="text-blue-300">use</span>(core.<span className="text-blue-300">ResiliencePlugin</span>);
                </div>
                
                <div className="pl-4 text-slate-300 mb-4">
                  architecture.<span className="text-blue-300">optimize</span>(<span className="text-amber-300">'performance'</span>);
                </div>
                
                <div className="pl-4 text-slate-500 italic mb-2">
                  // Build for the future, deploy today.
                </div>
                
                <div className="pl-4 text-purple-400">
                  return <span className="text-white">architecture.</span><span className="text-blue-300">build</span><span className="text-white">();</span>
                </div>
                
                <div className="text-white mt-2">{'}'}</div>
                
                <div className="mt-auto pt-4 border-t border-slate-800 text-green-400 flex items-center">
                  <span className="mr-2">~</span> npm run deploy:production
                  <span className="ml-2 w-2 h-4 bg-slate-400 animate-pulse"></span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Capabilities</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Full-stack expertise applied to solve highly specific business problems.
              </p>
            </div>
          </Reveal>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover-elevate transition-all">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-primary dark:text-accent border border-slate-100 dark:border-slate-700">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="py-20 bg-slate-900 border-y border-slate-800 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal>
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Technologies We Master</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
              {/* Minimal text representations instead of logos for styling consistency */}
              <span className="text-2xl font-bold text-white">React / Next.js</span>
              <span className="text-2xl font-bold text-white">Node / Nest</span>
              <span className="text-2xl font-bold text-white">Go</span>
              <span className="text-2xl font-bold text-white">PostgreSQL</span>
              <span className="text-2xl font-bold text-white">GraphQL</span>
              <span className="text-2xl font-bold text-white">TypeScript</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Build something extraordinary.</h2>
            <p className="text-xl text-primary-foreground/80 mb-10">
              Bring us your hardest technical challenges. We'll engineer the solution.
            </p>
            <Button asChild size="lg" className="h-14 px-10 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20">
              <Link href="/contact?service=software">Discuss Your Project</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
