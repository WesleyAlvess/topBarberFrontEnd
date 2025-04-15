import React, { useContext, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { SalaoContext } from '../contexts/salaoContext'

const ServicosSalao = () => {
  //context
  const { servicos, dadosDoSalao } = useContext(SalaoContext);
  // Navegação
  const navigation = useNavigation()

  // Estado para armazenar o serviço escolhido e a data/horário
  const [servicoEscolhido, setServicoEscolhido] = useState(null);

  const selecionarServico = (servico) => {
    setServicoEscolhido(servico)

    // Navega pra tela horários
    navigation.navigate("HorarioServico", { servico });
  };


  return (
    <Container>
      <TituloSalao>{dadosDoSalao?.nome}</TituloSalao>
      <Endereco>{dadosDoSalao?.endereco}</Endereco>
      <Subtitulo>Escolha um serviço:</Subtitulo>

      {servicos.length === 0 ? (
        <Mensagem>Nenhum serviço cadastrado ainda.</Mensagem>
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ServicoCard onPress={() => selecionarServico(item)}>
              <ServicoNome>{item.titulo}</ServicoNome>
              <Preco>{`Preço: R$ ${item.preco} | Duração: ${item.duracao} min`}</Preco>
            </ServicoCard>
          )}
        />
      )}
    </Container>
  );
};

export default ServicosSalao;

// 🧾 Estilos
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 24px;
`;

const TituloSalao = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #80382b;
  text-align: center;
`;

const Endereco = styled.Text`
  text-align: center;
  color: #666;
  margin-bottom: 20px;
`;

const Subtitulo = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Mensagem = styled.Text`
  text-align: center;
  color: #888;
`;

const ServicoCard = styled.TouchableOpacity`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
`;

const ServicoNome = styled.Text`
  font-size: 17px;
  font-weight: 400;
  color: #333;
`;

const Preco = styled.Text`
  font-size: 14px;
  color: #333;
`;
