import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import image from "../img/bg.jpg";
import Form from "./Form";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    height: "100vh",
  },
});

export default function Main() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.img}>
        <Form />
      </ImageBackground>
    </View>
  );
}
