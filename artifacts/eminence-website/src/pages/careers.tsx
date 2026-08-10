import React, { useState } from 'react';
import { useListRoles, useSubmitApplication } from '@workspace/api-client-react';
import { Reveal, StaggerChildren } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase, ArrowRight, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const applySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  roleAppliedFor: z.string().min(1, "Role is required"),
  coverNote: z.string().optional(),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

export default function Careers() {
  const { data: roles, isLoading } = useListRoles();
  const applyMutation = useSubmitApplication();
  const { toast } = useToast();
  
  const [selectedRole, setSelectedRole] = useState<{id: string, title: string} | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: '',
      email: '',
      roleAppliedFor: '',
      coverNote: '',
      linkedinUrl: ''
    }
  });

  const openApplyDialog = (id: string, title: string) => {
    setSelectedRole({ id, title });
    form.setValue('roleAppliedFor', id);
    setIsDialogOpen(true);
  };

  const onSubmit = (data: z.infer<typeof applySchema>) => {
    applyMutation.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Application Submitted", description: "We'll review your details and get back to you soon." });
        setIsDialogOpen(false);
        form.reset();
      },
      onError: () => {
        toast({ title: "Submission Failed", description: "There was an error submitting your application.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-accent/10 text-accent px-3 py-1 text-sm font-medium mb-6">
                Join the Team
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                Do the best work of your <span className="text-accent">career.</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                We're a team of engineers, designers, and strategists obsessed with craft. We tackle hard problems, write elegant code, and build infrastructure that matters.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-slate-200 dark:border-slate-800 pb-16 mb-16">
              {[
                { title: "Remote-First", desc: "Work from anywhere in the world." },
                { title: "Top-Tier Gear", desc: "Latest M-series MacBooks and home office stipend." },
                { title: "Continuous Learning", desc: "Generous budget for courses, books, and conferences." },
                { title: "Focus Time", desc: "No-meeting days and asynchronous communication default." }
              ].map((perk, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">{perk.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Open Roles */}
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Open Positions</h2>
          </Reveal>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"></div>
              ))}
            </div>
          ) : roles && roles.length > 0 ? (
            <StaggerChildren className="space-y-4">
              {roles.map(role => (
                <div key={role.id} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover-elevate flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        {role.department}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {role.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {role.type}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => openApplyDialog(role.id, role.title)}
                    className="rounded-full bg-slate-900 hover:bg-accent text-white dark:bg-white dark:text-slate-900 dark:hover:bg-accent dark:hover:text-white transition-all w-full md:w-auto"
                  >
                    Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ))}
            </StaggerChildren>
          ) : (
            <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No open roles currently</h3>
              <p className="text-slate-500">We are not actively hiring right now, but check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-0 overflow-hidden rounded-3xl">
          <div className="bg-slate-50 dark:bg-slate-950 p-6 border-b border-slate-200 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">Apply for {selectedRole?.title}</DialogTitle>
              <DialogDescription className="text-slate-500">
                Submit your details below and our team will review your application.
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-white">Full Name</label>
                <input 
                  {...form.register('fullName')}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {form.formState.errors.fullName && <span className="text-destructive text-xs">{form.formState.errors.fullName.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-white">Email Address</label>
                <input 
                  {...form.register('email')}
                  type="email"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {form.formState.errors.email && <span className="text-destructive text-xs">{form.formState.errors.email.message}</span>}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-white">LinkedIn Profile (Optional)</label>
              <input 
                {...form.register('linkedinUrl')}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              {form.formState.errors.linkedinUrl && <span className="text-destructive text-xs">{form.formState.errors.linkedinUrl.message}</span>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-white">Cover Note (Optional)</label>
              <textarea 
                {...form.register('coverNote')}
                rows={4}
                placeholder="Why are you interested in this role?"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
              />
            </div>
            
            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button type="submit" disabled={applyMutation.isPending} className="rounded-full bg-accent hover:bg-accent/90 text-white">
                {applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
