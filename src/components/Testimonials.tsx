import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Freelance Designer",
    avatar: "https://i.pravatar.cc/150?img=47",
    content: "The Pomodoro Timer literally saved my productivity. I used to get distracted every 5 minutes, but now I'm a machine. Also, the confetti is a nice touch! 🎉",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "College Student",
    avatar: "https://i.pravatar.cc/150?img=11",
    content: "Bill Splitter is the only reason my roommates and I haven't killed each other yet. So simple, no ads, just works. 10/10 would recommend.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Project Manager",
    avatar: "https://i.pravatar.cc/150?img=32",
    content: "I use the Decision Maker wheel for everything now. Where to eat, who takes the next meeting notes... it's surprisingly fun and takes the pressure off.",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-bg px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-text"
          >
            Don't Just Take Our Word For It 💬
          </motion.h2>
          <p className="text-xl text-text-muted font-medium">Real people using fake tools... wait, no, real tools!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-card rounded-[2rem] p-8 shadow-sm border border-border flex flex-col relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`} />
                ))}
              </div>
              <p className="text-text-muted font-medium mb-8 flex-grow italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-bg" />
                <div>
                  <h4 className="font-bold text-text">{t.name}</h4>
                  <span className="text-sm text-text-muted">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
