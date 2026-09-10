import { useSiteCopy } from "@/lib/site-content";
import React, { useState } from "react";
import { useSubmitContact } from "@workspace/api-client-react";
import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(),
});

export default function Contact() {
  const copy = useSiteCopy("contact");

  const mutation = useSubmitContact();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  // Extract service from query params if available
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const defaultService = searchParams.get("service") || "";

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: defaultService,
      message: "",
      website: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    mutation.mutate(
      { data },
      {
        onSuccess: () => {
          setIsSuccess(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onError: () => {
          toast({
            title: copy("001", "Submission Failed"),
            description: copy(
              "002",
              "There was an error sending your message. Please try again.",
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
      <section className="pt-32 pb-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              {copy("003", "Get in ")}
              <span className="text-accent">{copy("004", "Touch")}</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {copy(
                "005",
                "Whether you have a specific project in mind or just want to explore possibilities, our engineering team is ready to listen.",
              )}
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
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                    {copy("006", "Contact Information")}
                  </h3>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-primary dark:text-accent rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {copy("007", "Global HQ")}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {copy("008", "100 Technology Drive")}
                          <br />
                          {copy("009", "Suite 400")}
                          <br />
                          {copy("010", "San Francisco, CA 94107")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-primary dark:text-accent rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {copy("011", "Email")}
                        </h4>
                        <a
                          href={copy("012", "mailto:info@eminence.co.ug")}
                          className="text-slate-600 dark:text-slate-400 text-sm hover:text-accent transition-colors"
                        >
                          {copy("013", "info@eminence.co.ug")}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-primary dark:text-accent rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {copy("014", "Phone")}
                        </h4>
                        <a
                          href={copy("015", "tel:+18005550199")}
                          className="text-slate-600 dark:text-slate-400 text-sm hover:text-accent transition-colors"
                        >
                          {copy("016", "+1 (800) 555-0199")}
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
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        {copy("017", "Message Sent")}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-md mx-auto">
                        {copy(
                          "018",
                          "Thank you for reaching out. A member of our engineering team will get back to you within 24 hours.",
                        )}
                      </p>
                      <Button
                        onClick={() => {
                          setIsSuccess(false);
                          form.reset();
                        }}
                        variant="outline"
                        className="rounded-full"
                      >
                        {copy("019", "Send another message")}
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                        {copy("020", "Send a Message")}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-900 dark:text-white">
                            {copy("021", "Full Name")}
                          </label>
                          <input
                            {...form.register("name")}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                            placeholder={copy("022", "John Doe")}
                          />
                          {form.formState.errors.name && (
                            <span className="text-destructive text-xs">
                              {form.formState.errors.name.message}
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-900 dark:text-white">
                            {copy("023", "Email Address")}
                          </label>
                          <input
                            {...form.register("email")}
                            type="email"
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                            placeholder={copy("024", "john@company.com")}
                          />
                          {form.formState.errors.email && (
                            <span className="text-destructive text-xs">
                              {form.formState.errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-900 dark:text-white">
                            {copy("025", "Company (Optional)")}
                          </label>
                          <input
                            {...form.register("company")}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                            placeholder={copy("026", "Acme Corp")}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-900 dark:text-white">
                            {copy("027", "Service of Interest")}
                          </label>
                          <select
                            {...form.register("service")}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
                          >
                            <option value="">
                              {copy("028", "General Inquiry")}
                            </option>
                            <option value="software">
                              {copy("029", "Software Solutions")}
                            </option>
                            <option value="cloud">
                              {copy("030", "Cloud Hosting")}
                            </option>
                            <option value="consultancy">
                              {copy("031", "Consultancy")}
                            </option>
                            <option value="products">
                              {copy("032", "Products")}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                          {copy("033", "Message")}
                        </label>
                        <textarea
                          {...form.register("message")}
                          rows={6}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                          placeholder={copy("034", "How can we help you?")}
                        />
                        {form.formState.errors.message && (
                          <span className="text-destructive text-xs">
                            {form.formState.errors.message.message}
                          </span>
                        )}
                      </div>

                      <div
                        className="absolute -left-[10000px]"
                        aria-hidden="true"
                      >
                        <label htmlFor="contact-website">
                          {copy("035", "Website")}
                        </label>
                        <input
                          id="contact-website"
                          {...form.register("website")}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full md:w-auto h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white text-base"
                      >
                        {mutation.isPending
                          ? "Sending Message..."
                          : "Send Message"}
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
