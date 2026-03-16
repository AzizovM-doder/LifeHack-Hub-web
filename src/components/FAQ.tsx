import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "Is it really 100% free?", a: "Yes! No premium tiers, no hidden fees, no credit card required. We built this because we were tired of paying for simple tools." },
  { q: "Do I need to create an account?", a: "Nope! You can use all the tools instantly without signing up. However, if you want to save your mood journal or water logs, you'll need to log in with Google." },
  { q: "Are there any ads?", a: "Zero. Zilch. Nada. We hate ads as much as you do. The site is clean and distraction-free." },
  { q: "Can I suggest a new tool?", a: "Absolutely! Scroll down to the contact form and send us your ideas. We build new tools based on user requests." },
  { q: "Is my data private?", a: "Yes. Tools like the Pomodoro Timer and Bill Splitter run entirely in your browser. If you log in to save data, it's securely stored in Firebase and never shared." }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-bg-card px-4 border-y border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-text"
          >
            Got Questions? 🤔
          </motion.h2>
          <p className="text-xl text-text-muted font-medium">We've got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-border rounded-2xl overflow-hidden bg-bg"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-border/20 transition-colors"
                aria-expanded={openIdx === idx}
              >
                <span className="font-bold text-lg text-text">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-text-muted font-medium border-t border-border/50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
