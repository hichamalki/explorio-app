import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { usePlaces } from '../hooks/usePlaces';
import { Loader } from '../components/Loader';
import { Caroussel } from '../components/Caroussel/Caroussel';
import { PlaceCard } from '../components/Caroussel/PlaceCard';
import { styles as gs } from "../shared/styles/styles";
import { List } from '../components/List/List';
import { PlaceListItem } from '../components/List/PlaceListItem';
import { HeaderLink } from '../components/HeaderLink';
import { FilterLink } from '../components/FilterLink';

export default function SearchScreen() {
  const [options, setOptions] = useState<any>({ page: 1 });
  const { places, loading }: any = usePlaces(options);

  const filterData = [
    { text: "Villes", key: 'cities', icon: "location-outline", options: places?.filters?.cities },
    { text: "Tags", key: 'tags', icon: "pricetag-outline", options: places?.filters?.tags },
    { text: "Note", key: 'ratings', icon: "star-outline", options: places?.filters?.ratings },
  ];

  useEffect(() => {
    console.log("options => ", options)
  }, [options])

  const updateOption = (key: string, value: any) => {
    setOptions((prev: any) => ({
      ...prev,
      [key]: value,
      page: 1 // reset pagination
    }));
  };

  const loadNextPage = () => {
    if (!loading && places?.places?.length < places?.total) {
      setOptions((prev: any) => ({
        ...prev,
        page: (prev.page || 1) + 1
      }));
    }
  };


  return (
    <>
      <Header customStyle={{ paddingBottom: 25 }} />
      <View style={styles.inputWrapper}>
        <FontAwesome name="search" size={18} color="#999" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          placeholderTextColor="#ccc"
          value={options.q}
          onChangeText={(event) => {
            updateOption('q', event);
          }}
        />
        {options.q?.length > 0 && (
          <TouchableOpacity onPress={() => updateOption('q', '')}>
            <Ionicons name="close-circle" size={18} color="#999" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
      {places && places?.total > 0 &&
        <>
          <View style={styles.resultHeader}>
            <Text style={styles.resultCount}>{places.total} expérience{places.total > 1 ? 's' : ''}</Text>
            <Text style={[styles.resultCount, styles.resultSort]}><Ionicons name="swap-vertical" color="#205A7B" /> Trier</Text>
          </View>

          <View style={[gs.row, { maxHeight: 30, height: 125, paddingHorizontal: 20, marginBottom: 10 }]}>
            {filterData.map(item => <FilterLink
              text={item.text}
              icon={item.icon}
              options={item.options}
              onSelect={(opt: any) => updateOption(item.key, opt)}
            />)}
          </View>
        </>}

      <FlatList
        data={places.places}
        renderItem={({ item }) => <PlaceListItem item={item} />}
        keyExtractor={(item, index) => item._id ?? index.toString()}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.9}
        ListFooterComponent={loading ? <Loader /> : null}
        contentContainerStyle={gs.scrollView}
      />

    </>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 20 },
  resultHeader: {
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resultCount: {
    fontSize: 12,
    color: '#353b48'
  },
  resultSort: {
    color: '#205A7B',
    fontSize: 13
  },
  searchBackground: {
    backgroundColor: '#205A7B',
    paddingHorizontal: 16,
    height: 25
  },
  clearIcon: {
    marginLeft: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#FFCA00',
    borderWidth: 3,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: -20,
    position: 'relative',
    zIndex: 10
  },
  icon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 10,
  },
  scroll: {
    marginBottom: 10
  }
});