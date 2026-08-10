import React, { useState } from 'react';
import { useSubmitContact } from '@workspace/api-client-react';
import { Reveal } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const mutation = useSubmitContact();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Extract service from query params if available
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const defaultService = searchParams.get('service') || '';

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: defaultService,
      message: ''
    }
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    mutation.mutate({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: () => {
        toast({ title: "Submission Failed", description: "There was an error sending your message. Please try again.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Whether you have a specific project in mind or just want to explore possibilities, our engineering team is ready to listen.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-8">
              <Reveal direction="right">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Contact Information</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-primary dark:text-accent rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Global HQ</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          100 Technology Drive<br />
                          Suite 400<br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-primary dark:text-accent rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h4>
                        <a href="mailto:hello@eminence.dev" className="text-slate-600 dark:text-slate-400 text-sm hover:text-accent transition-colors">
                          hello@eminence.dev
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-primary dark:text-accent rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Phone</h4>
                        <a href="tel:+18005550199" className="text-slate-600 dark:text-slate-400 text-sm hover:text-accent transition-colors">
                          +1 (800) 555-0199
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            
            {/* Form */}
            <div className="lg:col-span-8">
              <Reveal direction="left" className="h-full">
                <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl h-full">
                  {isSuccess ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Message Sent</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-md mx-auto">
                        Thank you for reaching out. A member of our engineering team will get back to you within 24 hours.
                      </p>
                      <Button onClick={() => {setIsSuccess(false); form.reset();}} variant="outline" className="rounded-full">
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Send a Message</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-900 dark:text-white">Full Name</label>
                          <input 
                            {...form.register('name')}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                            placeholder="John Doe"
                          />
                          {form.formState.errors.name && <span className="text-destructive text-xs">{form.formState.errors.name.message}</span>}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-900 dark:text-white">Email Address</label>
                          <input 
                            {...form.register('email')}
                            type="email"
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                            placeholder="john@company.com"
                          />
                          {form.formState.errors.email && <span className="text-destructive text-xs">{form.formState.errors.email.message}</span>}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-900 dark:text-white">Company (Optional)</label>
                          <input 
                            {...form.register('company')}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                            placeholder="Acme Corp"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-900 dark:text-white">Service of Interest</label>
                          <select 
                            {...form.register('service')}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
                          >
                            <option value="">General Inquiry</option>
                            <option value="software">Software Solutions</option>
                            <option value="cloud">Cloud Hosting</option>
                            <option value="consultancy">Consultancy</option>
                            <option value="products">Products</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">Message</label>
                        <textarea 
                          {...form.register('message')}
                          rows={6}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                        {form.formState.errors.message && <span className="text-destructive text-xs">{form.formState.errors.message.message}</span>}
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={mutation.isPending}
                        className="w-full md:w-auto h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white text-base"
                      >
                        {mutation.isPending ? 'Sending Message...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
