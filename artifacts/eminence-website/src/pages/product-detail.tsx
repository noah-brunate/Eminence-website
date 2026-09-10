import { useSiteCopy } from "@/lib/site-content";
import React, { useMemo } from "react";
import { useRoute, Link } from "wouter";
import { useListProducts } from "@workspace/api-client-react";
import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Globe, Box, Cpu } from "lucide-react";
import NotFound from "@/pages/not-found";

export default function ProductDetail() {
  const copy = useSiteCopy("product-detail");

  const [, params] = useRoute("/products/:slug");
  const slug = params?.slug;

  const { data: products, isLoading } = useListProducts();

  const product = useMemo(() => {
    return products?.find((p) => p.slug === slug);
  }, [products, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-24 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="w-full">
      {/* Product Hero */}
      <section className="pt-32 pb-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <Link
                href="/products"
                className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {copy("001", "Back to Products")}
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <Box className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                    {product.name}
                  </h1>
                  <div className="text-accent font-medium mt-1">
                    {product.category}
                  </div>
                </div>
              </div>

              <p className="text-2xl text-slate-600 dark:text-slate-400 mb-10 font-light leading-relaxed">
                {product.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white h-14 px-8"
                >
                  {copy("002", "Request Demo")}
                </Button>
                {product.url && (
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-full h-14 px-8"
                  >
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {copy("003", "Visit Website")}
                    </a>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <Reveal>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  {copy("004", "Overview")}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                  <p>{product.description}</p>

                  {/* If there's no long description, provide some placeholder structural text */}
                  {product.description.length < 150 && (
                    <>
                      <p>
                        {copy(
                          "005",
                          "Built on modern architectural principles, ",
                        )}
                        {product.name}
                        {copy(
                          "006",
                          " was initially developed to solve internal challenges at EMINENCE before being packaged as a robust enterprise solution. It integrates seamlessly into existing workflows while providing unparalleled visibility and control.",
                        )}
                      </p>
                      <p>
                        {copy(
                          "007",
                          "The platform prioritizes security, speed, and developer experience above all else. Every feature has been battle-tested in high-traffic production environments.",
                        )}
                      </p>
                    </>
                  )}
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-1">
              <Reveal
                delay={0.2}
                className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 sticky top-32"
              >
                <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-xl">
                  {copy("008", "Key Features")}
                </h3>
                <ul className="space-y-4">
                  {product.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}

                  {(!product.features || product.features.length === 0) && (
                    <>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-400 text-sm">
                          {copy("009", "Enterprise-grade security")}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-400 text-sm">
                          {copy("010", "High availability architecture")}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-400 text-sm">
                          {copy("011", "Comprehensive API access")}
                        </span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    {copy("012", "Status")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${product.status.toLowerCase() === "live" ? "bg-teal-400" : "bg-amber-400"}`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 ${product.status.toLowerCase() === "live" ? "bg-teal-500" : "bg-amber-500"}`}
                      ></span>
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white capitalize">
                      {product.status}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
