import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';
import { Compass, Sparkles, Flame, Infinity as InfinityIcon } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Discovery',
    description: 'We begin by exploring your current state, uncovering hidden blockages, and understanding the energetic patterns holding you back.',
    icon: Compass,
    color: 'from-blue-400 to-indigo-500',
    shadow: 'shadow-indigo-500/20'
  },
  {
    id: '02',
    title: 'Clarity',
    description: 'Together, we illuminate your true desires and align them with your higher purpose, bringing your soul\'s vision into sharp focus.',
    icon: Sparkles,
    color: 'from-amethyst-400 to-fuchsia-500',
    shadow: 'shadow-fuchsia-500/20'
  },
  {
    id: '03',
    title: 'Action',
    description: 'Through guided rituals and actionable mindset shifts, you step into your power, executing aligned steps with unshakeable confidence.',
    icon: Flame,
    color: 'from-champagne-400 to-orange-400',
    shadow: 'shadow-orange-400/20'
  },
  {
    id: '04',
    title: 'Transformation',
    description: 'You emerge renewed. Living authentically in your highest vibration, attracting abundance, and experiencing profound inner peace.',
    icon: InfinityIcon,
    color: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-teal-500/20'
  }
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="journey" className="py-24 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amethyst-500 font-sans tracking-[0.2em] uppercase text-xs font-semibold mb-4"
          >
            The Path
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-medium text-charcoal-900 mb-6"
          >
            Your Transformative Journey
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-charcoal-800/70 font-sans text-base max-w-xl mx-auto font-light leading-relaxed"
          >
            Experience a guided alchemy of the soul. We walk together through four sacred stages to unlock your highest potential.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-sand-200 -translate-x-1/2" />
          
          {/* Animated Progress Line (Desktop) */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amethyst-400 via-champagne-400 to-emerald-400 -translate-x-1/2 origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 top-8 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={`w-12 h-12 rounded-full glass-ios flex items-center justify-center relative shadow-lg ${step.shadow}`}
                    >
                      <div className="absolute inset-0 rounded-full animate-ping opacity-10 bg-current" />
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                    className="w-full md:w-1/2"
                  >
                    <div className="glass-card rounded-[32px] p-8 md:p-10 relative overflow-hidden group">
                      {/* Hover subtle glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`} />
                      
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-4xl font-display font-light text-charcoal-200/50 absolute top-4 right-6 group-hover:text-charcoal-300 transition-colors duration-500">
                          {step.id}
                        </span>
                        
                        <div className="md:hidden w-12 h-12 rounded-full glass-ios flex items-center justify-center relative shadow-lg">
                           <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white`}>
                              <Icon className="w-4 h-4" />
                           </div>
                        </div>

                        <h4 className="text-2xl font-display font-medium text-charcoal-900 relative z-10">
                          {step.title}
                        </h4>
                      </div>
                      
                      <p className="text-charcoal-800/70 font-sans text-sm leading-relaxed font-light relative z-10">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
