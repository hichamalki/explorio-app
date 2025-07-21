import { FlatList, StyleSheet } from "react-native";

export const Caroussel = ({ data, itemComponent }: any) => {
    return (
        <FlatList
            style={ls.flatList}
            horizontal
            data={data}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={itemComponent}
        />
    );
}

const ls = StyleSheet.create({
    flatList: {
        paddingHorizontal: 20
    }
})