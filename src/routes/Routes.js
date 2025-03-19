import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import CadastroScreen from '../screens/Cadastro';
import HomeScreen from '../screens/Home';

import { AuthContext } from '../contexts/auth';

const Stack = createNativeStackNavigator()

export const Routes = () => {
  const { userInfo } = useContext(AuthContext)
  // console.log("To mexendo aqui", userInfo);


  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Cadastro' component={CadastroScreen} />
    </Stack.Navigator>
  )
}

// walvespereira96@gmail.com
