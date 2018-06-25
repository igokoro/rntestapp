import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import styles from "../styles/styles";

const tracker = new GoogleAnalyticsTracker("UA-121230754-2");

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeID: "A22",
      storePass: "test"
    };
  }

  _handleSubmit = () => {
    this.props.navigation.navigate("OrdersList");
  };

  render() {
    tracker.trackEvent("_handleSubmit", "_handleSubmit");

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Store ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={storeID => this.setState({ storeID })}
          value={this.state.storeID}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={storePass => this.setState({ storePass })}
          value={this.state.storePass}
        />
        {/* Submit button */}
        <TouchableOpacity onPress={this._handleSubmit} style={styles.btn}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
