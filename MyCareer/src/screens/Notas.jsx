import {
  ScrollView,
  Image,
  View,
  Text,TextInput,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMisAlumnosList } from '../lib/api';

import UserHeader from '../componentes/UserHeader';
import styles from '../styles/StyleNotas'
import UniversityList from '../componentes/UniversityList';
import PlegablePanel from '../componentes/PlegablePanel';
import AlumnosAsignatura from './AlumnosAsignatura';

export default Notas = ({idProfe}) => {

  const unisList = {
    UOC : require('../img/UOC.png'),
    UIB : require('../img/UIB.png'),
    UAB : require('../img/UAB.png'),
    UIC : require('../img/UIC.png'),
    UPC : require('../img/UPC.png'),
  }
  const [misAlumnos, setmiAlumnos] = useState([]); 
  useEffect(() => {
    loadmisAlumnos();
  }, []);
  const loadmisAlumnos = async () => {
    const data = await getMisAlumnosList(idProfe);
    setmiAlumnos(data);

  };  
  let lastUniversidadId = null;
  let lastCarreraId = null;
  let lastAsignaturaId = null;

  let alumnosPorCarrera = misAlumnos.reduce((groups, item) => {
    const idAsignatura = item.idAsignatura;
    if (!groups[idAsignatura]) {
        groups[idAsignatura] = [];
    }
    groups[idAsignatura].push(item);
    return groups;
}, {});


    return (
      
      <ScrollView style={styles.containerdefault}>    
        <UserHeader />
        <UniversityList  title={'Colaboro con las siguientes universidades'}/>
        <View style={styles.hr} />
        <View style={styles.searchContainer}>
                  <TextInput
                      style={styles.searchInput}
                      placeholder="Buscar alumno..."
                  />
                  <TouchableOpacity style={styles.searchImage}>
                      <Image source={require("../img/icons/search.png")} style={styles.searchImage} />
                  </TouchableOpacity>
        </View>
        {misAlumnos.map((item, index) => {
          let view = null;
          let view2 = null;
          
          
          if ((!lastCarreraId || item.idCarrera !==lastCarreraId ) && (item.carreraFinalizada !== "true" )) {
            view = (
              <View key={index}>
              <View style={styles.rowBg} >
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
              keyA = `${item.idAsignatura}-${item.idAlumno}`; 
              titulo =  `${item.asignatura.nombre}`;//-${item.idAsignatura}-${item.finalizada}
                view2 = (
                  <View key={keyA}>
                  <PlegablePanel activo={true} titulo={titulo}>
                    <AlumnosAsignatura data={alumnosPorCarrera} idAsignatura={item.idAsignatura} />
                  </PlegablePanel>
                  </View>
             
                ); 
            }
          }
      
      lastUniversidadId = item.idUniversidad;
      lastCarreraId = item.idCarrera;
      lastAsignaturaId = item.idAsignatura;

      return (
        <View  key={index}>
          {view}
          {view2}
        </View>
      );
    })}
       
     </ScrollView>
    
);
};