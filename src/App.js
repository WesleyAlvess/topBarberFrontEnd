import { StatusBar } from 'expo-status-bar';
import { Routes } from './routes/Routes';

// Importando Toast para exibir menssagens personalizadas
import Toast from 'react-native-toast-message';

// Importando messagem personalizada
import CustomToast from './components/MessageToastPersonalizada';

// Context
import { AuthProvider } from './contexts/auth';
import { NavigationContainer } from '@react-navigation/native';
import { SalaoProvider } from './contexts/salaoContext';

const toastConfig = {
  success: (props) => <CustomToast {...props} />,
  error: (props) => <CustomToast {...props} />,
  info: (props) => <CustomToast {...props} />,
};


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SalaoProvider>
          <Routes />
          <StatusBar style='auto' />
          <Toast config={toastConfig} />
        </SalaoProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
