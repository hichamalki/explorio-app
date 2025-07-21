import { View, ActivityIndicator } from 'react-native';

export const Loader = () => <View style={{ alignItems: 'center', justifyContent: 'center', padding: 50 }}>
    <ActivityIndicator size="large" color="#205A7B" />
</View>