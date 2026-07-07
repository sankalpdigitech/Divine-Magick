import { motion } from 'motion/react';
import { useMemo } from 'react';

export default function BackgroundDots() {
  // Stabilize random positions and properties using useMemo so they don't jump on re-renders
  const dots = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      z: Math.random() * 400 - 200,
      moveY1: Math.random() * -300 - 100,
      moveY2: Math.random() * 200,
      moveX1: Math.random() * 200 - 100,
      moveX2: Math.random() * -200,
      moveZ1: Math.random() * 400 - 200,
      moveZ2: Math.random() * 400 - 200,
      duration: Math.random() * 25 + 25,
      delay: Math.random() * -20, // Negative delay so they are already spread out on load
    }));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden" 
      style={{ transformStyle: 'preserve-3d' }}
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-amethyst-500/40 blur-[0.5px]"
          initial={{
            left: dot.left,
            top: dot.top,
            z: dot.z,
            scale: 0.8,
          }}
          animate={{
            y: [0, dot.moveY1, dot.moveY2, 0],
            x: [0, dot.moveX1, dot.moveX2, 0],
            z: [dot.z, dot.moveZ1, dot.moveZ2, dot.z],
            opacity: [0.2, 0.75, 0.45, 0.2],
            scale: [0.8, 1.4, 1.1, 0.8]
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
        />
      ))}
    </motion.div>
  );
}
