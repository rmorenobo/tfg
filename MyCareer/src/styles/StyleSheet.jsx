import {StyleSheet, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#356AAA',
  },
  containerdefault: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  //User header
  containerUser: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10, 
    paddingTop:1,
    marginTop: StatusBar.currentHeight,
    
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#717171',
    
  },
  userinfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#5C707C',

  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 45,
    backgroundColor: '#356AAA',
    
  },
  textDefault:{
    padding:0,
    textAlign:'left',
    fontSize: 16,
    color:'#444545',
  },
 
  left: {
    flex: 1,
    alignItems:'flex-start',
    
  },
  right: {
    alignItems: 'flex-end',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#34a8eb', 
    marginTop: 10, 
  },
  contentRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 0,
    padding:5,
    paddingBottom: 0, 
    
  },
  
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'white',
  },

  subtitle: {
    fontSize: 36,
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 0,
    color: 'white',
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
  image: {
    marginTop: 20,
  },
  imageUni: {
    marginTop: 7,
    height: 45,
    width:45,
  },
  textUnis: {
    fontSize: 18,
    fontWeight: 'bold',
    margin:5,
  },
 
  textTituloNota: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#36369c',
    textAlign: 'center',
    alignSelf: 'center',
  },
  textNota: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  
  squareNotas: {
    width: 60,
    height: 60,
    margin:10,
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor:'#bababa',
    borderRadius: 5,
  },
  squareUIB: {
    width: 60,
    height: 60,
    margin:10,
    marginBottom:22, 
    alignItems: "center",
    backgroundColor: '#FF9F33',
    borderRadius: 10,
  },
  squareUPC: {
    width: 60,
    height: 60,
    margin:10,
    marginBottom:22, 
    alignItems: "center",
    backgroundColor: '#FF9F33',
    borderRadius: 10,
  },
  squareUAB: {
    width: 60,
    height: 60,
    margin:12,
    marginBottom:22, 
    alignItems: "center",
    backgroundColor: '#F266AB',
    borderRadius: 10,
  },
  squareUOC: {
    width: 60,
    height: 60,
    margin:12, 
    marginBottom:22, 
    alignItems: "center",
    backgroundColor: '#33E9FF',
    borderRadius: 10,
  },
  squareUPC: {
    width: 60,
    height: 60,
    margin:12, 
    marginBottom:22, 
    alignItems: "center",
    backgroundColor: '#A459D1',
    borderRadius: 10,
  },

  squareUIC: {
    width: 60,
    height: 60,
    margin:12, 
    alignItems: "center",
    marginBottom:22, 
    backgroundColor: '#E9A3F3',
    borderRadius: 10,
  },
  

  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'white',
  },
  contentRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '80%',
  },

  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  sigInText: {
    textAlign: 'right',
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: -10,
    marginBottom: 20,
  },
  sigInText: {
    textAlign: 'right',
    color: '#ccc',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: -10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  hr: {
    borderWidth: 0.75,
    borderColor: 'white',
    margin: 10,
    width: '100%',
  },
});

export default styles;
