import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 100, backgroundColor: "#D9D9D9" },
  main: { height: 400 },
});

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.main} />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
