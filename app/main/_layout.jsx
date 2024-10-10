import { Stack } from "expo-router";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 500,
        }}
      ></View>

      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
