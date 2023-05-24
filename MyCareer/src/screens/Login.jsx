
import React, { useEffect, useState, useContext } from 'react';

import {Alert,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity, 
} from 'react-native';
import styles from '../styles/StyleSheet'
import { UsuarioContexto,UserProvider } from '../componentes/UsuarioContexto';
import { vaidateUser } from '../lib/api';


export default LoginScreen = ({ onLoginSuccess }) => {
  const [IdUsuario, setIdUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UsuarioContexto);
  
  

  const loadUser = async () => {
  
    if (!IdUsuario) return;
    const data = await vaidateUser(IdUsuario);
    if (data.IdUsuario) {
      setUser(data);
    } else {
      Alert.alert('Error', 'Usuario incorrecto');
    }

  };
  useEffect(() => {
    // lógica para validar y procesar las credenciales
    //de momento solo se verifica que esta registrado en la BlockChain
    //Pero se debería autenticar con el certificado generado
    if (user.nombre) {
      onLoginSuccess();
    }
  }, [user]);
  const handleLogin = () => {
    if( !user.nombre)
      loadUser();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Career</Text>
      <View style={styles.hr} />
      <Image source={require('../img/logo.png')} style={styles.image} />
      <Text style={styles.subtitle}>SignIn &</Text>
      <Text>Improve your career</Text>
      <TextInput
        style={styles.input}
        placeholder="usuario"
        onChangeText={text => setIdUsuario(text)}
        value={IdUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value="password"
      />
      <View style={styles.contentRight}>
        <Text style={styles.sigInText}>Ask for access</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

