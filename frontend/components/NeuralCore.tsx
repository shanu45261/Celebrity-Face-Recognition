
import React from 'react';
import { User, Scan } from 'lucide-react';

interface NeuralCoreProps {
  isDark: boolean;
}

const NeuralCore: React.FC<NeuralCoreProps> = ({ isDark }) => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] perspective-1000 mx-auto">
      {/* Outer Rotating Ring */}
      <div className={`absolute inset-0 border-[2px] ${isDark ? 'border-indigo-500/40' : 'border-black/30'} rounded-full animate-spin-slow-3d border-dashed`} />
      
      {/* Middle Rotating Ring */}
      <div className={`absolute inset-10 border-[1px] ${isDark ? 'border-cyan-400/50' : 'border-black/20'} rounded-full animate-spin-reverse-3d`} />
      
      {/* Central Core Glass Sphere */}
      <div className={`absolute inset-[25%] rounded-full glass-card border ${isDark ? 'border-white/30' : 'border-slate-300'} shadow-[0_0_80px_rgba(99,102,241,0.3)] flex items-center justify-center overflow-hidden animate-float-3d ${isDark ? 'bg-slate-950/60' : 'bg-white/90'}`}>
        <div className={`relative z-10 ${isDark ? 'text-indigo-500' : 'text-black'}`}>
          <User size={100} strokeWidth={1.5} className="animate-pulse-glow" />
        </div>
        {/* Internal Sphere Glow */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${isDark ? 'from-indigo-600/50 via-purple-600/30' : 'from-indigo-300/40 via-purple-200/40'} to-transparent blur-xl`} />
        {/* Scan Line within sphere */}
        <div className={`scan-line !h-2 ${isDark ? '!bg-indigo-400 !shadow-[0_0_20px_#818cf8]' : '!bg-black !shadow-none'}`} />
      </div>

      {/* Data Orbitals (Floating Dots) */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className={`absolute w-2 h-2 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)] ${isDark ? 'bg-white' : 'bg-black'}`}
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${i * 45}deg) translate(220px) rotate(-${i * 45}deg)`,
            animation: `orbit-data ${5 + i}s linear infinite`
          }}
        />
      ))}

      {/* Atmospheric Elements */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${isDark ? 'bg-indigo-600/10' : 'bg-indigo-500/5'} blur-[120px] rounded-full -z-10`} />

      <style>{`
        @keyframes spin-slow-3d {
          from { transform: rotateY(0deg) rotateX(15deg) rotateZ(0deg); }
          to { transform: rotateY(360deg) rotateX(15deg) rotateZ(360deg); }
        }
        @keyframes spin-reverse-3d {
          from { transform: rotateY(360deg) rotateX(-15deg) rotateZ(360deg); }
          to { transform: rotateY(0deg) rotateX(-15deg) rotateZ(0deg); }
        }
        @keyframes float-3d {
          0%, 100% { transform: translateY(0) scale(1) rotateX(5deg); }
          50% { transform: translateY(-20px) scale(1.05) rotateX(-5deg); }
        }
        @keyframes orbit-data {
          0% { opacity: 0; transform: rotate(0deg) translate(220px) rotate(0deg) scale(0.5); }
          50% { opacity: 1; transform: rotate(180deg) translate(240px) rotate(-180deg) scale(1.2); }
          100% { opacity: 0; transform: rotate(360deg) translate(220px) rotate(-360deg) scale(0.5); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(129, 140, 248, 0.4)); opacity: 0.7; }
          50% { filter: drop-shadow(0 0 25px rgba(129, 140, 248, 0.9)); opacity: 1; }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 70%; }
        }
        .animate-spin-slow-3d {
          animation: spin-slow-3d 20s linear infinite;
          transform-style: preserve-3d;
        }
        .animate-spin-reverse-3d {
          animation: spin-reverse-3d 15s linear infinite;
          transform-style: preserve-3d;
        }
        .animate-float-3d {
          animation: float-3d 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default NeuralCore;
