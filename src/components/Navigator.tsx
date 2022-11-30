import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, SCREENS } from '../shared/constants/screens';
import Dashboard from './Dashboard';
import AddAsset from './AddAsset';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONTS } from '../shared/constants/styles';
import React from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  const styleOptions = {
    headerStyle: {
      backgroundColor: COLORS.BORDER_DEFAULT,
    },
    headerTintColor: COLORS.WHITE,
    headerTitleStyle: {
      fontFamily: FONTS.IBM_Plex_Bold,
      color: COLORS.WHITE,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.DASHBOARD.name}>
        <Stack.Screen
          name={SCREENS.DASHBOARD.name}
          options={{
            ...styleOptions,
            title: SCREENS.DASHBOARD.title,
          }}
          component={Dashboard}
        />
        <Stack.Screen
          name={SCREENS.ADD_ASSET.name}
          component={AddAsset}
          options={{
            ...styleOptions,
            title: SCREENS.ADD_ASSET.title,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
