import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 80,
    paddingVertical: 50,
  },
  buttonContainer: {
    flex: 0,
    justifyContent: "space-between",
    alignItems: "center",
    height: 220,
    paddingVertical: 20,
  },
  buttonBox: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 240,
    height: 40,
  },
  button2: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 100,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    width: 70,
    height: 40,
  },
  closeButtonBox: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  }
});

export default function ExerciseEquipment() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alreadyOwnedModalVisible, setAlreadyOwnedModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(""); // 선택된 장비

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              setModalVisible(true);
              setSelectedEquipment('아령');
            }}
          >
            <Text>아령</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              setModalVisible(true);
              setSelectedEquipment('런닝머신');
            }}
          >
            <Text>런닝머신</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              setModalVisible(true);
              setSelectedEquipment('파워렉');
            }}
          >
            <Text>파워랙</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              setModalVisible(true);
              setSelectedEquipment('역기');
            }}
          >
            <Text>역기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 구매 확인 모달 */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>{selectedEquipment}을(를) 구입하시겠습니까?</Text>
            <View style={styles.closeButtonBox}>
              <TouchableOpacity
                style={styles.closeButton}
              >
                <Text>네</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text>아니요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}