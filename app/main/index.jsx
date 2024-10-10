import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MainPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/main/clothing-store")}
          >
            <Text>옷 가게</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/main/hair")}
          >
            <Text>헤어 성형</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/main/exercise-equipment")}
          >
            <Text>운동 기구</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/main/achievements")}
          >
            <Text>업적</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button3}>
          <Text>미니게임 시작</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonBox2}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => router.push("/inventory")}
        >
          <Text>인벤토리</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => router.push("/stats")}
        >
          <Text>운동량</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingVertical: 20,
  },
  buttonContainer: {
    flex: 0,
    justifyContent: "space-between",
    alignItems: "center",
    height: 220,
    paddingVertical: 20,
  },
  buttonBox: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 240,
    height: 40,
  },
  buttonBox2: {
    flex: 0,
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },
  button1: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 70,
    height: 40,
  },
  button2: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 105,
    height: 40,
  },
  button3: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 240,
    height: 40,
  },
});
