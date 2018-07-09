import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default class DeliveredButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.deliveredBtn}>
        <Text style={styles.text} onPress={this.props.handleDelivered}>
          Delivered
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deliveredBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black",
    backgroundColor: "#5e3987",
    width: 175
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 18
  }
});
