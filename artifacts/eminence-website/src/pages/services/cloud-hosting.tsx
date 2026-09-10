import { useSiteCopy } from "@/lib/site-content";
import React from "react";
import { Reveal, StaggerChildren } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Server,
  Shield,
  Zap,
  ArrowRight,
  Cloud,
  Database,
  Lock,
  Activity,
} from "lucide-react";

export default function CloudHosting() {
  const copy = useSiteCopy("services-cloud-hosting");

  const features = [
    {
      icon: <Server className="w-6 h-6" />,
      title: copy("001", "Dedicated Infrastructure"),
      description: copy(
        "002",
        "Isolated environments tailored for high-performance workloads, offering complete control and uncompromised security.",
      ),
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: copy("003", "Multi-Cloud Strategy"),
      description: copy(
        "004",
        "Seamless deployment across AWS, GCP, and Azure. We architect for redundancy and vendor independence.",
      ),
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: copy("005", "Managed Databases"),
      description: copy(
        "006",
        "Automated backups, scaling, and maintenance for PostgreSQL, Redis, MongoDB, and specialized data stores.",
      ),
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: copy("007", "Enterprise Security"),
      description: copy(
        "008",
        "Zero-trust architecture, DDoS protection, WAF, and automated compliance auditing out of the box.",
      ),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: copy("009", "Edge Compute"),
      description: copy(
        "010",
        "Deploy logic globally with our edge network integration, reducing latency to milliseconds for global users.",
      ),
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: copy("011", "Observability"),
      description: copy(
        "012",
        "Deep insights with integrated metrics, logs, and traces. AI-powered anomaly detection alerts you before issues occur.",
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 dark:opacity-20 pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-teal-600 fill-current"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L100,0 L100,100 L0,100 Z M20,20 L80,20 L80,80 L20,80 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="20"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-400 px-3 py-1 text-sm font-medium mb-6">
                {copy("013", "Infrastructure as a Service")}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                {copy("014", "Bulletproof ")}
                <span className="text-teal-600 dark:text-teal-500">
                  {copy("015", "Cloud Hosting")}
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
                {copy(
                  "016",
                  "Mission-critical infrastructure engineered for scale. We manage the complexity of cloud operations so you can focus on shipping product.",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-teal-600 hover:bg-teal-700 text-white h-14 px-8 text-base"
                >
                  <Link href="/contact?service=cloud">
                    {copy("017", "Deploy with EMINENCE")}
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {copy("018", "Engineered for Reliability")}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {copy(
                  "019",
                  "Our infrastructure stack is built on industry best practices, combining raw performance with unparalleled stability.",
                )}
              </p>
            </div>
          </Reveal>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover-elevate transition-all"
              >
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {copy("020", "Modern Stack, Zero Compromise")}
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {copy(
                  "021",
                  "We don't do shared hosting. Every deployment is containerized, orchestrated via Kubernetes, and geographically distributed. Whether you need a HIPAA-compliant healthcare platform or a low-latency fintech backend, our architecture adapts.",
                )}
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  copy("item-1", "99.999% SLA Guarantee"),
                  copy("item-2", "Automated CI/CD Pipelines"),
                  copy("item-3", "24/7/365 SRE Support"),
                  copy("item-4", "Transparent Billing"),
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                      <Shield className="w-3 h-3" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-teal-500 text-teal-400 hover:bg-teal-950 h-12 px-8"
              >
                <Link href="/contact">
                  {copy("022", "Request Architecture Review")}
                </Link>
              </Button>
            </Reveal>

            <Reveal direction="left" className="relative">
              <div className="absolute inset-0 bg-teal-500/10 blur-[100px] rounded-full"></div>
              <div className="relative border border-slate-800 bg-slate-900 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {copy("023", "cluster-status")}
                  </div>
                </div>

                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center text-teal-400">
                    <span>
                      {">"}
                      {copy("024", " kubectl get nodes -o wide")}
                    </span>
                    <span>{copy("025", "READY")}</span>
                  </div>
                  <div className="pl-4 text-slate-400 border-l border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">
                        {copy("026", "node-us-east-1a")}
                      </span>{" "}
                      <span>{copy("027", "v1.28.0")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">
                        {copy("028", "node-us-east-1b")}
                      </span>{" "}
                      <span>{copy("029", "v1.28.0")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">
                        {copy("030", "node-us-east-1c")}
                      </span>{" "}
                      <span>{copy("031", "v1.28.0")}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-teal-400 pt-4">
                    <span>
                      {">"}
                      {copy("032", " eminence scale --replicas=10")}
                    </span>
                    <span>{copy("033", "SUCCESS")}</span>
                  </div>
                  <div className="pl-4 text-slate-400 border-l border-slate-800 space-y-2">
                    <div className="text-slate-300">
                      {copy("034", "Scaling deployment/api-server...")}
                    </div>
                    <div className="text-slate-500">
                      {copy("035", "Traffic routed via Anycast edge")}
                    </div>
                    <div className="text-green-400">
                      {copy("036", "System operating at optimal parameters")}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-teal-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {copy("037", "Stop managing servers.")}
            </h2>
            <p className="text-xl text-teal-100 mb-10">
              {copy(
                "038",
                "Let EMINENCE handle your infrastructure while your team focuses on writing code.",
              )}
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 px-10 rounded-full bg-white text-teal-700 hover:bg-slate-100"
            >
              <Link href="/contact?service=cloud">
                {copy("039", "Talk to an Infrastructure Expert")}
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
