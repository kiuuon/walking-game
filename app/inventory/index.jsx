import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";

export default function InventoryPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>인벤토리 페이지</Text>
      <Button title="돌아가기" onPress={() => router.push("/main")} />
    </View>
  );
}
