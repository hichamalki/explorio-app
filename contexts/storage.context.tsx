import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageContext = createContext<StorageContextType | undefined>(undefined);

interface Settings {
  [key: string]: any;
}

interface StorageContextType {
  settings: Settings;
  updateSetting: (key: string, value: string | number | boolean | null) => void;
}

export const StorageProvider = ({ children }: { children: React.ReactNode }) => {

  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    AsyncStorage.getItem('settings').then(value => {
      if (value) {
        try {
          setSettings(JSON.parse(value));
        } catch {
          setSettings({});
        }
      } else {
        setSettings({});
      }
    });
  }, []);

  const updateSetting = async (key: string, value: string | number | boolean | null) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
  };

  return (
    <StorageContext.Provider value={{ settings, updateSetting }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const ctx = useContext(StorageContext);
  if (!ctx) {
    throw new Error('useStorage must be used within StorageProvider');
  }
  return ctx;
};