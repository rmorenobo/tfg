import React, { useState, useContext } from 'react';
import LoginScreen from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import BottonTab from './src/componentes/BottonTab';
import { UsuarioContexto, UserProvider } from './src/componentes/UsuarioContexto';

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser } = useContext(UsuarioContexto);

  const onLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={onLoginSuccess} />;
  }
  return (
    <NavigationContainer>
      <BottonTab esProfe={user && user.userType === "Profesor"} id={user.id} />
    </NavigationContainer>
  );
}

export default App;
