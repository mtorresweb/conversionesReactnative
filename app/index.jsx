import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, BackHandler } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { observer } from "@legendapp/state/react";
import { state } from "../context/state";
import { Link } from "expo-router";

const App = observer(() => {
  const user = state.user.get();
  const unit = state.unit.get();
  const [selectedUnit, setselectedUnit] = useState(unit);
  const [name, setName] = useState(user)

  useEffect(() => {
    state.user.set(name)
  }, [name])

  useEffect(() => {
    state.unit.set(selectedUnit)
  }, [selectedUnit])

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Conversor de unidades</Text>
          <Pressable onPress={() => BackHandler.exitApp()} >
            <Feather name="x" size={24}
              color="black" />
          </Pressable>
        </View>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Creado por Michael Torres" />
        <Text style={styles.label}>Selecciona la unidad de medida</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedUnit}
          onValueChange={(itemValue, itemIndex) => setselectedUnit(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Longitud" value="Longitud" />
          <Picker.Item label="Tasa de transmisión" value="Tasa de transmisión" />
          <Picker.Item label="Tamaño de datos" value="Tamaño de datos" />
        </Picker>
      </View>

      <Link style={styles.go} href="/calc">
        <AntDesign name="arrowright" size={24} color="white" />
      </Link>
    </View>
  );
})

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    fontSize: 24,
    fontWeight: 'bold',
    padding: 40,
    gap: 20,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff9900'
  },
  input: {
    padding: 10,
    margin: 10,
    width: 200,
    borderBottomWidth: 1,
    marginBottom: 50
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff9900',
    marginBottom: 30
  },
  picker: {
    height: 50,
    width: 250
  },
  go: {
    fontSize: 24,
    backgroundColor: "#ff9900",
    borderRadius: 50,
    padding: 20,
    alignSelf: "flex-end",
    marginRight: 40,
    marginBottom: 40
  }
});

export default App;