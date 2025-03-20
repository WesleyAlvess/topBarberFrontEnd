import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import styled from 'styled-components/native'
import ModalEditProfile from '../components/ModalEditProfile';



const HomeScreen = () => {
  // Funções do context
  const { userInfo, loginDataUser, logout, updateDataPerfil } = useContext(AuthContext);

  // Armazena o estado de abrir e fechar o modal
  const [openModalEdit, setOpenModalEdit] = useState(false)

  // Estado para armazenar os novos dados 
  const [nome, setNome] = useState(userInfo?.nome || loginDataUser?.nome);
  const [email, setEmail] = useState(userInfo?.email || loginDataUser?.email);
  const [telefone, setTelefone] = useState(userInfo?.telefone || loginDataUser?.telefone);
  const [foto, setFoto] = useState(userInfo?.avatar || loginDataUser?.avatar);

  const hahandleSave = () => {

  }

  return (
    <Container>
      {/* Modal */}
      {openModalEdit &&
        < ModalEditProfile
          nome={nome}
          setNome={setNome}
          email={email}
          setEmail={setEmail}
          telefone={telefone}
          setTelefone={setTelefone}
          foto={foto}
          setFoto={setFoto}
          handleSave={handleSave}
          closeModal={() => setOpenModalEdit(false)}
        />}

      {/* Seção do Perfil */}
      <ProfileContainer>
        <Avatar source={{ uri: loginDataUser?.avatar || 'https://avatars.githubusercontent.com/u/110751484?v=4' }} />
        <UserName>Olá, {userInfo?.nome || loginDataUser?.nome}!</UserName>
        <UserInfo>Email: {userInfo?.email || loginDataUser?.email}</UserInfo>
        <UserInfo>Telefone: {userInfo?.telefone || loginDataUser?.telefone}</UserInfo>
        <UserInfo>Status: {userInfo?.status || loginDataUser?.status}</UserInfo>
      </ProfileContainer>

      {/* Botões de Ações */}
      <ButtonContainer>
        <ActionButton onPress={() => setOpenModalEdit(true)}>
          <ButtonText>Editar Perfil</ButtonText>
        </ActionButton>
        <ActionButton>
          <ButtonText>Agendar</ButtonText>
        </ActionButton>
        <ActionButton>
          <ButtonText>Criar Salão</ButtonText>
        </ActionButton>
        <ActionButton logout onPress={logout}>
          <ButtonText>Sair</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </Container>
  );
};

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
`;

const UserName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #3b3b3b;
  margin-bottom: 5px;
`;

const UserInfo = styled.Text`
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
  background-color: ${(props) => (props.logout ? '#d9534f' : '#80382b')};
  border-radius: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export default HomeScreen;
