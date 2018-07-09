import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class CancelButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => {
          this.props.handleCancel();
        }}
      >
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cancelBtn: {
    paddingHorizontal: 80,
    height: 50,
    backgroundColor: "white",
    marginTop: 5,
    color: "black",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black"
  },
  text: {
    marginTop: 10,
    fontSize: 22,
    fontFamily: "Roboto",
    textAlign: "center",
    color: "rgb(1, 1, 1)"
  }
});
