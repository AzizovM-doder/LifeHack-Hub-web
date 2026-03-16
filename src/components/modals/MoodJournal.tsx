import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, Frown, Meh, Heart, Zap, Save, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils';

const moods = [
  { id: 'great', icon: <Heart className="w-8 h-8" />, label: "Great", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { id: 'good', icon: <Smile className="w-8 h-8" />, label: "Good", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { id: 'okay', icon: <Meh className="w-8 h-8" />, label: "Okay", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { id: 'bad', icon: <Frown className="w-8 h-8" />, label: "Bad", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: 'stressed', icon: <Zap className="w-8 h-8" />, label: "Stressed", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
];

export default function MoodJournal() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<{ date: string, mood: string, note: string }[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('lifehack-mood');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSave = () => {
    if (!selectedMood) return;

    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood: selectedMood,
      note
    };

    const updatedHistory = [newEntry, ...history].slice(0, 5); // Keep last 5
    setHistory(updatedHistory);
    localStorage.setItem('lifehack-mood', JSON.stringify(updatedHistory));

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setSelectedMood(null);
      setNote('');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-text mb-1">How are you feeling?</h3>
        <p className="text-sm text-text-muted">Select a mood for today.</p>
      </div>

      <div className="flex justify-center gap-3 sm:gap-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border-2",
              selectedMood === mood.id 
                ? `${mood.bg} ${mood.border} scale-110 shadow-sm` 
                : "bg-bg border-transparent hover:bg-border/50 text-text-muted hover:text-text"
            )}
          >
            <div className={cn(selectedMood === mood.id ? mood.color : "")}>
              {mood.icon}
            </div>
            <span className="text-xs font-bold">{mood.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-bold text-text-muted mb-2">Add a quick note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What made you feel this way?"
          className="w-full px-4 py-3 rounded-2xl bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-text text-sm"
          rows={3}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={!selectedMood || saved}
        className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
      >
        {saved ? (
          <><CheckCircle2 className="w-5 h-5" /> Saved!</>
        ) : (
          <><Save className="w-5 h-5" /> Save Entry</>
        )}
      </button>

      {history.length > 0 && (
        <div className="mt-6 border-t border-border pt-6">
          <h4 className="text-sm font-bold text-text-muted mb-4">Recent Entries</h4>
          <div className="space-y-3">
            {history.map((entry, idx) => {
              const moodData = moods.find(m => m.id === entry.mood);
              return (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-bg border border-border">
                  <div className={cn("p-2 rounded-lg", moodData?.bg, moodData?.color)}>
                    {moodData?.icon && React.cloneElement(moodData.icon as React.ReactElement, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-text">{moodData?.label}</span>
                      <span className="text-xs text-text-muted">{entry.date}</span>
                    </div>
                    {entry.note && <p className="text-sm text-text-muted">{entry.note}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
