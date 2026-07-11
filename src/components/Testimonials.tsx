import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { testimonials } from '../data';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-amethyst-500 font-sans tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            Client Stories
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-charcoal-900">
            Words of Transformation
          </h3>
        </motion.div>

          <div className="relative">
            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex absolute inset-y-0 left-0 items-center z-20 -ml-6 lg:-ml-12">
              <button 
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-sand-200 text-charcoal-800 transition-all shadow-md hover:shadow-lg hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="hidden md:flex absolute inset-y-0 right-0 items-center z-20 -mr-6 lg:-mr-12">
              <button 
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-sand-200 text-charcoal-800 transition-all shadow-md hover:shadow-lg hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", y: -20 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="w-full max-w-4xl mx-auto glass-card rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amethyst-500/10 via-transparent to-champagne-400/10 opacity-70" />
                    
                    <Quote className="w-16 h-16 md:w-20 md:h-20 text-amethyst-200/40 absolute top-4 right-4 md:-top-4 md:-right-4 rotate-12 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="flex gap-1 justify-center text-champagne-500 mb-6 mt-4 md:mt-0">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-current drop-shadow-md" />
                        ))}
                      </div>

                      <p className="text-charcoal-800 font-sans text-lg md:text-xl lg:text-2xl font-light mb-8 italic leading-relaxed text-balance">
                        {testimonials[currentIndex].content}
                      </p>

                      <div className="pt-6 border-t border-sand-200/60 w-full max-w-xs md:max-w-sm mx-auto">
                        <h4 className="font-display font-semibold text-lg md:text-2xl text-charcoal-900 mb-1">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-xs font-sans uppercase tracking-widest text-amethyst-600 font-bold mt-2 bg-amethyst-100/50 inline-block px-3 py-1 rounded-full border border-amethyst-200/50">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile / Universal Navigation Dots */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="p-3 -m-3 group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div 
                    className={`transition-all duration-500 rounded-full ${
                      index === currentIndex 
                        ? "w-10 h-2 bg-gradient-to-r from-amethyst-500 to-indigo-500 shadow-lg shadow-amethyst-500/40" 
                        : "w-2 h-2 bg-charcoal-300 group-hover:bg-amethyst-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
