import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth.context';
import { signin, signup } from '../../services/User.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../models/User';
import { Button } from '../../components/Button';
import { styles as gs } from '../../shared/styles/styles';
import { Link } from '../../components/Link';

export const LoginForm = () => {
    const { login } = useAuth();

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);

    const handleLogin = async () => {
        setError('');
        setSuccess('');
        setIsLoadingLogin(true)
        if (!email || !password) {
            setError('Email et mot de passe requis');
            return;
        }

        try {
            const token = await signin({ email, password })
            const payload: any = jwtDecode(token);
            const user: User = {
                email: payload.email,
                firstName: payload.firstName || '',
                lastName: payload.lastName || '',
            };
            await login(user, token);
        } catch (e: any) {
            setError(e?.response?.data?.error)
        } finally {
            setIsLoadingLogin(false)
        }
    };

    const handleCreate = async () => {
        setError('');
        setSuccess('');
        setIsLoadingCreate(true)
        if (!email || !password) {
            setError('Email et mot de passe requis');
            return;
        }

        try {
            const res = await signup({ firstName, lastName, email, password });
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setIsCreating(false)
            setSuccess(res.message)
        } catch (e: any) {
            setError(e?.response?.data?.error)
        } finally {
            setIsLoadingCreate(false)
        }
    }

    const toggleCreating = () => {
        setError('')
        setSuccess('')
        setIsCreating(!isCreating)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Se connecter ou créer un compte</Text>
            <Text style={styles.subtitle}>Connectez-vous à l'aide de votre compte Explor.io pour sauvegarder vos découvertes.</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {success ? <Text style={styles.success}>{success}</Text> : null}
            {!isCreating &&
                <>
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
                    <Button title="Se connecter" onPress={handleLogin} style={gs.mt20} loading={isLoadingLogin} />
                    <Button title="Créer un compte" onPress={toggleCreating} light style={gs.mt20} loading={isLoadingCreate} />
                </>
            }
            {isCreating &&
                <>
                    <TextInput
                        placeholder="Nom"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Prénom"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="none"
                        style={styles.input}
                    />
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
                    <Button title="Créer un compte" onPress={handleCreate} style={gs.mt20} loading={isLoadingCreate} />
                    <Button title="Se connecter" onPress={toggleCreating} light style={gs.mt20} loading={isLoadingLogin} />
                </>
            }
            <View style={gs.mt50}>
                <Text style={styles.cgu}>En créant ou en vous connectant à un compte, vous acceptez nos <Link url='aboutlasttrip.com'>conditions générales</Link> et notre <Link url='aboutlasttrip.com'>charte de confidentialité</Link>.</Text>
                <Text style={[styles.cgu, gs.mt10]}>Tous droits réservés.</Text>
                <Text style={styles.cgu}>Copyright (2006 - 2025) - Booking.com™</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, gap: 10 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 15, marginBottom: 10 },
    input: { borderRadius: 6, borderWidth: 1, borderColor: '#636e72', padding: 10 },
    error: { color: '#e17055', fontWeight: 'bold' },
    success: { color: '#009432', fontWeight: 'bold' },
    cgu: { textAlign: 'center', fontSize: 12 }
});