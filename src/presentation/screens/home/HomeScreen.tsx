import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { getPokemons } from '../../../actions/pokemons'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { PokemonBg } from '../../components/ui/PokeballBg'
import { FlatList } from 'react-native-gesture-handler'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../../components/pokemons/PokemonCard'

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();

  // Forma tradicional de una peticion http
  // const { isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemons'], // guarda informacion en cache
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, // 60 mins
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: ( params ) => getPokemons(params.pageParam),
    getNextPageParam: ( lastPage, pages ) => pages.length,
    staleTime: 1000 * 60 * 60, // 60 mins
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokemonBg style={stlyles.imgPosition} />

      <FlatList
        style={{paddingTop: top + 20}}
        data={ data?.pages.flat() ?? [] }
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={ () => (
          <Text variant='displayMedium'>Pokedex</Text>
        )}
        renderItem={ ({ item }) => <PokemonCard pokemon={item} /> }
        onEndReachedThreshold={ 0.6 }
        onEndReached={ () => fetchNextPage() }
        showsVerticalScrollIndicator={ false }
      />
      
    </View>
  )
};

const stlyles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  }
});