import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { useRouter } from "expo-router";
import React, { useState } from 'react'

export default function MainPage() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/main/clothing-store")}
          >
            <Text>옷 가게</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/main/hair")}
          >
            <Text>헤어 성형</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/main/exercise-equipment")}
          >
            <Text>운동 기구</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/main/achievements")}
          >
            <Text>업적</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button3}>
          <Text>미니게임 시작</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonBox2}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => router.push("/inventory")}
        >
          <Text>인벤토리</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => router.push("/stats")}
        >
          <Text>운동량</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>미니게임을 시작하겠습니까?</Text>
            <View style={styles.closeButtonBox}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => router.push("/mini-game")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingVertical: 20,
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
  buttonBox2: {
    flex: 0,
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },
  button1: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 70,
    height: 40,
  },
  button2: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 105,
    height: 40,
  },
  button3: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 240,
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
