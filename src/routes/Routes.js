import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import CadastroScreen from '../screens/Cadastro';
import HomeScreen from '../screens/Home';

import { AuthContext } from '../contexts/auth';
import CadastroSalaoScreen from '../screens/CadastroSalao';
import HomeSalaoScreen from '../screens/HomeSalao';
import CriarServicoScreen from '../screens/CriarServicoScreen';
import CriarHorarioScreen from '../screens/CriarHorarioScreen';
import AgendamentosScreen from '../screens/AgendamentosScreen';
import BuscarSalao from '../screens/BuscarSalao'
import ServicosSalao from '../screens/ServicosSalao';
import HorariosServico from '../screens/HorarioServico';

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
      <Stack.Screen name="CriarServico" component={CriarServicoScreen} />
      <Stack.Screen name="CriarHorario" component={CriarHorarioScreen} />
      <Stack.Screen name="Agendamentos" component={AgendamentosScreen} />
      <Stack.Screen name="BuscarSalao" component={BuscarSalao} />
      <Stack.Screen name="ServicosSalao" component={ServicosSalao} />
      <Stack.Screen name="HorarioServico" component={HorariosServico} />

    </Stack.Navigator>
  )
}

// walvespereira96@gmail.com
