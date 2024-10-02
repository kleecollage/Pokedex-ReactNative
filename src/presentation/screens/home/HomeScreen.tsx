import { ActivityIndicator, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { getPokemons } from '../../../actions/pokemons'
import { useQuery } from '@tanstack/react-query'

export const HomeScreen = () => {

  const { isLoading, data = []} = useQuery({
    queryKey: ['pokemons'], // guarda informacion en cache
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60, // 60 mins
  })

  return (
    <View>
      <Text variant='headlineMedium'>Home Screen</Text>
       
      { isLoading ? (
        <ActivityIndicator /> 
        ) : (
        <Button icon="rocket" mode="contained" onPress={() => console.log('Pressed')}>
          Press Me
        </Button>
        )}
       
    </View>
  )
}
