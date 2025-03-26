import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { SalaoContext } from '../contexts/salaoContext'
import styled from 'styled-components/native'
import ModalEditProfile from '../components/ModalEditProfile';
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {
  // Navegação
  const navigation = useNavigation()

  // Funções do context
  const { userInfo, loginDataUser, logout, updateDataPerfil } = useContext(AuthContext);
  const { salao, setSalao, verificaSalao } = useContext(SalaoContext); // Verifica se o usuário já tem um salão

  // Armazena o estado de abrir e fechar o modal
  const [openModalEdit, setOpenModalEdit] = useState(false)

  // Estado para armazenar os novos dados 
  const [nome, setNome] = useState(userInfo?.nome || loginDataUser?.nome);
  const [telefone, setTelefone] = useState(userInfo?.telefone || loginDataUser?.telefone);
  const [foto, setFoto] = useState(userInfo?.foto || loginDataUser?.foto);

  // Função para salvar os dados
  const handleSave = () => {
    // Criando um objeto apenas com os dados preenchidos 
    const updateData = {}
    // verificando
    if (nome) updateData.nome = nome
    if (telefone) updateData.telefone = telefone
    if (foto) updateData.foto = foto

    // Verificando se o objeto esta vazio
    if (Object.keys(updateData).length === 0) {
      console.log("Nenhum dado foi alterado.");
      return;
    }

    // Chama a função updateDataPerfil e passa os daodos pra ela 
    updateDataPerfil(updateData)

    // Fecha o modal
    setOpenModalEdit(false)

  };

  // Função criar salão
  const CriarSalao = async () => {
    // Chama a função para verificar se o salão existe
    const temSalao = await verificaSalao();

    // Verifica o estado do salão
    if (!temSalao) {
      // Se não houver salão, navega para o cadastro do salão
      navigation.navigate("CadastroSalao");
    } else {
      // Se já existir salão, navega para a home do salão
      navigation.navigate("HomeSalao");
    }

  }



  return (
    <Container>
      {/* Modal */}
      {openModalEdit &&
        < ModalEditProfile
          nome={nome}
          setNome={setNome}
          telefone={telefone}
          setTelefone={setTelefone}
          foto={foto}
          setFoto={setFoto}
          handleSave={handleSave}
          closeModal={() => setOpenModalEdit(false)}
        />}

      {/* Seção do Perfil */}
      <ProfileContainer>
        <Avatar source={{ uri: foto || userInfo?.foto || loginDataUser?.foto || imagePadraoPerfil, }} />
        <UserName>Olá, {userInfo?.nome || loginDataUser?.nome}!</UserName>
        <UserInfo>Email: {userInfo?.email || loginDataUser?.email}</UserInfo>
        <UserInfo>Telefone: {userInfo?.telefone || loginDataUser?.telefone}</UserInfo>
        <UserInfo>Perfil: {userInfo?.tipo || loginDataUser?.tipo}</UserInfo>
      </ProfileContainer>

      {/* Botões de Ações */}
      <ButtonContainer>
        <ActionButton onPress={() => setOpenModalEdit(true)}>
          <ButtonText>Editar Perfil</ButtonText>
        </ActionButton>
        <ActionButton>
          <ButtonText>Agendar</ButtonText>
        </ActionButton>
        {/* Se o usuário já tem um salão, mostra "Meu Salão", senão "Criar Salão" */}
        <ActionButton onPress={CriarSalao}>
          <ButtonText>{!setSalao ? "Meu Salão" : "Criar Salão"}</ButtonText>
        </ActionButton>
        <ActionButton logout onPress={logout}>
          <ButtonText>Sair</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </Container >
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
  border: 1.8px solid #3b3b3b;
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
