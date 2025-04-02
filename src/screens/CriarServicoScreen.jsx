import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SalaoContext } from '../contexts/salaoContext';
import { Alert, Text } from 'react-native';

const CriarServicoScreen = () => {
  const navigation = useNavigation(); // Hook de navegação
  const { adicionarServico, servicos } = useContext(SalaoContext); // Context Salao

  const [titulo, setTitulo] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('');


  const handleCriarServico = async () => {
    const dataServico = {
      titulo,
      preco,
      duracao,
    }

    try {
      // Espera o retorno de adicionarServico
      const response = await adicionarServico(dataServico)

      // Verifica se a resposta da criação foi bem-sucedida
      if (response) {
        Alert.alert("Serviço criado com sucesso!")
        console.log("Serviços no estado:", servicos);
      } else {
        Alert.alert("Erro ao criar serviço!")
      }

    } catch (error) {
      Alert.alert("Erro ao criar serviço", error.message || "Tente novamente mais tarde.");
    }

  };

  return (
    <Container>
      <Input placeholder="Nome do Serviço" value={titulo} onChangeText={setTitulo} />
      <Input placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
      <Input placeholder="Duração" value={duracao} onChangeText={setDuracao} keyboardType="numeric" />
      <Button onPress={handleCriarServico}>
        <ButtonText>Salvar Serviço</ButtonText>
      </Button>
      {/* Listar serviços */}
      {Array.isArray(servicos) && servicos.length > 0 ? (
        servicos.map((servico) => (
          <ServicoItem key={servico._id}>
            <Text>{servico.titulo} - R$ {servico.preco} - {servico.duracao} min</Text>
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
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const ContainerServices = styled.View`
  background-color: gray;
`;

const ServicoItem = styled.View`
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  align-items: center;
`;

