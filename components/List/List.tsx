import { FlatList, StyleSheet } from "react-native";

export const List = ({ data, itemComponent }: any) => {
    return (
        <FlatList
            style={ls.flatList}
            horizontal={false}
            data={data}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={itemComponent}
        />
    );
}

const ls = StyleSheet.create({
    flatList: {
    }
})