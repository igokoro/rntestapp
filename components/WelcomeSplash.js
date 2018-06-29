import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Text
} from "react-native";
import styles from "../styles/styles";

class WelcomeSplash extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../assets/images/welcomeSplash.jpg")}
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%"
        }}
        resizeMode={"cover"}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={[styles.loginText, styles.headerText, {position: 'absolute', top: 0}]}>Attempting Login</Text>
          <ActivityIndicator size={100} color="#0000ff" />
        </View>
      </ImageBackground>
    );
  }
}

export default WelcomeSplash;
