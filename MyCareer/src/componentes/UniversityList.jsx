// components/UniversityList.js
import React, { useEffect, useState, useContext } from 'react';

import { View, Text, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { UsuarioContexto } from '../componentes/UsuarioContexto';

import { getUniversities } from '../lib/api';
import styles from '../styles/StyleSheet';
import { unisList,unisStyleList } from '../lib/vars';

const UniversityList = ({title , misUniversidades=true}) => {
  const { user } = useContext(UsuarioContexto);
  const [universities, setUniversities] = useState([]);
  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    const misunisList = user.universidades.map(uni => ({
      objectId: uni
  }));

    let data;

    if (misUniversidades) {
      data = misunisList;
    } else {
      data = await getUniversities();
      //console.log('listaUnis:');
      //console.log(data);
      //console.log('Fin listaUnis:');
    }   
    setUniversities(data.slice(0, 4));
  };
 
  return (
    <>
    <Text style={styles.textDefault}>{title}</Text>
    <View style={styles.row}>
    <FlatList 
      data={universities}
      horizontal
      keyExtractor={item => item.objectId}
      renderItem={({ item }) => (
        <View key={unisList[item.objectId]} style={unisStyleList[item.objectId]}>
          <Image source={unisList[item.objectId] } style={styles.imageUni} />
          <Text style={styles.textUnis}>{item.objectId}</Text>
        </View>
        
      )}
    />
    </View>
    </>
  );
};

export default UniversityList;