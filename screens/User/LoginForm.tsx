import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/auth.context';
import { authLogin } from '../../services/User.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../models/User';

export const LoginForm = () => {
    const { login } = useAuth();

    const [email, setEmail] = useState('eli@explorio.io');
    const [password, setPassword] = useState('p@ssw0rd');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');
        if (!email || !password) {
            setError('Email et mot de passe requis');
            return;
        }

        try {
            const token = await authLogin(email, password)
            const payload: any = jwtDecode(token);
            const user: User = {
                email: payload.email,
                firstName: payload.firstName || '',
                lastName: payload.lastName || '',
            };
            await login(user, token);
        } catch (e) {
            setError('Identifiants incorrects');
            console.error(e)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
            />
            <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, gap: 10 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    input: { backgroundColor: '#f0f0f0', borderRadius: 6, padding: 10 },
    error: { color: 'red' },
});