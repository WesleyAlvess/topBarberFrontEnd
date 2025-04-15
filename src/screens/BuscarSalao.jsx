import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { SalaoContext } from '../contexts/salaoContext'

const BuscarSalao = () => {
  //context
  const { buscaSalaoPeloNumero } = useContext(SalaoContext);
  const navigation = useNavigation();
  const [telefone, setTelefone] = useState('');

  const procurarSalao = async () => {
    // Validando campos
    if (!telefone || telefone.trim().length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Por favor, digite o número do salão',
      });
      return;
    }

    try {
      const dadosDoSalao = await buscaSalaoPeloNumero({ telefone });

      if (dadosDoSalao) {
        // Só navega para "ServicosSalao" se o salão for encontrado
        navigation.navigate("ServicosSalao");
      } else {
        // Caso não encontre o salão, exibe a mensagem e permanece na mesma página
        Toast.show({
          type: 'error',
          text1: 'Nenhum salão encontrado para esse número',
        });
      }
    } catch (error) {
      // Caso ocorra um erro durante a busca, exibe o erro e permanece na mesma página
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar salão',
      });
      console.error('Erro ao buscar salão:', error);
    }
  };


  return (
    <Container>
      <Titulo>Buscar Salão</Titulo>

      <CampoInput
        placeholder="Digite o telefone do salão"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
      />

      <Botao onPress={procurarSalao}>
        <TextoBotao>Agendar</TextoBotao>
      </Botao>
    </Container>
  );
};

export default BuscarSalao;

// 🧾 Estilos
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 24px;
  justify-content: center;
`;

const Titulo = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 24px;
`;

const CampoInput = styled.TextInput`
  height: 50px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  margin-bottom: 20px;
  color: #000;
`;

const Botao = styled.TouchableOpacity`
  height: 50px;
  background-color: #80382b;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const TextoBotao = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
