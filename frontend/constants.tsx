
import { ThemeType, CelebrityCategory } from './types';

export interface ThemeColors {
  bg: string;
  accent: string;
  glow: string;
  text: string;
  secondaryText: string;
  card: string;
  button: string;
  buttonHover: string;
  badge: string;
  ring: string;
}

export const THEME_CONFIG: Record<ThemeType, ThemeColors> = {
  default: {
    bg: 'from-slate-950 via-slate-900 to-indigo-950',
    accent: 'bg-indigo-500',
    glow: 'shadow-indigo-500/20',
    text: 'text-white',
    secondaryText: 'text-slate-400',
    card: 'glass-card',
    button: 'bg-indigo-600',
    buttonHover: 'hover:bg-indigo-500',
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    ring: 'ring-indigo-500/20'
  },
  action: {
    bg: 'from-slate-950 via-red-950 to-slate-950',
    accent: 'bg-red-500',
    glow: 'shadow-red-500/20',
    text: 'text-white',
    secondaryText: 'text-red-200/50',
    card: 'glass-card',
    button: 'bg-red-600',
    buttonHover: 'hover:bg-red-500',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    ring: 'ring-red-500/20'
  },
  romantic: {
    bg: 'from-slate-950 via-rose-950 to-slate-950',
    accent: 'bg-rose-500',
    glow: 'shadow-rose-500/20',
    text: 'text-white',
    secondaryText: 'text-rose-200/50',
    card: 'glass-card',
    button: 'bg-rose-600',
    buttonHover: 'hover:bg-rose-500',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    ring: 'ring-rose-500/20'
  },
  sports: {
    bg: 'from-slate-950 via-emerald-950 to-slate-950',
    accent: 'bg-emerald-500',
    glow: 'shadow-emerald-500/20',
    text: 'text-white',
    secondaryText: 'text-emerald-200/50',
    card: 'glass-card',
    button: 'bg-emerald-600',
    buttonHover: 'hover:bg-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    ring: 'ring-emerald-500/20'
  },
  music: {
    bg: 'from-slate-950 via-purple-950 to-slate-950',
    accent: 'bg-purple-500',
    glow: 'shadow-purple-500/20',
    text: 'text-white',
    secondaryText: 'text-purple-200/50',
    card: 'glass-card',
    button: 'bg-purple-600',
    buttonHover: 'hover:bg-purple-500',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    ring: 'ring-purple-500/20'
  },
  tech: {
    bg: 'from-slate-950 via-cyan-950 to-slate-950',
    accent: 'bg-cyan-500',
    glow: 'shadow-cyan-500/20',
    text: 'text-white',
    secondaryText: 'text-cyan-200/50',
    card: 'glass-card',
    button: 'bg-cyan-600',
    buttonHover: 'hover:bg-cyan-500',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    ring: 'ring-cyan-500/20'
  }
};

export const CATEGORY_TO_THEME: Record<CelebrityCategory, ThemeType> = {
  [CelebrityCategory.ACTION]: 'action',
  [CelebrityCategory.ROMANTIC]: 'romantic',
  [CelebrityCategory.SPORTS]: 'sports',
  [CelebrityCategory.MUSIC]: 'music',
  [CelebrityCategory.TECH]: 'tech',
  [CelebrityCategory.OTHER]: 'default',
};
