import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const HorariosServico = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Serviço recebido da tela anterior
  const { servico } = route.params;

  // Estado para armazenar o horário escolhido
  const [horarioEscolhido, setHorarioEscolhido] = useState(null);

  // Exemplo de horários disponíveis
  const horariosDisponiveis = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:30', '17:00'
  ];

  const selecionarHorario = (horario) => {
    setHorarioEscolhido(horario);
    Toast.show({
      type: 'success',
      text1: `Horário ${horario} selecionado!`,
    });

    // Pode navegar para uma tela de confirmação ou pagamento
    setTimeout(() => {
      navigation.navigate('ConfirmarAgendamento', {
        servico,
        horario,
      });
    }, 500);
  };

  return (
    <Container>
      <Titulo>Escolha um horário</Titulo>
      <Subtitulo>{`Serviço: ${servico?.titulo}`}</Subtitulo>

      <FlatList
        data={horariosDisponiveis}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        renderItem={({ item }) => (
          <BotaoHorario
            onPress={() => selecionarHorario(item)}
            style={{
              backgroundColor: item === horarioEscolhido ? '#80382b' : '#eee',
            }}
          >
            <TextoHorario
              style={{
                color: item === horarioEscolhido ? '#fff' : '#333',
              }}
            >
              {item}
            </TextoHorario>
          </BotaoHorario>
        )}
      />
    </Container>
  );
};

export default HorariosServico;

// 🎨 Estilos
const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

const Titulo = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #80382b;
  margin-bottom: 8px;
`;

const Subtitulo = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;

const BotaoHorario = styled.TouchableOpacity`
  padding: 12px 20px;
  border-radius: 10px;
`;

const TextoHorario = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

