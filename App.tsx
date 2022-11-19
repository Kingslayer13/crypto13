import Dashboard from './components/Dashboard'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddAsset from './components/AddAsset'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="AddAsset"
          component={AddAsset}
          options={{ title: 'Overview' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
