import { useSiteCopy } from "@/lib/site-content";
import React, { useState } from "react";
import {
  useListRoles,
  useSubmitApplication,
} from "@workspace/api-client-react";
import { Reveal, StaggerChildren } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, ArrowRight, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const applySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  roleAppliedFor: z.string().min(1, "Role is required"),
  coverNote: z.string().optional(),
  linkedinUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export default function Careers() {
  const copy = useSiteCopy("careers");

  const { data: roles, isLoading } = useListRoles();
  const applyMutation = useSubmitApplication();
  const { toast } = useToast();

  const [selectedRole, setSelectedRole] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: "",
      email: "",
      roleAppliedFor: "",
      coverNote: "",
      linkedinUrl: "",
    },
  });

  const openApplyDialog = (id: string, title: string) => {
    setSelectedRole({ id, title });
    form.setValue("roleAppliedFor", id);
    setIsDialogOpen(true);
  };

  const onSubmit = (data: z.infer<typeof applySchema>) => {
    applyMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: copy("001", "Application Submitted"),
            description: copy(
              "002",
              "We'll review your details and get back to you soon.",
            ),
          });
          setIsDialogOpen(false);
          form.reset();
        },
        onError: () => {
          toast({
            title: copy("003", "Submission Failed"),
            description: copy(
              "004",
              "There was an error submitting your application.",
            ),
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-accent/10 text-accent px-3 py-1 text-sm font-medium mb-6">
                {copy("005", "Join the Team")}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                {copy("006", "Do the best work of your ")}
                <span className="text-accent">{copy("007", "career.")}</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {copy(
                  "008",
                  "We're a team of engineers, designers, and strategists obsessed with craft. We tackle hard problems, write elegant code, and build infrastructure that matters.",
                )}
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
                {
                  title: copy("009", "Remote-First"),
                  desc: copy("010", "Work from anywhere in the world."),
                },
                {
                  title: copy("011", "Top-Tier Gear"),
                  desc: copy(
                    "012",
                    "Latest M-series MacBooks and home office stipend.",
                  ),
                },
                {
                  title: copy("013", "Continuous Learning"),
                  desc: copy(
                    "014",
                    "Generous budget for courses, books, and conferences.",
                  ),
                },
                {
                  title: copy("015", "Focus Time"),
                  desc: copy(
                    "016",
                    "No-meeting days and asynchronous communication default.",
                  ),
                },
              ].map((perk, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {perk.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Open Roles */}
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              {copy("017", "Open Positions")}
            </h2>
          </Reveal>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
                ></div>
              ))}
            </div>
          ) : roles && roles.length > 0 ? (
            <StaggerChildren className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover-elevate flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
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
                    {copy("018", "Apply Now ")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ))}
            </StaggerChildren>
          ) : (
            <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {copy("019", "No open roles currently")}
              </h3>
              <p className="text-slate-500">
                {copy(
                  "020",
                  "We are not actively hiring right now, but check back soon.",
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-0 overflow-hidden rounded-3xl">
          <div className="bg-slate-50 dark:bg-slate-950 p-6 border-b border-slate-200 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                {copy("021", "Apply for ")}
                {selectedRole?.title}
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                {copy(
                  "022",
                  "Submit your details below and our team will review your application.",
                )}
              </DialogDescription>
            </DialogHeader>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-white">
                  {copy("023", "Full Name")}
                </label>
                <input
                  {...form.register("fullName")}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {form.formState.errors.fullName && (
                  <span className="text-destructive text-xs">
                    {form.formState.errors.fullName.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-white">
                  {copy("024", "Email Address")}
                </label>
                <input
                  {...form.register("email")}
                  type="email"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {form.formState.errors.email && (
                  <span className="text-destructive text-xs">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-white">
                {copy("025", "LinkedIn Profile (Optional)")}
              </label>
              <input
                {...form.register("linkedinUrl")}
                placeholder={copy("026", "https://linkedin.com/in/...")}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              {form.formState.errors.linkedinUrl && (
                <span className="text-destructive text-xs">
                  {form.formState.errors.linkedinUrl.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-white">
                {copy("027", "Cover Note (Optional)")}
              </label>
              <textarea
                {...form.register("coverNote")}
                rows={4}
                placeholder={copy(
                  "028",
                  "Why are you interested in this role?",
                )}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-full"
              >
                {copy("029", "Cancel")}
              </Button>
              <Button
                type="submit"
                disabled={applyMutation.isPending}
                className="rounded-full bg-accent hover:bg-accent/90 text-white"
              >
                {applyMutation.isPending
                  ? "Submitting..."
                  : "Submit Application"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
