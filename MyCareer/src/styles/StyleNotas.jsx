import {StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  containerdefault: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 45,
    backgroundColor: '#70d4ff',
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent:'center',
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 15,
    marginTop:10,
    position: 'relative',
  },

  searchImage: {
    width: 22,
    height: 24,
    position: 'absolute',
    right: 5,
    backgroundColor:'#34a1eb',
    tintColor:'#fff',
    borderRadius:6,
  },
  
  searchInput: {
    width:'100%',
    borderColor: '#ebebeb',
    borderWidth: 0,
    borderRadius: 5,
    padding:2,
    paddingLeft: 1,
    paddingRight: 10,
  },
  
  textTitle:{
    padding:0,
    textAlign:'left',
    textAlignVertical:'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0672ba',
  },
  textDefault:{
    fontSize: 14,
    color: '#3970DC',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  
  squareGrados: {
    width: '98%',
    color: '#0672ba',
    borderColor:"#ebebeb",
    borderWidth: 1,
    marginBottom:2, 
    margin:5,
    padding:5,
    borderRadius: 10,
  },
  squarePlegable: {
    width: '98%',
    backgroundColor:"white",
    alignContent:'center',
    justifyContent:'center',
    borderColor:"#ebebeb",
    borderWidth: 1,
    borderRadius: 5,
    margin:5,
    padding:5,
    borderWidth: 1,

  },
  textPlegable: {
    fontSize: 15,
    color: '#0672ba',
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
    marginTop:0,
    marginRight:0,
    
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
    marginBottom:10,
  },
  
  squareNotas: {
    width: 60,
    height: 60,
    margin:10,
    paddingTop:10,
    alignItems: 'center', 
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor:'#bababa',
    borderRadius: 5,
  },
  
  chatImage: {
    width: 32,
    height: 32,
    justifyContent: 'flex-end',
    marginLeft:20,
    tintColor: '#34a1eb',
    
  },
  uniImageL: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#356AAA',
    
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingBottom: 5, 
    
  },
  rowBg: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 0,
    padding: 5, 
    backgroundColor:'#F5F5F5',
    borderRadius:10,
    
  },
  rowIzq: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: 0,
    paddingBottom: 5, 
    
  },
  hr: {
    borderWidth: 0.55,
    borderColor: '#4397f7',
    margin: 10,
    marginBottom:15,
    width: '96%',
  },
  // estilos Para la modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    containerdefault: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#333',
  },
  
  notaButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  notaText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  
});

export default styles;
