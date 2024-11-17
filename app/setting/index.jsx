import { useState } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useRouter } from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function StatsPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const [open, setOpen] = useState(false);
  const [age, setAge] = useState(null);
  const [items, setItems] = useState(
    Array.from({ length: 99 }, (_, i) => ({ label: i + 1, value: i + 1 }))
  );

  const [gender, setGender] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const confirm = async () => {
    if(!name || !age || !gender) return;

    const userData = {
      name,
      age,
      gender,
      weight: 150,
      step: 0,
      totalStep: 0,
      money: 0,
      clothes: [],
      hair: [],
      equipments: [],
      date: today,
    }

    await AsyncStorage.setItem('user', JSON.stringify(userData));
    router.push("/main")
  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.option}>
          <Text style={styles.text}>이름</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>나이</Text>
          <DropDownPicker
            open={open}
            value={age}
            items={items}
            setOpen={setOpen}
            setValue={setAge}
            setItems={setItems}
            placeholder="나이를 선택해 주세요."
            style={styles.dropdown}
            dropDownContainerStyle={{ width: 180, zIndex: 100 }} />
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>성별</Text>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'male' && styles.selectedButton]}
            onPress={() => setGender('male')}
          >
            <Text style={[styles.genderText, gender === 'male' && styles.selectedText]}>남자</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.genderButton, gender === 'female' && styles.selectedButton]}
            onPress={() => setGender('female')}
          >
            <Text style={[styles.genderText, gender === 'female' && styles.selectedText]}>여자</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={confirm} style={styles.confirmButton}>
          <Text style={{fontSize: 16}}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "gray",
    width: 300,
    height: 380,
    padding: 20,
    borderRadius: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginBottom: 10,
    height: 80,
    width: 260
  },
  input: {
    backgroundColor: "white",
    width: 180,
    height: 50,
    borderRadius: 5,
    padding: 10,
  },
  dropdown: {
    backgroundColor: "white",
    width: 180,
    height: 50,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontSize: 28,
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 75,
    height: 50,
  },
  selectedButton: {
    backgroundColor: '#2196F3',
  },
  genderText: {
    fontSize: 16,
  },
  selectedText: {
    color: 'white',
  },
  confirmButton: {
    backgroundColor: 'white',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 80,
  }
})