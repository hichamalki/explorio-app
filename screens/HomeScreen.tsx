import { View, Text, StyleSheet } from 'react-native';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { usePlaces } from '../hooks/usePlaces';

export default function HomeScreen() {

  const location = useCurrentLocation();
  const { places: arroundPlaces, loading: arroundLoading } = usePlaces({ lat: location?.coords.latitude, lng: location?.coords.longitude });
  const { places: cityPlaces, loading: cityLoading } = usePlaces({ city: 'Niaga' });

  return (
    <>
      <Section title={"Arround me"} places={arroundPlaces} loading={arroundLoading} />
      <Section title={"Niaga"} places={cityPlaces} loading={cityLoading} />

    </>
  )
}

type Props = {
  title: string;
  places: any[];
  loading: boolean;
};

export const Section = ({ title, places, loading }: Props) => {
  return (
    <View>
      <Text>{title}</Text>
      {loading && <Text>Loading...</Text>}
      {!loading && places.map((place) => (
        <Text key={place._id}>• {place.title}</Text>
      ))}
    </View>
  );
};

