import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';

export default function SearchScreen() {
  return (
    <>
      <Header></Header>
      <View style={styles.container}>
        <Text style={styles.text}>La page de la recherche à venir 🗺️</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});