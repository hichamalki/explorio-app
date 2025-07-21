import React, { createContext, useContext, useEffect, useState } from 'react';
import { SettingsContextType, Settings } from '../models/Settings';
import { useStorage } from '../hooks/useStorage.hook';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {

  const [settings, setSettings] = useState({});
  const { storeObject, restoreObject } = useStorage();

  useEffect(() => {
    const loadSettings = async () => {
      const storedSettings = await restoreObject('settings');
      if (storedSettings) {
        setSettings(storedSettings);
      }
    };
    loadSettings();
  }, []);

  const updateSetting = async (key: string, value: string | number | boolean | null) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await storeObject('settings', newSettings)
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return ctx;
};