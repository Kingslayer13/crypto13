import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, SCREENS } from '../shared/constants/screens';
import Dashboard from './Dashboard';
import AddAsset from './AddAsset';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
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
  );
}
