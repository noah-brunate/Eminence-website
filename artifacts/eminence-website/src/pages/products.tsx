import React from 'react';
import { Reveal, StaggerChildren } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useListProducts } from '@workspace/api-client-react';
import { ArrowRight, Box, Cpu, Fingerprint } from 'lucide-react';

export default function Products() {
  const { data: products, isLoading } = useListProducts();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-primary dark:bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Proprietary <span className="text-accent">Products</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-0 leading-relaxed">
                Specialized software solutions engineered internally to solve complex operational challenges. Available for enterprise deployment.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-96 bg-white dark:bg-slate-800 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <StaggerChildren className="grid md:grid-cols-2 gap-8">
              {products?.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="block group">
                  <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm hover-elevate transition-all h-full flex flex-col relative overflow-hidden">
                    {/* Decorative bg element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-slate-100 dark:bg-slate-900 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                          <Box className="w-8 h-8" />
                        </div>
                        {product.status && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            product.status.toLowerCase() === 'live' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400' :
                            product.status.toLowerCase() === 'beta' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {product.status}
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{product.name}</h2>
                      <div className="text-accent font-medium mb-6">{product.category}</div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-8 flex-1 text-lg">
                        {product.tagline}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-2 text-slate-900 dark:text-white font-medium group-hover:text-accent transition-colors">
                        View Details <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>
    </div>
  );
}
