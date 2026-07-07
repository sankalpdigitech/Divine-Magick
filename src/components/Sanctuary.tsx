import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shield, Play, Lock, Volume2, VolumeX, Eye, EyeOff, RefreshCw, Layers } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'breath' | 'drm'>('breath');
  
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


  // --- DRM SECURITY DEMO STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

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
            Experience our interactive tools created to heal, harmonize, and protect your divine journey.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/45 backdrop-blur-2xl border border-white/80 p-1.5 rounded-full flex gap-1 shadow-sm">
            <button
              onClick={() => { setActiveTab('breath'); stopSynth(); }}
              className={`px-6 py-3 rounded-full font-sans text-xs md:text-sm font-medium tracking-wide transition-all flex items-center gap-2 ${
                activeTab === 'breath'
                  ? 'bg-charcoal-900 text-white shadow-md'
                  : 'text-charcoal-800/60 hover:text-charcoal-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Aura Breath Harmonizer
            </button>
            <button
              onClick={() => { setActiveTab('drm'); stopSynth(); }}
              className={`px-6 py-3 rounded-full font-sans text-xs md:text-sm font-medium tracking-wide transition-all flex items-center gap-2 ${
                activeTab === 'drm'
                  ? 'bg-charcoal-900 text-white shadow-md'
                  : 'text-charcoal-800/60 hover:text-charcoal-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              Secure Video Vault
            </button>
          </div>
        </div>

        {/* Content Box */}
        <AnimatePresence mode="wait">
          {activeTab === 'breath' ? (
            <motion.div
              key="breath"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
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
          ) : (
            <motion.div
              key="drm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="glass-ios rounded-[32px] p-8 md:p-12 shadow-xl grid lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Simulated Video Player */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-charcoal-800/60 uppercase">
                      Hardware Protected Media Portal Demo
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-display font-medium text-charcoal-900 mb-4">
                    Protected Stream Player
                  </h4>
                  <p className="text-charcoal-800/70 font-sans text-xs md:text-sm font-light mb-6 leading-relaxed">
                    Test the dynamic watermarking and screenshot lens on this player. This simulates how we deploy high-grade stream chunks dynamically. Move your mouse cursor over the video box below:
                  </p>
                </div>

                {/* Player Container */}
                <div 
                  ref={containerRef}
                  onMouseMove={handleMouseMove}
                  className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-charcoal-900 shadow-2xl border border-charcoal-800 select-none group cursor-none"
                >
                  {/* Glowing active screen content */}
                  {isPlaying ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-charcoal-950 to-amethyst-950 flex flex-col items-center justify-center p-6 text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 0.98, 1.05, 1],
                          opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]"
                      />
                      
                      {/* Aura visual lines in player */}
                      <svg className="w-3/4 h-1/2 opacity-30 text-amethyst-400" fill="none" viewBox="0 0 400 200">
                        <motion.path
                          animate={{ d: [
                            "M 0 100 Q 100 20 200 100 T 400 100",
                            "M 0 100 Q 100 180 200 100 T 400 100",
                            "M 0 100 Q 100 20 200 100 T 400 100"
                          ]}}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          stroke="currentColor" strokeWidth="2"
                        />
                      </svg>

                      <div className="relative z-10 text-sand-50/80">
                        <Sparkles className="w-8 h-8 mx-auto text-amethyst-400 mb-3 animate-pulse" />
                        <p className="text-sm font-display font-medium">Playing course module 1: Spiritual Alinement</p>
                        <p className="text-[10px] font-sans uppercase tracking-widest text-sand-50/40 mt-1">Live Encrypted HLS stream • AES-128</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-charcoal-950 flex flex-col items-center justify-center p-6 text-center text-sand-50/60">
                      <Lock className="w-10 h-10 text-amethyst-400 mb-4" />
                      <p className="text-sm font-sans font-light max-w-xs">Press Play to start the secure preview sandbox.</p>
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="mt-4 px-5 py-2.5 rounded-xl bg-amethyst-600 hover:bg-amethyst-500 text-white font-sans text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors shadow-lg shadow-amethyst-600/20"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Start Secure Playback
                      </button>
                    </div>
                  )}

                  {/* Watermark layers to prevent recording / leaking */}
                  {showWatermark && isPlaying && (
                    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden font-mono text-[9px] text-white/10 select-none">
                      <div className="absolute top-4 left-6">SECURE STREAM ID: 7729-XE</div>
                      <div className="absolute bottom-4 right-6">IP: 122.180.14.99</div>
                      <motion.div 
                        animate={{
                          x: [10, 200, 50, 180, 10],
                          y: [20, 80, 140, 40, 20]
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute text-white/20 bg-black/40 px-3 py-1.5 rounded border border-white/5 font-medium tracking-wide"
                      >
                        Licensed to: shwaans.bepositive@gmail.com
                      </motion.div>
                    </div>
                  )}

                  {/* Cursor lens effect highlighting dynamic screenshot deterrent */}
                  {isPlaying && (
                    <div 
                      className="absolute pointer-events-none rounded-full border border-white/30 bg-white/5 w-24 h-24 -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                      style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
                    >
                      <div className="w-1 h-1 bg-white rounded-full" />
                      <span className="absolute -bottom-6 bg-charcoal-900/90 text-[7px] font-mono tracking-widest text-amethyst-400 px-1.5 py-0.5 rounded border border-amethyst-500/20 uppercase">
                        Cursor Shield
                      </span>
                    </div>
                  )}
                </div>

                {/* Player Controller Bar */}
                {isPlaying && (
                  <div className="mt-4 flex items-center justify-between p-4 bg-charcoal-900 rounded-xl text-sand-50/70 text-xs border border-charcoal-800">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setIsPlaying(false)} className="hover:text-white font-sans font-semibold">Pause</button>
                      <div className="w-24 md:w-40 h-1 bg-charcoal-800 rounded-full overflow-hidden">
                        <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 20, repeat: Infinity }} className="h-full bg-amethyst-500" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setShowWatermark(!showWatermark)}
                        className="hover:text-white flex items-center gap-1.5"
                      >
                        {showWatermark ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {showWatermark ? 'Hide Watermark' : 'Show Watermark'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: High-Grade Security Details */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h5 className="font-display font-medium text-xl text-charcoal-900 mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-amethyst-500" /> Protecting Your Content
                </h5>

                <p className="text-charcoal-800/80 font-sans text-xs md:text-sm font-light mb-6 leading-relaxed">
                  We take course security seriously. To prevent downloading, scraping, and screen recording in production environments, we set up full commercial safeguards:
                </p>

                <div className="space-y-4 text-xs font-sans text-charcoal-800/70 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-amethyst-50 rounded-lg text-amethyst-500 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="font-semibold text-charcoal-900 mb-1">Encrypted HLS/DASH Streaming</h6>
                      <p className="font-light leading-relaxed">Videos are split into thousands of micro-chunks encrypted with AES-128. There is no simple file to download.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-amethyst-50 rounded-lg text-amethyst-500 mt-0.5">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="font-semibold text-charcoal-900 mb-1">Widevine & FairPlay Hardware DRM</h6>
                      <p className="font-light leading-relaxed">Utilizes native browser and operating system security policies which instantly turn screens black when screen recorders try to record the window.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-amethyst-50 rounded-lg text-amethyst-500 mt-0.5">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="font-semibold text-charcoal-900 mb-1">Dynamic Forensic Watermarking</h6>
                      <p className="font-light leading-relaxed">Floating overlays showing email, IP address, and date/time of the client are rendered dynamically inside the stream to render leaked recordings completely trace-backable.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-sand-100 rounded-xl border border-sand-200 text-xs font-sans text-charcoal-800/60 leading-relaxed">
                  <strong>Our Blueprint:</strong> This architecture integrates flawlessly with video backends like AWS Elemental, Vimeo Enterprise, or Cloudflare Stream, ensuring your programs remain safe, exclusive, and premium.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
