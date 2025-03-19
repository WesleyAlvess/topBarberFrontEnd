import { StatusBar } from 'expo-status-bar';
import { Routes } from './routes/Routes';

// Context
import { AuthProvider } from './contexts/auth';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
        <StatusBar style='auto' />
      </AuthProvider>
    </NavigationContainer>
  )
}
