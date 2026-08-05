
import React from 'react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Terminal, 
  Zap, 
  Activity, 
  BrainCircuit,
  Binary,
  Box
} from 'lucide-react';

interface TechnologySectionProps {
  isDark: boolean;
}

const TECH_STACK = [
  {
    category: 'Backend Architecture',
    icon: Terminal,
    items: [
      { name: 'Python', desc: 'Core logic & AI integration', icon: Code2 },
      { name: 'Flask', desc: 'REST API & Video Streaming', icon: Zap }
    ],
    color: 'from-blue-500 to-indigo-500',
    lightBg: 'bg-blue-100/90 border-blue-200'
  },
  {
    category: 'AI & Neural Models',
    icon: BrainCircuit,
    items: [
      { name: 'RetinaFace', desc: 'High-precision face detection', icon: Activity },
      { name: 'FaceNet', desc: 'Deep learning for embeddings', icon: Binary },
      { name: 'DeepFace', desc: 'Comprehensive AI framework', icon: Cpu }
    ],
    color: 'from-purple-500 to-pink-500',
    lightBg: 'bg-purple-100/90 border-purple-200'
  },
  {
    category: 'Machine Learning Core',
    icon: Layers,
    items: [
      { name: 'TensorFlow', desc: 'Neural network orchestration', icon: Box },
      { name: 'OpenCV', desc: 'Real-time computer vision', icon: Activity },
      { name: 'NumPy', desc: 'Scientific data processing', icon: Binary }
    ],
    color: 'from-orange-500 to-red-500',
    lightBg: 'bg-orange-100/90 border-orange-200'
  },
  {
    category: 'Frontend & Storage',
    icon: Globe,
    items: [
      { name: 'React + TS', desc: 'Modern reactive interface', icon: Code2 },
      { name: 'Tailwind CSS', desc: 'Advanced utility-first styling', icon: Layers },
      { name: '.npy Files', desc: 'Binary vector storage', icon: Database }
    ],
    color: 'from-emerald-500 to-cyan-500',
    lightBg: 'bg-emerald-100/90 border-emerald-200'
  }
];

const TechnologySection: React.FC<TechnologySectionProps> = ({ isDark }) => {
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border mb-6 transition-colors ${
            isDark ? 'bg-white/5 border-white/10 text-indigo-400' : 'bg-indigo-100 border-indigo-300 text-indigo-800'
          }`}>
            <Cpu size={14} className="animate-pulse" /> Tech Infrastructure
          </div>
          <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
            The Neural <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">Stack</span>
          </h2>
          <p className={`text-xl max-w-2xl font-medium leading-relaxed transition-colors ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
            Our multi-layered technology ecosystem combines high-performance backend processing with cutting-edge computer vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TECH_STACK.map((group, idx) => (
            <div key={idx} className={`glass-card rounded-[2.5rem] p-8 lg:p-10 border relative group overflow-hidden transition-all duration-500 ${
              isDark ? 'border-white/10 bg-slate-950/40' : group.lightBg
            }`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${group.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform ${
                  isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-white/60 text-slate-950 shadow-sm'
                }`}>
                  <group.icon size={24} />
                </div>
                <h3 className={`text-2xl font-black tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>{group.category}</h3>
              </div>

              <div className="space-y-6">
                {group.items.map((item, i) => (
                  <div key={i} className={`flex items-center gap-5 p-4 rounded-2xl border transition-all hover:translate-x-2 ${
                    isDark ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]' : 'bg-white/80 border-white/40 hover:bg-white hover:shadow-xl'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-200/50 text-slate-600'}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className={`font-black text-lg transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                      <p className={`text-sm font-bold transition-colors ${isDark ? 'text-slate-500' : 'text-slate-700'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-20 p-12 glass-card rounded-[3rem] border text-center relative overflow-hidden transition-all ${
          isDark ? 'border-white/10' : 'border-indigo-200 bg-indigo-100/50 shadow-3xl shadow-indigo-300/40'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none" />
          <h4 className={`text-2xl font-black mb-6 transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>Pipeline Performance Metrics</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-black mb-2 transition-colors ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>12ms</span>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Avg. Embedding Latency</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-black mb-2 transition-colors ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>512d</span>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Vector Dimensionality</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-black mb-2 transition-colors ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>99.2%</span>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Detection Recall</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-black mb-2 transition-colors ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>32-bit</span>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Floating Point Precision</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
