import { ScrollView, StyleSheet } from "react-native";
import { styles as gs } from "../../shared/styles/styles";
import { HeaderLink as Link } from "../../components/HeaderLink";

export const HomeHeader = () => {

    return <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[gs.row, ls.scroll]}>
        <Link text="Hôtels" icon="bed-outline"></Link>
        <Link text="Activités" icon="golf-outline"></Link>
        <Link text="Restaurants" icon="restaurant-outline"></Link>
        <Link text="Nature" icon="leaf-outline"></Link>
        <Link text="Trajets" icon="footsteps-outline"></Link>
        <Link text="Plages" icon="sunny-outline"></Link>
    </ScrollView>
}

const ls = StyleSheet.create({
    scroll: {
        marginTop: 10,
        paddingHorizontal: 20
    }
});
