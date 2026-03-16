import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, X, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DecisionMaker() {
  const [options, setOptions] = useState(['Pizza', 'Burgers', 'Sushi', 'Tacos']);
  const [newOption, setNewOption] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const addOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOption.trim() && options.length < 8) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const spin = () => {
    if (spinning || options.length < 2) return;
    setSpinning(true);
    setResult(null);

    const spins = Math.floor(Math.random() * 5) + 5; // 5-10 full spins
    const degreesPerOption = 360 / options.length;
    const randomOptionIndex = Math.floor(Math.random() * options.length);
    const targetRotation = (spins * 360) + (randomOptionIndex * degreesPerOption) + (degreesPerOption / 2);

    setRotation(prev => prev + targetRotation);

    setTimeout(() => {
      setSpinning(false);
      // The arrow points to the top (0 degrees).
      // We need to calculate which slice is at the top.
      const normalizedRotation = targetRotation % 360;
      const index = Math.floor((360 - normalizedRotation) / degreesPerOption) % options.length;
      setResult(options[index]);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#9D4EDD']
      });
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-64 h-64">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-primary z-10 drop-shadow-md" />
        
        {/* Wheel */}
        <motion.div
          className="w-full h-full rounded-full border-4 border-border overflow-hidden relative shadow-inner"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "circOut" }}
        >
          {options.map((opt, i) => {
            const angle = 360 / options.length;
            const skew = 90 - angle;
            const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-highlight', 'bg-blue-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];
            
            return (
              <div
                key={i}
                className={`absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left ${colors[i % colors.length]} border border-white/20`}
                style={{
                  transform: `rotate(${i * angle}deg) skewY(-${skew}deg)`,
                }}
              >
                <div
                  className="absolute bottom-4 left-4 text-white font-bold text-sm whitespace-nowrap"
                  style={{
                    transform: `skewY(${skew}deg) rotate(${angle / 2}deg) translate(20px, -10px)`,
                    transformOrigin: '0 0'
                  }}
                >
                  {opt.substring(0, 8)}{opt.length > 8 ? '...' : ''}
                </div>
              </div>
            );
          })}
        </motion.div>
        
        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md border-2 border-border z-10" />
      </div>

      {result && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-extrabold text-primary text-center bg-primary/10 px-6 py-2 rounded-full"
        >
          {result}! 🎉
        </motion.div>
      )}

      <button
        onClick={spin}
        disabled={spinning || options.length < 2}
        className="w-full py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-lg hover:bg-primary-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <RotateCw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>

      <div className="w-full space-y-3">
        <form onSubmit={addOption} className="flex gap-2">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add option (max 8)"
            maxLength={20}
            disabled={options.length >= 8}
            className="flex-1 px-4 py-2 rounded-xl bg-bg border border-border focus:border-primary outline-none text-text"
          />
          <button
            type="submit"
            disabled={!newOption.trim() || options.length >= 8}
            className="p-2 bg-bg-card border border-border rounded-xl text-text hover:bg-border/50 transition-colors disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-1 bg-bg px-3 py-1 rounded-full border border-border text-sm font-medium text-text">
              {opt}
              <button onClick={() => removeOption(i)} className="text-text-muted hover:text-red-500" disabled={options.length <= 2}>
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
