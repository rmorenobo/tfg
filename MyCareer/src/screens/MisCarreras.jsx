import {
  View,
  Text,ScrollView, Image,TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState,useContext  } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/StyleCarreras'
import UniversityList from '../componentes/UniversityList';
import { getMisCarrerasAgrupadasList } from '../lib/api';
import { WebView } from 'react-native-webview';
import { UsuarioContexto } from '../componentes/UsuarioContexto';
import { unisList, carreraImgList} from '../lib/vars';


export default MisCarreras = () => {
  const { user } = useContext(UsuarioContexto);
  const [isPdfVisible, setPdfVisible] = useState(false);


  const [misCarreras, setmisCarreras] = useState([]); 
  useEffect(() => {
    loadmisCarreras();
  }, []);
  const loadmisCarreras = async () => {
    
    if (user && user.userType === "Profesor")
    {
      setmisCarreras([]);
      return;
    }
    const data = await getMisCarrerasAgrupadasList(user.id);
    setmisCarreras(data);
   
  };
  const porcent = (x,y ) => 
  {
    if (x >= y) 
      return [0.999,100];
    const res = x/y;

    return [res<0.1?1:res, Math.floor(res*100)];

  }

    return (
      <ScrollView style={styles.containerdefault}>      
      <UserHeader username={user.name} imageUrl="../img/fotos/rober.png" />
      
      <UniversityList  title={'Mis Universidades'}/>
      <View style={styles.hrblue} />
      {misCarreras.map((item, index) => (
          <View style={styles.row} key={index}>
          <View style={styles.imageContainer}>
            <Image source={carreraImgList[item.universidad]} style={styles.carreraImageL} />
            <Image source={unisList[item.universidad]} style={styles.uniImage} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>{item.carrera}</Text>
            <Text>{item.totalCreditosSuperados} créditos de {item.creditos}</Text>
            
            <TouchableOpacity style={styles.nftButtonBlue} disabled={item.carreraFinalizada!=='true'} onPress={() => setPdfVisible(true)}  
            >
              <Text style={styles.nftButtonText}>NFT</Text>
            </TouchableOpacity>
            
            
            {item.carreraFinalizada === 'true' && <Image source={require("../img/certificado.png")} style={styles.certificadoImage} />}
            
            <LinearGradient
              colors={['#24d408', '#fa8805']}
              style={styles.progress}
              start={{ x: porcent(item.totalAsignaturasFinalizadas,item.totalAsignaturasCarrera)[0], y: porcent(item.totalAsignaturasFinalizadas,item.totalAsignaturasCarrera)[0]}}
              end={{ x: 1, y: 1 }}
              >
                <Text style={styles.textProgress}>{porcent(item.totalAsignaturasFinalizadas,item.totalAsignaturasCarrera)[1]}%</Text>
            </LinearGradient>
          </View>
          
        </View>      

      ))}
      {isPdfVisible && (
        <WebView
          source={{ uri: 'http://www.scielo.org.pe/pdf/hm/v18n2/a05v18n2.pdf' }}
          style={{ marginTop: 20 }}
        />
        )}
      </ScrollView>
);
};