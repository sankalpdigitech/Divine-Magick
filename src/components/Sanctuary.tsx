import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';

type MeditationMode = {
  name: string;
  color: string;
  glow: string;
  inhale: number;
  hold: number;
  exhale: number;
  frequency: number;
  description: string;
};

const MEDITATION_MODES: MeditationMode[] = [
  {
    name: "Anxiety Release",
    color: "bg-emerald-400/20 text-emerald-600 border-emerald-500/30",
    glow: "rgba(16, 185, 129, 0.45)",
    inhale: 4,
    hold: 4,
    exhale: 4,
    frequency: 396, // 396Hz Solfeggio - liberating guilt and fear
    description: "4-4-4 Box Breathing. Harmonized with 396Hz Solfeggio frequencies to quieten overactive nervous systems."
  },
  {
    name: "Deep Cosmic Calm",
    color: "bg-amethyst-400/20 text-amethyst-600 border-amethyst-500/30",
    glow: "rgba(168, 85, 247, 0.45)",
    inhale: 4,
    hold: 7,
    exhale: 8,
    frequency: 432, // 432Hz - natural frequency of the universe
    description: "4-7-8 Pranayama technique. Promotes profound relaxation, reducing mental chatter and body stress."
  },
  {
    name: "Divine Focus & Clarity",
    color: "bg-amber-400/20 text-amber-600 border-amber-500/30",
    glow: "rgba(245, 158, 11, 0.45)",
    inhale: 5,
    hold: 2,
    exhale: 5,
    frequency: 528, // 528Hz - transformation and DNA healing
    description: "Resonant coherent breathing at 528Hz. Balances both brain hemispheres for high cognitive clarity."
  }
];

