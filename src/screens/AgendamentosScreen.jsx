import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { SalaoContext } from '../contexts/salaoContext';

const AgendamentosScreen = () => {
  const { agendamentos } = useContext(SalaoContext);

  return (
    <Container>
      {agendamentos?.length === 0 ? (
        <EmptyText>Nenhum agendamento encontrado.</EmptyText>
      ) : (
        agendamentos?.map((agendamento) => (
          <AgendamentoCard key={agendamento.id}>
            <Text>Cliente: {agendamento.cliente.nome}</Text>
            <Text>Serviço: {agendamento.servico.nome}</Text>
            <Text>Data: {agendamento.data}</Text>
            <Text>Status: {agendamento.status}</Text>
          </AgendamentoCard>
        ))
      )}
    </Container>
  );
};

export default AgendamentosScreen;

// Estilos
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const AgendamentoCard = styled.View`
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
`;
