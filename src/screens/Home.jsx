import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { SalaoContext } from '../contexts/salaoContext'
import styled from 'styled-components/native'
import ModalEditProfile from '../components/ModalEditProfile';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';



const HomeScreen = () => {
  // Navegação
  const navigation = useNavigation()

  // Funções do context
  const { user, logout, updateDataPerfil } = useContext(AuthContext);
  const { buscarSalao, temSalao } = useContext(SalaoContext); // Verifica se o usuário já tem um salão

  // Armazena o estado de abrir e fechar o modal
  const [openModalEdit, setOpenModalEdit] = useState(false)

  // Estado para armazenar os novos dados 
  const [nome, setNome] = useState(user?.nome);
  const [telefone, setTelefone] = useState(user?.telefone);
  const [foto, setFoto] = useState(user?.foto);

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

    Toast.show({
      type: 'success',
      text1: 'Dados atualizados com sucesso'
    })

  };

  // Função criar salão
  const CriarSalao = async () => {
    // Chama a função para verificar se o salão existe
    await buscarSalao();

    // Verifica o estado do salão
    if (user?.tipo === "profissional") {
      // Se já existir salão, navega para a home do salão
      navigation.navigate("HomeSalao");

      // Menssagem de sucesso
      Toast.show({
        type: 'success',
        text1: 'Você está conectado ao seu Salão'
      })

    } else {
      // Se não houver salão, navega para o cadastro do salão
      navigation.navigate("CadastroSalao");
      Toast.show({
        type: 'info',
        text1: 'Crie seu Salão'
      })
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
        <Avatar source={{ uri: foto || user?.foto }} />
        <UserName>Olá, {user?.nome}!</UserName>
        <UserInfo>Email: {user?.email}</UserInfo>
        <UserInfo>Telefone: {user?.telefone}</UserInfo>
        <UserInfo>Perfil: {user?.tipo}</UserInfo>
      </ProfileContainer>

      {/* Botões de Ações */}
      <ButtonContainer>
        <ActionButton onPress={() => setOpenModalEdit(true)}>
          <ButtonText>Editar Perfil</ButtonText>
        </ActionButton>
        <ActionButton onPress={(() => navigation.navigate("BuscarSalao"))}>
          <ButtonText>Agendar</ButtonText>
        </ActionButton>
        {/* Se o usuário já tem um salão, mostra "Meu Salão", senão "Criar Salão" */}
        <ActionButton onPress={CriarSalao}>
          <ButtonText>{user?.tipo === "profissional" ? "Meu Salão" : "Criar Salão"}</ButtonText>
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
