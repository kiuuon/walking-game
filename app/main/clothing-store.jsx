import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Alert } from 'react-native';

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isHatEquipped, setIsHatEquipped] = useState(false);
    const [isShirtEquipped, setIsShirtEquipped] = useState(false);
    const [isShoesEquipped, setIsShoesEquipped] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('hair');

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const equipItem = () => {
        if (selectedItem === 'hat') {
            setIsHatEquipped(true);
        } else if (selectedItem === 'shirt') {
            setIsShirtEquipped(true);
        } else if (selectedItem === 'shoes') {
            setIsShoesEquipped(true);
        }
        closeModal();
    };

    const removeItem = () => {
        if (selectedItem === 'hat') {
            setIsHatEquipped(false);
        } else if (selectedItem === 'shirt') {
            setIsShirtEquipped(false);
        } else if (selectedItem === 'shoes') {
            setIsShoesEquipped(false);
        }
        closeModal();
    };

    const handleWeatherPress = () => {
        Alert.alert('날씨 정보', '현재 날씨는 맑음입니다.');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.weatherBox} onPress={handleWeatherPress}>
                <Text style={styles.weatherText}>날씨 정보</Text>
            </TouchableOpacity>

            <View style={styles.middleSection}>
                <View style={styles.personContainer}>
                    {isHatEquipped && <View style={styles.hat} />}
                    <View style={styles.head} />
                    <View style={styles.body} />
                    {isShirtEquipped && <View style={styles.shirt} />}
                    <View style={styles.armsContainer}>
                        <View style={styles.arm} />
                        <View style={styles.arm} />
                    </View>
                    <View style={styles.legsContainer}>
                        <View style={styles.leg} />
                        <View style={styles.leg} />
                    </View>
                    {isShoesEquipped && (
                        <View style={styles.shoesContainer}>
                            <View style={styles.shoe} />
                            <View style={styles.shoe} />
                        </View>
                    )}
                </View>
            </View>

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

            <View style={styles.shopSection}>
                {selectedCategory === 'hair' && (
                    <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('hat')}>
                        <View style={styles.itemHat} />
                    </TouchableOpacity>
                )}
                {selectedCategory === 'surgery' && (
                    <>
                        <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('shirt')}>
                            <View style={styles.itemShirt} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemBox} onPress={() => handleItemPress('shoes')}>
                            <View style={styles.itemShoes} />
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
                            {selectedItem === 'hat' && '모자를 구매하시겠습니까?'}
                            {selectedItem === 'shirt' && '옷을 구매하시겠습니까?'}
                            {selectedItem === 'shoes' && '신발을 구매하시겠습니까?'}
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
    personContainer: { alignItems: 'center' },
    head: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5C6A5', marginBottom: 10 },
    body: { width: 10, height: 80, backgroundColor: '#000' },
    armsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 80, position: 'relative', top: -30 },
    arm: { width: 10, height: 60, backgroundColor: '#000' },
    legsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 40, marginTop: 10 },
    leg: { width: 10, height: 60, backgroundColor: '#000' },
    hat: { position: 'absolute', top: -40, width: 50, height: 20, backgroundColor: '#000', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    shirt: { position: 'absolute', top: 10, width: 30, height: 40, backgroundColor: '#2A9DF4' },
    shoesContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 40, marginTop: -10 },
    shoe: { width: 10, height: 10, backgroundColor: '#000' },
    categorySection: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
    categoryButton: { paddingHorizontal: 20, paddingVertical: 10, marginHorizontal: 5, backgroundColor: '#FFF', borderRadius: 5, borderWidth: 1, borderColor: '#000' },
    activeCategory: { backgroundColor: '#D3D3D3' },
    shopSection: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', padding: 10, backgroundColor: '#D3D3D3' },
    itemBox: { width: 70, height: 70, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center' },
    itemHat: { width: 40, height: 20, backgroundColor: '#000', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    itemShirt: { width: 50, height: 40, backgroundColor: '#2A9DF4' },
    itemShoes: { width: 30, height: 15, backgroundColor: '#333' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: 250, padding: 20, backgroundColor: '#D3D3D3', borderRadius: 10, alignItems: 'center' },
    modalText: { fontSize: 18, marginBottom: 20 },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
});
