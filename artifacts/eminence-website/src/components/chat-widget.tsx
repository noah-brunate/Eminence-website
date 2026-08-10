import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSubmitChatMessage } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';

const chatSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  message: z.string().min(3, "Message must be at least 3 characters")
});

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [thread, setThread] = useState<{role: 'system' | 'user', text: string}[]>([
    { role: 'system', text: 'Hello! How can we help you today?' }
  ]);
  
  const chatMutation = useSubmitChatMessage();
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(chatSchema),
    defaultValues: { name: '', email: '', message: '' }
  });

  const onSubmit = (data: z.infer<typeof chatSchema>) => {
    setThread(prev => [...prev, { role: 'user', text: data.message }]);
    
    chatMutation.mutate({ data }, {
      onSuccess: () => {
        setThread(prev => [...prev, { role: 'system', text: 'Thanks for reaching out! A representative will get back to you shortly.' }]);
        form.reset({ name: data.name, email: data.email, message: '' });
      },
      onError: () => {
        toast({ title: "Failed to send message", variant: "destructive" });
        setThread(prev => [...prev, { role: 'system', text: 'Sorry, there was an error sending your message. Please try again later or use the contact form.' }]);
      }
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[500px]"
          >
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <div className="font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat with us
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex flex-col gap-3">
              {thread.map((msg, i) => (
                <div 
                  key={i} 
                  className={`max-w-[85%] rounded-xl p-3 text-sm ${
                    msg.role === 'system' 
                      ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 self-start rounded-tl-sm' 
                      : 'bg-primary text-white self-end rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="self-end bg-primary/80 text-white rounded-xl rounded-tr-sm p-3 text-sm animate-pulse">
                  Sending...
                </div>
              )}
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                {thread.length <= 1 && (
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      {...form.register('name')}
                      placeholder="Name" 
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-accent"
                    />
                    <input 
                      {...form.register('email')}
                      placeholder="Email" 
                      type="email"
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                )}
                <div className="flex gap-2 relative">
                  <input 
                    {...form.register('message')}
                    placeholder="Type your message..." 
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-accent"
                  />
                  <button 
                    type="submit"
                    disabled={chatMutation.isPending}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-accent hover:bg-accent/90 text-white rounded-full transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </>
  );
}
