import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as secureStorage from 'expo-secure-store';

export const useStorage = () => {
  const store = async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
    } else {
      await secureStorage.setItemAsync(key, value);
    }
  };

  const storeObject = async (key: string, object: Object) => {
    const serialized = JSON.stringify(object);
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, serialized);
    } else {
      await secureStorage.setItemAsync(key, serialized);
    }
  };

  const restore = async (key: string) => {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(key);
    }
    return await secureStorage.getItemAsync(key);
  };

  const restoreObject = async (key: string) => {
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

  return { store, storeObject, restore, restoreObject, remove };
};