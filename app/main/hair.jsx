import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Alert } from 'react-native';

export default function Hair() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [equippedItems, setEquippedItems] = useState({
    hat: null,
    surgery: null,
  });
  const [selectedCategory, setSelectedCategory] = useState('hair');
  const [skinColor, setSkinColor] = useState('#F5C6A5'); // 기본 피부색

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const equipItem = () => {
    if (selectedItem.startsWith('hat')) {
      setEquippedItems((prev) => ({ ...prev, hat: selectedItem }));
    } else if (selectedItem.startsWith('surgery')) {
      setEquippedItems((prev) => ({ ...prev, surgery: selectedItem }));
    }
    closeModal();
  };

  const removeItem = () => {
    if (selectedItem.startsWith('hat')) {
      setEquippedItems((prev) => ({ ...prev, hat: null }));
    } else if (selectedItem.startsWith('surgery')) {
      setEquippedItems((prev) => ({ ...prev, surgery: null }));
    }
    closeModal();
  };

  const handleWeatherPress = () => {
    Alert.alert('날씨 정보', '현재 날씨는 맑음입니다.');
  };

  // 피부색 설정 함수
  const getSkinColor = () => {
    switch (equippedItems.surgery) {
      case 'surgery1':
        return '#2C2C2C'; // 흑인 피부색
      case 'surgery2':
        return '#FFE0BD'; // 백인 피부색
      case 'surgery3':
        return '#FFD700'; // 황인 피부색 (밝은 노란색)
      case 'surgery4':
        return '#8B4513'; // 갈색 피부색
      default:
        return '#F5C6A5'; // 기본 피부색
    }
  };

  // equippedItems가 변경될 때마다 피부색 업데이트
  useEffect(() => {
    setSkinColor(getSkinColor());
  }, [equippedItems]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.weatherBox} onPress={handleWeatherPress}>
        <Text style={styles.weatherText}>날씨 정보</Text>
      </TouchableOpacity>

      <View style={styles.middleSection}>
        <View style={styles.personContainer}>
          {equippedItems.hat === 'hat1' && <View style={styles.hat1} />}
          {equippedItems.hat === 'hat2' && <View style={styles.hat2} />}
          {equippedItems.hat === 'hat3' && <View style={styles.hat3} />}
          {equippedItems.hat === 'hat4' && <View style={styles.hat4} />}
          <View style={[styles.head, { backgroundColor: skinColor }]} />
          <View style={[styles.body, { backgroundColor: skinColor }]} />
          <View style={[styles.arm, styles.armLeft, { backgroundColor: skinColor }]} />
          <View style={[styles.arm, styles.armRight, { backgroundColor: skinColor }]} />
          <View style={[styles.leg, styles.legLeft, { backgroundColor: skinColor }]} />
          <View style={[styles.leg, styles.legRight, { backgroundColor: skinColor }]} />
        </View>
      </View>

      <View style={styles.shopSection}>
        <View style={styles.categorySection}>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'hair' && styles.activeCategory]}
            onPress={() => setSelectedCategory('hair')}
          >
            <Text>헤어</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'surgery' && styles.activeCategory]}
            onPress={() => setSelectedCategory('surgery')}
          >
            <Text>성형</Text>
          </TouchableOpacity>
        </View>

        {selectedCategory === 'hair' && (
          <>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('hat1')}>
              <View style={styles.itemHat1} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('hat2')}>
              <View style={styles.itemHat2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('hat3')}>
              <View style={styles.itemHat3} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('hat4')}>
              <View style={styles.itemHat4} />
            </TouchableOpacity>
          </>
        )}
        {selectedCategory === 'surgery' && (
          <>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('surgery1')}>
              <View style={styles.itemSurgery1} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('surgery2')}>
              <View style={styles.itemSurgery2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('surgery3')}>
              <View style={styles.itemSurgery3} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('surgery4')}>
              <View style={styles.itemSurgery4} />
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {selectedItem && `${selectedItem}을(를) 장착하시겠습니까?`}
            </Text>
            <View style={styles.modalButtons}>
              <Button title="예" onPress={equipItem} />
              <Button title="아니요" onPress={removeItem} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 10 },
  weatherBox: { alignSelf: 'flex-end', backgroundColor: '#D3D3D3', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, marginVertical: 10 },
  weatherText: { fontSize: 16, color: '#000' },

  middleSection: { flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  personContainer: { alignItems: 'center', position: 'relative' },

  head: { width: 50, height: 50, borderRadius: 25, marginBottom: 10 },
  body: { width: 20, height: 80, borderRadius: 10 },

  arm: { width: 15, height: 60, position: 'absolute', borderRadius: 7.5 },
  armLeft: { left: -25, top: 30 },
  armRight: { right: -25, top: 30 },

  leg: { width: 15, height: 70, position: 'absolute', borderRadius: 7.5 },
  legLeft: { left: -10, top: 120 },
  legRight: { right: -10, top: 120 },

  hat1: { position: 'absolute', top: -40, width: 50, height: 20, backgroundColor: '#000' },
  hat2: { position: 'absolute', top: -40, width: 50, height: 20, backgroundColor: '#555' },
  hat3: { position: 'absolute', top: -40, width: 50, height: 20, backgroundColor: '#AAA' },
  hat4: { position: 'absolute', top: -40, width: 50, height: 20, backgroundColor: '#FF0' },

  shopSection: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', padding: 10, backgroundColor: '#D3D3D3', position: 'relative' },

  categorySection: { position: 'absolute', top: -40, right: 10, flexDirection: 'row' },
  categoryButton: { paddingHorizontal: 20, paddingVertical: 5, marginHorizontal: 5, backgroundColor: '#FFF', borderRadius: 5, borderWidth: 1, borderColor: '#000' },
  activeCategory: { backgroundColor: '#A9A9A9' },

  itemBox: { width: 70, height: 70, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center' },
  itemHat1: { width: 30, height: 15, backgroundColor: '#000' },
  itemHat2: { width: 30, height: 15, backgroundColor: '#555' },
  itemHat3: { width: 30, height: 15, backgroundColor: '#AAA' },
  itemHat4: { width: 30, height: 15, backgroundColor: '#FF0' },
  itemSurgery1: { width: 30, height: 30, backgroundColor: '#2C2C2C' },
  itemSurgery2: { width: 30, height: 30, backgroundColor: '#FFE0BD' },
  itemSurgery3: { width: 30, height: 30, backgroundColor: '#FFD700' },
  itemSurgery4: { width: 30, height: 30, backgroundColor: '#8B4513' },

  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: 250, padding: 20, backgroundColor: '#D3D3D3', borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
});
