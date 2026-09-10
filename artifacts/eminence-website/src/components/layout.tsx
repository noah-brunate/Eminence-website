import { useSiteCopy } from "@/lib/site-content";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import {
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useSubscribeNewsletter } from "@workspace/api-client-react";

const Logo = () => {
  const copy = useSiteCopy("layout");
  return (
    <div className="flex items-center gap-1 font-bold text-xl tracking-tight">
      <span className="text-primary dark:text-white flex items-center relative">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1"
        >
          <rect width="24" height="24" rx="4" fill="currentColor" />
          <path d="M7 8H17V10H7V8Z" fill="white" className="dark:fill-black" />
          <path
            d="M7 11.5H15V13.5H7V11.5Z"
            fill="white"
            className="dark:fill-black"
          />
          <path
            d="M7 15H17V17H7V15Z"
            fill="white"
            className="dark:fill-black"
          />
        </svg>
        {copy("001", "EMINENCE")}
      </span>
    </div>
  );
};

const Navbar = () => {
  const copy = useSiteCopy("layout");
  const navLinks = [
    {
      name: copy("nav-1", "Services"),
      subLinks: [
        {
          name: copy("nav-2", "Software Solutions"),
          href: "/services/software-solutions",
        },
        {
          name: copy("nav-3", "Cloud Hosting"),
          href: "/services/cloud-hosting",
        },
        { name: copy("nav-4", "Consultancy"), href: "/services/consultancy" },
      ],
    },
    { name: copy("nav-5", "Products"), href: "/products" },
    { name: copy("nav-6", "Blog"), href: "/blog" },
    { name: copy("nav-7", "About"), href: "/about" },
    { name: copy("nav-8", "Careers"), href: "/careers" },
    { name: copy("nav-9", "Testimonials"), href: "/testimonials" },
  ];

  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-10">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.href ? (
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-accent ${
                      location === link.href ||
                      location.startsWith(link.href + "/")
                        ? "text-accent"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer hover:text-accent transition-colors py-2">
                    {link.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />

                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 w-48">
                      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 flex flex-col gap-1 overflow-hidden">
                        {link.subLinks?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`px-4 py-2.5 rounded-lg text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                              location === sub.href
                                ? "text-accent font-medium bg-slate-50 dark:bg-slate-800"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 z-10">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <div className="hidden sm:block">
              <Button
                asChild
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
              >
                <Link href="/contact">{copy("002", "Get in Touch")}</Link>
              </Button>
            </div>
            <button
              className="lg:hidden p-2 text-slate-900 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-2">
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-slate-900 dark:text-white"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <>
                      <div className="text-lg font-medium text-slate-900 dark:text-white opacity-50">
                        {link.name}
                      </div>
                      <div className="flex flex-col gap-2 pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
                        {link.subLinks?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="text-base text-slate-600 dark:text-slate-400 py-1"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
                <Button
                  asChild
                  className="w-full bg-primary text-white rounded-full"
                >
                  <Link href="/contact">{copy("003", "Get in Touch")}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const Footer = () => {
  const copy = useSiteCopy("layout");

  const { toast } = useToast();
  const newsletter = useSubscribeNewsletter();
  const form = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: { email: string }) => {
    newsletter.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: copy("004", "Subscribed successfully!"),
            description: copy("005", "Check your inbox for confirmation."),
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: copy("006", "Subscription failed"),
            description: copy("007", "Please try again later."),
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 lg:py-24 border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Logo />
            <p className="text-slate-400 text-base max-w-sm">
              {copy(
                "008",
                "Engineering the Future, One Solution at a Time. Precision, depth, and results you can trust.",
              )}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={copy("009", "#")}
                className="p-2 rounded-full bg-slate-900 hover:bg-accent text-slate-400 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={copy("010", "#")}
                className="p-2 rounded-full bg-slate-900 hover:bg-accent text-slate-400 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={copy("011", "#")}
                className="p-2 rounded-full bg-slate-900 hover:bg-accent text-slate-400 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">
              {copy("012", "Company")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  {copy("013", "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-accent transition-colors"
                >
                  {copy("014", "Careers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-accent transition-colors"
                >
                  {copy("015", "Blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  {copy("016", "Contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">
              {copy("017", "Services")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/services/software-solutions"
                  className="hover:text-accent transition-colors"
                >
                  {copy("018", "Software Solutions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cloud-hosting"
                  className="hover:text-accent transition-colors"
                >
                  {copy("019", "Cloud Hosting")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/consultancy"
                  className="hover:text-accent transition-colors"
                >
                  {copy("020", "Consultancy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent transition-colors"
                >
                  {copy("021", "Our Products")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-6">
              {copy("022", "Newsletter")}
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              {copy(
                "023",
                "Stay updated with our latest news and engineering insights.",
              )}
            </p>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div className="flex relative">
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder={copy("024", "Enter your email")}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all pr-12"
                />
                <button
                  type="submit"
                  disabled={newsletter.isPending}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-white transition-colors p-1"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              {form.formState.errors.email && (
                <span className="text-destructive text-sm">
                  {form.formState.errors.email.message}
                </span>
              )}
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            {copy("025", "© ")}
            {new Date().getFullYear()}
            {copy("026", " EMINENCE Inc. All rights reserved.")}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              {copy("027", "Privacy Policy")}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {copy("028", "Terms of Service")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full font-sans">
      <Navbar />
      <main className="flex-1 w-full pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
