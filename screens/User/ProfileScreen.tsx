import { Text, View } from "react-native";
import { useAuth } from "../../contexts/auth.context";
import { LoginForm } from "./LoginForm";
import { Header } from "../../components/Header";

export const ProfileScreen = () => {
    const { auth } = useAuth();

    if (auth && auth.user) {
        return (
            <>
                <Header></Header>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Bonjour {auth.user.firstName} {auth.user.lastName}</Text>
                </View>
            </>
        )
    }
    return <>
        <Header></Header>
        <LoginForm />
    </>

};