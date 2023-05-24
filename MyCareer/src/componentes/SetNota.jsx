import {
    TouchableOpacity,
    View,
    Text,
    Modal,
  } from 'react-native';
  import React, { useState } from 'react';
  import styles from '../styles/StyleNotas';
  
  export default function SetNota({ modalVisible, setModalVisible, onNoteSelected }) {
    const handleNoteSelection = (nota) => {
      onNoteSelected(nota);
      setModalVisible(false);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
      };
      
  
    return (
      <View>

  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalOverlay}>
            
            <View style={styles.centeredView}>
            
              <View style={styles.modalView}>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                    <Text style={styles.closeButtonText}>x</Text>
                </TouchableOpacity>

                {["C-", "C+", "C", "B", "A"].map((nota) => (
                    
                  <TouchableOpacity
                    key={nota}
                    style={styles.notaButton}
                    onPress={() => handleNoteSelection(nota)}
                  >
                    <Text style={styles.notaText}>{nota}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  