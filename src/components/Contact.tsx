import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Lightbulb, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !idea) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'ideas'), {
        uid: auth.currentUser?.uid || 'anonymous',
        name,
        email,
        idea,
        createdAt: new Date()
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setIdea('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting idea:", error);
      const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        authInfo: {
          userId: auth.currentUser?.uid,
          email: auth.currentUser?.email,
          emailVerified: auth.currentUser?.emailVerified,
          isAnonymous: auth.currentUser?.isAnonymous,
          tenantId: auth.currentUser?.tenantId,
          providerInfo: auth.currentUser?.providerData.map(provider => ({
            providerId: provider.providerId,
            displayName: provider.displayName,
            email: provider.email,
            photoUrl: provider.photoURL
          })) || []
        },
        operationType: 'create',
        path: 'ideas'
      };
      console.error('Firestore Error: ', JSON.stringify(errInfo));
      alert("Oops! Something went wrong. Make sure you are signed in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-[3rem] p-8 md:p-16 text-center shadow-sm border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text flex items-center justify-center gap-4 relative z-10">
            Got an idea? <Lightbulb className="w-10 h-10 text-secondary" />
          </h2>
          <p className="text-xl text-text-muted mb-10 font-medium relative z-10">
            We're always building new stuff. What do you need?
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-text-muted mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-muted mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-text-muted mb-2">Tool Idea</label>
              <textarea 
                required
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={4}
                className="w-full px-6 py-4 rounded-2xl bg-bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-text"
                placeholder="I wish there was a tool that..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-primary text-white font-bold rounded-2xl text-xl shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : <>Send My Idea <Send className="w-5 h-5" /></>}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 flex items-center gap-3 bg-bg-card border border-border shadow-2xl px-6 py-4 rounded-2xl"
          >
            <CheckCircle2 className="w-6 h-6 text-accent" />
            <span className="font-bold text-text">Idea received! You're awesome.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
