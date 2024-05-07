import { observer } from "@legendapp/state/react";
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { Feather, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { state } from "../context/state";
import { Link } from "expo-router";

const conversiones = {
  Longitud: {
    opciones: [
      {
        name: "Kilometro",
        value: 1
      },
      {
        name: "Metro",
        value: 1000
      },
      {
        name: "Centímetro",
        value: 100000
      }
    ]
  },
  TasaDeTransmisión: {
    opciones: [
      {
        name: "Gigabit",
        value: 1
      },
      {
        name: "Kilobit",
        value: 1000000
      },
      {
        name: "Bit",
        value: 1000000000
      }
    ]
  },
  TamañoDeDatos: {
    opciones: [
      {
        name: "Gigabyte",
        value: 1
      },
      {
        name: "KiloByte",
        value: 1000000
      },
      {
        name: "Byte",
        value: 1000000000
      }
    ]
  }
}

const convertirLongitud = (from, to, selectedInitialUnit, selectedWishedUnit) => {

  let conversion = 0;
  if (selectedInitialUnit === "Kilometro" && selectedWishedUnit === "Metro") {
    conversion = from * 1000;
  }
  if (selectedInitialUnit === "Kilometro" && selectedWishedUnit === "Centímetro") {
    conversion = from * 100000;
  }
  if (selectedInitialUnit === "Metro" && selectedWishedUnit === "Kilometro") {
    conversion = from / 1000;
  }
  if (selectedInitialUnit === "Metro" && selectedWishedUnit === "Centímetro") {
    conversion = from * 100;
  }
  if (selectedInitialUnit === "Centímetro" && selectedWishedUnit === "Kilometro") {
    conversion = from / 100000;
  }
  if (selectedInitialUnit === "Centímetro" && selectedWishedUnit === "Metro") {
    conversion = from / 100;
  }
  return conversion;
}

const convertirTasaDeTransmision = (from, to, selectedInitialUnit, selectedWishedUnit) => {
  let conversion = 0;
  if (selectedInitialUnit === "Gigabit" && selectedWishedUnit === "Kilobit") {
    conversion = from * 1000000;
  }
  if (selectedInitialUnit === "Gigabit" && selectedWishedUnit === "Bit") {
    conversion = from * 1000000000;
  }
  if (selectedInitialUnit === "Kilobit" && selectedWishedUnit === "Gigabit") {
    conversion = from / 1000000;
  }
  if (selectedInitialUnit === "Kilobit" && selectedWishedUnit === "Bit") {
    conversion = from * 1000;
  }
  if (selectedInitialUnit === "Bit" && selectedWishedUnit === "Gigabit") {
    conversion = from / 1000000000;
  }
  if (selectedInitialUnit === "Bit" && selectedWishedUnit === "Kilobit") {
    conversion = from / 1000;
  }
  return conversion;

}

const convertirTamañoDeDatos = (from, to, selectedInitialUnit, selectedWishedUnit) => {
  console.log(from, "from")
  console.log(to, "to")
  console.log(selectedInitialUnit, "selectedInitialUnit")
  console.log(selectedWishedUnit, "selectedWishedUnit")
  let conversion = 0;
  if (selectedInitialUnit === "Gigabyte" && selectedWishedUnit === "KiloByte") {
    conversion = from * 1000000;
  }
  if (selectedInitialUnit === "Gigabyte" && selectedWishedUnit === "Byte") {
    conversion = from * 1000000000;
  }
  if (selectedInitialUnit === "KiloByte" && selectedWishedUnit === "Gigabyte") {
    conversion = from / 1000000;
  }
  if (selectedInitialUnit === "KiloByte" && selectedWishedUnit === "Byte") {
    conversion = from * 1000;
  }
  if (selectedInitialUnit === "Byte" && selectedWishedUnit === "Gigabyte") {
    conversion = from / 1000000000;
  }
  if (selectedInitialUnit === "Byte" && selectedWishedUnit === "KiloByte") {
    conversion = from / 1000;
  }
  return conversion;

}

const calc = observer(() => {
  const user = state.user.get();
  const unit = state.unit.get();
  const [from, setFrom] = useState()
  const [to, setTo] = useState()

  const getDefaultValue = () => {
    if (unit === "Longitud") {
      return "Kilometro"
    }
    if (unit === "Tasa de transmisión") {
      return "Gigabit"
    }
    if (unit === "Tamaño de datos") {
      return "Gigabyte"
    }
  }

  const [selectedInitialUnit, setselectedInitialUnit] = useState(getDefaultValue());
  const [selectedWishedUnit, setselectedWishedUnit] = useState("");

  const calcular = () => {
    if (unit === "Longitud") {
      setTo(convertirLongitud(from, to, selectedInitialUnit, selectedWishedUnit))
    }
    if (unit === "Tasa de transmisión") {
      setTo(convertirTasaDeTransmision(from, to, selectedInitialUnit, selectedWishedUnit))
    }
    if (unit === "Tamaño de datos") {
      setTo(convertirTamañoDeDatos(from, to, selectedInitialUnit, selectedWishedUnit))
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hola {user}</Text>
          <Pressable onPress={() => BackHandler.exitApp()}>
            <Feather name="x" size={24}
              color="black" />
          </Pressable>
        </View>
        <View style={styles.controls}>
          <View>
            <TextInput type="number" value={from} onChangeText={setFrom} style={styles.input} placeholder="Ingresa el valor" />
            <Picker
              style={styles.picker}
              mode="dropdown"
              selectedValue={selectedInitialUnit}
              onValueChange={(itemValue, itemIndex) => setselectedInitialUnit(itemValue)}
            >
              {
                unit === "Longitud" && <Picker.Item label={"Kilometro"} value={"Kilometro"} />
              }
              {
                unit === "Tasa de transmisión" && <Picker.Item label={"Gigabit"} value={"Gigabit"} />
              }
              {
                unit === "Tamaño de datos" && <Picker.Item label={"Gigabyte"} value={"Gigabyte"} />
              }
            </Picker>
          </View>
          <View>
            <Text style={styles.resultado} >{to || "Resultado"}</Text>
            <Picker
              style={styles.picker}
              mode="dropdown"
              selectedValue={selectedWishedUnit}
              onValueChange={(itemValue, itemIndex) => setselectedWishedUnit(itemValue)}
            >
              {
                unit === "Longitud" && conversiones.Longitud.opciones.map((opcion, index) => (<Picker.Item key={index} label={opcion.name} value={opcion.name} />))
              }
              {
                unit === "Tasa de transmisión" && conversiones.TasaDeTransmisión.opciones.map((opcion, index) => (<Picker.Item key={index} label={opcion.name} value={opcion.name} />))
              }
              {
                unit === "Tamaño de datos" && conversiones.TamañoDeDatos.opciones.map((opcion, index) => (<Picker.Item key={index} label={opcion.name} value={opcion.name} />))
              }
            </Picker>
          </View>
          <Pressable onPress={calcular} style={styles.calcular}><Text>Calcular</Text><SimpleLineIcons name="calculator" size={24} color="black" /></Pressable>
        </View>
      </View>

      <Link style={styles.go} href="/">
        <AntDesign name="arrowleft" size={24} color="white" />
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
    width: 250,
    padding: 10,
    borderBottomWidth: 1,
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
    alignSelf: "flex-start",
    marginLeft: 40,
    marginBottom: 40
  },
  controls: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    fontSize: 24,
    fontWeight: 'bold',
    gap: 20,
    alignItems: "center",
    padding: 40
  },
  calcular: {
    backgroundColor: "#ff9900",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
    marginTop: 20
  },
  resultado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff9900',
    alignSelf: "center",
    marginTop: 20
  }
});

export default calc;