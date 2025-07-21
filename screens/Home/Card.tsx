import { StyleSheet, Text, View } from "react-native"

export const Card = ({ title, subtitle, children }: any) => {
    return (
        <View style={ls.card}>
            <Text style={ls.title}>{title}</Text>
            <Text style={ls.subtitle}>{subtitle}</Text>
            {children}
        </View>
    )
}


const ls = StyleSheet.create({
    card: {
        paddingTop: 15
    },
    title: {
        paddingHorizontal: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#353b48'
    },
    subtitle: {
        fontSize: 15,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#353b48'
    }
})