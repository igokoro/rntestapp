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
        style={styles.splashImage}
        resizeMode={"cover"}
      >
        <View style={styles.container}>
          <Text style={[styles.loginText, styles.splashHeader]}>
            1800Flowers Delivery App
          </Text>
          <ActivityIndicator size={100} color="white" />
        </View>
      </ImageBackground>
    );
  }
}

export default WelcomeSplash;
