
import React from 'react';
import { Github, Cpu, LayoutGrid, Info, Users, Box, Moon, Sun, Layers } from 'lucide-react';
import { ViewType, ColorMode } from '../types';

interface NavbarProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  colorMode: ColorMode;
  onToggleMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate, colorMode, onToggleMode }) => {
  const isDark = colorMode === 'dark';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 lg:py-6">
      <div className={`max-w-7xl mx-auto flex items-center justify-between glass-nav px-6 lg:px-8 py-3 rounded-2xl border ${isDark ? 'border-white/10' : 'border-slate-200'} shadow-2xl transition-all duration-500`}>
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
            <Cpu size={22} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className={`font-extrabold tracking-tight text-lg leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>DeepFace</span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">AI Showcase</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
          {[
            { id: 'engine', icon: LayoutGrid, label: 'Engine' },
            { id: 'architecture', icon: Layers, label: 'Architecture' },
            { id: 'technology', icon: Box, label: 'Technology' },
            { id: 'about', icon: Info, label: 'About' },
            { id: 'teams', icon: Users, label: 'Teams' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id as ViewType)} 
              className={`transition-all flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-500/5 ${
                activeView === item.id 
                ? (isDark ? 'text-white' : 'text-indigo-600') 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
              }`}
            >
              <item.icon size={14} /> {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={onToggleMode}
            className={`p-2.5 rounded-xl transition-all border ${
              isDark 
              ? 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10' 
              : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border-transparent hover:border-slate-200'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={() => onNavigate('engine')}
            className={`px-6 py-2.5 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all active:scale-95 shadow-xl ${
              isDark ? 'bg-white text-slate-950 hover:bg-indigo-50' : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {activeView === 'engine' ? 'Workspace' : 'Get Started'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
