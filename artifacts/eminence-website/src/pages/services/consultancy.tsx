import { useSiteCopy } from "@/lib/site-content";
import React from "react";
import { Reveal, StaggerChildren } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Users,
  Target,
  BarChart,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useSubmitBooking } from "@workspace/api-client-react";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().max(40).optional(),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().max(3000).optional(),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Please select a time"),
  timezone: z.string().min(1, "Please select a timezone"),
  website: z.string().optional(),
});

const TIMEZONES = [
  "Africa/Kampala",
  "Africa/Nairobi",
  "Africa/Johannesburg",
  "Europe/London",
  "America/New_York",
  "UTC",
];

function zonedDateTimeToUtc(date: Date, time: string, timeZone: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const target = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
  );
  let guess = target;

  for (let iteration = 0; iteration < 2; iteration += 1) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date(guess));
    const values = Object.fromEntries(
      parts.map((part) => [part.type, part.value]),
    );
    const represented = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second),
    );
    guess = target - (represented - guess);
  }

  return new Date(guess);
}

export default function Consultancy() {
  const copy = useSiteCopy("services-consultancy");

  const { toast } = useToast();
  const mutation = useSubmitBooking();
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      topic: "",
      message: "",
      date: undefined,
      time: "",
      timezone: TIMEZONES.includes(browserTimezone)
        ? browserTimezone
        : "Africa/Kampala",
      website: "",
    },
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    mutation.mutate(
      {
        data: {
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone || null,
          topic: data.topic,
          message: data.message || null,
          preferredAt: zonedDateTimeToUtc(
            data.date,
            data.time,
            data.timezone,
          ).toISOString(),
          timezone: data.timezone,
          website: data.website || null,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: copy("001", "Consultation Request Sent"),
            description: `We received your request for ${format(data.date, "PPP")} at ${data.time} and will confirm it by email.`,
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: copy("002", "Request Failed"),
            description: copy(
              "003",
              "We couldn't send your consultation request. Please try again or email info@eminence.co.ug.",
            ),
            variant: "destructive",
          });
        },
      },
    );
  };

  const methodologies = [
    {
      icon: <Target className="w-6 h-6" />,
      title: copy("004", "Architecture Audits"),
      desc: copy(
        "005",
        "Deep-dive analysis of your current systems to identify bottlenecks, security flaws, and scaling limitations.",
      ),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: copy("006", "Team Augmentation"),
      desc: copy(
        "007",
        "Embedding senior engineering leadership into your teams to level up practices and deliver critical milestones.",
      ),
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: copy("008", "Digital Transformation"),
      desc: copy(
        "009",
        "Strategic roadmapping to transition legacy enterprises into agile, technology-first organizations.",
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-500 px-3 py-1 text-sm font-medium mb-6">
                {copy("010", "Strategic Advisory")}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                {copy("011", "Clarity in ")}
                <span className="text-amber-600 dark:text-amber-500">
                  {copy("012", "Complexity")}
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
                {copy(
                  "013",
                  "Senior engineering leadership and strategic guidance for organizations facing critical technical inflection points.",
                )}
              </p>
              <Button
                size="lg"
                className="rounded-full bg-amber-600 hover:bg-amber-700 text-white h-14 px-8 text-base"
                onClick={() => {
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {copy("014", "Schedule a Session")}
              </Button>
            </Reveal>

            <Reveal direction="left" className="relative hidden lg:block">
              <div className="absolute inset-0 bg-amber-500/20 blur-[120px] rounded-full"></div>
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <img
                      src={copy(
                        "015",
                        "https://ui-avatars.com/api/?name=Eminence+Expert&background=0F6E56&color=fff",
                      )}
                      alt={copy("016", "Expert")}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">
                      {copy("017", "Principal Architect")}
                    </h3>
                    <p className="text-slate-500 text-sm">
                      {copy("018", "Available for advisory")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="font-semibold text-sm mb-1 dark:text-white">
                      {copy("019", "Topic")}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">
                      {copy("020", "Microservices Transition Strategy")}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-sm mb-1 dark:text-white">
                        {copy("021", "Duration")}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {copy("022", "60 Minutes")}
                      </div>
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
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {copy("023", "Advisory Focus Areas")}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {copy(
                  "024",
                  "We bring decades of collective engineering experience to solve high-stakes business challenges.",
                )}
              </p>
            </div>
          </Reveal>

          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {methodologies.map((item, i) => (
              <div key={i} className="flex flex-col text-center items-center">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Booking Widget */}
      <section
        id="booking"
        className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">
                  {copy("025", "Book a Discovery Session")}
                </h3>
                <p className="text-slate-300 mb-8">
                  {copy(
                    "026",
                    "A complimentary 45-minute consultation with a Principal Engineer to evaluate your technical needs.",
                  )}
                </p>

                <ul className="space-y-4">
                  {[
                    copy("item-1", "Non-disclosure agreement guaranteed"),
                    copy("item-2", "Direct access to senior leadership"),
                    copy("item-3", "Actionable technical roadmap delivered"),
                    copy("item-4", "No commitment required"),
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">
                      {copy("027", "Name")}
                    </label>
                    <input
                      {...form.register("name")}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      placeholder={copy("028", "Jane Doe")}
                    />
                    {form.formState.errors.name && (
                      <span className="text-destructive text-xs">
                        {form.formState.errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">
                      {copy("029", "Email")}
                    </label>
                    <input
                      {...form.register("email")}
                      type="email"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      placeholder={copy("030", "jane@company.com")}
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
                    {copy("031", "Company")}
                  </label>
                  <input
                    {...form.register("company")}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder={copy("032", "Acme Corp")}
                  />
                  {form.formState.errors.company && (
                    <span className="text-destructive text-xs">
                      {form.formState.errors.company.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">
                    {copy("033", "Phone (Optional)")}
                  </label>
                  <input
                    {...form.register("phone")}
                    type="tel"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder={copy("034", "+256 700 000000")}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">
                    {copy("035", "Primary Topic")}
                  </label>
                  <select
                    {...form.register("topic")}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">{copy("036", "Select a topic...")}</option>
                    <option value="Architecture Review">
                      {copy("037", "Architecture Review")}
                    </option>
                    <option value="Cloud Migration">
                      {copy("038", "Cloud Migration Strategy")}
                    </option>
                    <option value="Scaling Challenges">
                      {copy("039", "Scaling Challenges")}
                    </option>
                    <option value="Team Augmentation">
                      {copy("040", "Team Augmentation")}
                    </option>
                    <option value="Other">{copy("041", "Other")}</option>
                  </select>
                  {form.formState.errors.topic && (
                    <span className="text-destructive text-xs">
                      {form.formState.errors.topic.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex flex-col">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">
                    {copy("042", "Preferred Date")}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 ${!form.watch("date") && "text-slate-500"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch("date") ? (
                          format(form.watch("date"), "PPP")
                        ) : (
                          <span>{copy("043", "Pick a date")}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.watch("date")}
                        onSelect={(date) => date && form.setValue("date", date)}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.date && (
                    <span className="text-destructive text-xs">
                      {form.formState.errors.date.message}
                    </span>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">
                      {copy("044", "Preferred Time")}
                    </label>
                    <input
                      {...form.register("time")}
                      type="time"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                    {form.formState.errors.time && (
                      <span className="text-destructive text-xs">
                        {form.formState.errors.time.message}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">
                      {copy("045", "Timezone")}
                    </label>
                    <select
                      {...form.register("timezone")}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      {TIMEZONES.map((timezone) => (
                        <option key={timezone} value={timezone}>
                          {timezone}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">
                    {copy("046", "Additional Details (Optional)")}
                  </label>
                  <textarea
                    {...form.register("message")}
                    rows={4}
                    className="w-full resize-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    placeholder={copy(
                      "047",
                      "Tell us briefly what you would like to discuss.",
                    )}
                  />
                </div>

                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="booking-website">
                    {copy("048", "Website")}
                  </label>
                  <input
                    id="booking-website"
                    {...form.register("website")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12"
                >
                  {mutation.isPending ? "Sending..." : "Request Session"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