export default function Sanctuary() {
  // --- BREATH SANCTUARY STATE ---
  const [selectedMode, setSelectedMode] = useState<MeditationMode>(MEDITATION_MODES[0]);
  const [breathState, setBreathState] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathCountdown, setBreathCountdown] = useState(4);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Web Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Breathing timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSynthesizing) {
      timer = setInterval(() => {
        setBreathCountdown((prev) => {
          if (prev <= 1) {
            // State Transition
            if (breathState === 'Inhale') {
              if (selectedMode.hold > 0) {
                setBreathState('Hold');
                // Adjust synthesizer tone for Hold
                modulateSynth(selectedMode.frequency * 1.2, 0.08);
                return selectedMode.hold;
              } else {
                setBreathState('Exhale');
                modulateSynth(selectedMode.frequency * 0.8, 0.02);
                return selectedMode.exhale;
              }
            } else if (breathState === 'Hold') {
              setBreathState('Exhale');
              modulateSynth(selectedMode.frequency * 0.8, 0.02);
              return selectedMode.exhale;
            } else {
              setBreathState('Inhale');
              modulateSynth(selectedMode.frequency, 0.15);
              return selectedMode.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathCountdown(selectedMode.inhale);
      setBreathState('Inhale');
    }
    return () => clearInterval(timer);
  }, [isSynthesizing, breathState, selectedMode]);

  // Audio Context Actions
  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create oscillator (Sine wave)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = selectedMode.frequency;

      // Gentle gain filter to prevent pops
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(soundEnabled ? 0.15 : 0, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsSynthesizing(true);
    } catch (e) {
      console.warn("Audio Context initialization failed or browser blocked auto-play.", e);
    }
  };

  const stopSynth = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (err) {}
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setIsSynthesizing(false);
  };

  const modulateSynth = (freq: number, volume: number) => {
    if (audioCtxRef.current && oscillatorRef.current && gainNodeRef.current) {
      const now = audioCtxRef.current.currentTime;
      oscillatorRef.current.frequency.exponentialRampToValueAtTime(freq, now + 1.2);
      gainNodeRef.current.gain.linearRampToValueAtTime(soundEnabled ? volume : 0, now + 1.2);
    }
  };

  const toggleSound = () => {
    const nextSound = !soundEnabled;
    setSoundEnabled(nextSound);
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetVolume = nextSound ? (breathState === 'Inhale' ? 0.15 : breathState === 'Hold' ? 0.08 : 0.02) : 0;
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, audioCtxRef.current.currentTime + 0.3);
    }
  };

  // Change mode reset
  const handleModeChange = (mode: MeditationMode) => {
    setSelectedMode(mode);
    setBreathState('Inhale');
    setBreathCountdown(mode.inhale);
    if (isSynthesizing && oscillatorRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      oscillatorRef.current.frequency.setValueAtTime(mode.frequency, now);
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);




  return (
    <section id="sanctuary" className="py-24 relative overflow-hidden bg-sand-100/30 border-t border-b border-sand-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-amethyst-500 font-sans tracking-[0.2em] uppercase text-xs font-semibold mb-4">
            Interactive Portal
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-charcoal-900 mb-6">
            The Alchemy Sanctuary
          </h3>
          <p className="text-charcoal-800/70 font-sans text-base max-w-xl mx-auto font-light leading-relaxed">
            Experience our interactive Aura Breath Harmonizer created to heal and align your divine journey.
          </p>
        </div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-ios rounded-[32px] p-8 md:p-12 shadow-xl grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Visual Breathe Circle */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px]">
            
            {/* Background breathing aura ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{
                  scale: isSynthesizing
                    ? breathState === 'Inhale' ? [1, 2.3] : breathState === 'Hold' ? [2.3, 2.3] : [2.3, 1]
                    : 1,
                  opacity: isSynthesizing
                    ? breathState === 'Inhale' ? [0.15, 0.45] : breathState === 'Hold' ? [0.45, 0.5] : [0.45, 0.15]
                    : 0.1
                }}
                transition={{
                  duration: isSynthesizing
                    ? breathState === 'Inhale' ? selectedMode.inhale : breathState === 'Hold' ? selectedMode.hold : selectedMode.exhale
                    : 4,
                  ease: "easeInOut"
                }}
                className="w-40 h-40 rounded-full blur-[40px] pointer-events-none transition-all duration-1000"
                style={{ backgroundColor: selectedMode.glow }}
              />
            </div>

            {/* Animated Ring */}
            <motion.div
              animate={{
                scale: isSynthesizing
                  ? breathState === 'Inhale' ? [1, 1.8] : breathState === 'Hold' ? [1.8, 1.8] : [1.8, 1]
                  : 1,
                borderColor: isSynthesizing
                  ? breathState === 'Inhale' ? 'rgba(168, 85, 247, 0.7)' : breathState === 'Hold' ? 'rgba(245, 158, 11, 0.7)' : 'rgba(16, 185, 129, 0.7)'
                  : 'rgba(200, 200, 200, 0.4)'
              }}
              transition={{
                duration: isSynthesizing
                  ? breathState === 'Inhale' ? selectedMode.inhale : breathState === 'Hold' ? selectedMode.hold : selectedMode.exhale
                  : 4,
                ease: "easeInOut"
              }}
              className="w-48 h-48 rounded-full border-4 border-dashed flex flex-col items-center justify-center p-4 relative bg-white/80 shadow-inner z-10"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={breathState + breathCountdown}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="text-center"
                >
                  <p className="text-xs font-sans uppercase tracking-[0.2em] text-amethyst-500 font-semibold mb-1">
                    {isSynthesizing ? breathState : "Ready"}
                  </p>
                  <h4 className="text-4xl font-display font-medium text-charcoal-900">
                    {isSynthesizing ? `${breathCountdown}s` : "Flow"}
                  </h4>
                </motion.div>
              </AnimatePresence>

              {/* Pulsing indicator core */}
              <div className="absolute inset-2 border border-amethyst-300/20 rounded-full pointer-events-none" />
            </motion.div>

            {/* Synth Sound Control Bar */}
            {isSynthesizing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex items-center gap-3 bg-sand-50 border border-sand-200/60 px-4 py-2 rounded-full shadow-sm z-10"
              >
                <button
                  onClick={toggleSound}
                  className="text-charcoal-800/80 hover:text-charcoal-900 transition-colors"
                  title={soundEnabled ? "Mute Aura Tone" : "Unmute Aura Tone"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-amethyst-500 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <span className="text-[10px] font-sans font-medium text-charcoal-800/60">
                  Playing: {selectedMode.frequency}Hz Solfeggio Aura Bath
                </span>
              </motion.div>
            )}
          </div>

          {/* Right Column: Descriptions & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[10px] font-mono tracking-widest text-amethyst-500 uppercase bg-amethyst-100/40 border border-amethyst-300/20 px-3 py-1.5 rounded-full w-max mb-6">
              Interactive Healing Room
            </span>
            
            <h4 className="text-2xl md:text-3xl font-display font-medium text-charcoal-900 mb-4">
              Aura Resonance Harmonizer
            </h4>
            <p className="text-charcoal-800/70 font-sans text-sm md:text-base font-light mb-8 leading-relaxed">
              Calm your autonomic system instantly. Select your current energy state, wear headphones, and begin. This module synthesizes true frequency waves natively to match your cardiac rhythm.
            </p>

            {/* State selector grid */}
            <div className="space-y-4 mb-8">
              {MEDITATION_MODES.map((mode) => (
                <button
                  key={mode.name}
                  onClick={() => handleModeChange(mode)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    selectedMode.name === mode.name
                      ? 'bg-white border-amethyst-400 shadow-md'
                      : 'bg-transparent border-sand-200/60 hover:bg-white/40'
                  }`}
                >
                  <div className={`mt-0.5 px-2.5 py-1 rounded-full text-[10px] font-sans font-bold border shrink-0 ${mode.color}`}>
                    {mode.frequency}Hz
                  </div>
                  <div>
                    <h5 className="font-sans font-medium text-sm text-charcoal-900 mb-1">{mode.name}</h5>
                    <p className="font-sans text-xs text-charcoal-800/60 font-light leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isSynthesizing ? (
                <button
                  onClick={stopSynth}
                  className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-widest bg-charcoal-100 border-charcoal-200"
                >
                  Stop Harmony session
                </button>
              ) : (
                <button
                  onClick={startSynth}
                  className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 bg-gradient-to-r from-amethyst-500 to-indigo-500 text-white shadow-xl shadow-amethyst-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  Begin Resonance Session
                </button>
              )}
              {!soundEnabled && isSynthesizing && (
                <button
                  onClick={toggleSound}
                  className="px-6 py-4 rounded-xl text-xs font-semibold uppercase tracking-widest bg-amethyst-50 text-amethyst-600 border border-amethyst-200/40 flex items-center justify-center gap-2 hover:bg-amethyst-100/40 transition-all"
                >
                  <Volume2 className="w-4 h-4" /> Enable Healing Sound
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
