import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Star, Calculator, Target, Droplets, ArrowRightLeft, Smile, Clock, X, Copy, Check } from 'lucide-react';
import { cn } from '../utils';
import confetti from 'canvas-confetti';

// Import Modals
import BillSplitter from './modals/BillSplitter';
import DecisionMaker from './modals/DecisionMaker';
import UnitConverter from './modals/UnitConverter';
import PomodoroTimer from './modals/PomodoroTimer';
import WaterTracker from './modals/WaterTracker';
import MoodJournal from './modals/MoodJournal';

const toolsData = [
  { id: 'bill', icon: <Calculator className="w-8 h-8 text-primary" />, title: "Bill Splitter", desc: "Split costs with friends instantly", category: "Finance", popular: true, shortcut: "B" },
  { id: 'decision', icon: <Target className="w-8 h-8 text-secondary" />, title: "Decision Maker", desc: "Spin the wheel when you're stuck", category: "Fun", popular: true, shortcut: "D" },
  { id: 'water', icon: <Droplets className="w-8 h-8 text-blue-500" />, title: "Water Tracker", desc: "Hit your daily hydration goal", category: "Health", popular: false, shortcut: "W" },
  { id: 'unit', icon: <ArrowRightLeft className="w-8 h-8 text-accent" />, title: "Unit Converter", desc: "km, miles, cups, grams & more", category: "Productivity", popular: false, shortcut: "U" },
  { id: 'mood', icon: <Smile className="w-8 h-8 text-highlight" />, title: "Mood Journal", desc: "Log your day in 10 seconds", category: "Health", popular: false, shortcut: "M" },
  { id: 'pomodoro', icon: <Clock className="w-8 h-8 text-orange-500" />, title: "Pomodoro Timer", desc: "Stay focused, get stuff done", category: "Productivity", popular: false, shortcut: "P" }
];

export default function Features() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lifehack-bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarks = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem('lifehack-bookmarks', JSON.stringify(newBookmarks));
  };

  const filteredTools = toolsData.filter(tool => {
    const matchesCategory = filter === "All" || tool.category === filter;
    const matchesSearch = tool.title.toLowerCase().includes(search.toLowerCase()) || tool.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal) {
        if (e.key === 'Escape') setActiveModal(null);
        return;
      }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const tool = toolsData.find(t => t.shortcut.toLowerCase() === e.key.toLowerCase());
      if (tool) setActiveModal(tool.id);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  return (
    <section id="features" className="py-24 bg-bg-card px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-text"
          >
            Tools You Actually Need 🛠️
          </motion.h2>
          <p className="text-xl text-text-muted font-medium">Pick a tool and make your life just a little bit easier.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {["All", "Productivity", "Health", "Finance", "Fun"].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all",
                  filter === cat ? "bg-primary text-white shadow-md" : "bg-bg text-text-muted hover:bg-border/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          <AnimatePresence>
            {filteredTools.map((tool, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={tool.id}
                className="group relative h-72 cursor-pointer transform-style-3d transition-transform duration-500 hover:rotate-y-180"
                onClick={() => setActiveModal(tool.id)}
              >
                {/* Front */}
                <div className="absolute inset-0 bg-bg rounded-[2rem] p-8 shadow-sm border border-border flex flex-col items-start backface-hidden">
                  {tool.popular && (
                    <div className="absolute top-4 right-4 bg-secondary/20 text-secondary-base px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Popular
                    </div>
                  )}
                  <button 
                    onClick={(e) => toggleBookmark(tool.id, e)}
                    className="absolute top-4 left-4 p-2 text-text-muted hover:text-primary transition-colors z-10"
                    aria-label="Bookmark"
                  >
                    <Star className={cn("w-5 h-5", bookmarks.includes(tool.id) && "fill-primary text-primary")} />
                  </button>
                  
                  <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border flex items-center justify-center text-3xl mb-6 mt-4 shadow-sm group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-3">{tool.title}</h3>
                  <p className="text-text-muted font-medium mb-8 flex-grow">{tool.desc}</p>
                  <div className="w-full flex justify-between items-center text-sm font-bold text-text-muted">
                    <span>Try It</span>
                    <span className="px-2 py-1 bg-border/50 rounded-md text-xs">Press {tool.shortcut}</span>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-primary rounded-[2rem] p-8 shadow-xl flex flex-col items-center justify-center text-white backface-hidden rotate-y-180">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6">
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">{tool.title}</h3>
                  <p className="text-white/80 text-center mb-8">Click to open this tool and start using it instantly.</p>
                  <button className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:scale-105 transition-transform shadow-lg">
                    Open Tool
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 text-text-muted text-xl font-medium">
            No tools found matching your search. 😢
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <ModalWrapper onClose={() => setActiveModal(null)} title={toolsData.find(t => t.id === activeModal)?.title}>
            {activeModal === 'bill' && <BillSplitter />}
            {activeModal === 'decision' && <DecisionMaker />}
            {activeModal === 'unit' && <UnitConverter />}
            {activeModal === 'pomodoro' && <PomodoroTimer />}
            {activeModal === 'water' && <WaterTracker />}
            {activeModal === 'mood' && <MoodJournal />}
          </ModalWrapper>
        )}
      </AnimatePresence>
    </section>
  );
}

function ModalWrapper({ children, onClose, title }: { children: React.ReactNode, onClose: () => void, title?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-card w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-border"
      >
        <div className="flex justify-between items-center p-6 border-b border-border bg-bg">
          <h3 className="text-xl font-bold text-text">{title}</h3>
          <button onClick={onClose} className="p-2 text-text-muted hover:bg-border/50 rounded-full transition-colors" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
