import { useEffect, useState } from 'react'
import { Stack } from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Pedometer } from "expo-sensors";

import Weather from '../../components/Weather'

export default function MainLayout() {
  const [step, setStep] = useState(0);
  const [money, setMoney] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [name, setName] = useState('');

  const today = new Date().toISOString().split("T")[0];

  let prevStep;
  let prevMoney;
  let prevWeight;

  useEffect(() => {
    (async () => {
      let user = await AsyncStorage.getItem('user');
      let userData = JSON.parse(user);
      if(userData.date !== today) {
        await AsyncStorage.setItem('user', JSON.stringify({
          ...userData,
          step: 0,
          date: today,
        }));
        user = await AsyncStorage.getItem('user');
        userData = JSON.parse(user);
      }

      setStep(userData.step);
      setMoney(userData.money);
      setWeight(userData.weight);
      setAge(userData.age);
      setName(userData.name);
      prevStep = userData.step;
      prevMoney = userData.money;
      prevWeight = userData.weight;
    })();
  },[]);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      return Pedometer.watchStepCount(result => {
        setStep(prevStep + result.steps);
        setMoney(prevMoney + result.steps);
        setWeight(prevWeight - result.steps);
        console.log(result.steps);
      });
    }
  };



  useEffect(() => {
    const subscription = subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>{`${age}세 ${name}`}</Text>
          <Text style={styles.headerText}>{`체중: ${weight}kg`}</Text>
        </View>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>{`돈: ${money}원`}</Text>
          <Text style={styles.headerText}>{`걸음수: ${step}`}</Text>
        </View>
      </View>
      <View style={styles.main}>
        <Image source={require('@/assets/images/obesity.png')} style={styles.image}/>
        <Weather />
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