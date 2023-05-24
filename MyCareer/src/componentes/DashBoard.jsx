import {
  Image,
  View,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../styles/StyleHome';
import LinearGradient from 'react-native-linear-gradient';
import {unisList} from '../lib/vars';
import { getMisCarrerasAgrupadasList } from '../lib/api';

export default MisCarrerasList = ({esProfe, id}) => {
  
  const [misCarreras, setmisCarreras] = useState([]); 
  useEffect(() => {
    loadmisCarreras();
  }, []);
  const loadmisCarreras = async () => {
    
    if (esProfe)
    {
      setmisCarreras([]);
      return;
    }
    const data = await getMisCarrerasAgrupadasList(id);
    setmisCarreras(data);
 
  };
  const porcent = (x,y ) => 
  {
    if (x >= y) 
      return [0.999,100];
    const res = x/y;
    return [res<0.1?1:res, Math.floor(res*100)];

  }
  let asignaturasActivas = 0;
  let carrerasFinalizadas = 0;

  misCarreras.forEach((item) => {
   asignaturasActivas+=item.totalAsignaturas - item.totalAsignaturasFinalizadas;
   if (item.carreraFinalizada==='true')
      carrerasFinalizadas++;
  });

  return (
  <>
    {misCarreras.map((item, index) => (
      
    
    <View key={item.idCarrera}>
        <View  style={styles.row}> 
          <Text style={styles.textTitle}>{item.carrera} </Text>
          <Image source={unisList[item.universidad] }style={styles.uniImageL} />
        </View>
        <View style={styles.squareGrados}>
          <View style={styles.rowIzq}>        
            <Image key='imgC${item.idCarrera}' source={require("../img/icons/account.png")} style={styles.userImage} />
            <View > 
              <Text key='txt1_${item.idCarrera}'> {item.profe}  </Text>
              <Text key='txt2_${item.idCarrera}'> Tutor  </Text>
              <Text key='txt3_${item.idCarrera}'> {item.emailprofe}  </Text>
            </View>
            <Image source={require("../img/icons/chat.png")} style={styles.chatImage} />
          </View>
          <View style={styles.row}>
            <LinearGradient
                colors={['#1fe8f2', '#1f62f2']}
                style={styles.square}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                >
                  <Text key='txt4_${item.idCarrera}' style={styles.textBlanco}>{item.totalAsignaturasFinalizadas} asignaturas superadas de {item.totalAsignaturasCarrera} </Text>
            </LinearGradient>
            <LinearGradient
                colors={['#9610c7', '#ffabd6']}
                style={styles.square}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                >
                  <Text key='txt5_${item.idCarrera}' style={styles.textBlanco}>{item.totalCreditosSuperados} creditos superados de {item.creditos}</Text>
            </LinearGradient>
          </View>
          <View style={styles.row}>
            
              <LinearGradient key='gr1_${item.idCarrera}'
                colors={['#05ff05', '#e00b0b']}
                style={styles.progress}
                start={{ x: porcent(item.totalAsignaturasFinalizadas,item.totalAsignaturasCarrera)[0], y: porcent(item.totalAsignaturasFinalizadas,item.totalAsignaturasCarrera)[0]}}
                end={{ x: 1, y: 1 }}
                >
                <Text style={styles.textProgress}>{porcent(item.totalAsignaturasFinalizadas,item.totalAsignaturasCarrera)[1]}%</Text>
              </LinearGradient>
          </View>       
      
        </View>  
    </ View>
    ))}


    <View style={styles.row}>
       <View style={styles.squarePlegable}>
        <View style={styles.row}>
          <Text style={styles.textDefault}>Asignaturas activas</Text>
          <Text style={styles.textCircle}>{asignaturasActivas}</Text>   
          <Text style={styles.textPlegable} >&#x2228;</Text>
        </View>
       </View>
    </View>
    <View style={styles.row}>
      <View style={styles.squarePlegable}>
          <View style={styles.row}>
            <Text style={styles.textDefault}>Carreras finalizadas</Text>
            <Text style={styles.textCircle}>{carrerasFinalizadas}</Text>
            <Text style={styles.textPlegable} >&#x2228;</Text>
          </View>
      </View>
    </View>
  </>
    
    );
  };
  