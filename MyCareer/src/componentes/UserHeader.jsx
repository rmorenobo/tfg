import {
  Image,
  View,
  Text,
} from 'react-native';
import styles from '../styles/StyleSheet'
import React, {useContext  } from 'react';
import { UsuarioContexto } from '../componentes/UsuarioContexto';
import {userList} from '../lib/vars';

export default UserHeader = ({ username, imageUrl }) => {
  const { user } = useContext(UsuarioContexto);
    return (
        <>
        <View style={styles.containerUser}>
            <View style={styles.left}>
            <Text style={styles.username}>{user.nombre} {user.apellido}</Text>
            
            <Text style={styles.userinfo}>{user.email}</Text>
            </View>
            <View style={styles.right}>
            <Image source={userList[user.IdUsuario]} style={styles.userImage} />
            <Text style={styles.userinfo}>{user.userType}</Text>
            </View>
        </View>
         <View style={styles.divider} /> 
         </>
      
    );
  };
  