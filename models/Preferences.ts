export type Preferences = {
  [key: string]: any;
}

export type PreferencesContextType = {
  preferences: Preferences;
  updatePreference: (key: string, value: {} | string | number | boolean | null) => void;
  loadPreferences: () => void
}