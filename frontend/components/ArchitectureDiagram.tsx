
import React, { useState, useEffect } from 'react';
import { Camera, Server, Video, Scan, Fingerprint, GitMerge, Share2, Activity, Cpu, ShieldCheck, Zap, Info } from 'lucide-react';

interface ArchitectureDiagramProps {
  isDark: boolean;
}

const STEPS = [
  { 
    id: 1, 
    title: 'Webcam Input', 
    desc: 'Browser MediaStream', 
    icon: Camera, 
    color: 'indigo',
    details: '60 FPS Capture, YUV to RGB Conversion, Canvas Buffer Stream',
    lightBg: 'bg-indigo-100/95 border-indigo-200'
  },
  { 
    id: 2, 
    title: 'Flask Bridge', 
    desc: '/video_feed Endpoint', 
    icon: Server, 
    color: 'purple',
    details: 'Multipart MIME Streaming, WSGI Buffer, Request-Response Lifecycle',
    lightBg: 'bg-purple-100/95 border-purple-200'
  },
  { 
    id: 3, 
    title: 'OpenCV Capture', 
    desc: 'Frame Processing', 
    icon: Video, 
    color: 'blue',
    details: 'Gaussian Blur, Resizing, Histogram Equalization, Noise Reduction',
    lightBg: 'bg-blue-100/95 border-blue-200'
  },
  { 
    id: 4, 
    title: 'RetinaFace', 
    desc: 'Detection Engine', 
    icon: Scan, 
    color: 'cyan',
    details: 'Single Shot Multibox Detector (SSD) with FPN and Context Modules',
    lightBg: 'bg-cyan-100/95 border-cyan-200'
  },
  { 
    id: 5, 
    title: 'FaceNet', 
    desc: 'Neural Embedding', 
    icon: Fingerprint, 
    color: 'rose',
    details: 'Inception-ResNet v1 Backbone, 512-Dimensional Euclidean Vector',
    lightBg: 'bg-rose-100/95 border-rose-200'
  },
  { 
    id: 6, 
    title: 'Cosine Matching', 
    desc: 'Similarity Search', 
    icon: GitMerge, 
    color: 'amber',
    details: 'Vector Distance Calculation (Dot Product Normalization), Threshold logic',
    lightBg: 'bg-amber-100/95 border-amber-200'
  },
  { 
    id: 7, 
    title: 'Response Stream', 
    desc: 'Real-time WebSocket', 
    icon: Share2, 
    color: 'emerald',
    details: 'Async JSON Payload, Client-side view update, Result Propagation',
    lightBg: 'bg-emerald-100/95 border-emerald-200'
  },
];

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ isDark }) => {
  const [activeId, setActiveId] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(210);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth > 768 ? 210 : 150);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const activeStep = STEPS.find(s => s.id === activeId) || STEPS[0];

  const colorClasses: Record<string, string> = {
    indigo: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10',
    purple: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
    blue: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
    cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
    rose: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  };

  const ringGlow: Record<string, string> = {
    indigo: 'shadow-[0_0_50px_rgba(99,102,241,0.3)]',
    purple: 'shadow-[0_0_50px_rgba(168,85,247,0.3)]',
    blue: 'shadow-[0_0_50px_rgba(59,130,246,0.3)]',
    cyan: 'shadow-[0_0_50px_rgba(34,211,238,0.3)]',
    rose: 'shadow-[0_0_50px_rgba(244,63,94,0.3)]',
    amber: 'shadow-[0_0_50px_rgba(245,158,11,0.3)]',
    emerald: 'shadow-[0_0_50px_rgba(16,185,129,0.3)]',
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden py-10">
      
      {/* Background Ambience */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-20'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 px-6">
        
        {/* Left Side: Circular Interactive Ring */}
        <div className="flex items-center justify-center py-10">
          <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center">
            
            {/* The absolute center point reference */}
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Rotating Container for Icons */}
              <div 
                className={`absolute w-full h-full transition-all duration-700 ${!isHovered ? 'animate-spin-slow' : 'animate-none'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {STEPS.map((step, index) => {
                  const angle = (index * 360) / STEPS.length;
                  return (
                    <div
                      key={step.id}
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setActiveId(step.id);
                        }}
                        className={`pointer-events-auto cursor-pointer group relative flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
                          activeId === step.id
                            ? `scale-125 z-20 ${colorClasses[step.color]} border-opacity-50 ${ringGlow[step.color]}`
                            : `${isDark ? 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:bg-white/10' : 'bg-white border-slate-300 text-slate-500 hover:text-indigo-700 shadow-lg'}`
                        } ${!isHovered ? 'animate-spin-slow-reverse' : ''}`}
                        style={{
                          transform: `rotate(${-angle}deg)`
                        }}
                      >
                        <step.icon size={window.innerWidth > 768 ? 32 : 24} />
                        
                        {activeId === step.id && (
                          <div className="absolute -inset-1 rounded-2xl border border-inherit animate-ping opacity-20" />
                        )}
                        
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg pointer-events-none whitespace-nowrap shadow-2xl z-50">
                          {step.title}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Central Core Indicator - STATIC & PERFECTLY CENTERED */}
              <div className={`relative w-44 h-44 md:w-60 md:h-60 rounded-full glass-card border flex flex-col items-center justify-center text-center p-6 shadow-2xl transition-all duration-700 z-10 ${
                isDark ? 'border-white/10 bg-slate-950/60' : 'border-indigo-200 bg-white shadow-2xl'
              }`}>
                <div className={`mb-2 ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>
                  <Cpu size={36} />
                </div>
                <div className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Neural Node</div>
                <div className={`text-3xl font-black leading-none tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>Active</div>
                
                {/* Internal decorative elements */}
                <div className="absolute inset-4 border border-indigo-500/10 rounded-full animate-spin-slow-reverse opacity-40" />
                <div className="absolute inset-8 border border-cyan-400/5 rounded-full animate-spin-fast opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Matter Display */}
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className={`glass-card rounded-[2.5rem] p-8 md:p-12 border shadow-2xl transition-all duration-500 overflow-hidden relative ${
            isDark ? 'border-white/5 bg-slate-950/40' : activeStep.lightBg
          }`}>
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${colorClasses[activeStep.color].split(' ')[2]} opacity-10 blur-[80px] pointer-events-none`} />
            
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border transition-all duration-500 ${isDark ? colorClasses[activeStep.color] : 'bg-white border-white/60 shadow-md text-slate-950'}`}>
                  <activeStep.icon size={40} />
                </div>
                <div>
                  <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-slate-500' : 'text-indigo-800'}`}>
                    <Activity size={12} className="text-emerald-500" /> System Integration Node
                  </div>
                  <h3 className={`text-4xl md:text-5xl font-black tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {activeStep.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className={`text-[11px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${isDark ? 'text-slate-500' : 'text-slate-600 font-extrabold'}`}>
                    <Zap size={14} className="text-amber-500" /> Function Overview
                  </h4>
                  <p className={`text-xl font-black leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                    {activeStep.desc}
                  </p>
                </div>

                <div className={`p-8 rounded-[2rem] border transition-all duration-500 ${
                  isDark ? 'bg-black/40 border-white/5 text-slate-400' : 'bg-white/60 border-white/40 text-slate-800 shadow-inner'
                }`}>
                  <h4 className={`text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    <Info size={14} className="text-indigo-600" /> Technical Execution
                  </h4>
                  <p className="text-base leading-relaxed font-bold">
                    {activeStep.details}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                   <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                   <div className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-600' : 'text-indigo-800'}`}>
                     End-to-End Latency: <span className="text-indigo-600">2.4ms</span>
                   </div>
                   <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-4">
             <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-600" />
                <span className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-700'}`}>Integrity Verified</span>
             </div>
             <div className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-700'}`}>
                Architecture v4.0.0
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 40s linear infinite;
        }
        .animate-spin-fast {
          animation: spin-fast 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ArchitectureDiagram;
