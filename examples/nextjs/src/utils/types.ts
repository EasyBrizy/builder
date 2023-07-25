export interface Config {
  localisation?: {
    current: string;
    languages: string[];
  };
}
export interface Language {
  localisations?: string[];
  defaultLanguage?: string;
  currentLanguage?: string;
  value?: string;
}

export const languageCookieKey = "language";
