import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { ScreenLogin, ScreenRegister } from "../screens";
type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigation = StackNavigationProp<LoginStackParamList, 'Login'>
export type LoginTypes = {
  navigation: LoginScreenNavigation
}
export function LoginNavigation() {
  const Stack = createStackNavigator<LoginStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={ScreenLogin} />
      <Stack.Screen name="Register" component={ScreenRegister} />
    </Stack.Navigator>
  );
}