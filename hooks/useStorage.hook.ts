import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as secureStorage from 'expo-secure-store';

export const AUTH_KEY = 'auth';
export const PREFERENCES_KEY = 'preferences';

export const useStorage = () => {

  const store = async (key: string, object: Object) => {
    const serialized = JSON.stringify(object);
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, serialized);
    } else {
      await secureStorage.setItemAsync(key, serialized);
    }
  };

  const restore = async (key: string) => {
    let raw: string | null;
    if (Platform.OS === 'web') {
      raw = await AsyncStorage.getItem(key);
    } else {
      raw = await secureStorage.getItemAsync(key);
    }
    return raw ? JSON.parse(raw) : null;
  };

  const remove = async (key: string) => {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(key);
    } else {
      await secureStorage.deleteItemAsync(key);
    }
  };

  return { store, restore, remove };
};