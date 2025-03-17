import React, { useContext, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/auth';
import Spinner from 'react-native-loading-spinner-overlay';

const CadastroScreen = () => {
  // Navegação
  const navigation = useNavigation()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Context
  const { loading, cadastroNewUser } = useContext(AuthContext)

  const handleSignUp = async () => {
    const cadastoUser = await cadastroNewUser(name, email, senha, telefone)

    if (!cadastoUser) {
      return Alert.alert("Erro ao criar conta!")
    }

    // Se tiver ele direciona para HOME
    navigation.navigate("Home")
  };


  return (
    <Container>
      <Spinner visible={loading} value="Carregando ..." />
      {/* Logo */}
      <LogoWrapper>
        <LogoImage source={require('../../src/assets/topBarber.png')} />
      </LogoWrapper>

      {/* Título */}
      <Title>Crie sua conta</Title>

      <InputWrapper>
        <Input placeholder="Nome" value={name} onChangeText={setName} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Input placeholder="Telefone" value={telefone} onChangeText={setTelefone} />

        <PasswordContainer>
          <PasswordInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
          />


          <EyeButton onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#797979" />
          </EyeButton>
        </PasswordContainer>

        {/* Botão de Criar Conta */}
        <SignUpButton onPress={handleSignUp}>
          <ButtonText>Criar Conta</ButtonText>
        </SignUpButton>

        {/* Já tem uma conta? Faça login */}
        <LoginRedirect onPress={() => navigation.navigate('Login')}>
          <LoginText>Já tem uma conta? Faça login</LoginText>
        </LoginRedirect>
      </InputWrapper>
    </Container>
  );
};

export default CadastroScreen;

/* 🎨 Estilização */
const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;

const LogoWrapper = styled(View)`
  margin-bottom: -50px;
`;

const LogoImage = styled(Image)`
  width: 300px;
  height: 300px;
`;

const Title = styled(Text)`
  font-size: 24px;
  color: #414141;
  margin-bottom: -50px;
`;

const InputWrapper = styled(View)`
  flex: 1;
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

const PasswordContainer = styled(View)`
  width: 100%;
  height: 45px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding-left: 10px;
  background-color: white;
  margin-bottom: 20px;
`;

const PasswordInput = styled(TextInput)`
  flex: 1;
  height: 100%;
`;

const EyeButton = styled(TouchableOpacity)`
  padding: 10px;
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

const LoginRedirect = styled(TouchableOpacity)`
  align-self: center;
  margin-top: 15px;
`;

const LoginText = styled(Text)`
  color: #80382b;
  font-size: 14px;
`;

