import {
    View,
    Text,TouchableOpacity,StyleSheet 
  } from 'react-native';
  import React,  {useState} from 'react';

  import styles from '../styles/StyleNotas'

 
  export default PlegablePanel = ({activo, titulo, children}) => {
      const [plegado, setPlegado] = useState(!activo);
      const handlePlegado = () => {
        setPlegado(!plegado);
        console.log(plegado);
      };
      const panelStyle = plegado
      ? styles.squarePlegable
      : StyleSheet.flatten([styles.squarePlegable, styles.squareGrados]);

      return (
        <View style={panelStyle} >
        <View style={styles.row}>
            <Text style={styles.textDefault}>{titulo}</Text>
            <TouchableOpacity  onPress={handlePlegado}>
                <Text style={styles.textPlegable}>{plegado ? '\u2228' : '\u2227'}</Text>
            </TouchableOpacity>
        </View>
        {!plegado && <View style={styles.panelContent}>{children}</View>}
       </View>

      );
    };