import { Header } from '../../components/Header';
import { HomeHeader } from './HomeHeader';
import { Card } from './Card';
import { Caroussel } from '../../components/Caroussel/Caroussel';
import { Item } from '../../components/Caroussel/Item';
import { PlaceCard } from '../../components/Caroussel/PlaceCard';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { usePlaces } from '../../hooks/usePlaces';
import { Loader } from '../../components/Loader';
import { usePreferences } from '../../contexts/preferences.context';

export const HomeScreen = () => {

  const { preferences } = usePreferences();
  const { category, cities } = preferences;

  const { places: brPlaces, loading: brLoading } = usePlaces({ minRating: 3, tags: [category] });

  return <>
    <Header>
      <HomeHeader />
    </Header>
    <ScrollView contentContainerStyle={ls.scrollView}>
      <Card key="elm" title="Explorrer le Maroc" subtitle="Les hôtels les plus populaires dans les villes les plus visitées">
        <Caroussel data={cities} itemComponent={Item} />
      </Card>

      <Card key="lmn" title="Les mieux notés" subtitle="Séjournez dans des hébergements uniques, les mieux notés par les utilisateurs explor.io">
        {brLoading ? <Loader /> : <Caroussel data={brPlaces} itemComponent={PlaceCard} />}
      </Card>
    </ScrollView>
  </>
}

const ls = StyleSheet.create({
  scrollView: {
    paddingBottom: 50
  }
});
