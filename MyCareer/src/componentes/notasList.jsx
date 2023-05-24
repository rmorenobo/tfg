  import {
  View,
  } from 'react-native';
  import React,  {useState} from 'react';
  import SetNota from '../componentes/SetNota';
  import styles from '../styles/StyleNotas';
  import Nota from './Nota';
  import { setMyCareerNotes  } from '../lib/api';
  
  export default NotasList = ({editable=false, item}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNota, setSelectedNota] = useState(null);
    const [currentSetSelectedNote, setCurrentSetSelectedNote] = useState(null);
    
    const handleModalOpen = (titulo, setSelectedNote) => {
      if (editable)
      {
          setSelectedNota(titulo);
          setCurrentSetSelectedNote(() => setSelectedNote);
          setModalVisible(true);

      }
    };
  
    const handleNoteSelection = (nota) => {
      currentSetSelectedNote(nota);
      setModalVisible(false);
      let newItem = {...item};

      switch(selectedNota) {
        case "Pec1":
          item.pec1 = nota;
          break;
        case "Pec2":
          item.pec2 = nota;
          break;
        case "Pec3":
          item.pec3 = nota;
          break;
        case "Pac1":
          item.pac1 = nota;
          break;
        case "Pac2":
          item.pac2 = nota;
          break;  
        case "Final":
          item.final = nota;
          break;       
        default:
          console.log("Titulo no reconocido");
      }
      selectedNota 
      setMyCareerNotes(item.idMyCareer, item.pec1, item.pec2, item.pec3, item.pac1, item.pac2, item.final)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    };
    
    return (

     <View >

      <View style={styles.row}>
        <Nota nota_={item.pec1} titulo='Pec1'  handleModalOpen={handleModalOpen}/>
        <Nota nota_={item.pec2} titulo='Pec2' handleModalOpen={handleModalOpen}/>
        <Nota nota_={item.pec3} titulo='Pec3' handleModalOpen={handleModalOpen}/>
      </View>
      <View style={styles.row}>
        <Nota nota_={item.pac1} titulo='Pac1' handleModalOpen={handleModalOpen}/>
        <Nota nota_={item.pac2} titulo='Pac2' handleModalOpen={handleModalOpen}/>
        <Nota nota_={item.final} titulo='Final' handleModalOpen={handleModalOpen}/>
      </View>
      <SetNota
        nota={selectedNota}
        onNoteSelected={handleNoteSelection}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
     </View>

);
};