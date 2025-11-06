import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles as gs } from "../../shared/styles/styles";
import { globalConfig } from "../../app.config"
import { ratingLabel } from "../../shared/utils/rating";

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
                <View style={ls.rating}>
                    <Text style={ls.ratingText}>{item.rating.average}</Text>
                </View>
                <View style={[gs.col, gs.mt10]}>
                    <Text style={ls.subtitle}>{ratingLabel(item.rating.average)}</Text>
                    <Text style={ls.subtitle}>{item.rating.count} {`expérience${item.rating.count>1?'s':''} vécue${item.rating.count>1?'s':''}`}</Text>
                </View>
            </View>
        </View>
    );
}

const ls = StyleSheet.create({
    card: {
        width: 220,
        marginRight: 15,
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
        padding: 5,
        backgroundColor: '#003b95'
    },
    ratingText: {
        color: '#ffffff',
        fontSize: 12
    }
})