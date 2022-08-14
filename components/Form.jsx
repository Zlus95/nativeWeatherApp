import { API_KEY } from "@env";
// import config from "../config";
import React, { useState, useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    height: "100vh",
  },
  input: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 15,
    marginVertical: 60,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: "#df8e00",
  },
  info: {
    alignItems: "center",
  },

  cityText: {
    marginTop: 70,
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  dataText: {
    color: "#fff",
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: "#fff",
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: "#fff",
    marginVertical: 10,
    fontWeight: "500",
  },
});

export default function Form() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const fetchData = useCallback(() => {
    setLoading(true);
    setValue("");
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${process.env.API_KEY}`,
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e.response);
        alert(e.response.data.message);
      })
      .finally(() => setLoading(false));
  }, [value]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Enter city name..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholderTextColor={"#000"}
          style={styles.input}
          onSubmitEditing={fetchData}
        />
      </View>
      {loading && (
        <View>
          <ActivityIndicator size={"large"} color="black" />
        </View>
      )}
      {data && (
        <View style={styles.info}>
          <Text
            style={styles.cityText}
          >{`${data?.name} - ${data?.sys?.country}`}</Text>
          <Text style={styles.dataText}>{new Date().toLocaleDateString()}</Text>
          <Text style={styles.tempText}>{data.weather[0].description}</Text>
          <Text style={styles.tempText}>{`${Math.round(
            data?.main?.temp
          )} °C`}</Text>
          <Text style={styles.minMaxText}>{`Min ${Math.round(
            data?.main?.temp_min
          )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
        </View>
      )}
    </View>
  );
}
