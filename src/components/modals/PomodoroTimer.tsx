import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'work') {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#9D4EDD']
        });
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'work' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-4 bg-bg p-2 rounded-full border border-border">
        <button
          onClick={() => switchMode('work')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'work' ? 'bg-orange-500 text-white shadow-md' : 'text-text-muted hover:text-text'}`}
        >
          Work (25m)
        </button>
        <button
          onClick={() => switchMode('break')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${mode === 'break' ? 'bg-blue-500 text-white shadow-md' : 'text-text-muted hover:text-text'}`}
        >
          <Coffee className="w-4 h-4" /> Break (5m)
        </button>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-border"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            className={`transition-all duration-1000 ease-linear ${mode === 'work' ? 'text-orange-500' : 'text-blue-500'}`}
          />
        </svg>
        
        <div className="text-6xl font-extrabold text-text tabular-nums tracking-tight">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform ${mode === 'work' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-bg-card border-2 border-border text-text-muted hover:text-text hover:border-text-muted shadow-sm transition-all"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
