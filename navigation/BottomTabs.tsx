import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from '../screens/MapScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { usePreferences } from '../contexts/preferences.context';
import { ProfileScreen } from '../screens/User/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

  const { preferences, updatePreference } = usePreferences();

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const currentRoute = state?.routes[state.index]?.name;
        if (currentRoute) updatePreference('navigation', currentRoute);
      }}
    >
      <Tab.Navigator initialRouteName={preferences['navigation']}
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