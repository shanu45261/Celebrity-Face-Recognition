
import React from 'react';
import { ThemeColors } from '../constants';
import { Sparkles, ArrowRight, Scan, Cpu, Globe } from 'lucide-react';
import FaceMesh from './FaceMesh';

interface HeroHeaderProps {
  theme: ThemeColors;
  onGetStarted: () => void;
  isDark: boolean;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ theme, onGetStarted, isDark }) => {
  return (
    <section className={`relative py-20 lg:py-40 px-6 overflow-hidden min-h-[95vh] flex items-center transition-colors duration-500 ${
      isDark 
      ? 'bg-slate-950' 
      : 'bg-[radial-gradient(circle_at_0%_0%,#e0e7ff_0%,transparent_50%),radial-gradient(circle_at_100%_100%,#fae8ff_0%,transparent_50%)] bg-white/40'
    }`}>
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-10 border backdrop-blur-xl transition-colors ${
              isDark 
              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
              : 'bg-indigo-50 text-indigo-600 border-indigo-200'
            }`}>
              <Sparkles size={14} className="animate-pulse" />
              Quantum Neural Engine Active
            </div>
            
            <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.9] pointer-events-none transition-colors ${
              isDark ? 'text-white drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'text-slate-900'
            }`}>
              <span className="block mb-2">Face Recognition</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
                Framework
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-xl leading-relaxed font-medium mb-12 pointer-events-none drop-shadow-sm transition-colors ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Experience the next frontier of biometric recognition. High-fidelity facial mapping powered by massive neural clusters.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-20">
              <button 
                onClick={onGetStarted}
                className={`group relative w-full sm:w-auto px-12 py-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all overflow-hidden ${
                  isDark ? 'bg-indigo-600 shadow-indigo-600/50' : 'bg-indigo-600 shadow-indigo-600/30'
                } hover:scale-105 active:scale-95`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Scan size={20} /> Launch Engine <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className={`w-full sm:w-auto px-12 py-6 border rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 backdrop-blur-md ${
                isDark 
                ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-lg shadow-slate-200/50'
              }`}>
                <Globe size={18} /> Documentation
              </button>
            </div>
            
            <div className={`flex items-center gap-12 mt-24 transition-all pointer-events-none ${
              isDark ? 'opacity-60 grayscale hover:grayscale-0' : 'opacity-40'
            }`}>
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <Cpu size={20} className={isDark ? "text-white" : "text-slate-900"} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-white" : "text-slate-900"}`}>Core {i}00X</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[700px] lg:h-[900px] w-full flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full animate-pulse" />
            <FaceMesh isDark={isDark} />
          </div>
        </div>
      </div>

      {/* Subtle darkening gradient at bottom to help text legibility in other sections */}
      <div className={`absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t pointer-events-none transition-colors duration-500 ${
        isDark ? 'from-slate-950 to-transparent' : 'from-transparent to-transparent'
      }`} />
    </section>
  );
};

export default HeroHeader;
