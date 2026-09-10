import { useSiteCopy } from "@/lib/site-content";
import React from "react";
import { Link } from "wouter";
import { useListBlogPosts } from "@workspace/api-client-react";
import { Reveal, StaggerChildren } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Blog() {
  const copy = useSiteCopy("blog");

  const { data: posts, isLoading } = useListBlogPosts();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                {copy("001", "Engineering ")}
                <span className="text-primary dark:text-accent">
                  {copy("002", "Insights")}
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {copy(
                  "003",
                  "Technical deep-dives, architectural case studies, and engineering culture thoughts from the EMINENCE team.",
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Post (first post) */}
      {!isLoading && posts && posts.length > 0 && (
        <section className="py-12 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <Reveal>
              <Link href={`/blog/${posts[0].slug}`} className="group block">
                <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 flex flex-col md:flex-row shadow-2xl hover-elevate transition-all">
                  <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-accent text-white rounded-full text-xs font-bold tracking-wider uppercase">
                          {posts[0].category}
                        </span>
                        <span className="text-slate-400 text-sm">
                          {new Date(posts[0].publishedAt).toLocaleDateString(
                            undefined,
                            { month: "long", day: "numeric", year: "numeric" },
                          )}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-accent transition-colors">
                        {posts[0].title}
                      </h2>
                      <p className="text-slate-300 text-lg mb-8 line-clamp-3">
                        {posts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-sm border border-slate-700">
                          {posts[0].author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">
                            {posts[0].author}
                          </div>
                          {posts[0].readTime && (
                            <div className="text-slate-500 text-xs">
                              {posts[0].readTime}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-slate-900 relative min-h-[300px] flex items-center justify-center border-l border-slate-800">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent via-slate-900 to-slate-900"></div>
                    <BookOpen className="w-32 h-32 text-slate-800 group-hover:text-accent/50 group-hover:scale-110 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="py-16 bg-white dark:bg-slate-900 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-[400px] bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.slice(1).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full"
                >
                  <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover-elevate transition-all flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-accent font-semibold text-xs tracking-wider uppercase">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">
                        {new Date(post.publishedAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-accent transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 mb-8 line-clamp-3 text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-xs">
                          {post.author.charAt(0)}
                        </div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {post.author}
                        </div>
                      </div>

                      <div className="text-slate-400 group-hover:text-accent transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary dark:bg-slate-950 text-white border-t border-primary/20 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {copy("004", "Never miss an update")}
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              {copy(
                "005",
                "Get our latest technical articles and company news delivered straight to your inbox.",
              )}
            </p>
            {/* The actual form is in the footer, we can just jump to it */}
            <Button
              size="lg"
              className="rounded-full bg-accent hover:bg-accent/90 text-white"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              {copy("006", "Subscribe to Newsletter")}
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
