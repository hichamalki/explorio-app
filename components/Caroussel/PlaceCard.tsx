import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles as gs } from "../../shared/styles/styles";
import { globalConfig } from "../../app.config"

export const PlaceCard = ({ item }: any) => {
    return (
        <View style={ls.card} key={item._id}>
            <Ionicons name="heart" style={ls.fav} />
            <Image style={ls.image} source={{
                uri: item.media[0].url.startsWith('http')
                    ? item.media[0].url
                    : `${globalConfig.host}${item.media[0].url}`
            }} />
            <Text style={ls.title}>{item.title}</Text>
            <Text style={ls.subtitle}>{item.location.city} {item.location.country}</Text>
            <View style={gs.row}>
                <View style={ls.rating}>{item.rating.average}</View>
                <View style={[gs.col, gs.mt10]}>
                    <Text style={ls.subtitle}>{getRatingLabel(item.rating.average)}</Text>
                    <Text style={ls.subtitle}>{item.rating.count} expériences vécues</Text>
                </View>
            </View>
        </View>
    );
}

const getRatingLabel = (average: number): string => {
    if (average >= 4.8) return 'Exceptionnel';
    if (average >= 4.5) return 'Fabuleux';
    if (average >= 4.0) return 'Excellent';
    if (average >= 3.5) return 'Très bien';
    if (average >= 3.0) return 'Bien';
    if (average >= 2.0) return 'Correct';
    if (average > 0) return 'À éviter';
    return 'Non noté';
};

const ls = StyleSheet.create({
    card: {
        width: 220,
        marginRight: 15,
        shadowColor: '#7f8fa6',
        borderRadius: 12,
        backgroundColor: '#dcdde1'
    },
    fav: {
        padding: 5,
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 999,
        top: 5,
        right: 5,
    },
    image: {
        width: 220,
        height: 190,
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingHorizontal: 10,
        color: '#353b48'
    },
    subtitle: {
        fontFamily: 'Arial',
        fontSize: 12,
        paddingHorizontal: 10,
        color: '#485460'
    },
    rating: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 10,
        borderRadius: 5,
        color: '#ffffff',
        fontSize: 12,
        padding: 5,
        backgroundColor: '#003b95'
    }
})