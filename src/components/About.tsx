import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-amethyst-500 font-sans tracking-[0.2em] uppercase text-xs font-semibold mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-amethyst-400"></span>
              The Founder
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium text-charcoal-900 mb-6 leading-tight">
              Ekta Chimnani
            </h3>
            
            <p className="text-xl text-charcoal-800/80 font-display italic mb-8">
              "Helping you become better EVERYDAY."
            </p>

            <div className="space-y-6 text-charcoal-800/70 font-sans font-light leading-relaxed">
              <p>
                As a dedicated Life & Mindset Coach and Healer, my mission is to guide you through a profound journey of personal growth, self-empowerment, and self-improvement.
              </p>
              <p>
                Through Divine Magick, we tap into your inner strength, clearing the mental blocks and negative energies that hold you back. Whether it's finding peace in a stressful world, healing through hypnotherapy, or cultivating thriving relationships, I am here to hold space for your transformation.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-sand-200 pt-8">
              <div>
                <h4 className="font-display font-medium text-3xl text-charcoal-900 mb-1">10.4K+</h4>
                <p className="text-xs text-charcoal-800/60 uppercase tracking-widest font-medium">Community</p>
              </div>
              <div>
                <h4 className="font-display font-medium text-3xl text-charcoal-900 mb-1">TOI</h4>
                <p className="text-xs text-charcoal-800/60 uppercase tracking-widest font-medium">Featured Speaker</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-sand-100 relative">
              <img 
                src="./founder.jpg" 
                alt="Ekta Chimnani - Founder" 
                className="object-cover w-full h-full"
              />
            </div>
            {/* Minimalist Accent Frame */}
            <div className="absolute -inset-4 border border-sand-200 rounded-2xl -z-10 hidden md:block" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
