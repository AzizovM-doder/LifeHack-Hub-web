import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Droplets, Plus, Minus, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WaterTracker() {
  const [goal, setGoal] = useState(8); // Default 8 glasses
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('lifehack-water');
    if (saved) {
      const { date, count, goal: savedGoal } = JSON.parse(saved);
      const today = new Date().toDateString();
      if (date === today) {
        setCurrent(count);
        if (savedGoal) setGoal(savedGoal);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lifehack-water', JSON.stringify({
      date: new Date().toDateString(),
      count: current,
      goal
    }));
  }, [current, goal]);

  const handleAdd = () => {
    if (current < goal) {
      setCurrent(prev => prev + 1);
      if (current + 1 === goal) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#60a5fa', '#93c5fd']
        });
      }
    }
  };

  const handleRemove = () => {
    if (current > 0) setCurrent(prev => prev - 1);
  };

  const handleReset = () => {
    setCurrent(0);
  };

  const progress = Math.min((current / goal) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full flex justify-between items-center mb-4">
        <label className="text-sm font-bold text-text-muted">Daily Goal (Glasses)</label>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setGoal(Math.max(1, goal - 1))}
            className="p-1 bg-bg border border-border rounded-md hover:bg-border/50 text-text"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-bold text-text w-6 text-center">{goal}</span>
          <button 
            onClick={() => setGoal(goal + 1)}
            className="p-1 bg-bg border border-border rounded-md hover:bg-border/50 text-text"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle 
            cx="96" cy="96" r="88" 
            fill="none" stroke="var(--color-border)" strokeWidth="16" 
          />
          {/* Progress Circle */}
          <motion.circle 
            cx="96" cy="96" r="88" 
            fill="none" stroke="#3b82f6" strokeWidth="16" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 88}
            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - progress / 100) }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>
        
        <div className="absolute flex flex-col items-center justify-center text-center">
          <Droplets className="w-10 h-10 text-blue-500 mb-2" />
          <span className="text-3xl font-bold text-text">{current}</span>
          <span className="text-sm text-text-muted font-medium">/ {goal}</span>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-4">
        <button 
          onClick={handleRemove}
          disabled={current === 0}
          className="flex-1 py-4 bg-bg border-2 border-border text-text font-bold rounded-2xl hover:bg-border/50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Minus className="w-5 h-5" /> Remove
        </button>
        <button 
          onClick={handleAdd}
          disabled={current >= goal}
          className="flex-1 py-4 bg-blue-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Glass
        </button>
      </div>

      <button 
        onClick={handleReset}
        className="text-sm text-text-muted hover:text-text flex items-center gap-1 mt-2 transition-colors"
      >
        <RefreshCw className="w-4 h-4" /> Reset for today
      </button>
    </div>
  );
}
