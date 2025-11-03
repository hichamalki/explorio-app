import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles as gs } from '../shared/styles/styles';
import { useAuth } from '../contexts/auth.context';
import { globalConfig } from '../app.config';

export const Header = ({ customStyle, children }: any) => {
    const { auth, logout } = useAuth();

    return (
        <View style={[gs.col, gs.iosHeader, ls.container, customStyle]}>
            <View style={[gs.row, gs.spaceBetween, ls.top]}>
                <Text style={ls.title}>Explor.io</Text>
                <View style={[gs.row]}>
                    {auth && auth.user && auth.user.avatar && (
                        <TouchableOpacity onPress={logout}>
                            <View style={ls.avatarWrapper}>
                                <Image
                                    source={{ uri: `${globalConfig.host}${auth.user.avatar}` }}
                                    style={ls.avatar}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    {auth && auth.user && !auth.user.avatar && (
                        <Ionicons name="person-circle-outline" style={ls.menu} onPress={logout} />
                    )}
                    <Ionicons name="menu-outline" style={ls.menu} />
                </View>
            </View>
            {children}
        </View>
    );
};

const ls = StyleSheet.create({
    avatarWrapper: {
        padding: 2,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 20,
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    container: {
        backgroundColor: '#205A7B',
        paddingVertical: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
    },
    top: {
        paddingLeft: 25,
        paddingRight: 15,
    },
    menu: {
        color: 'white',
        fontSize: 25,
        paddingHorizontal: 10,
    },
});