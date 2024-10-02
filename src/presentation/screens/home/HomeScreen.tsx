import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export const HomeScreen = () => {

  return (
    <View>
      <Text>HomeScreen</Text>
       <Button icon="rocket" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
    </View>
  )
}
