import { StyleSheet, View } from 'react-native'
import { FAB, Text, useTheme } from 'react-native-paper'
import { getPokemons } from '../../../actions/pokemons'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { PokemonBg } from '../../components/ui/PokeballBg'
import { FlatList } from 'react-native-gesture-handler'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../../components/pokemons/PokemonCard'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigator/StackNavigator'

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{};

export const HomeScreen = ( { navigation }: Props) => {

  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const theme = useTheme();

  // Forma tradicional de una peticion http
  // const { isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemons'], // guarda informacion en cache
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, // 60 mins
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async ( params ) => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });
      return pokemons ;
    },
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
      
      <FAB
        icon="search-outline"
        style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
        mode='elevated'
        color={ theme.dark ? 'black' : 'white' }
        onPress={ () => navigation.push('SearchScreen') }
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