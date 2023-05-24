import {StyleSheet, StatusBar } from 'react-native';
import {colors} from '../constants/colors';

const styles = StyleSheet.create({
  containerdefault: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },

  username: {
    fontSize: 22,
    fontWeight: 'bold',    
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 45,
    backgroundColor: '#356AAA',
    
  },
  chatImage: {
    width: 40,
    height: 40,
    marginLeft:20,
    tintColor: '#34a1eb',
    
  },
  uniImageL: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#356AAA',
    
  },
  textTitle:{
    padding:0,
    textAlign:'left',
    fontSize: 14,
    fontWeight: 'bold',
    color:'#0672ba',
  },
  textDefault:{
    
    color:'#444545',
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
       
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
 
  
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#34a8eb', 
    marginTop: 10, 
  },
  
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingBottom: 5, 
    
  },
  rowIzq: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: 0,
    paddingBottom: 5, 
    
  },
  
  
  squareGrados: {
    width: '95%',
    borderColor:"#bababa",
    borderWidth: 1,
    marginBottom:22, 
    margin:10,
    
    padding:10,
    borderRadius: 10,
  },
  squarePlegable: {
    width: '100%',
    borderColor:"#f7f5f5",
    backgroundColor:"#f7f5f5",
    borderWidth: 1,
    alignContent:'center',
    justifyContent:'center',
    borderColor:"#ebebeb",
    borderWidth: 1,
    marginTop:2,
    padding:2,
    borderRadius: 10,
  },
  square: {
    width: '48%',
    
    borderColor:"#ebebeb",
    borderWidth: 1,
    marginBottom:5, 
    
    padding:10,
    borderRadius: 10,
  },
  progress: {
    width: '99%',
    
    borderColor:"#ebebeb",
    borderWidth: 1,
    
    alignContent:'center',
    justifyContent:'center',
    
    borderRadius: 5,
  },
  textCircle: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor:"#ebebeb",
  },
  textPlegable: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor:"#ebebeb",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    
  },
  textProgress: {
    fontSize: 14,
    color:'gray',
    fontWeight: 'bold',
    textAlign:'center',
    alignContent:'center',
    justifyContent:'center'
  },
  image: {
    marginTop: 20,
  },
  imageUni: {
    marginTop: 7,
    height: 45,
    width:45,
  },
  textBlanco: {
    fontSize: 14,
    color:'white',
    fontWeight: 'bold',
    margin:5,
  },

  


});

export default styles;
