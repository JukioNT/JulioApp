import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CameraScreen } from '../screens/Camera';
import { CameraOptions } from '../screens/CameraOptions';
import { OpenImage } from '../screens/OpenImage';
import { ImageSourcePropType } from 'react-native/types';
type CameraStackParamList = {
  Camera: undefined;
  CameraOptions: {photo: string};
  OpenImage: undefined;
};

type CameraScreenNavigation = StackNavigationProp<CameraStackParamList, 'Camera'>
export type CameraTypes = {
  navigation: CameraScreenNavigation
}
export function CameraNavigation() {
  const Stack = createStackNavigator<CameraStackParamList>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CameraOptions" component={CameraOptions}/>
      <Stack.Screen name="Camera" component={CameraScreen}/>
      <Stack.Screen name="OpenImage" component={OpenImage}/>
      
    </Stack.Navigator>
  );
}