
import React from 'react';
import { RecognitionResult } from '../types';
import { Target, Info, Star, Award, ChevronRight, Palette, Cpu, Zap, Fingerprint, Activity, Radio, Shield, Share2, Binary } from 'lucide-react';
import { ThemeColors } from '../constants';

interface ResultCardProps {
  result: RecognitionResult | null;
  loading: boolean;
  theme: ThemeColors;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, loading, theme }) => {
  const isLight = document.body.classList.contains('light-mode');

  // Loading state view
  if (loading) {
    return (
      <div className="w-full h-full flex flex-col opacity-60">
        <div className="h-4 w-32 bg-white/5 rounded-full mb-4 animate-pulse" />
        <div className={`flex-1 glass-card rounded-[2.5rem] p-8 flex flex-col gap-8 animate-pulse ${isLight ? 'bg-indigo-50/80 border-indigo-100' : 'bg-slate-950/50'}`}>
           <div className="aspect-[4/5] bg-white/5 rounded-[1.8rem]" />
           <div className="space-y-4">
             <div className="h-8 w-2/3 bg-white/10 rounded-xl" />
             <div className="h-4 w-full bg-white/5 rounded-lg" />
             <div className="h-4 w-full bg-white/5 rounded-lg" />
           </div>
        </div>
      </div>
    );
  }

  // Initial/No result state view - Redesigned as requested
  if (!result) {
    return (
      <div className="w-full h-full flex flex-col group animate-in fade-in duration-1000">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
            <Share2 size={14} className="text-indigo-400" /> Neural Analysis Node 01
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Awaiting Signal</span>
          </div>
        </div>

        <div className={`flex-1 glass-card rounded-[2.5rem] p-8 lg:p-12 flex flex-col items-center justify-center text-center transition-all duration-700 border-2 overflow-hidden relative ${
          isLight ? 'bg-white border-slate-100 shadow-xl' : 'bg-slate-950/50 border-white/5 shadow-2xl'
        }`}>
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="relative mb-12">
            {/* Neural Core Pulse Visual */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Outer Pulse Rings */}
              <div className="absolute inset-0 border-2 border-indigo-500/10 rounded-full animate-[ping_3s_linear_infinite]" />
              <div className="absolute inset-4 border border-indigo-500/20 rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
              
              {/* Central Biometric Core */}
              <div className={`relative w-28 h-28 rounded-[2.5rem] flex items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(99,102,241,0.2)] border transition-all duration-500 ${
                isLight ? 'bg-white border-slate-200 text-indigo-500' : 'bg-white/5 border-white/10 text-indigo-400'
              }`}>
                <Fingerprint size={56} className="animate-pulse" />
                
                {/* Vertical Scan Bar */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_cyan] animate-[scan-vertical_2.5s_ease-in-out_infinite] opacity-60" />
              </div>

              {/* Data Orbitals */}
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-indigo-400/40 shadow-[0_0_10px_indigo]"
                    style={{
                      top: '50%',
                      left: '50%',
                      animation: `data-orbit-${i} ${4 + i}s linear infinite`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-sm">
            <h3 className={`text-3xl font-black mb-4 tracking-tighter ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Identity Pending
            </h3>
            <p className={`text-sm font-medium leading-relaxed mb-12 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Initialize the recognition engine to start identifying potential matches within our database.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
               <div className={`px-5 py-4 rounded-2xl border flex items-center gap-4 transition-colors group/item ${
                 isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
               }`}>
                 <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover/item:scale-110 transition-transform">
                   <Binary size={18} />
                 </div>
                 <div className="text-left">
                   <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Stream Status</div>
                   <div className={`text-[11px] font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>AWAITING_BUFFER</div>
                 </div>
               </div>
               
               <div className={`px-5 py-4 rounded-2xl border flex items-center gap-4 transition-colors group/item ${
                 isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
               }`}>
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover/item:scale-110 transition-transform">
                   <Shield size={18} />
                 </div>
                 <div className="text-left">
                   <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Secure Uplink</div>
                   <div className={`text-[11px] font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>VERIFIED_CORE</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes scan-vertical {
            0%, 100% { top: 10%; opacity: 0; }
            50% { top: 90%; opacity: 1; }
          }
          @keyframes data-orbit-0 {
            from { transform: rotate(0deg) translate(85px) rotate(0deg); }
            to { transform: rotate(360deg) translate(85px) rotate(-360deg); }
          }
          @keyframes data-orbit-1 {
            from { transform: rotate(120deg) translate(105px) rotate(-120deg); }
            to { transform: rotate(480deg) translate(105px) rotate(-480deg); }
          }
          @keyframes data-orbit-2 {
            from { transform: rotate(240deg) translate(125px) rotate(-240deg); }
            to { transform: rotate(600deg) translate(125px) rotate(-600deg); }
          }
        `}</style>
      </div>
    );
  }

  // Result display view
  return (
    <div className="w-full h-full flex flex-col group animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
          <Fingerprint size={14} className={theme.accent.replace('bg-', 'text-')} /> Neural Identity Match
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Match Confirmed</span>
        </div>
      </div>

      <div className={`flex-1 glass-card rounded-[2.5rem] p-8 flex flex-col gap-8 transition-all duration-500 border-2 overflow-hidden relative ${
        isLight ? 'bg-white border-slate-100 shadow-2xl' : 'bg-slate-950/50 border-white/5 shadow-2xl'
      }`}>
        <div className="relative aspect-[4/5] rounded-[1.8rem] overflow-hidden group/img shadow-2xl bg-black">
          <img 
            src={result.referenceImage} 
            alt={result.name} 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover/img:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest mb-3 backdrop-blur-md border ${theme.badge}`}>
              {result.category}
            </div>
            <h4 className="text-3xl font-black text-white tracking-tighter leading-none">{result.name}</h4>
          </div>

          <div className="absolute top-6 right-6 flex flex-col items-end">
            <div className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Confidence Score</div>
            <div className="text-2xl font-black text-white">{(result.confidence * 100).toFixed(1)}%</div>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <h5 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              <Info size={14} className="text-indigo-400" /> Dossier Overview
            </h5>
            <p className={`text-sm leading-relaxed font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {result.description}
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
             <div className={`p-4 rounded-2xl ${isLight ? 'bg-slate-50' : 'bg-white/5'} border ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Vector ID</div>
                <div className={`text-[10px] font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>DF-X99-442</div>
             </div>
             <div className={`p-4 rounded-2xl ${isLight ? 'bg-slate-50' : 'bg-white/5'} border ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Processing</div>
                <div className={`text-[10px] font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>GPU_ACCEL</div>
             </div>
          </div>
        </div>

        <button className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] text-white flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] ${theme.button} ${theme.glow}`}>
           <Star size={14} /> Full Analytics Report <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
