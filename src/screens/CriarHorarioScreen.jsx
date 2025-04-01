import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { SalaoContext } from '../contexts/salaoContext';

const CriarHorarioScreen = ({ navigation }) => {
  const { definirHorario } = useContext(SalaoContext);
  const [horario, setHorario] = useState('');

  const handleCriarHorario = () => {
    definirHorario(horario);
    navigation.goBack();
  };

  return (
    <Container>
      <Title>Definir Horário</Title>
      <Input
        placeholder="Ex: 08:00 - 18:00"
        value={horario}
        onChangeText={setHorario}
        placeholderTextColor="#A0A0A0"
      />
      <Button onPress={handleCriarHorario}>
        <ButtonText>Salvar</ButtonText>
      </Button>
    </Container>
  );
};

export default CriarHorarioScreen;

// 🎨 **Estilos com Cores Padrão do Seu App**
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff; /* Fundo branco */
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #3b3b3b; /* Cor do título igual à do nome do salão */
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 14px;
  border: 1px solid #3b3b3b; /* Mesma cor da borda do avatar */
  border-radius: 8px;
  background-color: #f2f2f2; /* Tom neutro para o fundo */
  font-size: 16px;
  color: #2c2c2c; /* Mesma cor dos textos de info do salão */
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity`
  width: 90%;
  padding: 12px;
  background-color: #80382b; /* Mesma cor dos botões do Home */
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff; /* Texto branco para contraste */
  font-size: 16px;
  font-weight: bold;
`;
