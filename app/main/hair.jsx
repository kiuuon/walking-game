import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, ScrollView, Image } from 'react-native'

export default function Hair() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [equippedItems, setEquippedItems] = useState({
    hat: null,
    surgery: null,
  });
  const [selectedCategory, setSelectedCategory] = useState('hair');

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

  return (
    <View style={styles.container}>
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
          <ScrollView style={styles.shopSection} horizontal={true}>

            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('옷 1')}>
              <Image source={require('@/assets/images/cloth1.png')} style={{width: 100, height: 100}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('옷 2')}>
              <Image source={require('@/assets/images/cloth2.png')} style={{width: 160, height: 160}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('옷 3')}>
              <Image source={require('@/assets/images/cloth3.png')} style={{width: 140, height: 140}}/>
            </TouchableOpacity>
          </ScrollView>
        )}
        {selectedCategory === 'surgery' && (
          <ScrollView style={styles.shopSection} horizontal={true}>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('성형 1')}>
              <Image source={require('@/assets/images/obesity.png')} style={{width: 140, height: 140}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('surgery2')}>
              <Image source={require('@/assets/images/obesity.png')} style={{width: 140, height: 140}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('surgery3')}>
              <Image source={require('@/assets/images/obesity.png')} style={{width: 140, height: 140}}/>
            </TouchableOpacity>
          </ScrollView>
        )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {selectedItem && `${selectedItem}을(를) 구매하시겠습니까?`}
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
  container: { flex: 1, backgroundColor: "#314056", padding: 30, alignItems: 'center', justifyContent: 'space-between' },

  shopSection: { flexDirection: 'row', width: '100%', backgroundColor: '#929AA0', position: 'relative', height: 150, paddingTop: 10 },

  categorySection: { flexDirection: 'row', marginBottom: 20, marginLeft: 180 },

  categoryButton: { paddingHorizontal: 20, paddingVertical: 5, marginHorizontal: 5, backgroundColor: '#FFF', borderRadius: 5 },
  activeCategory: { backgroundColor: '#929AA0' },

  itemBox: { flexDirection: 'row', width: 140, height: 140, backgroundColor: '#FFF', marginLeft: 10, alignItems: 'center', justifyContent: 'center' },

  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: 250, padding: 20, backgroundColor: '#D3D3D3', borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
});
