import { Linking, Text, TouchableOpacity } from 'react-native';

export const Link = ({ url, children }: any) => {
    const openURL = () => {
        Linking.openURL(url);
    };

    return (
        <TouchableOpacity onPress={openURL}>
            <Text style={{ color: '#205A7B' }}>{children}</Text>
        </TouchableOpacity>
    );
};