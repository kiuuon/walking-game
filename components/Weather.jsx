import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import Constants from 'expo-constants';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [ok, setOk] = useState(true);
  const { WEATHER_API_KEY } = Constants.manifest.extra;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setOk(false);
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if(!ok) {
    return <View />
  }

  return (
    <View style={styles.container}>
      <Text>{weatherData?.main.temp}°C</Text>
      <Text>{weatherData?.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    top: 15,
    right: 15,
  },
});