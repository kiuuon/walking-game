import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { WEATHER_API_KEY } from "@env";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.9780&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{weatherData?.main.temp}°C</Text>
      <Text>{weatherData?.weather[0].description}</Text>
    </View>
  );
}