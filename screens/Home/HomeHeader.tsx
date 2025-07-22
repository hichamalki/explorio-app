import { ScrollView, StyleSheet } from "react-native";
import { styles as gs } from "../../shared/styles/styles";
import { HeaderLink } from "../../components/HeaderLink";

export const HomeHeader = () => {

    return <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[gs.row, ls.scroll]}>
        <HeaderLink text="Hôtels" category="hotel" icon="bed-outline"></HeaderLink>
        <HeaderLink text="Activités" category="activity" icon="golf-outline"></HeaderLink>
        <HeaderLink text="Restaurants" category="restaurant" icon="restaurant-outline"></HeaderLink>
        <HeaderLink text="Nature" category="nature" icon="leaf-outline"></HeaderLink>
        <HeaderLink text="Trajets" category="route" icon="footsteps-outline"></HeaderLink>
        <HeaderLink text="Plages" category="beach" icon="sunny-outline"></HeaderLink>
    </ScrollView>
}

const ls = StyleSheet.create({
    scroll: {
        marginTop: 10,
        paddingHorizontal: 20
    }
});
