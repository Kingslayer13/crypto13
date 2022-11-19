import Dashboard from './components/Dashboard'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddAsset from './components/AddAsset'
import { RootStackParamList, SCREENS } from './shared/constants/screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.DASHBOARD.name}>
        <Stack.Screen
          name={SCREENS.DASHBOARD.name}
          options={{ title: SCREENS.DASHBOARD.title }}
          component={Dashboard}
        />
        <Stack.Screen
          name={SCREENS.ADD_ASSET.name}
          component={AddAsset}
          options={{ title: SCREENS.ADD_ASSET.title }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
