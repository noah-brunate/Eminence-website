import React, { useMemo } from 'react';
import { useRoute, Link } from 'wouter';
import { useListBlogPosts } from '@workspace/api-client-react';
import { Reveal } from '@/components/animations';
import { ArrowLeft, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import NotFound from '@/pages/not-found';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug;
  
  const { data: posts, isLoading } = useListBlogPosts();
  
  const post = useMemo(() => {
    return posts?.find(p => p.slug === slug);
  }, [posts, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 container mx-auto px-4 max-w-3xl">
        <div className="space-y-8 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="mt-12 space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold tracking-wider uppercase">
                {post.category}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                {new Date(post.publishedAt).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
              </span>
              {post.readTime && (
                <>
                  <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">{post.readTime}</span>
                </>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between py-6 border-t border-slate-200 dark:border-slate-800 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{post.author}</div>
                  <div className="text-sm text-slate-500">Engineering Team</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal delay={0.2}>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="lead text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-10">
                {post.excerpt}
              </p>
              
              <h2>The Challenge</h2>
              <p>
                When building systems at scale, the conventional wisdom often falls short. What works for a thousand users completely breaks down at a million. In this article, we explore the architectural decisions that enabled us to solve this specific challenge.
              </p>
              <p>
                As engineers, we frequently encounter trade-offs. The CAP theorem reminds us we can't have it all. However, by carefully analyzing access patterns and domain constraints, we found a path forward that compromised neither performance nor reliability.
              </p>
              
              <h3>Architectural Approach</h3>
              <p>
                Our initial thought was to simply scale horizontally. Add more nodes, put a load balancer in front, and call it a day. But horizontal scaling only works if your data tier can handle the concurrent connections.
              </p>
              
              <blockquote>
                "The complexity of a system is a reflection of the organization that built it. We needed to simplify the organization to simplify the architecture."
              </blockquote>
              
              <p>
                Instead of throwing more hardware at the problem, we decided to fundamentally rethink the data flow. We implemented an event-driven architecture using an append-only log, paired with read-optimized materialized views.
              </p>
              
              <h2>Results and Learnings</h2>
              <ul>
                <li><strong>99.9% reduction</strong> in database locking issues</li>
                <li><strong>Sub-50ms latency</strong> at the 99th percentile</li>
                <li><strong>Linear scalability</strong> without coordination overhead</li>
              </ul>
              
              <p>
                The biggest takeaway wasn't the specific technology choice, but the methodology. By stepping back and measuring the actual bottlenecks instead of assuming we knew them, we saved months of engineering effort.
              </p>
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div className="text-slate-500 font-medium">Enjoyed this article?</div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  Share on Twitter
                </button>
                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  Share on LinkedIn
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
