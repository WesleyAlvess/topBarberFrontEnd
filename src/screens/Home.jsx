import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import { AuthContext } from '../contexts/auth';

const HomeScreen = () => {
  const { userInfo } = useContext(AuthContext);


  return (
    <View>
      <Text>Bem-vindo, {userInfo?.nome}!</Text>
      <Text>Você está logado com os dados corretos.</Text>
      <Text>Email: {userInfo?.email}</Text>
      <Text>Telefone: {userInfo?.telefone}</Text>
    </View>
  );
}

export default HomeScreen;
