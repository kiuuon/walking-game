import { useRouter } from "expo-router";
import { View, Button } from "react-native";

export default function MainPage() {
  const router = useRouter();

  return (
    <View>
      <View>
        <View>
          <Button
            title="옷 가게"
            onPress={() => router.push("/main/clothing-store")}
          />
          <Button title="헤어 성형" onPress={() => router.push("/main/hair")} />
        </View>
        <View>
          <Button
            title="운동 기구"
            onPress={() => router.push("/main/exercise-equipment")}
          />
          <Button
            title="업적"
            onPress={() => router.push("/main/achievements")}
          />
        </View>
        <Button title="미니게임 시작" />
      </View>
      <View>
        <Button title="인벤토리" onPress={() => router.push("/inventory")} />
        <Button title="운동량" onPress={() => router.push("/stats")} />
      </View>
    </View>
  );
}
