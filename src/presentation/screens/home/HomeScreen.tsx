import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

export const HomeScreen = () => {

  return (
    <View>
      <Text variant='headlineMedium'>Home Screen</Text>
       <Button icon="rocket" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
    </View>
  )
}
