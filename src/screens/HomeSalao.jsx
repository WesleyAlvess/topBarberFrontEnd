import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';


const HomeSalaoScreen = () => {

  return (
    <Container>
      {/* Seção do Perfil do Salão */}
      <ProfileContainer>
        <Avatar source={{ uri: "https://robohash.org/wesley" }} />
        <SalãoName>Nome do Salão</SalãoName>
        <SalãoInfo>Endereço: ...</SalãoInfo>
        <SalãoInfo>Perfil: ...</SalãoInfo>
      </ProfileContainer>

      {/* Botões de Ações */}
      <ButtonContainer>
        <ActionButton>
          <ButtonText>Criar Serviço</ButtonText>
        </ActionButton>
        <ActionButton>
          <ButtonText>Criar Horário</ButtonText>
        </ActionButton>
        <ActionButton>
          <ButtonText>Agendamentos</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </Container>
  );
};

export default HomeSalaoScreen;

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding: 20px;
`;

const ProfileContainer = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 50px;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
  border: 1.8px solid #3b3b3b;
`;

const SalãoName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #3b3b3b;
  margin-bottom: 5px;
`;

const SalãoInfo = styled.Text`
  font-size: 16px;
  color: #2c2c2c;
`;

const ButtonContainer = styled.View`
  margin-top: 30px;
  width: 100%;
  align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  width: 90%;
  padding: 12px;
  background-color: #80382b;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

