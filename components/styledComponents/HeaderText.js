import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class HeaderText extends Component {
  render() {
    return (
      <Text
        style={ styles.text }
        { ...this.props }
      />
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 22,
    color: "rgb(0,0,0)"
  },
});
