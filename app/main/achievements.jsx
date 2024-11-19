import { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Achievements() {
  const [totalStep, setTotalStep] = useState(0);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user');
      const ach = await AsyncStorage.getItem('achievements');
      const userData = JSON.parse(user);
      const achievementData = JSON.parse(ach);
      console.log(achievementData);
      setTotalStep(userData.totalStep);

      const newAchievementData = achievementData.map((achievement) => {
        if(achievement.progress <= userData.totalStep && !achievement.completed) {
          // TODO: 보상 주기

          return { ...achievement, completed: true };
        }
        return achievement;
      });

      console.log(newAchievementData)

      setAchievements(newAchievementData);
      await AsyncStorage.setItem('achievements', JSON.stringify(newAchievementData));
    })();
  },[]);

  return (
    <ScrollView style={styles.container}>
      {
        achievements.map((achievement, index) => (
          <View key={index} style={achievement.completed ? styles.completedAchievementContainer : styles.achievementContainer}>
            <Text style={achievement.completed ? styles.completedAchievementText :styles.achievementText}>{achievement.name}</Text>
            <Text style={styles.progressText}>{totalStep} / {achievement.progress}</Text>
          </View>
        ))
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#314056',
  },
  achievementContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 70,
    backgroundColor: "white",
    marginBottom: 20,
    margin: 'auto',
    borderRadius: 10,
    gap: 10,
  },
  completedAchievementContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 70,
    backgroundColor: "gray",
    marginBottom: 20,
    margin: 'auto',
    borderRadius: 10,
    gap: 10,
  },
  achievementText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedAchievementText: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  progressText: {
    fontSize: 16,
  },
});