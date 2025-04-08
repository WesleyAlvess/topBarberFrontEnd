import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { SalaoContext } from '../contexts/salaoContext';
import Toast from 'react-native-toast-message';

// Array com dias da semana
const diasDaSemana = [
  { nome: 'Domingo', valor: 0 },
  { nome: 'Segunda', valor: 1 },
  { nome: 'Terça', valor: 2 },
  { nome: 'Quarta', valor: 3 },
  { nome: 'Quinta', valor: 4 },
  { nome: 'Sexta', valor: 5 },
  { nome: 'Sábado', valor: 6 },
]

// Horários disponíveis
const horariosDisponiveis = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const CriarHorarioScreen = () => {
  // Context Salão
  const { criarHorario } = useContext(SalaoContext);

  // Estados 
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);

  // Função para alternar a seleção de dias
  const toggleDia = (valor) => {
    setDiasSelecionados((prev) =>
      prev.includes(valor)
        ? prev.filter((d) => d !== valor)
        : [...prev, valor]
    )
  };

  // Função para alternar a seleção de horários
  const toggleHorario = (hora) => {
    setHorariosSelecionados((prev) =>
      prev.includes(hora)
        ? prev.filter((h) => h !== hora)
        : [...prev, hora]
    )
  };

  // Função que monta o payload e envia para o backend
  const salvarHorario = () => {
    // Verifica se o usuário escolheu pelo menos um dia e um horário
    if (diasDaSemana.length === 0 || horariosSelecionados.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Selecione pelo menos um dia e um horário'
      })
      return
    }

    // Chama a função do contexto
    criarHorario(diasSelecionados, horariosSelecionados)
    Toast.show({
      type: 'success',
      text1: 'Horários definidos com sucesso'
    })
  };

  return (
    <Container>
      <Titulo>Selecionar dias da semana</Titulo>
      <Row>
        {diasDaSemana.map((dia) => (
          <DiaButton
            key={dia.valor}
            selected={diasSelecionados.includes(dia.valor)}
            onPress={() => toggleDia(dia.valor)}
          >
            <Text style={{ color: diasSelecionados.includes(dia.valor) ? "#fff" : "#aaaaa" }} >{dia.nome.substring(0, 3)}</Text>
          </DiaButton>
        ))}
      </Row>

      <Titulo>Selecionar horários disponíveis</Titulo>
      <ScrollView>
        {horariosDisponiveis.map((hora) => (
          <HorarioButton
            key={hora}
            selected={horariosSelecionados.includes(hora)}
            onPress={() => toggleHorario(hora)}
          >
            <Text style={{ color: horariosSelecionados.includes(hora) ? "#fff" : "#000000aaa" }} >{hora}</Text>
          </HorarioButton>
        ))}
      </ScrollView>

      <BotaoSalvar onPress={salvarHorario}>
        <Text style={{ color: '#fff' }}>Salvar Horários</Text>
      </BotaoSalvar>
    </Container>
  );
};

export default CriarHorarioScreen;

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const Titulo = styled.Text`
  font-size: 18px;
  margin: 16px 0 8px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const DiaButton = styled.TouchableOpacity`
  background-color: ${({ selected }) => (selected ? '#3366cc' : '#ccc')};
  padding: 8px;
  margin: 4px;
  border-radius: 8px;
`;

const HorarioButton = styled.TouchableOpacity`
  background-color: ${({ selected }) => (selected ? '#00aa66' : '#ccc')};
  padding: 10px;
  margin-vertical: 4px;
  border-radius: 8px;
`;

const BotaoSalvar = styled.TouchableOpacity`
  background-color: #80382b;
  padding: 16px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
`;
