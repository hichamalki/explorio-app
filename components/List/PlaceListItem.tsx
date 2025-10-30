import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { globalConfig } from "../../app.config"
import { ratingLabel } from "../../shared/utils/rating";

export const PlaceListItem = ({ item }: any) => {
    return (
        <View style={ls.item} key={item._id}>
            <Image style={ls.image} source={{
                uri: item.media[0].url.startsWith('http')
                    ? item.media[0].url
                    : `${globalConfig.host}${item.media[0].url}`
            }} />
            <View style={ls.infos}>
                <Text style={ls.title}>{item.title}</Text>
                <Text style={ls.descText}>{item.description}</Text>
                {/* <Text style={ls.priceText}>À partir de <Text style={ls.priceAmount}>30 €</Text></Text> */}
                <Text style={ls.ratingText}><Ionicons name="star" size={12} color={'#FFCA00'} /> {item.rating.average} - {ratingLabel(item.rating.average)} ({item.rating.count})</Text>
                <Text style={ls.dispoText}><Ionicons name="checkmark" size={12} color={'#339346'} /> Annulation gratuite disponible</Text>
            </View>
        </View>
    );
}

const ls = StyleSheet.create({
    item: {
        borderBottomColor: '#d3d3d3ff',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    image: {
        width: '40%',
        height: 100,
        borderRadius: 5
    },
    infos: {
        width: '60%',
        paddingLeft: 10,
    },
    title: {
        color: "#343434ff",
        fontSize: 15,
        fontWeight: '500'
    },
    descText: {
        marginTop: 5,
        color: "#343434ff",
        marginBottom: 5,
        fontSize: 12
    },
    priceText: {
        fontSize: 12,
        textAlign: "right",
    },
    priceAmount: {
        color: '#343434ff',
        fontSize: 14,
        fontWeight: '500'
    },
    dispoText: {
        textAlign: "right",
        color: '#339346',
        fontSize: 12
    },
    ratingText: {
        textAlign: "right",
        color: '#343434ff',
        fontSize: 12
    }

})