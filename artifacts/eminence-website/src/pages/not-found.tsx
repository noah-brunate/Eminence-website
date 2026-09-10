import { useSiteCopy } from "@/lib/site-content";
import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const copy = useSiteCopy("not-found");

  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-white dark:bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center shadow-xl border border-slate-100 dark:border-slate-800">
            <FileQuestion className="w-10 h-10 text-primary dark:text-accent" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            {copy("001", "404")}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {copy("002", "Page not found")}
          </p>
          <p className="text-slate-500 dark:text-slate-500">
            {copy(
              "003",
              "The page you're looking for doesn't exist or has been moved.",
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {copy("004", "Go Back")}
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto rounded-full bg-primary"
            onClick={() => setLocation("/")}
          >
            <Home className="w-4 h-4 mr-2" />
            {copy("005", "Return Home")}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
