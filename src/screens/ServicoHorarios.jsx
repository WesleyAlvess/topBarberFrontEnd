// AgendamentoScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-native';
import { SalaoContext } from '../contexts/salaoContext';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { Text } from 'react-native';


const ServicosHorariosSalao = () => {
  const navigation = useNavigation();
  const { servicos, dadosDoSalao, diasDisponiveis: respostaDias } = useContext(SalaoContext);

  const [selectedServico, setSelectedServico] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');

  // Aqui pegamos só o array de dias:
  const diasDisponiveis = respostaDias?.diasDisponiveis || [];


  const handleAgendar = () => {
    if (!selectedServico || !selectedHorario || !selectedHorario.data || !selectedHorario.hora) {
      Toast.show({
        type: "error",
        text1: "Por favor, selecione um serviço e um horário"
      });
      return;
    }

    const { data, hora } = selectedHorario;

    const agendamento = {
      servicoId: selectedServico,
      data,
      hora
    };

    Toast.show({
      type: "success",
      text1: "Agendamento realizado com sucesso"
    });

    console.log("Agendamento:", agendamento);

    // Enviar pro backend aqui
  };



  // Função para obter o nome do dia da semana
  const obterDiaSemana = (dataIso) => {
    const diasDaSemana = [
      'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
      'quinta-feira', 'sexta-feira', 'sábado'
    ];

    const data = new Date(dataIso) // Cria um objeto Date a partir da data ISO
    const diaSemana = data.getDay() // Retorna o número do dia da semana (0-6)

    return diasDaSemana[diaSemana] // Retorna o nome do dia da semana
  }

  // Formata data
  const formataData = (dataIso) => {
    const [ano, mes, dia] = dataIso.split('-')
    return `${dia}/${mes}/${ano}`
  }

  // Função para gerar a string completa
  const gerarHorario = (dataIso, hora) => {
    const capitalize = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);
    const diaSemana = capitalize(obterDiaSemana(dataIso));
    const dataFormatada = formataData(dataIso);
    return `${diaSemana} dia ${dataFormatada} às ${hora}`;
  }

  return (
    <Container>
      <Title>Agendar no Salão {dadosDoSalao.nome}</Title>

      <Label>Selecione o serviço:</Label>
      <ServicoPicker
        selectedValue={selectedServico}
        onValueChange={setSelectedServico}
      >
        {servicos.map((servico) => (
          <Picker.Item key={servico._id} label={servico.titulo} value={servico._id} />
        ))}
      </ServicoPicker>
      <Label>Selecione o dia e o horário:</Label>
      <Picker
        selectedValue={selectedHorario}
        onValueChange={(itemValue, itemIndex) => setSelectedHorario(itemValue)}
      >
        {diasDisponiveis.map((dia) =>
          dia.horariosDisponiveis.map((horario, i) => {
            return (
              <Picker.Item
                key={`${dia.data}-${i}`}
                label={gerarHorario(dia.data, horario.hora)} // Aqui está o problema
                value={{ data: dia.data, hora: horario.hora }}
              />
            );
          })
        )}

      </Picker>

      <Button title="Confirmar Agendamento" onPress={handleAgendar} />
    </Container>
  );
};

export default ServicosHorariosSalao;

const Container = styled.View`
    flex: 1;
    padding: 20px;
    `;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    `;

const Label = styled.Text`
    font-size: 18px;
    margin-vertical: 10px;
    `;

const ServicoPicker = styled(Picker)`
    height: 50px;
    margin-vertical: 10px;
    border-color: #ccc;
    border-width: 1px;
    `;

const HorarioPicker = styled(Picker)`
    height: 50px;
    margin-vertical: 10px;
    border-color: #ccc;
    border-width: 1px;
    `;

