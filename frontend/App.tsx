
import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroHeader from './components/HeroHeader';
import UploadCard from './components/UploadCard';
import ResultCard from './components/ResultCard';
import TeamsSection from './components/TeamsSection';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import TechnologySection from './components/TechnologySection';
import NeuralCore from './components/NeuralCore';
import { AppState, RecognitionResult, ThemeType, ViewType, ColorMode } from './types';
import { THEME_CONFIG, CATEGORY_TO_THEME } from './constants';
import { recognizeCelebrity } from './services/geminiService';
import { ShieldCheck, Zap, Globe, Lock, Cpu, Sparkles, Fingerprint, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    image: null,
    loading: false,
    result: null,
    theme: 'default',
    currentView: 'landing',
    colorMode: 'dark'
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state.colorMode === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [state.colorMode]);

  const handleNavigate = (view: ViewType) => {
    setState(prev => ({ ...prev, currentView: view }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleColorMode = () => {
    setState(prev => ({ ...prev, colorMode: prev.colorMode === 'dark' ? 'light' : 'dark' }));
  };

  const handleAnalyze = useCallback(async (base64Image: string) => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      const result: RecognitionResult = await recognizeCelebrity(base64Image);
      const newTheme: ThemeType = CATEGORY_TO_THEME[result.category] || 'default';
      
      setState(prev => ({
        ...prev,
        result,
        image: base64Image,
        loading: false,
        theme: newTheme
      }));
    } catch (error) {
      console.error("Analysis failed:", error);
      setState(prev => ({ ...prev, loading: false }));
      alert("Analysis failed. Please try a different photo.");
    }
  }, []);

  const theme = THEME_CONFIG[state.theme];
  const isDark = state.colorMode === 'dark';

  const renderContent = () => {
    switch (state.currentView) {
      case 'landing':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <HeroHeader theme={theme} onGetStarted={() => handleNavigate('engine')} isDark={isDark} />
          </div>
        );
      case 'engine':
        return (
          <section className="max-w-7xl mx-auto px-6 py-12 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col lg:flex-row items-center gap-6 mb-16">
              <div className={`w-12 h-12 rounded-2xl ${isDark ? 'bg-indigo-600' : 'bg-indigo-500'} flex items-center justify-center text-white shadow-xl shadow-indigo-600/20`}>
                <Zap size={24} />
              </div>
              <div>
                <h2 className={`text-3xl lg:text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight`}>Recognition Workspace</h2>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Capture or upload an image to begin neural mapping.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <UploadCard 
                onAnalyze={handleAnalyze} 
                loading={state.loading} 
                theme={theme}
              />
              <ResultCard 
                result={state.result} 
                loading={state.loading} 
                theme={theme}
              />
            </div>
          </section>
        );
      case 'architecture':
        return (
          <section className="py-24 lg:py-32 px-6 animate-in fade-in zoom-in duration-700">
             <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-20">
                  <div className={`w-16 h-16 rounded-[1.5rem] ${isDark ? 'bg-indigo-600/10 border-indigo-500/20' : 'bg-indigo-100 border-indigo-200'} border flex items-center justify-center text-indigo-400 mb-8 shadow-xl`}>
                    <Layers size={32} />
                  </div>
                  <h3 className={`text-4xl md:text-5xl lg:text-7xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter mb-6`}>System Architecture</h3>
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl font-medium text-lg leading-relaxed`}>
                    Our pipeline is engineered for low latency and high precision, bridging the gap between raw hardware inputs and sophisticated neural embeddings.
                  </p>
                </div>
                <ArchitectureDiagram isDark={isDark} />
             </div>
          </section>
        );
      case 'about':
        return (
          <section className="py-24 lg:py-32 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* What DeepFace Does */}
            <div className="mb-32">
              <h3 className={`text-3xl md:text-5xl font-black mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                What DeepFace Does
              </h3>
              <p className={`text-center max-w-3xl mx-auto mb-12 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                DeepFace transforms images into intelligent identity insights through a streamlined pipeline — detecting faces, generating embeddings, and matching them with precision. The entire process is optimized for speed, accuracy, and reliability.
              </p>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { title: "Detect", desc: "Identifies faces using advanced detection models" },
                  { title: "Encode", desc: "Generates unique embeddings via deep learning" },
                  { title: "Match", desc: "Compares embeddings using similarity metrics" },
                  { title: "Output", desc: "Returns the best identity match instantly" },
                ].map((item, i) => (
                  <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Features */}
            <div className="mb-32">
              <h3 className={`text-3xl md:text-5xl font-black mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Core Features
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Secure", desc: "End-to-end encrypted processing" },
                  { title: "Private", desc: "Zero-storage architecture" },
                  { title: "Accurate", desc: "High precision recognition models" },
                  { title: "Fast", desc: "Real-time processing speed" },
                  { title: "Scalable", desc: "Handles large datasets efficiently" },
                  { title: "Intelligent", desc: "Embedding-based smart matching" },
                ].map((item, i) => (
                  <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why DeepFace */}
            <div className="mb-32 text-center max-w-3xl mx-auto">
              <h3 className={`text-3xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Why DeepFace?
              </h3>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                DeepFace is designed to balance accuracy, speed, and privacy without compromise. Unlike traditional systems that store sensitive facial data, our approach uses a zero-storage architecture combined with embedding-based recognition to ensure both performance and ethical responsibility.
              </p>
            </div>

            {/* Use Cases */}
            <div className="mb-32">
              <h3 className={`text-3xl md:text-5xl font-black mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Use Cases
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Smart Attendance Systems",
                  "Secure Authentication",
                  "Surveillance & Monitoring",
                  "AI Research & Development",
                  "Digital Identity Verification",
                  "Access Control Systems",
                ].map((item, i) => (
                  <div key={i} className={`p-6 rounded-2xl border text-center ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing Section */}
            <div className="text-center">
              <h3 className={`text-3xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Building the Future of Identity
              </h3>
              <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                DeepFace bridges the gap between human identity and machine intelligence, creating systems that are powerful, secure, and responsible. Explore the platform and experience the future of AI-driven recognition.
              </p>

              <button className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:scale-105 transition">
                Try the Engine
              </button>
            </div>
          </section>
        );
      case 'technology':
        return <div className="animate-in fade-in slide-in-from-bottom-4 duration-700"><TechnologySection isDark={isDark} /></div>;
      case 'teams':
        return <div className="animate-in fade-in slide-in-from-bottom-4 duration-700"><TeamsSection isDark={isDark} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-indigo-500/30">
      <div className="bg-mesh">
        <div className="bg-grid" />
        <div className="bg-blob-1" />
        <div className="bg-blob-2" />
        <div className="bg-blob-3" />
      </div>
      <div className="face-mask-overlay" />

      <Navbar activeView={state.currentView} onNavigate={handleNavigate} colorMode={state.colorMode} onToggleMode={toggleColorMode} />
      
      <main className="relative pt-24 min-h-[calc(100vh-200px)]">
        {renderContent()}
      </main>

      <footer className={`py-24 px-6 text-center border-t ${isDark ? 'border-white/5' : 'border-slate-200'} relative z-10`}>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border rounded-xl flex items-center justify-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Cpu size={20} />
            </div>
            <span className={`font-black tracking-tighter text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>DeepFace AI</span>
          </div>
          <div className={`flex gap-10 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <button onClick={() => handleNavigate('about')} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Privacy</button>
            <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Github</a>
            <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Documentation</a>
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDark ? 'text-slate-600' : 'text-slate-400'} mt-8`}>
            Built with Neural Passion &copy; 2024 DEEPFACE LABS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
