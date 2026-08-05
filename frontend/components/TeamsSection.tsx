
import React from 'react';
import { Github, Twitter, Linkedin, User, UserRound } from 'lucide-react';

interface TeamsSectionProps {
  isDark: boolean;
}

const TEAM_MEMBERS = [
  { 
    id: '22A31A4344', 
    name: 'M. Venkata Mithilesh', 
    role: 'Backend Developer', 
    gender: 'male',
    lightBg: 'bg-indigo-100/90 border-indigo-200'
  },
  { 
    id: '22A31A4350', 
    name: 'M. Karthik', 
    role: 'Database & Structure Management', 
    gender: 'male',
    lightBg: 'bg-purple-100/90 border-purple-200'
  },
  { 
    id: '22A31A4314', 
    name: 'K. Mruthyum Jaya Rani', 
    role: 'Testing & QA', 
    gender: 'female',
    lightBg: 'bg-rose-100/90 border-rose-200'
  },
  { 
    id: '22A31A4302', 
    name: 'A. S. Shanu', 
    role: 'Frontend Engineering', 
    gender: 'female',
    lightBg: 'bg-emerald-100/90 border-emerald-200'
  },
];

const TeamsSection: React.FC<TeamsSectionProps> = ({ isDark }) => {
  return (
    <section id="teams" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border transition-colors ${
            isDark ? 'bg-indigo-500/5 border-indigo-500/10 text-indigo-400' : 'bg-indigo-100 border-indigo-300 text-indigo-700 font-black'
          }`}>
            Neural Development Unit
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            The Pioneers
          </h2>
          <p className={`text-lg max-w-2xl font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Meet the multi-disciplinary team bridging the gap between hardware and neural intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="group relative">
              <div className={`relative aspect-[3/4] overflow-hidden rounded-[2.5rem] glass-card transition-all duration-500 group-hover:-translate-y-4 shadow-2xl flex flex-col items-center justify-center p-8 border ${
                isDark ? 'border-white/5' : member.lightBg
              }`}>
                
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 relative border ${
                  isDark ? 'bg-white/5 border-black/5' : 'bg-white border-slate-300 shadow-lg'
                }`}>
                  <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {member.gender === 'male' ? (
                    <User size={64} className={`transition-all ${isDark ? 'opacity-40 text-indigo-400 group-hover:opacity-100' : 'text-slate-600 group-hover:text-indigo-700'}`} />
                  ) : (
                    <UserRound size={64} className={`transition-all ${isDark ? 'opacity-40 text-indigo-400 group-hover:opacity-100' : 'text-slate-600 group-hover:text-indigo-700'}`} />
                  )}
                </div>

                <div className="text-center w-full">
                  <h4 className={`text-xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {member.name}
                  </h4>
                  
                  <div className="flex flex-col gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] py-1 px-3 rounded-lg border self-center transition-colors ${
                      isDark ? 'text-indigo-400 bg-indigo-500/5 border-indigo-500/10' : 'text-indigo-700 bg-white border-indigo-200'
                    }`}>
                      ID: {member.id}
                    </span>
                    <span className={`text-xs font-bold px-4 leading-tight ${isDark ? 'text-slate-500 opacity-60' : 'text-slate-800'}`}>
                      {member.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 mt-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <a href="#" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${
                      isDark ? 'bg-black/5 border-transparent hover:border-indigo-500/20 text-slate-400 hover:text-white' : 'bg-white border-slate-300 text-slate-600 hover:text-indigo-700'
                    }`}><Twitter size={16} /></a>
                    <a href="#" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${
                      isDark ? 'bg-black/5 border-transparent hover:border-indigo-500/20 text-slate-400 hover:text-white' : 'bg-white border-slate-300 text-slate-600 hover:text-indigo-700'
                    }`}><Github size={16} /></a>
                    <a href="#" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${
                      isDark ? 'bg-black/5 border-transparent hover:border-indigo-500/20 text-slate-400 hover:text-white' : 'bg-white border-slate-300 text-slate-600 hover:text-indigo-700'
                    }`}><Linkedin size={16} /></a>
                  </div>
                </div>
              </div>
              
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] opacity-0 blur-2xl group-hover:opacity-10 transition-all duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
