import { Zap, Github, Twitter, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-border pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <Zap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-text">LifeHack Hub</span>
            </a>
            <p className="text-text-muted font-medium max-w-sm mb-6">
              Free, fast, and fun tools for everyday problems. No sign-up required, no ads, just pure utility.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-colors" aria-label="Github">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg text-text mb-4">Tools</h4>
            <ul className="space-y-3 font-medium text-text-muted">
              <li><a href="#features" className="hover:text-primary transition-colors">Bill Splitter</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Decision Maker</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Pomodoro Timer</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Unit Converter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-text mb-4">Company</h4>
            <ul className="space-y-3 font-medium text-text-muted">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#roadmap" className="hover:text-primary transition-colors">Roadmap</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-text-muted">
          <p>© 2026 LifeHack Hub. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-current" /> by LifeHack Hub
          </p>
        </div>
      </div>
    </footer>
  );
}
