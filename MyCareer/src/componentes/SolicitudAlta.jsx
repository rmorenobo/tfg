import {
    TouchableOpacity,
    View,
    Text,
  } from 'react-native';
  import React, { useState } from 'react';
  import styles from '../styles/StyleNotas';
  
  export default Nota = ({ nota_, titulo, handleModalOpen }) => {
    const getNoteColor = (p) => {
      switch (p) {
        case 'A':
          return '#15D308';
        case 'B':
          return '#2375FD';
        case 'C':
            return '#239DFD';
        case 'C+':
          return '#f8a605';
        case 'C-':
          return '#fa0905';
        default:
          return '#02d65e';
      }
    };
  
    const [selectedNote, setSelectedNote] = useState(nota_);
  
    return (
      <>
        <TouchableOpacity
          style={styles.squareNotas}
          onPress={() => handleModalOpen(titulo, setSelectedNote)}
        >
          <Text style={styles.textTituloNota}>{titulo}</Text>
          <Text
            style={[
              styles.textNota,
              { color: getNoteColor(selectedNote) },
            ]}
          >
            {selectedNote}
          </Text>
        </TouchableOpacity>
      </>
    );
  };
  