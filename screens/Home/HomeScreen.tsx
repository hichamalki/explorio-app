import { Header } from '../../components/Header';
import { HomeHeader } from './HomeHeader';
import { Card } from './Card';
import { Caroussel } from '../../components/Caroussel/Caroussel';
import { Item } from '../../components/Caroussel/Item';
import { PlaceCard } from '../../components/Caroussel/PlaceCard';
import { ScrollView, StyleSheet } from 'react-native';

export const HomeScreen = () => {

  const data = [
    { id: '1', title: 'Marrakech', subtitle: '12 établissements', image: require('../../assets/cities/mar.jpg') },
    { id: '2', title: 'Casablanca', subtitle: '12 établissements', image: require('../../assets/cities/cas.jpg') },
    { id: '3', title: 'Chefchaouen', subtitle: '12 établissements', image: require('../../assets/cities/che.jpg') },
    { id: '4', title: 'Essaouira', subtitle: '12 établissements', image: require('../../assets/cities/ess.jpg') },
    { id: '5', title: 'Rabat', subtitle: '12 établissements', image: require('../../assets/cities/rab.jpg') },
    { id: '6', title: 'Agadir', subtitle: '12 établissements', image: require('../../assets/cities/aga.jpg') },
    { id: '7', title: 'Tanger', subtitle: '12 établissements', image: require('../../assets/cities/tan.jpg') },
    { id: '8', title: 'Fès', subtitle: '12 établissements', image: require('../../assets/cities/fes.jpg') },
    { id: '9', title: 'Ifrane', subtitle: '12 établissements', image: require('../../assets/cities/ifr.jpg') },
  ];

  const places = [
    {
      "_id": {
        "$oid": "68795e5c1deb609b1487833a"
      },
      "title": "Tour Hassan",
      "description": "Minaret emblématique inachevé du XIIe siècle, symbole historique de Rabat",
      "tags": [
        "monument",
        "maroc",
        "histoire",
        "architecture",
        "rabat"
      ],
      "location": {
        "address": "Boulevard Mohamed Lyazidi",
        "city": "Rabat",
        "country": "Maroc",
        "coordinates": {
          "type": "Point",
          "coordinates": [
            -6.822809,
            34.024103
          ]
        }
      },
      "media": [
        {
          "type": "image",
          "url": "http://localhost:3000/uploads/places/tour-hassan.jpg",
          "_id": {
            "$oid": "68795e5c1deb609b1487833b"
          }
        }
      ],
      "likes": [],
      "rating": {
        "count": 2,
        "average": 4.5
      },
      "__v": 0,
      "createdAt": {
        "$date": "2025-07-17T20:34:36.886Z"
      },
      "updatedAt": {
        "$date": "2025-07-17T20:34:36.972Z"
      }
    },
    {
      "_id": {
        "$oid": "68795e5c1deb609b1487833a"
      },
      "title": "Tour Hassan",
      "description": "Minaret emblématique inachevé du XIIe siècle, symbole historique de Rabat",
      "tags": [
        "monument",
        "maroc",
        "histoire",
        "architecture",
        "rabat"
      ],
      "location": {
        "address": "Boulevard Mohamed Lyazidi",
        "city": "Rabat",
        "country": "Maroc",
        "coordinates": {
          "type": "Point",
          "coordinates": [
            -6.822809,
            34.024103
          ]
        }
      },
      "media": [
        {
          "type": "image",
          "url": "http://localhost:3000/uploads/places/tour-hassan.jpg",
          "_id": {
            "$oid": "68795e5c1deb609b1487833b"
          }
        }
      ],
      "likes": [],
      "rating": {
        "count": 2,
        "average": 4.5
      },
      "__v": 0,
      "createdAt": {
        "$date": "2025-07-17T20:34:36.886Z"
      },
      "updatedAt": {
        "$date": "2025-07-17T20:34:36.972Z"
      }
    }
  ]


  return <>
    <Header>
      <HomeHeader />
    </Header>
    <ScrollView contentContainerStyle={ls.scrollView}>
      <Card key="elm" title="Explorrer le Maroc" subtitle="Les hôtels les plus populaires dans les villes les plus visitées">
        <Caroussel data={data} itemComponent={Item} />
      </Card>

      <Card key="lmn" title="Les mieux notés" subtitle="Séjournez dans des hébergements uniques, les mieux notés par les utilisateurs explor.io">
        <Caroussel data={places} itemComponent={PlaceCard} />
      </Card>
    </ScrollView>
  </>
}

const ls = StyleSheet.create({
  scrollView: {
    paddingBottom: 50
  }
});
