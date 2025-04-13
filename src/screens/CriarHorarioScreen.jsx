import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { SalaoContext } from '../contexts/salaoContext';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';

// Criei o array Dias da semana
const diasDaSemana = [
  { nome: 'Domingo', valor: 0 },
  { nome: 'Segunda', valor: 1 },
  { nome: 'Terça', valor: 2 },
  { nome: 'Quarta', valor: 3 },
  { nome: 'Quinta', valor: 4 },
  { nome: 'Sexta', valor: 5 },
  { nome: 'Sábado', valor: 6 },
];

// Criei o array Horários disponíveis
const horariosDisponiveis = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const CriarHorarioScreen = () => {
  // Context
  const { criarHorario, horarios, deleteHorarios } = useContext(SalaoContext);

  // Estado de dias
  const [dias, setDias] = useState(
    diasDaSemana.map((dia) => ({
      dia: dia.valor,
      fechado: true,
      horarios: [],
    }))
  )

  // Função que alterna entre Fechado/Aberto
  const toggleFechado = (diaIndex) => {
    // Atualiza os dias
    setDias((diasAnteriores) => {
      // Mapeia todos os dias
      return diasAnteriores.map((dia, index) => {
        // Se for o dia que o usuário clicou
        if (index === diaIndex) {
          // Se o dia estava fechado, vamos abrir (e manter a lista de horários vazia)
          // Se o dia estava aberto, vamos fechar e limpar os horários
          const novoStatus = !dia.fechado

          return {
            ...dia, // copia as outras infos do dia
            fechado: novoStatus,
            horarios: novoStatus ? [] : dia.horarios
          }
        } else {
          // Se não for o dia clicado, retorna o dia igual
          return dia
        }

      })
    })
  };

  // Função para adicionar ou remover horários
  const toggleHorario = (hora, diaIndex) => {
    // Atualiza a lista de dias
    setDias((diasAnteriores) => {
      // Mapeia os dias para criar uma nova lista
      return diasAnteriores.map((dia, index) => {
        // Verifica se esse é o dia que foi clicado
        if (index === diaIndex) {
          // Verifica se o horário já está na lista
          const horarioExiste = dia.horarios.includes(hora)

          let novaListaHorarios

          if (horarioExiste) {
            // Remove o horário da lista
            novaListaHorarios = dia.horarios.filter((h) => h !== hora)
          } else {
            // Adiciona o novo horário à lista
            novaListaHorarios = [...dia.horarios, hora]
          }
          // Retorna o novo objeto do dia com a lista atualizada
          return {
            ...dia,
            horarios: novaListaHorarios
          }
        }
        // Se não for o dia clicado, retorna o dia original
        return dia
      })
    })
  }

  // Envia dados para o backend
  const salvarHorario = () => {
    const diasAtivos = dias.filter((dia) => !dia.fechado && dia.horarios.length > 0)

    if (diasAtivos.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Selecione pelo menos um dia com horários',
      });
      return;
    }

    // Passa dados para Context
    criarHorario(dias)
    Toast.show({
      type: 'success',
      text1: 'Horários definidos com sucesso!',
    });

    // 🔄 RESETAR os dias para o estado inicial
    setDias(
      diasDaSemana.map((dia) => ({
        dia: dia.valor,
        fechado: true,
        horarios: [],
      }))
    );

  }

  return (
    <Container>
      <ScrollView>
        {/* Mostrar Horarios Criados */}
        <DeleteButton onPress={() => deleteHorarios()}>
          <DeleteText>Deletar todos os horários</DeleteText>
          <IconStyled name="trash-2" size={20} />
        </DeleteButton>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Horários já cadastrados:</Text>
        {horarios && horarios.length > 0 ? (
          horarios.map((dia, index) => (
            <ContainerHora key={dia.dia}>
              <TextDia>{`Dia: ${dia.nomeDia}`}</TextDia>
              <TextStatus fechado={dia.fechado}>{`Status: ${dia.fechado ? 'Fechado' : 'Aberto'}`}</TextStatus>
              {dia.horarios.length > 0 ? (
                <TextHorario>{`Horários: ${dia.horarios.join(', ')}`}</TextHorario>
              ) : (
                <Text>Sem horários disponíveis</Text>
              )}
            </ContainerHora>

          ))
        ) : (
          <NotHorario >Nenhum horário cadastrado</NotHorario>
        )}


        {/* Criar Horarios */}
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Criar Horários:</Text>
        {dias.map((dia, index) => (
          <View key={dia.dia}>
            <TextDia>{diasDaSemana[index].nome}</TextDia>

            <FechadoButton onPress={() => toggleFechado(index)} fechado={dia.fechado}>
              <Text style={{ color: "#fff" }}>{dia.fechado ? 'Fechado' : 'Aberto'}</Text>
            </FechadoButton>

            {!dia.fechado && (
              <HorariosContainer>
                {horariosDisponiveis.map((hora) => (
                  <HorarioButton
                    key={hora}
                    selected={dia.horarios.includes(hora)}
                    onPress={() => toggleHorario(hora, index)}
                  >
                    <Text style={{ color: dia.horarios.includes(hora) ? '#fff' : '#000', fontSize: 12, }}>
                      {hora}
                    </Text>
                  </HorarioButton>
                ))}
              </HorariosContainer>
            )}
          </View>
        ))}
        <BotaoSalvar onPress={salvarHorario}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Salvar Horários</Text>
        </BotaoSalvar>
      </ScrollView>
    </Container >
  )
}

export default CriarHorarioScreen

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f2f2f2;
`;

const NotHorario = styled.Text`
  font-size: 15px;
  margin-bottom: 20px;
  color: #777;
  text-align: center;
`;

const FechadoButton = styled.TouchableOpacity`
  background-color: ${({ fechado }) => (fechado ? '#4a4949' : '#58be58')};
  padding: 14px;
  border-radius: 8px;
  margin-bottom: 8px;
  align-items: center;
`;

const HorariosContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const HorarioButton = styled.TouchableOpacity`
  background-color: ${({ selected }) => (selected ? '#007bff' : '#ccc')};
  padding: 6px 10px;
  margin: 4px;
  border-radius: 6px;
`;

const BotaoSalvar = styled.TouchableOpacity`
  background-color: #80382b;
  padding: 16px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
`;

const ContainerHora = styled.View`
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const TextDia = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const TextStatus = styled.Text`
  font-size: 13px;
  color: ${({ fechado }) => (fechado ? '#c0392b' : '#27ae60')};
  margin-bottom: 6px;
`;

const TextHorario = styled.Text`
  font-size: 13px;
  color: #555;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: #e74c3c;  
  padding: 9px 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;  
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  
`;

const DeleteText = styled.Text`
  color: #fff;  
  font-size: 16px;
  margin-right: 8px;  
  font-weight: bold;  
`;

const IconStyled = styled(Icon)`
  color: #fff;  // Cor do ícone branco para contraste
`;
