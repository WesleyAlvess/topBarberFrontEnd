import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SalaoContext } from '../contexts/salaoContext';
import { Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';


const CriarServicoScreen = () => {
  const navigation = useNavigation(); // Hook de navegação
  const { adicionarServico, servicos, excluirServico } = useContext(SalaoContext); // Context Salao

  const [titulo, setTitulo] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('');


  const handleCriarServico = async () => {
    const dataServico = {
      titulo,
      preco,
      duracao,
    }

    // Validando campos
    if (!titulo || !preco || !duracao) {
      Toast.show({
        type: 'info',
        text1: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    try {
      // Espera o retorno de adicionarServico
      const response = await adicionarServico(dataServico)

      // Verifica se a resposta da criação foi bem-sucedida
      if (response === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Serviço criado com sucesso',
        })
        // Limpa os campos após o successo
        setTitulo('')
        setPreco('')
        setDuracao('')
      } else if (response === 'exists') {
        Toast.show({
          type: 'error',
          text1: 'Já existe este serviço no seu salão'
        })
      } else {
        Toast.show({
          type: 'info',
          text1: 'Por favor preencha os campos',
        })
      }

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado!',
        text2: error.message || 'Tente novamente mais tarde.',
      });
    }

  };

  return (
    <Container>
      <Input placeholder="Nome do Serviço" value={titulo} onChangeText={setTitulo} />
      <Input placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
      <Input placeholder="Duração" value={duracao} onChangeText={setDuracao} keyboardType="numeric" />
      <Button onPress={handleCriarServico}>
        <ButtonText>Criar Serviço</ButtonText>
      </Button>
      {/* Listar serviços */}
      {Array.isArray(servicos) && servicos.length > 0 ? (
        servicos
          .filter(servico => servico._id) // Remove itens sem ID
          .map((servico) => (
            <ServicoItem key={servico._id}>
              <Text>{servico.titulo} - R$ {servico.preco} - {servico.duracao} min</Text>
              <DeleteButton onPress={() => excluirServico(servico._id)} >
                <Icon name="trash-2" size={20} color="#b00000" />
              </DeleteButton>
            </ServicoItem>
          ))
      ) : (
        <Text>Nenhum serviço cadastrado.</Text>
      )}
    </Container>
  );
};

export default CriarServicoScreen;

// Estilos
const Container = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  background-color: #fff;
`;

const Input = styled.TextInput`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const Button = styled.TouchableOpacity`
  width: 90%;
  padding: 12px;
  background-color: #80382b;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const ServicoItem = styled.View`
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const DeleteButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

