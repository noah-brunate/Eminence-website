import { useSiteCopy } from "@/lib/site-content";
import React from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerChildren } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  useGetStats,
  useListProducts,
  useListTestimonials,
  useListBlogPosts,
} from "@workspace/api-client-react";
import {
  ArrowRight,
  Server,
  Code,
  Building,
  Cpu,
  Star,
  Quote,
} from "lucide-react";

const AnimatedCounter = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => {
  const copy = useSiteCopy("home");

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover-elevate">
      <div className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-2 font-mono tracking-tight">
        {value.toLocaleString()}
        <span className="text-accent">{copy("001", "+")}</span>
      </div>
      <div className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">
        {label}
      </div>
    </div>
  );
};

export default function Home() {
  const copy = useSiteCopy("home");

  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: products, isLoading: productsLoading } = useListProducts();
  const { data: testimonials, isLoading: testimonialsLoading } =
    useListTestimonials();
  const { data: blogPosts, isLoading: blogLoading } = useListBlogPosts();

  console.log("** Current products data type:", typeof products, products);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-accent opacity-20 blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 mt-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-md mb-8">
                <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                {copy("002", "Pioneering Enterprise Solutions")}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                {copy("003", "Engineering the Future, ")}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-teal-400">
                  {copy("004", "One Solution at a Time.")}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                {copy(
                  "005",
                  "Precision-engineered software, cloud infrastructure, and deep technical consultancy for companies scaling to the next level.",
                )}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 rounded-full text-base bg-accent hover:bg-accent/90 text-white w-full sm:w-auto shadow-lg shadow-accent/25"
                >
                  <Link href="/contact">{copy("006", "Get Started")}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full text-base border-white/20 text-white hover:bg-white/10 w-full sm:w-auto backdrop-blur-sm bg-white/5"
                >
                  <Link href="#services">{copy("007", "Our Services")}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Animated wave bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10"></div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <AnimatedCounter
                value={stats?.clientsServed || 500}
                label={copy("008", "Clients Served")}
              />
              <AnimatedCounter
                value={stats?.projectsDelivered || 1200}
                label={copy("009", "Projects Delivered")}
              />
              <AnimatedCounter
                value={stats?.teamSize || 150}
                label={copy("010", "Engineers")}
              />
              <AnimatedCounter
                value={stats?.countriesReached || 30}
                label={copy("011", "Countries")}
              />
            </div>
          )}
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                {copy("012", "Core Capabilities")}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {copy(
                  "013",
                  "End-to-end technical excellence spanning custom development, robust infrastructure, and strategic advisory.",
                )}
              </p>
            </Reveal>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/services/software-solutions"
              className="group p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover-elevate transition-all"
            >
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-7 h-7 text-primary dark:text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                {copy("014", "Software Solutions")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                {copy(
                  "015",
                  "Bespoke enterprise applications, scalable architectures, and modern web platforms built for performance.",
                )}
              </p>
              <div className="text-accent font-medium flex items-center text-sm">
                {copy("016", "Learn more")}{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/services/cloud-hosting"
              className="group p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover-elevate transition-all"
            >
              <div className="w-14 h-14 bg-teal-500/10 dark:bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Server className="w-7 h-7 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
                {copy("017", "Cloud Hosting")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                {copy(
                  "018",
                  "High-availability infrastructure, seamless migrations, and managed DevOps for mission-critical workloads.",
                )}
              </p>
              <div className="text-teal-600 dark:text-teal-400 font-medium flex items-center text-sm">
                {copy("019", "Learn more")}{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/services/consultancy"
              className="group p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover-elevate transition-all"
            >
              <div className="w-14 h-14 bg-amber-500/10 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                {copy("020", "Consultancy")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                {copy(
                  "021",
                  "Strategic tech leadership, architecture audits, and digital transformation roadmaps for scale-ups.",
                )}
              </p>
              <div className="text-amber-600 dark:text-amber-400 font-medium flex items-center text-sm">
                {copy("022", "Learn more")}{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/products"
              className="group p-8 bg-primary dark:bg-primary rounded-3xl shadow-lg hover-elevate transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {copy("023", "Proprietary Products")}
              </h3>
              <p className="text-primary-foreground/80 mb-6 line-clamp-3">
                {copy(
                  "024",
                  "Access our suite of internal tools and SaaS products designed to accelerate development and deployment.",
                )}
              </p>
              <div className="text-white font-medium flex items-center text-sm">
                {copy("025", "View portfolio")}{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </StaggerChildren>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 overflow-hidden bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  {copy("026", "Featured Products")}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {copy(
                    "027",
                    "Tools engineered by our team to solve complex industry challenges.",
                  )}
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/products">{copy("028", "View All Products")}</Link>
              </Button>
            </div>
          </Reveal>

          {productsLoading ? (
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="min-w-[300px] md:min-w-[400px] h-[250px] bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {Array.isArray(products) ? (
                products?.slice(0, 4).map((product, i) => (
                  <Reveal
                    key={product.id}
                    delay={i * 0.1}
                    direction="left"
                    className="snap-start min-w-[85vw] sm:min-w-[350px] md:min-w-[400px]"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="block group h-full"
                    >
                      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 h-full flex flex-col hover-elevate transition-all hover:border-accent/50">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 bg-primary dark:bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl">
                            {product.name.substring(0, 2)}
                          </div>
                          {product.status && (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.status.toLowerCase() === "live"
                                  ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400"
                                  : product.status.toLowerCase() === "beta"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                    : "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                              }`}
                            >
                              {product.status}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          {product.name}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-2">
                          {product.tagline}
                        </p>

                        <div className="flex items-center text-accent font-medium group-hover:underline">
                          {copy("029", "Explore product")}{" "}
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))
              ) : (
                <div className="text-slate-500 dark:text-slate-400 text-center w-full py-16">
                  {copy("030", "No products available at the moment.")}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials highlight */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                {copy("031", "Trusted by Leaders")}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                {copy(
                  "032",
                  "Don't just take our word for it. Here's what our clients have to say about working with EMINENCE.",
                )}
              </p>
            </div>
          </Reveal>

          {testimonialsLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-white dark:bg-slate-800 rounded-3xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <StaggerChildren className="grid md:grid-cols-3 gap-6">
              {testimonials?.slice(0, 3).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative"
                >
                  <Quote className="w-10 h-10 text-slate-100 dark:text-slate-800 absolute top-6 right-6" />
                  <div className="flex items-center gap-1 text-amber-500 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "fill-current" : "text-slate-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-8 italic relative z-10 font-serif leading-relaxed text-lg">
                    {copy("033", '"')}
                    {testimonial.quote}
                    {copy("034", '"')}
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">
                      {testimonial.clientName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {testimonial.clientName}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                        {copy("035", ", ")}
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  {copy("036", "Engineering Insights")}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {copy(
                    "037",
                    "Latest thoughts, case studies, and technical deep-dives from our team.",
                  )}
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/blog">{copy("038", "Read Our Blog")}</Link>
              </Button>
            </div>
          </Reveal>

          {blogLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <StaggerChildren className="grid md:grid-cols-3 gap-8">
              {blogPosts?.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full"
                >
                  <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover-elevate transition-all h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent rounded-full text-xs font-semibold tracking-wide uppercase">
                        {post.category}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {new Date(post.publishedAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric" },
                        )}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-accent transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center text-sm font-medium text-slate-900 dark:text-white pt-6 border-t border-slate-200 dark:border-slate-800">
                      {copy("039", "Read article")}{" "}
                      <ArrowRight className="w-4 h-4 ml-2 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden bg-primary dark:bg-primary">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {copy("040", "Ready to scale your infrastructure?")}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-light">
              {copy(
                "041",
                "Partner with EMINENCE to build, scale, and optimize your technical operations.",
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 rounded-full text-base bg-white text-primary hover:bg-slate-100 w-full sm:w-auto"
              >
                <Link href="/contact">{copy("042", "Talk to an Expert")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-full text-base border-white/30 text-white hover:bg-white/10 w-full sm:w-auto bg-transparent"
              >
                <Link href="/services/consultancy">
                  {copy("043", "Book Consultation")}
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
