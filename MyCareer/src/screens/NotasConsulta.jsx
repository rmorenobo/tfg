import {
  ScrollView,
  Image,
  View,
  Text,
  Linking,TouchableOpacity
} from 'react-native';


import React, { useEffect, useState } from 'react';
import { getMisCarrerasList } from '../lib/api';

import UserHeader from '../componentes/UserHeader';
import NotasList from '../componentes/notasList';
import styles from '../styles/StyleNotas'
import UniversityList from '../componentes/UniversityList';
import PlegablePanel from '../componentes/PlegablePanel';

export default Notas = () => {

    const handlePress = ({email_, body_}) => {
      const mailto = `mailto:${email_}?subject=${encodeURIComponent('Contacto sobre las notas...')}&body=${encodeURIComponent(body_)}`;
      Linking.openURL(mailto);
    };
    const unisList = {
      UOC : require('../img/UOC.png'),
      UIB : require('../img/UIB.png'),
      UAB : require('../img/UAB.png'),
      UIC : require('../img/UIC.png'),
      UPC : require('../img/UPC.png'),
    }
    const [misCarreras, setmisCarreras] = useState([]); 
    useEffect(() => {
      loadmisCarreras();
    }, []);
    const loadmisCarreras = async () => {
      const data = await getMisCarrerasList(2);
      setmisCarreras(data);
    };  
    let lastUniversidadId = null;
    let lastAsignaturaId = null;
    return (
     <ScrollView style={styles.containerdefault}>   

        <UserHeader key="usHeader" />
       
        <UniversityList  title={'Mis Universidades'} key="UniList" />
        <View style={styles.hr} key="hr1"/>
      
        {misCarreras.map((item, index) => {
          let view = null;
          let view2 = null;
          
          
          if ((item.idUniversidad !== lastUniversidadId && item.carreraFinalizada === 'false')  ) {
            view = (
              <View key={index}>
              <View style={styles.row} >
                <Text style={styles.textTitle}>{item.carrera.data.nombre}</Text>
                <Image source={unisList[item.asignatura.universidadId]} style={styles.uniImageL} />
              </View>
            </View>
            );
          }
          if (item.finalizada === 'false') 
          {
            if ((item.idAsignatura !== lastAsignaturaId  || !lastAsignaturaId))
            {
              keyA = `k2-${index}`; 
              titulo =  `${item.asignatura.nombre}`; //-${item.idAsignatura}
                view2 = (
                  <View key={keyA}>
                  <PlegablePanel activo={true} titulo={titulo}>
                  <View style={styles.rowIzq}>
                      <Image source={require("../img/icons/account.png")} style={styles.userImage} />
                      <View > 
                        <Text> {item.profesor.nombre} {item.profesor.apellido}  </Text>
                        <Text> Profesor  </Text>
                        <Text> {item.profesor.email}  </Text>
                        </View>
                        <TouchableOpacity onPress={handlePress} style={styles.chatImage}>
                          <Image source={require("../img/icons/chat.png")} style={styles.chatImage} />
                        </TouchableOpacity>
                    </View>    
                    <NotasList  item={item} />  
                  </PlegablePanel>
                  </View>
            
                ); 
            }
          }
          lastUniversidadId = item.asignatura.universidadId;
          lastAsignaturaId = item.idAsignatura;
          return (
            <View key={index}>
             {view}
              {view2}
            </View>
          );
      
})}
  
     </ScrollView>
);
};