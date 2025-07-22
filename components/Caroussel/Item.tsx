import { globalConfig } from '../../app.config';
import { styles as gs } from '../../shared/styles/styles';
import { StyleSheet, Image, Text, View } from "react-native";

export const Item = ({ item }: any) => {
    return (
        <View style={[gs.col, ls.item]}>
            <Image source={{ uri: `${globalConfig.host}${item.image}` }} style={ls.image} />
            <Text style={ls.title}>{item.title}</Text>
            <Text style={ls.subtitle}>{item.count} établissement{item.count>1?'s':''}</Text>
        </View>
    )
}

const ls = StyleSheet.create({
    item: {
        marginRight: 12,
    },
    image: {
        width: 150,
        height: 120,
        borderRadius: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 5,
        color: '#353b48'
    },
    subtitle: {
        fontSize: 10,
        color: '#718093'
    }
});
