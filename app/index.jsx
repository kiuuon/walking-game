import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Index() {
  const router = useRouter();
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user');
      if(user) {
        router.push('/main');
      } else {
        router.push('/setting');
      }
    })();
  }, [setUserData])

  return <View />;
}
