import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, Palette, Zap } from 'lucide-react';
import { cn } from '../utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'features', 'roadmap', 'faq', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const setTheme = (theme: string) => {
    document.documentElement.classList.remove('theme-ocean', 'theme-sunset', 'theme-forest');
    if (theme !== 'default') {
      document.documentElement.classList.add(`theme-${theme}`);
    }
    setThemeMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-bg/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-text">LifeHack Hub</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "font-medium text-sm transition-colors hover:text-primary relative",
                  activeSection === link.href.substring(1) ? "text-primary" : "text-text-muted"
                )}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 border-l border-border pl-6 relative">
            <button onClick={toggleDark} className="p-2 rounded-full hover:bg-border/50 text-text-muted transition-colors" aria-label="Toggle Dark Mode">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setThemeMenuOpen(!themeMenuOpen)} className="p-2 rounded-full hover:bg-border/50 text-text-muted transition-colors" aria-label="Change Theme">
              <Palette className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 bg-bg-card border border-border rounded-xl shadow-lg p-2 flex flex-col gap-1 w-32"
                >
                  <button onClick={() => setTheme('default')} className="text-left px-3 py-2 text-sm rounded-lg hover:bg-border/50 text-text">Default</button>
                  <button onClick={() => setTheme('ocean')} className="text-left px-3 py-2 text-sm rounded-lg hover:bg-border/50 text-blue-500">Ocean</button>
                  <button onClick={() => setTheme('sunset')} className="text-left px-3 py-2 text-sm rounded-lg hover:bg-border/50 text-orange-500">Sunset</button>
                  <button onClick={() => setTheme('forest')} className="text-left px-3 py-2 text-sm rounded-lg hover:bg-border/50 text-green-500">Forest</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-text" onClick={() => setMobileMenuOpen(true)} aria-label="Open Menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-bg-card z-50 shadow-2xl p-6 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-lg text-text">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-text-muted" aria-label="Close Menu">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-text hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto flex gap-4 border-t border-border pt-6">
                <button onClick={toggleDark} className="p-3 bg-border/30 rounded-full text-text flex-1 flex justify-center">
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => {
                  const themes = ['default', 'ocean', 'sunset', 'forest'];
                  const current = document.documentElement.className.match(/theme-(\w+)/)?.[1] || 'default';
                  const next = themes[(themes.indexOf(current) + 1) % themes.length];
                  setTheme(next);
                }} className="p-3 bg-border/30 rounded-full text-text flex-1 flex justify-center">
                  <Palette className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
