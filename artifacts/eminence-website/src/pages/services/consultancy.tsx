import React, { useState } from 'react';
import { Reveal, StaggerChildren } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, Target, BarChart, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().min(2, "Company name is required"),
  topic: z.string().min(1, "Please select a topic"),
  date: z.date({ required_error: "Please select a date" })
});

export default function Consultancy() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      topic: '',
    }
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    setIsSubmitting(true);
    // Simulate API call for booking
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Consultation Booked",
        description: `We'll see you on ${format(data.date, 'PPP')} to discuss ${data.topic}.`,
      });
      form.reset();
    }, 1000);
  };

  const methodologies = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Architecture Audits",
      desc: "Deep-dive analysis of your current systems to identify bottlenecks, security flaws, and scaling limitations."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Augmentation",
      desc: "Embedding senior engineering leadership into your teams to level up practices and deliver critical milestones."
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Digital Transformation",
      desc: "Strategic roadmapping to transition legacy enterprises into agile, technology-first organizations."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-500 px-3 py-1 text-sm font-medium mb-6">
                Strategic Advisory
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                Clarity in <span className="text-amber-600 dark:text-amber-500">Complexity</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
                Senior engineering leadership and strategic guidance for organizations facing critical technical inflection points.
              </p>
              <Button size="lg" className="rounded-full bg-amber-600 hover:bg-amber-700 text-white h-14 px-8 text-base" onClick={() => {
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Schedule a Session
              </Button>
            </Reveal>
            
            <Reveal direction="left" className="relative hidden lg:block">
              <div className="absolute inset-0 bg-amber-500/20 blur-[120px] rounded-full"></div>
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <img src="https://ui-avatars.com/api/?name=Eminence+Expert&background=0F6E56&color=fff" alt="Expert" className="rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">Principal Architect</h3>
                    <p className="text-slate-500 text-sm">Available for advisory</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="font-semibold text-sm mb-1 dark:text-white">Topic</div>
                    <div className="text-slate-600 dark:text-slate-400">Microservices Transition Strategy</div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-sm mb-1 dark:text-white">Duration</div>
                      <div className="text-slate-600 dark:text-slate-400">60 Minutes</div>
                    </div>
                    <Clock className="text-amber-500 w-6 h-6" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Areas of Focus */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Advisory Focus Areas</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We bring decades of collective engineering experience to solve high-stakes business challenges.
              </p>
            </div>
          </Reveal>

          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {methodologies.map((item, i) => (
              <div key={i} className="flex flex-col text-center items-center">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Booking Widget */}
      <section id="booking" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row">
            
            <div className="md:w-2/5 bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Book a Discovery Session</h3>
                <p className="text-slate-300 mb-8">
                  A complimentary 45-minute consultation with a Principal Engineer to evaluate your technical needs.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Non-disclosure agreement guaranteed",
                    "Direct access to senior leadership",
                    "Actionable technical roadmap delivered",
                    "No commitment required"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-3/5 p-10">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">Name</label>
                    <input 
                      {...form.register('name')}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      placeholder="Jane Doe"
                    />
                    {form.formState.errors.name && <span className="text-destructive text-xs">{form.formState.errors.name.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">Email</label>
                    <input 
                      {...form.register('email')}
                      type="email"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      placeholder="jane@company.com"
                    />
                    {form.formState.errors.email && <span className="text-destructive text-xs">{form.formState.errors.email.message}</span>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">Company</label>
                  <input 
                    {...form.register('company')}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder="Acme Corp"
                  />
                  {form.formState.errors.company && <span className="text-destructive text-xs">{form.formState.errors.company.message}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">Primary Topic</label>
                  <select 
                    {...form.register('topic')}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">Select a topic...</option>
                    <option value="Architecture Review">Architecture Review</option>
                    <option value="Cloud Migration">Cloud Migration Strategy</option>
                    <option value="Scaling Challenges">Scaling Challenges</option>
                    <option value="Team Augmentation">Team Augmentation</option>
                    <option value="Other">Other</option>
                  </select>
                  {form.formState.errors.topic && <span className="text-destructive text-xs">{form.formState.errors.topic.message}</span>}
                </div>

                <div className="space-y-2 flex flex-col">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">Preferred Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 ${!form.watch('date') && "text-slate-500"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch('date') ? format(form.watch('date'), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.watch('date')}
                        onSelect={(date) => date && form.setValue('date', date)}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.date && <span className="text-destructive text-xs">{form.formState.errors.date.message}</span>}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12">
                  {isSubmitting ? 'Scheduling...' : 'Confirm Session'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
