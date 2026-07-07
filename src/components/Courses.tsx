import { motion } from 'motion/react';
import { courses } from '../data';
import * as Icons from 'lucide-react';
import { Course } from '../types';

interface Props {
  onEnroll: (course: Course) => void;
}

export default function Courses({ onEnroll }: Props) {
  return (
    <section id="courses" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-amethyst-500 font-sans tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            Signature Programs
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-charcoal-900">
            Begin Your Healing
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => {
            const IconComponent = (Icons as any)[course.icon] || Icons.Sparkles;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-card rounded-3xl overflow-hidden flex flex-col h-full"
              >
                <div className="h-56 relative overflow-hidden bg-sand-100">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-amethyst-500 shadow-sm">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-amethyst-400">
                      {course.modules} Module{course.modules > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <h4 className="font-display font-medium text-xl text-charcoal-900 mb-3 leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-charcoal-800/60 font-sans text-sm font-light mb-8 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-sand-100">
                    <div className="flex flex-col">
                      {course.originalPrice && (
                        <span className="text-xs text-charcoal-800/40 line-through">
                          ₹{course.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-sans font-medium text-charcoal-900">
                        ₹{course.price}
                      </span>
                    </div>
                    <button 
                      onClick={() => onEnroll(course)}
                      className="group/btn text-xs font-semibold uppercase tracking-wider text-charcoal-900 hover:text-amethyst-500 transition-all duration-300 flex items-center gap-1"
                    >
                      Enroll <Icons.ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
