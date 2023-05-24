import {StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  containerdefault: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  
  
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  carreraImageL: {
    width: 140,
    height: 90,
    borderRadius: 10,
  },
  uniImage: {
    width: 40,
    height: 40,
    position: 'absolute',
 
  },
  textTitle:{
    padding:0,
    marginLeft:1,
    textAlign:'left',
    fontSize: 14,
    
    color: '#0672ba',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingBottom: 5, 
    
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
  },
  textRight: {
    textAlign: 'right',
  },
  nftButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    borderColor:"#ebebeb",
    borderWidth: 1,
  },
  nftButtonBlue: {
    backgroundColor: '#0076d1',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    borderColor:"#ebebeb",
    borderWidth: 1,
  },
  nftButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  certificadoImage:{
    width: 32,
    height: 32,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  
  progress: {
    width: '100%',
    marginTop:2,
    borderColor:"#ebebeb",
    borderWidth: 1,
    
    alignContent:'center',
    justifyContent:'center',
    
    borderRadius: 2,
  },
  textProgress: {
    fontSize: 14,
    color:'gray',
    fontWeight: 'bold',
    textAlign:'center',
    alignContent:'center',
    justifyContent:'center'
  },
  rowIzq: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: 0,
    paddingBottom: 5, 
    
  },
  hr: {
    borderWidth: 0.75,
    borderColor: 'white',
    margin: 10,
    width: '100%',
  },
  hrblue: {
    borderWidth: 0.75,
    borderColor: '#4296C6',
    margin: 0,
    marginBottom:5,
    width: '100%',
  },
  
});

export default styles;
