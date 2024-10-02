import { FlatList, View } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, TextInput, Text } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebounceValue } from '../../hooks/useDebounceValue';

export const SearchScreen = () => {
  
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const debounceValue = useDebounceValue(term);

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  // Todo: aplicar debounce
  const pokemonNameIdList = useMemo( () => {
    // Si si es un numero ...
    if( !isNaN (Number(debounceValue))) {
      const pokemon = pokemonNameList.find( 
        pokemon => pokemon.id === Number(debounceValue)
      );
      return pokemon ? [pokemon] : [];
    }
    if(debounceValue.length === 0) return [];
    if(debounceValue.length < 3) return [];

    return pokemonNameList.filter( pokemon => 
      pokemon.name.toLowerCase().includes(debounceValue.toLowerCase())
    );
  }, [debounceValue]);

  const { isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5, // 5 mins
  })

  if(isLoading) {
    return <FullScreenLoader />;
  };

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder='Buscar Pokemon'
        mode='flat'
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />
      
      { isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}

      {/* <Text>{ JSON.stringify(pokemonNameIdList, null, 2) }</Text> */}
      
      <FlatList
        style={{paddingTop: top + 20}}
        data={ pokemons as Pokemon[]  }
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        renderItem={ ({ item }) => <PokemonCard pokemon={item} /> }
        showsVerticalScrollIndicator={ false }
        ListFooterComponent={ <View style={{height: 150}} /> } // hack para hacer scrollable
      />


    </View>
  )
}
