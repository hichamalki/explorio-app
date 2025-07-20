import { Text, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles as gs } from "../shared/styles/styles";
import { useStorage } from "../contexts/storage.context";
import { useEffect, useState } from "react";

export const HeaderLink = ({ text, icon }: any) => {

    const { settings, updateSetting } = useStorage();
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(settings['header.active'] === text);
    }, [settings]);


    const newSettings = settings;

    return <TouchableOpacity style={[ls.link, gs.row, active && ls.active]} onPress={() => updateSetting(`${parent}.header.active`, text)}>
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
