import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Coordinates, Place } from '../../models/Place';
import { ratingLabel } from '../../shared/utils/rating';

type Props = {
  places: Place[];
  initialLocation: Coordinates;
};

export default function PlacesMap({ places, initialLocation }: Props) {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (places?.length && mapRef.current) {
      const coordinates = places.map((place) => ({
        latitude: place.location.coordinates.coordinates[1],
        longitude: place.location.coordinates.coordinates[0],
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    }
  }, [places]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: initialLocation[1],
        longitude: initialLocation[0],
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
      showsUserLocation={true}
    >
      {places && places.map((place) => (
        <Marker
          key={place._id}
          coordinate={{
            latitude: place.location.coordinates.coordinates[1],
            longitude: place.location.coordinates.coordinates[0],
          }}
          title={place.title}
          description={place.location.city}
        >
          <Callout tooltip>
            <View style={styles.calloutContainer}>
              <Image
                source={{ uri: 'https://backoffice.maroc-hebdo.com/uploads/large_ouarzazate_a77b48089b.jpeg' }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.city}>
                  <Ionicons name="star" size={12} color={'#FFCA00'} /> {place.rating.average} - {ratingLabel(place.rating.average)} ({place.rating.count})
                </Text>
              </View>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  calloutContainer: {
    width: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: 100
  },
  textContainer: {
    padding: 8
  },
  title: { fontWeight: 'bold', fontSize: 14 },
  city: { fontSize: 12, color: '#666' }
});