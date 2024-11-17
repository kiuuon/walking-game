import { useEffect, useState } from 'react'
import { Stack } from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Pedometer } from "expo-sensors";

import Weather from '../../components/Weather'

export default function MainLayout() {
  const [step, setStep] = useState(0);
  const [totalStep, setTotalStep] = useState(0);
  const [money, setMoney] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [name, setName] = useState('');

  const today = new Date().toISOString().split("T")[0];

  let prevStep;
  let prevTodayStep;
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
      setTotalStep(userData.totalStep);
      setMoney(userData.money);
      setWeight(userData.weight);
      setAge(userData.age);
      setName(userData.name);
      prevStep = userData.step;
      prevTodayStep = userData.totalStep;
      prevMoney = userData.money;
      prevWeight = userData.weight;
    })();
  },[]);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      return Pedometer.watchStepCount(result => {
        setStep(prevStep + result.steps);
        setTotalStep(prevTodayStep + result.steps);
        setMoney(prevMoney + result.steps);
        if(prevWeight - result.steps >= 50) {
          setWeight(prevWeight - result.steps);
        } else {
          setWeight(50);
        }
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
  }, []);

  useEffect(() => {
    if(name !== '') {
      const interval = setInterval(async () => {
        await AsyncStorage.setItem('user', JSON.stringify({
          name,
          age,
          weight,
          step,
          totalStep,
          money,
          date: today,
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [name, age, weight, step, totalStep, money]);

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
          <Text style={styles.headerText}>{`누적 걸음수: ${totalStep}`}</Text>
        </View>
      </View>
      <View style={styles.main}>
        {weight > 100 ?
          <Image source={require('@/assets/images/obesity.png')} style={{width: 220, height: 300, zIndex: 10}}/>
          : weight > 50 ?
          <Image source={require('@/assets/images/middle.png')} style={{width: 123, height: 300, zIndex: 10}}/>
          : <Image source={require('@/assets/images/slim.png')} style={{width: 80, height: 300, zIndex: 10}}/>
        }
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
    width: 200,
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
});