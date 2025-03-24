import { StatusBar } from 'expo-status-bar';
import { Routes } from './routes/Routes';

// Context
import { AuthProvider } from './contexts/auth';
import { NavigationContainer } from '@react-navigation/native';
import { SalaoProvider } from './contexts/salaoContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SalaoProvider>
          <Routes />
          <StatusBar style='auto' />
        </SalaoProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
