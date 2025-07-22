import React, { createContext, useContext, useEffect, useState } from 'react';
import { PreferencesContextType } from '../models/Preferences';
import { useStorage } from '../hooks/useStorage.hook';

const preferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: React.ReactNode }) => {

  const [preferences, setPreferences] = useState({});
  const { storeObject, restoreObject } = useStorage();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const storedPreferences = await restoreObject('preferences');
    if (storedPreferences) {
      setPreferences(storedPreferences);
    }
  };

  const updatePreference = async (key: string, value: {} | string | number | boolean | null) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    await storeObject('preferences', newPreferences)
  };

  return (
    <preferencesContext.Provider value={{ preferences, updatePreference, loadPreferences }}>
      {children}
    </preferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const ctx = useContext(preferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
};