import { Text, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles as gs } from "../shared/styles/styles";
import { usePreferences } from "../contexts/preferences.context";
import { useEffect, useState } from "react";

export const HeaderLink = ({ text, icon, category }: any) => {

    const { preferences, updatePreference } = usePreferences();
    const [active, setActive] = useState(false);    

    useEffect(() => {
        setActive(preferences['category'] === category);
    }, [preferences]);

    return <TouchableOpacity style={[ls.link, gs.row, active && ls.active]} onPress={() => updatePreference(`category`, category)}>
        {icon && <Ionicons name={icon} style={[ls.icon, active && ls.active]} />}
        <Text style={[ls.text, active && ls.active]}>{text}</Text>
    </TouchableOpacity>
}

const ls = StyleSheet.create({
    link: {
        padding: 5,
        marginRight: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#fff"
    },
    active: {
        backgroundColor: "#D9D9D9",
        color: "#205A7B",
        borderRadius: 50
    },
    icon: {
        color: 'white',
        fontSize: 15,
        marginTop: 2,
        marginRight: 5
    }
});
