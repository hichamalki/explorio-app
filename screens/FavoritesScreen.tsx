import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/auth.context';
import { useNavigation } from '@react-navigation/native';
import BottomTabs from '../navigation/BottomTabs';
import { Header } from '../components/Header';
import { LoginForm } from './User/LoginForm';

export default function FavoritesScreen() {

  const { auth } = useAuth();

  if (!auth || !auth.user) {
    return <>
      <Header></Header>
      <LoginForm />
    </>
  }

  return (
    <>
      <Header></Header>
      <View style={styles.container}>
        <Text style={styles.text}>Page des favoris 🗺️</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});