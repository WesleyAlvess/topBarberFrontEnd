// MeuToastPersonalizado.js
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const CustomToast = ({ text1, text2, type }) => {
  // Função que muda a cor dependendo da messagem 
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#28a745'; // verde
      case 'error':
        return '#b00020'; // vermelho
      default:
        return '#444'; // fallback
    }
  }
  return (
    <ToastContainer style={{ backgroundColor: getBackgroundColor() }}>
      <ToastTitle>{text1}</ToastTitle>
      {text2 && <ToastMessage>{text2}</ToastMessage>}
    </ToastContainer>
  )
}

export default CustomToast

const ToastContainer = styled.View`
  background-color: #b15343; /* cor personalizada */
  padding: 15px;
  border-radius: 10px;
  width: 90%;
  align-self: center;
`;

const ToastTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const ToastMessage = styled.Text`
  color: #eee;
  font-size: 14px;
`;
