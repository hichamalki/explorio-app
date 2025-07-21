import { useEffect, useState } from 'react';
import BottomTabs from '../../navigation/BottomTabs';
import { useSettings } from '../../contexts/settings.context';
import { useStorage } from '../../hooks/useStorage.hook';
import { View, Image, StyleSheet, Text } from 'react-native';

export const SplashScreen = () => {
    const [showSplash, setShowSplash] = useState(true);
    const { settings, updateSetting } = useSettings();
    const { restoreObject, storeObject } = useStorage();

    useEffect(() => {
        const init = async () => {
            const existingSettings = await restoreObject('settings');
            if (!existingSettings || !existingSettings['header.active']) {
                updateSetting('header.active', 'Hôtels');
                setTimeout(() => setShowSplash(false), 2000);
            } else {
                setShowSplash(false);
            }
        };
        init();
    }, []);

    if (showSplash) {
        return (
            <View style={ls.splash}>
                <Image source={require('../../assets/logo.png')} style={ls.logo} resizeMode="contain" />
                <Text style={ls.slogan}>Explor.io — ton guide vers l'inconnu.</Text>
            </View>
        );
    }

    return <BottomTabs />;
};

const ls = StyleSheet.create({
    splash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        height: 120,
        width: 120
    },
    slogan: {
        color: '#205A7B',
        fontSize: 20,
    }
});