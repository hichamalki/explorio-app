import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from '../screens/MapScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { useSettings } from '../contexts/settings.context';
import { ProfileScreen } from '../screens/User/ProfileScreen';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BottomTabs() {

  const { settings, updateSetting } = useSettings();

  if (settings && !settings['global.tab.active']) {
    return;
  }

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const currentRoute = state?.routes[state.index]?.name;
        if (currentRoute) updateSetting('global.tab.active', currentRoute);
      }}
    >
      <Tab.Navigator initialRouteName={settings['global.tab.active']}
        screenOptions={{ headerShown: false, tabBarActiveTintColor: '#205A7B' }}>
        <Tab.Screen
          name="Accueil"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Carte"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Rechercher"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Favoris"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer >
  );
}