import React, { useContext, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { SalaoContext } from '../contexts/salaoContext'
import Spinner from 'react-native-loading-spinner-overlay';

const CadastroSalaoScreen = () => {
  // Navegação
  const navigation = useNavigation();

  // Estados
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');

  // Context
  const { loading, criarSalao, } = useContext(SalaoContext);

  const handleSignUp = async () => {
    const dadosSalao = {
      nome,
      endereco,
    };
    await criarSalao(dadosSalao)
  };

  return (
    <Container>
      <Spinner visible={loading} textContent="Carregando ..." />

      {/* Título */}
      <Title>Cadastre seu salão</Title>

      <InputWrapper>
        <Input placeholder="Nome do Salão" value={nome} onChangeText={setNome} />
        <Input placeholder="Endereço" value={endereco} onChangeText={setEndereco} />

        {/* Botão de Criar Salão */}
        <SignUpButton onPress={handleSignUp}>
          <ButtonText>Criar Salão</ButtonText>
        </SignUpButton>
      </InputWrapper>
    </Container>
  );
};

export default CadastroSalaoScreen;

/* 🎨 Estilização */
const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Title = styled(Text)`
  font-size: 24px;
  color: #414141;
  margin-bottom: 20px;
`;

const InputWrapper = styled(View)`
  width: 100%;
  max-width: 350px;
  justify-content: center;
`;

const Input = styled(TextInput)`
  width: 100%;
  height: 45px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding-left: 10px;
  margin-bottom: 20px;
  background-color: white;
`;

const SignUpButton = styled(TouchableOpacity)`
  background-color: #80382b;
  padding: 15px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
