import { useEffect, useState } from 'react';
import BottomTabs from '../../navigation/BottomTabs';
import { usePreferences } from '../../contexts/preferences.context';
import { useStorage } from '../../hooks/useStorage.hook';
import { View, Image, StyleSheet, Text } from 'react-native';
import { fetchCities } from '../../services/Settings.service';

export const SplashScreen = () => {
    const [showSplash, setShowSplash] = useState(false);
    const { loadPreferences } = usePreferences();
    const { storeObject, restoreObject } = useStorage();

    useEffect(() => {
        const init = async () => {
            let preferences = await restoreObject('preferences');
            if (!preferences) {
                preferences = {};
                setShowSplash(true)
            }
            if (!preferences['navigation']) {
                preferences['navigation'] = 'Accueil'
            }
            if (!preferences['category']) {
                preferences['category'] = 'activity'
            }
            if (!preferences['cities']) {
                preferences['cities'] = await fetchCities()
            }
            await storeObject('preferences', preferences)
            loadPreferences()
            setTimeout(() => setShowSplash(false), 2000);
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