import { useState } from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, ArrowUpRight } from 'lucide-react';

const initialFeatures = [
  { id: 1, title: "Habit Tracker", desc: "Daily streaks and visual progress", votes: 124, progress: 80, status: "In Progress" },
  { id: 2, title: "Expense Manager", desc: "Simple budget tracking without linking banks", votes: 89, progress: 40, status: "Planned" },
  { id: 3, title: "Password Generator", desc: "Secure, memorable passwords instantly", votes: 56, progress: 10, status: "Under Review" },
  { id: 4, title: "QR Code Maker", desc: "Generate custom QR codes for links", votes: 34, progress: 0, status: "Idea" }
];

export default function Roadmap() {
  const [features, setFeatures] = useState(initialFeatures);
  const [voted, setVoted] = useState<number[]>([]);

  const handleVote = (id: number) => {
    if (voted.includes(id)) return;
    setVoted([...voted, id]);
    setFeatures(features.map(f => f.id === id ? { ...f, votes: f.votes + 1 } : f));
  };

  return (
    <section id="roadmap" className="py-24 bg-bg px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-text"
          >
            What's Coming Next 🚀
          </motion.h2>
          <p className="text-xl text-text-muted font-medium">Vote on the tools you want us to build next.</p>
        </div>

        <div className="space-y-6">
          {features.sort((a, b) => b.votes - a.votes).map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-text">{feat.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    feat.status === 'In Progress' ? 'bg-primary/20 text-primary' :
                    feat.status === 'Planned' ? 'bg-secondary/20 text-secondary-base' :
                    'bg-border text-text-muted'
                  }`}>
                    {feat.status}
                  </span>
                </div>
                <p className="text-text-muted font-medium mb-4">{feat.desc}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} whileInView={{ width: `${feat.progress}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
                    className="bg-primary h-2.5 rounded-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 md:flex-col md:items-end min-w-[100px]">
                <button
                  onClick={() => handleVote(feat.id)}
                  disabled={voted.includes(feat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                    voted.includes(feat.id) ? 'bg-primary text-white shadow-md' : 'bg-bg border border-border text-text hover:border-primary hover:text-primary'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {feat.votes}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
