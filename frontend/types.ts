
export enum CelebrityCategory {
  ACTION = 'Action',
  ROMANTIC = 'Romantic',
  SPORTS = 'Sports',
  MUSIC = 'Music',
  TECH = 'Tech',
  OTHER = 'Other'
}

export interface RecognitionResult {
  name: string;
  confidence: number;
  category: CelebrityCategory;
  description: string;
  referenceImage: string;
}

export type ThemeType = 'default' | 'action' | 'romantic' | 'sports' | 'music' | 'tech';
export type ViewType = 'landing' | 'engine' | 'about' | 'teams' | 'technology' | 'architecture';
export type ColorMode = 'light' | 'dark';

export interface AppState {
  image: string | null;
  loading: boolean;
  result: RecognitionResult | null;
  theme: ThemeType;
  currentView: ViewType;
  colorMode: ColorMode;
}
