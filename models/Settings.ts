export type Settings = {
  [key: string]: any;
}

export type SettingsContextType = {
  settings: Settings;
  updateSetting: (key: string, value: string | number | boolean | null) => void;
}