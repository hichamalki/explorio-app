// app/screens/MapScreen.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';

export default function MapScreen() {
  return (
    <>
      <Header></Header>
      <View style={styles.container}>
        <Text style={styles.text}>Carte interactive à venir 🗺️</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});