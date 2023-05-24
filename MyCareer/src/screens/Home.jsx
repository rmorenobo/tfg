import {
  View,
  ScrollView,
} from 'react-native';

import styles from '../styles/StyleSheet'
import UniversityList from '../componentes/UniversityList';
import UserHeader from '../componentes/UserHeader';
import DashBoard from '../componentes/DashBoard';



export default Home = ({esProfe, id}) => {
  return (
    
    <ScrollView style={styles.containerdefault}>
        <View >
          <UserHeader />
          <View style={styles.hr} />
        </View>
        <UniversityList title={'Universidades adheridas'} misUniversidades={false}/>    
        <View style={styles.hr} />
        <DashBoard  esProfe={esProfe} id={id} /> 
    </ScrollView>  
    
);
};