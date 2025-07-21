import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

export const Button = ({ title, onPress, style, light, loading = false }: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, light && styles.buttonLight, style]}>
    {loading ? (
      <ActivityIndicator size="small" color={light ? '#205A7B' : 'white'} />
    ) : (
      <Text style={[styles.buttonText, light && styles.buttonTextLight]}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#205A7B',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonLight: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#205A7B',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonTextLight: {
        color: '#205A7B',
        fontWeight: 'bold',
        fontSize: 16,
    }
});