import { Header } from '../../components/Header';
import { HomeHeader } from './HomeHeader';
import { Card } from './Card';
import { Caroussel } from '../../components/Caroussel/Caroussel';
import { Item } from '../../components/Caroussel/Item';
import { PlaceCard } from '../../components/Caroussel/PlaceCard';
import { ScrollView, StyleSheet } from 'react-native';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { usePlaces } from '../../hooks/usePlaces';
import { Loader } from '../../components/Loader';

export const HomeScreen = () => {

  const location = useCurrentLocation();

  const { places: brPlaces, loading: brLoading } = usePlaces({ minRating: 3 });

  const data = [
    { _id: '1', title: 'Marrakech', subtitle: '12 établissements', image: require('../../assets/cities/mar.jpg') },
    { _id: '2', title: 'Casablanca', subtitle: '12 établissements', image: require('../../assets/cities/cas.jpg') },
    { _id: '3', title: 'Chefchaouen', subtitle: '12 établissements', image: require('../../assets/cities/che.jpg') },
    { _id: '4', title: 'Essaouira', subtitle: '12 établissements', image: require('../../assets/cities/ess.jpg') },
    { _id: '5', title: 'Rabat', subtitle: '12 établissements', image: require('../../assets/cities/rab.jpg') },
    { _id: '6', title: 'Agadir', subtitle: '12 établissements', image: require('../../assets/cities/aga.jpg') },
    { _id: '7', title: 'Tanger', subtitle: '12 établissements', image: require('../../assets/cities/tan.jpg') },
    { _id: '8', title: 'Fès', subtitle: '12 établissements', image: require('../../assets/cities/fes.jpg') },
    { _id: '9', title: 'Ifrane', subtitle: '12 établissements', image: require('../../assets/cities/ifr.jpg') },
  ];


  return <>
    <Header>
      <HomeHeader />
    </Header>
    <ScrollView contentContainerStyle={ls.scrollView}>
      <Card key="elm" title="Explorrer le Maroc" subtitle="Les hôtels les plus populaires dans les villes les plus visitées">
        <Caroussel data={data} itemComponent={Item} />
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
