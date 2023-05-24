import {
    View,
    Text,
    Image,
    Linking,
    TouchableOpacity,
  } from 'react-native';
  import styles from '../styles/StyleNotas'

  export default AlumnosAsignatura = ({data, idAsignatura}) => {
    const handlePress = ({email_, body_}) => {
        const mailto = `mailto:${email_}?subject=${encodeURIComponent('Contacto sobre las notas...')}&body=${encodeURIComponent(body_)}`;
        Linking.openURL(mailto);
      };

    return (
        

        <>{

            data[idAsignatura]?.map((item,index) => {
            const key_=`${idAsignatura}-${index}-${item.idAlumno}`;
            if(item.finalizada === 'false'){
                return (
                <View key={key_}>
                    <View style={styles.rowIzq} >
                        <Image source={require("../img/icons/account.png")} style={styles.userImage} />
                        <View > 
                            <Text> {item.alumno.nombre}  </Text>
                            <Text> {item.alumno.apellido}  </Text>
                            <Text> {item.alumno.email}  </Text>
                            </View>
                        <TouchableOpacity onPress={handlePress} style={styles.chatImage}>
                            <Image source={require("../img/icons/chat.png")} style={styles.chatImage} />
                        </TouchableOpacity>
                    </View>
                    <NotasList editable={true} key_={index} item={item} />  
                    <View style={styles.hr} />
                </View>
            )
            }})
        
        }
        </>
  );
  };