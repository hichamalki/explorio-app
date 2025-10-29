export type Preferences = {
  [key: string]: any;
}

export type PreferencesContextType = {
  isLoaded: boolean,
  preferences: Preferences;
  updatePreference: (key: string, value: {} | string | number | boolean | null) => void;
}