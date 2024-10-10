import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";

export default function StatsPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>운동량 페이지</Text>
      <Button title="돌아가기" onPress={() => router.push("/main")} />
    </View>
  );
}
