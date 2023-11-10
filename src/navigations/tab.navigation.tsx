import React from 'react';
import {  BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenPerfil, ScreenCamera, ScreenLocation, ScreenAcelerometer } from "../screens";
import { colors } from '../styles/colors';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { CameraNavigation } from './camera.navigation';
type TabParamList = {
  Perfil: undefined;
  Camera: undefined;
  Location: undefined;
  Acelerometer: undefined
};

type TabScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Perfil'>
export type TabTypes = {
  navigation: TabScreenNavigationProp
}
export function TabNavigation() {
  const Tab = createBottomTabNavigator<TabParamList>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.white,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.white
      }}
    
    >
      <Tab.Screen name="Perfil" component={ScreenPerfil} 
        options={{
          tabBarIcon: () => (<Ionicons name='person' color="black" size={24}/>)
        }}
      
      />
      <Tab.Screen name='Camera' component={CameraNavigation}
        options={{
          tabBarIcon: () => (<AntDesign name='camera' color="black" size={24}/>)
        }}
      />
      <Tab.Screen name='Location' component={ScreenLocation}
        options={{
          tabBarIcon: () => (<Entypo name="map" size={24} color="black" />)
        }}
      />
      <Tab.Screen name='Acelerometer' component={ScreenAcelerometer}
        options={{
          tabBarIcon: () => (<AntDesign name="car" size={24} color="black" />)
        }}
      />
    </Tab.Navigator>
  );
}