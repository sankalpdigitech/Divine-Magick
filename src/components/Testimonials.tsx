import { motion } from 'motion/react';
import { testimonials } from '../data';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-amethyst-500 font-sans tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            Client Stories
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-charcoal-900">
            Words of Transformation
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative glass-card rounded-3xl p-8 flex flex-col"
            >
              <Quote className="w-10 h-10 text-champagne-400/30 absolute top-6 right-6" />
              
              <div className="flex gap-1 text-champagne-400 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-charcoal-800/80 font-sans text-sm md:text-base font-light mb-8 italic leading-relaxed flex-grow">
                {testimonial.content}
              </p>

              <div className="mt-auto pt-6 border-t border-sand-200/60">
                <h4 className="font-display font-medium text-lg text-charcoal-900">
                  {testimonial.name}
                </h4>
                <p className="text-xs font-sans uppercase tracking-widest text-amethyst-500 mt-1">
                  {testimonial.role}
                </p>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-amethyst-300/5 to-champagne-400/5 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
