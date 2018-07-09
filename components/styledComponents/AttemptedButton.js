import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default class AttemptedButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.attemptedBtn}>
        <Text style={styles.text} onPress={this.props.handleAttempted}>
          Attempted
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  attemptedBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black",
    backgroundColor: "white",
    width: 175
  },
  text: {
    textAlign: "center",
    color: "black",
    fontSize: 18
  }
});
