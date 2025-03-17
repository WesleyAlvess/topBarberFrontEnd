import { StatusBar } from 'expo-status-bar';
import { Routes } from './routes/Routes';

// Context
import { AuthProvider } from './contexts/auth';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
      <StatusBar style='auto' />
    </AuthProvider>
  )
}
