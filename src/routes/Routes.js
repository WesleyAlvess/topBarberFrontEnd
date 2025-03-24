import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import CadastroScreen from '../screens/Cadastro';
import HomeScreen from '../screens/Home';

import { AuthContext } from '../contexts/auth';
import CadastroSalaoScreen from '../screens/CadastroSalao';
import HomeSalaoScreen from '../screens/HomeSalao';

const Stack = createNativeStackNavigator()

export const Routes = () => {
  const { userInfo } = useContext(AuthContext)


  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Cadastro' component={CadastroScreen} />
      <Stack.Screen name='CadastroSalao' component={CadastroSalaoScreen} />
      <Stack.Screen name='HomeSalao' component={HomeSalaoScreen} />
    </Stack.Navigator>
  )
}

// walvespereira96@gmail.com
