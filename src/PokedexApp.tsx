import './gesture-handler';
import * as React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const PokedexApp = () => {
  return (
    <PaperProvider settings={{
      icon: props => <Ionicons {...props} />,
    }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}
