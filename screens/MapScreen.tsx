import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { usePlaces } from '../hooks/usePlaces';
import PlacesMap from '../components/PlacesMap/PlacesMap';
import { Coordinates } from '../models/Place';

export default function MapScreen() {
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation([loc.coords.longitude, loc.coords.latitude]);
      }
    })();
  }, []);

  const { places, loading } = usePlaces({
    lat: location ? location[1] : null,
    lng: location ? location[0] : null
  });

  return (
    <View style={styles.container}>
      {location && <PlacesMap places={places.places} initialLocation={location} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});