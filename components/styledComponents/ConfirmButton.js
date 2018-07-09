import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default class ConfirmButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => {
          this.props.handleConfirm();
        }}
      >
        <Text style={styles.text}>Confirm</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  confirmBtn: {
    paddingHorizontal: 80,
    height: 50,
    backgroundColor: "#5e3987",
    marginTop: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black"
  },
  text: {
    marginTop: 10,
    fontSize: 22,
    fontFamily: "Roboto",
    textAlign: "center",
    color: "white"
  }
});
