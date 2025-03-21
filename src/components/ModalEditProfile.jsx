import React, { useState } from 'react';
import { Modal, Alert } from 'react-native';
import styled from 'styled-components/native';
// import { useAuth } from '../contexts/AuthContext'; // Supondo que você tenha o contexto Auth

const ModalEditProfile = ({
  nome,
  setNome,
  email,
  setEmail,
  telefone,
  setTelefone,
  foto,
  setFoto,
  closeModal,
  handleSave,
}) => {


  return (
    <Modal animationType="slide" transparent={true}>
      <ModalOverlay>
        <ModalContent>
          <Input
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />
          <Input
            placeholder="Foto (URL)"
            value={foto}
            onChangeText={setFoto}
          />

          <ButtonContainer>
            <SaveButton onPress={handleSave}>
              <ButtonText>Enviar</ButtonText>
            </SaveButton>
            <CancelButton onPress={closeModal}>
              <ButtonText>Cancelar</ButtonText>
            </CancelButton>
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ModalEditProfile;


const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 85%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #80382b;
  padding: 12px 30px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #e74c3c;
  padding: 12px 30px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
