import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 20) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#courses' },
    { name: 'Sanctuary', href: '#sanctuary' },
    { name: 'Stories', href: '#testimonials' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      let currentSection = 'home';
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust logic based on nav height. If top is above middle of screen and bottom is below top of screen
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 md:px-12">
      <motion.div 
        initial={false}
        animate={{
          y: isScrolled ? 12 : 24,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto w-full relative flex justify-between items-center pointer-events-auto z-50 px-6 py-4 md:px-8"
      >
        {/* Absolute Liquid Glass Pill Background */}
        <motion.div 
          initial={false}
          animate={{
            opacity: isScrolled ? 1 : 0,
            scale: isScrolled ? 1 : 0.95
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10 rounded-full glass-pill-nav"
        />

        <a href="#home" className="font-display text-2xl font-bold tracking-wide text-charcoal-900">
          Divine Magick<span className="text-amethyst-500">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2.5 font-sans text-sm tracking-wide transition-colors z-10 ${
                  isActive ? 'text-charcoal-900 font-medium' : 'text-charcoal-800 hover:text-charcoal-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-pill"
                    className="absolute inset-0 bg-charcoal-900/5 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
          <div className="pl-6">
            <a
              href="#courses"
              className="btn-primary px-7 py-2.5 rounded-full text-sm font-medium tracking-wide"
            >
              Begin Journey
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-charcoal-900 p-2 rounded-full hover:bg-black/5 transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </button>

        {/* Floating iOS Control Center Style Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden absolute top-[calc(100%+12px)] left-0 right-0 glass-ios rounded-[28px] overflow-hidden shadow-2xl p-6 flex flex-col gap-4 z-40 pointer-events-auto"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-sans text-base font-medium tracking-wide text-charcoal-800 hover:text-amethyst-500 transition-colors py-3 px-4 rounded-2xl hover:bg-black/5 active:bg-black/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-center mt-4 px-6 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-md active:scale-95 transition-transform"
                >
                  Begin Journey
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

