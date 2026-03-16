import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Activity, Calculator, Clock, Droplets } from 'lucide-react';
import { cn } from '../utils';

export default function Hero() {
  const [toolText, setToolText] = useState('');
  const [toolIndex, setToolIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const countSpring = useSpring(0, { stiffness: 50, damping: 20 });
  const roundedCount = useTransform(countSpring, (latest) => Math.round(latest).toLocaleString());

  const tools = ['Bill Splitter', 'Decision Maker', 'Water Tracker', 'Unit Converter', 'Pomodoro Timer'];

  useEffect(() => {
    countSpring.set(12450);
    const interval = setInterval(() => {
      countSpring.set(countSpring.get() + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [countSpring]);

  useEffect(() => {
    const currentTool = tools[toolIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && toolText === currentTool) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && toolText === '') {
        setIsDeleting(false);
        setToolIndex((prev) => (prev + 1) % tools.length);
      } else {
        setToolText(currentTool.substring(0, toolText.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [toolText, isDeleting, toolIndex]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-bg">
      {/* Particle/Wave Background */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10 pointer-events-none">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Animated blobs */}
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating 3D Cards Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden lg:block">
        <FloatingCard icon={<Calculator className="w-8 h-8 text-primary" />} title="Split Bill" delay={0} x="-30vw" y="-20vh" rotate={-15} />
        <FloatingCard icon={<Activity className="w-8 h-8 text-accent" />} title="Mood Log" delay={2} x="30vw" y="-10vh" rotate={10} />
        <FloatingCard icon={<Clock className="w-8 h-8 text-highlight" />} title="Timer" delay={4} x="-25vw" y="25vh" rotate={20} />
        <FloatingCard icon={<Droplets className="w-8 h-8 text-secondary" />} title="Water" delay={1} x="25vw" y="30vh" rotate={-10} />
      </div>

      <div className="z-10 max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border text-sm font-medium text-text-muted mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>New: Pomodoro Timer is live!</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-text mb-6 tracking-tight leading-tight"
        >
          Your Life, But <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-highlight">
            Easier 🚀
          </span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-muted mb-10 font-medium h-16 flex items-center justify-center gap-2"
        >
          <span>Free tools for</span>
          <span className="text-primary font-bold min-w-[200px] text-left border-r-2 border-primary pr-1 animate-pulse">
            {toolText}
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#features" className="group relative px-8 py-4 bg-primary text-white font-bold rounded-2xl text-lg shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Try It Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          <a href="#about" className="px-8 py-4 bg-bg-card border-2 border-border text-text font-bold rounded-2xl text-lg shadow-sm hover:border-primary hover:text-primary transition-all">
            See What's Inside
          </a>
        </motion.div>

        {/* Live Counter */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-16 flex flex-col items-center justify-center gap-2"
        >
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-10 h-10 rounded-full border-2 border-bg shadow-sm" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-bg bg-bg-card flex items-center justify-center text-xs font-bold text-text-muted shadow-sm">
              +2k
            </div>
          </div>
          <p className="text-sm text-text-muted font-medium flex items-center gap-1">
            <motion.strong className="text-text">{roundedCount}</motion.strong> tools used today
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({ icon, title, delay, x, y, rotate }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [y, `calc(${y} - 20px)`, y],
        rotate: [rotate, rotate + 5, rotate]
      }}
      transition={{ 
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay }
      }}
      className="absolute bg-bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl flex items-center gap-4"
      style={{ left: `calc(50% + ${x})`, top: `calc(50% + ${y})` }}
    >
      <div className="p-3 bg-bg rounded-xl border border-border">
        {icon}
      </div>
      <span className="font-bold text-text">{title}</span>
    </motion.div>
  );
}
