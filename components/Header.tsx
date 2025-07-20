import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles as gs } from '../shared/styles/styles';

export const Header = ({ children }: any) => {
    return (
        <View style={[gs.col, ls.container]}>
            <View style={[gs.row, gs.spaceBetween, ls.top]}>
                <Text style={ls.title}>Explor.io</Text>
                <View style={[gs.row]}>
                    <Ionicons name="person-circle-outline" style={ls.menu} />
                    <Ionicons name="menu-outline" style={ls.menu} />
                </View>
            </View>
            {children}
        </View>
    )
};

const ls = StyleSheet.create({
    container: {
        backgroundColor: '#205A7B',
        paddingVertical: 10
    },
    title: {
        color: 'white',
        fontSize: 20
    },
    top: {
        paddingLeft: 25,
        paddingRight: 15,
    },
    menu: {
        color: 'white',
        fontSize: 25,
        paddingHorizontal: 10
    }
});
