import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-[1000px]">
      {/* Elegant Modern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-sand-200 rounded-full blur-[50px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-champagne-400/10 rounded-full blur-[60px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-amethyst-300/20 rounded-full blur-[45px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16">
        
        <div className="flex-1 text-center lg:text-left pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-block mb-6"
          >
            <span className="text-xs md:text-sm text-amethyst-500 font-sans tracking-[0.2em] uppercase bg-amethyst-100/50 px-4 py-2 rounded-full border border-amethyst-300/30">
              Life & Mindset Coaching
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-charcoal-900 mb-6 leading-[1.1] tracking-tight"
          >
            Elevate Your <br />
            <span className="italic text-champagne-500">Consciousness.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-charcoal-800/70 font-sans max-w-xl mx-auto lg:mx-0 mb-10 font-light leading-relaxed"
          >
            Transform your mindset, heal your inner self, and become better every single day with expert guidance from <span className="text-amethyst-500 font-semibold">Ekta Chimnani</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#courses"
              className="btn-primary group flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wide w-full sm:w-auto justify-center"
            >
              Explore Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="btn-secondary px-8 py-4 rounded-full text-sm font-medium tracking-wide w-full sm:w-auto justify-center"
            >
              Meet Ekta
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="flex-1 relative hidden md:block"
        >
          <div className="relative w-full aspect-[4/5] rounded-t-full overflow-hidden bg-sand-200">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80" 
              alt="Mindset Coaching" 
              className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-1000"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-champagne-400/20 rounded-full blur-2xl" />
        </motion.div>

      </div>
    </section>
  );
}
