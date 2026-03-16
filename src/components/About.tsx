import { motion } from 'motion/react';
import { Wrench, Heart, Ban, Smile } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: <Wrench className="w-8 h-8 text-primary" />, title: "10+ tools", desc: "For everyday tasks" },
    { icon: <Heart className="w-8 h-8 text-accent" />, title: "100% Free", desc: "No hidden costs" },
    { icon: <Ban className="w-8 h-8 text-highlight" />, title: "No Ads", desc: "Clean experience" }
  ];

  return (
    <section id="about" className="py-24 bg-bg-card px-4 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-text flex items-center justify-center lg:justify-start gap-4"
          >
            Why We Built This <Smile className="w-10 h-10 text-secondary" />
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-muted mb-12 leading-relaxed font-medium"
          >
            Built by people tired of googling simple tools every single day. 
            We just wanted a place where everything is fast, free, and doesn't ask for your life story.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                className="bg-bg rounded-3xl p-6 flex flex-col items-center lg:items-start text-center lg:text-left shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border flex items-center justify-center mb-4 shadow-sm">
                  {stat.icon}
                </div>
                <h3 className="text-xl font-bold text-text mb-1">{stat.title}</h3>
                <p className="text-text-muted font-medium text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated SVG Mascot */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex-1 relative w-full max-w-md"
        >
          <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-2xl">
            <motion.circle 
              cx="200" cy="200" r="180" 
              fill="var(--color-primary-light)" opacity="0.2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path 
              d="M100 250 Q200 350 300 250" 
              stroke="var(--color-primary)" strokeWidth="20" strokeLinecap="round" fill="none"
              animate={{ d: ["M100 250 Q200 350 300 250", "M100 250 Q200 300 300 250", "M100 250 Q200 350 300 250"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="140" cy="160" r="25" fill="var(--color-text)" />
            <circle cx="260" cy="160" r="25" fill="var(--color-text)" />
            <motion.circle 
              cx="145" cy="155" r="8" fill="white"
              animate={{ cx: [145, 150, 145], cy: [155, 155, 150, 155] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.circle 
              cx="265" cy="155" r="8" fill="white"
              animate={{ cx: [265, 270, 265], cy: [155, 155, 150, 155] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            {/* Floating tools around mascot */}
            <motion.g animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <rect x="50" y="80" width="40" height="40" rx="10" fill="var(--color-secondary)" />
            </motion.g>
            <motion.g animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
              <circle cx="350" cy="100" r="20" fill="var(--color-accent)" />
            </motion.g>
            <motion.g animate={{ y: [-5, 15, -5], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity }}>
              <polygon points="320,320 360,320 340,280" fill="var(--color-highlight)" />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
