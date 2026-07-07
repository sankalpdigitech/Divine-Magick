import { motion, AnimatePresence } from 'motion/react';
import { Course } from '../types';
import { CheckCircle2, ChevronLeft, CreditCard, Lock, ArrowRight, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState } from 'react';

interface Props {
  course: Course;
  onBack: () => void;
}

export default function EnrollerPage({ course, onBack }: Props) {
  const IconComponent = ((Icons as any)[course.icon] || Icons.Sparkles);
  const [step, setStep] = useState<'details' | 'checkout' | 'success'>('details');

  return (
    <div className="min-h-screen bg-sand-50/90 text-charcoal-900 flex flex-col pt-24 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={step === 'checkout' ? () => setStep('details') : onBack}
            className="group flex items-center gap-2 text-sm font-sans font-medium text-charcoal-800/60 hover:text-charcoal-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {step === 'checkout' ? 'Back to Program Details' : 'Back to Home'}
          </button>
          
          {/* Top Progress bar */}
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step === 'details' ? 'bg-amethyst-500 scale-125' : 'bg-sand-300'}`} />
            <div className="w-8 h-0.5 bg-sand-200" />
            <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step === 'checkout' ? 'bg-amethyst-500 scale-125' : 'bg-sand-300'}`} />
            <div className="w-8 h-0.5 bg-sand-200" />
            <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step === 'success' ? 'bg-amethyst-500 scale-125' : 'bg-sand-300'}`} />
          </div>
        </div>

        {/* Content Container */}
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start flex-grow"
            >
              {/* Left Column: Breathtaking Course Visual Card */}
              <div className="lg:col-span-7 space-y-8">
                <div className="relative aspect-[16/10] md:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-sand-200 shadow-xl border border-sand-200/50">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent" />
                  
                  {/* Absolute core icon banner */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-3 border border-sand-100/60">
                    <div className="bg-amethyst-100 p-2.5 rounded-xl text-amethyst-500">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-sans font-semibold tracking-widest text-amethyst-500 uppercase">
                        Signature Program
                      </span>
                      <span className="block font-display font-medium text-sm text-charcoal-900">
                        {course.modules} Guided Modules
                      </span>
                    </div>
                  </div>
                </div>

                {/* Elaborated description & learnings */}
                <div className="space-y-6">
                  <h1 className="font-display font-medium text-3xl md:text-4xl text-charcoal-900 tracking-tight">
                    {course.title}
                  </h1>
                  <p className="text-charcoal-800/80 font-sans text-base md:text-lg font-light leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="h-px bg-sand-200" />
                  
                  {/* Course Highlights */}
                  <div>
                    <h3 className="font-display font-medium text-lg text-charcoal-900 mb-4">Program Syllabus & Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 glass-card rounded-3xl flex items-start gap-4">
                        <BookOpen className="w-5 h-5 text-amethyst-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans font-semibold text-sm text-charcoal-900 mb-1">Interactive Modules</h4>
                          <p className="font-sans text-xs text-charcoal-800/60 font-light leading-relaxed">
                            Guided materials, assignments, and meditative exercises designed for lasting shifts.
                          </p>
                        </div>
                      </div>
                      <div className="p-5 glass-card rounded-3xl flex items-start gap-4">
                        <ShieldCheck className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans font-semibold text-sm text-charcoal-900 mb-1">Lifetime Vault Access</h4>
                          <p className="font-sans text-xs text-charcoal-800/60 font-light leading-relaxed">
                            Access your program syllabus, worksheets, and secure high-grade stream vault forever.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Order Summary Box */}
              <div className="lg:col-span-5">
                <div className="glass-ios rounded-[32px] p-8 border border-white/80 shadow-xl space-y-6 lg:sticky lg:top-28">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-amethyst-500 uppercase bg-amethyst-50 border border-amethyst-200/40 px-3 py-1.5 rounded-full w-max block">
                      Guaranteed Transformation
                    </span>
                    <h2 className="font-display font-medium text-2xl text-charcoal-900">Your Investment</h2>
                  </div>

                  {/* Pricing grid */}
                  <div className="p-6 bg-sand-100 rounded-2xl border border-sand-200/60">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-sans uppercase tracking-widest text-charcoal-800/50 font-semibold">Total Program Fee</span>
                      <div className="flex items-baseline gap-2">
                        {course.originalPrice && (
                          <span className="text-sm text-charcoal-800/40 line-through">₹{course.originalPrice}</span>
                        )}
                        <span className="text-3xl font-display font-medium text-charcoal-900">₹{course.price}</span>
                      </div>
                    </div>
                    <p className="text-[11px] font-sans text-charcoal-800/50 italic leading-snug">
                      *Tax included. Secure payment powered by leading encrypted systems.
                    </p>
                  </div>

                  {/* Checklist of deliverables */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                      <p className="font-sans text-sm text-charcoal-800/80">Personal dashboard with progress metrics.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                      <p className="font-sans text-sm text-charcoal-800/80">Support groups & live circle calls.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                      <p className="font-sans text-sm text-charcoal-800/80">Graduation certification & post-course guidance.</p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <button 
                    onClick={() => setStep('checkout')}
                    className="btn-primary w-full py-4.5 rounded-2xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-amethyst-500/15"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center text-xs font-sans text-charcoal-800/40">
                    Need support? Contact us anytime at support@divinemagick.com
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start flex-grow"
            >
              {/* Left Column: Extensive Secured Checkout Forms */}
              <div className="lg:col-span-7">
                <div className="glass-ios rounded-[32px] p-8 md:p-10 border border-white/80 shadow-xl space-y-8">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-green-600 uppercase bg-green-50 border border-green-200/40 px-3 py-1.5 rounded-full w-max block mb-4">
                      AES-256 Encrypted Connection
                    </span>
                    <h2 className="font-display font-medium text-2xl md:text-3xl text-charcoal-900">
                      Payment Details
                    </h2>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setStep('success'); }} className="space-y-6">
                    {/* Primary Contact Info */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-sans uppercase tracking-widest text-charcoal-800/50 font-bold">1. Contact Information</h3>
                      <div>
                        <label className="block text-xs font-sans font-semibold text-charcoal-800/80 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          className="w-full bg-sand-50/50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amethyst-400 focus:ring-1 focus:ring-amethyst-400 transition-all" 
                          placeholder="you@example.com" 
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans font-semibold text-charcoal-800/80 mb-2">First Name</label>
                          <input 
                            type="text" 
                            required 
                            className="w-full bg-sand-50/50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amethyst-400 focus:ring-1 focus:ring-amethyst-400 transition-all" 
                            placeholder="Aarav" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-sans font-semibold text-charcoal-800/80 mb-2">Last Name</label>
                          <input 
                            type="text" 
                            required 
                            className="w-full bg-sand-50/50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amethyst-400 focus:ring-1 focus:ring-amethyst-400 transition-all" 
                            placeholder="Sharma" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-sand-200" />

                    {/* Payment Info */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-sans uppercase tracking-widest text-charcoal-800/50 font-bold flex items-center gap-2">
                        2. Payment Method <CreditCard className="w-4 h-4 text-amethyst-500" />
                      </h3>
                      <div>
                        <label className="block text-xs font-sans font-semibold text-charcoal-800/80 mb-2">Cardholder Name</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full bg-sand-50/50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amethyst-400 focus:ring-1 focus:ring-amethyst-400 transition-all" 
                          placeholder="Aarav Sharma" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-semibold text-charcoal-800/80 mb-2">Card Number</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required 
                            maxLength={19}
                            className="w-full bg-sand-50/50 border border-sand-200 rounded-xl px-4 py-3.5 pl-12 text-sm focus:outline-none focus:border-amethyst-400 focus:ring-1 focus:ring-amethyst-400 transition-all" 
                            placeholder="4111 2222 3333 4444" 
                          />
                          <CreditCard className="w-5 h-5 text-charcoal-800/40 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans font-semibold text-charcoal-800/80 mb-2">Expiry Date</label>
                          <input 
                            type="text" 
                            required 
                            maxLength={5}
                            className="w-full bg-sand-50/50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amethyst-400 focus:ring-1 focus:ring-amethyst-400 transition-all" 
                            placeholder="MM/YY" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-sans font-semibold text-charcoal-800/80 mb-2">Security Code (CVC)</label>
                          <input 
                            type="password" 
                            required 
                            maxLength={3}
                            className="w-full bg-sand-50/50 border border-sand-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amethyst-400 focus:ring-1 focus:ring-amethyst-400 transition-all" 
                            placeholder="•••" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit" 
                        className="btn-primary w-full py-4.5 rounded-2xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-amethyst-500/20"
                      >
                        <Lock className="w-4 h-4" /> Securely Pay ₹{course.price}
                      </button>
                      <p className="text-center text-xs text-charcoal-800/50 mt-4 flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-green-600" /> Dynamic transaction encryption keeps your data hidden.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column: Order Review Panel */}
              <div className="lg:col-span-5">
                <div className="glass-ios rounded-[32px] p-8 border border-white/80 shadow-xl space-y-6 lg:sticky lg:top-28">
                  <h3 className="font-display font-medium text-lg text-charcoal-900 border-b border-sand-200 pb-4">Order Summary</h3>
                  
                  <div className="flex gap-4 items-center">
                    <img src={course.image} alt={course.title} className="w-16 h-16 rounded-xl object-cover border border-sand-200" />
                    <div>
                      <h4 className="font-display font-medium text-sm text-charcoal-900 leading-tight">{course.title}</h4>
                      <span className="text-[10px] font-sans text-amethyst-500 uppercase tracking-widest">{course.modules} Modules</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-sand-200 text-sm font-sans">
                    <div className="flex justify-between text-charcoal-800/60">
                      <span>Subtotal</span>
                      <span>₹{course.price}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-800/60">
                      <span>Gateway Processing Fees</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-charcoal-900 font-bold pt-3 border-t border-sand-200">
                      <span>Total Price</span>
                      <span>₹{course.price}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-sand-100 rounded-2xl border border-sand-200/60 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amethyst-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-charcoal-800/60 leading-relaxed font-light">
                      <strong>Cancellation Policy:</strong> Unconditional 14-day refund policy. If this does not support your soul journey, email us for a full processing refund instantly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center py-20 flex-grow max-w-xl mx-auto"
            >
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-green-500/10">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <span className="text-[10px] font-mono tracking-widest text-green-600 uppercase bg-green-50 border border-green-200/40 px-3 py-1.5 rounded-full mb-4">
                Enrollment Successful
              </span>

              <h1 className="font-display font-medium text-3xl md:text-4xl text-charcoal-900 mb-4 leading-tight">
                Welcome to {course.title}
              </h1>
              
              <p className="text-charcoal-800/70 font-sans text-sm md:text-base font-light mb-12 leading-relaxed">
                Thank you for entrusting us with your spiritual guidance. Your payment was processed securely. We have sent an email containing your permanent license, credentials, and video vault key.
              </p>

              <div className="w-full flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onBack}
                  className="btn-primary flex-1 py-4 rounded-xl text-sm font-medium tracking-wide"
                >
                  Return to Sanctuary
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
