import React, { createContext, useContext, useEffect, useState } from 'react';
import { PreferencesContextType } from '../models/Preferences';
import { PREFERENCES_KEY, useStorage } from '../hooks/useStorage.hook';
import { fetchCities } from '../services/Settings.service';
import { expired } from '../shared/utils/date';

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: React.ReactNode }) => {

  const [preferences, setPreferences] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { store, restore } = useStorage();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    let storedPreferences = await restore(PREFERENCES_KEY);
    if (!storedPreferences) {
      storedPreferences = {
        navigation: 'Accueil',
        category: 'activity',
        settings: {}
      };
    }
    if (!storedPreferences.settings.cities || storedPreferences.settings.cities.length === 0 || expired(storedPreferences.settings.cities.lastUpdate)) {
      storedPreferences.settings.cities = { data: await fetchCities(), lastUpdate: new Date() }
    }
    await store(PREFERENCES_KEY, storedPreferences)
    setPreferences(storedPreferences);
    setIsLoaded(true);
  };

  const updatePreference = async (key: string, value: {} | string | number | boolean | null) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    await store(PREFERENCES_KEY, newPreferences)
  };

  return (
    <PreferencesContext.Provider value={{ isLoaded, preferences, updatePreference }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
};