import { useEffect, useState } from 'react'
import { Stack } from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

import Weather from '../../components/Weather'

export default function MainLayout() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user');
      setUserData(JSON.parse(user));
    })();
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>{`${userData?.age}세 ${userData?.name}`}</Text>
          <Text style={styles.headerText}>{`체중: ${userData?.weight}kg`}</Text>
        </View>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>{`돈: ${userData?.money}원`}</Text>
          <Text style={styles.headerText}>{`걸음수: ${userData?.step}`}</Text>
        </View>
      </View>
      <View style={styles.main}>
        <Weather />
        <Image source={require('@/assets/images/obesity.png')} style={styles.image}/>
      </View>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    backgroundColor: "#D9D9D9",
    padding: 30,
  },
  headerTextBox: {
    flex: 0,
    width: 100,
    gap: 10,
  },
  headerText: {
    fontSize: 18,
  },
  main: {
    position: 'relative',
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
  image: {
    width: 300,
    height: 300,
    zIndex: 10,
    alignSelf: 'center'
    // backgroundColor: "gray",
  },
});