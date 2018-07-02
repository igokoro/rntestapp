import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import LoginContext from "../context/loginContext";
import styles from "../styles/styles";

const tracker = new GoogleAnalyticsTracker("UA-121230754-2");

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeID: "",
      storePass: "",
      userID: ""
    };
  }

  _storeData = async () => {
    const loginToken = JSON.stringify({
      storeID: this.state.storeID,
      storePass: this.state.storePass
    });

    try {
      await AsyncStorage.setItem("loginToken", loginToken);
    } catch (error) {
      console.log(error);
    }
  };

  _handleSubmit = () => {
    this._storeData();
    this.props.navigation.navigate("OrdersList");
  };

  render() {
    tracker.trackEvent("_handleSubmit", "_handleSubmit");

    return (
      <View style={styles.container}>
        <LoginContext.Consumer>
          {context => {
            console.log(context)
            return (
              <View style={styles.loginFormContainer}>
                <View>
                  <Text style={styles.text}>Store ID</Text>
                  <TextInput
                    style={{ width: 220 }}
                    onChangeText={storeID => this.setState({ storeID })}
                    value={this.state.storeID}
                    placeholder="Enter Your StoreID"
                  />
                </View>
                <View>
                  <Text style={styles.text}>User ID</Text>
                  <TextInput
                    style={{ width: 220 }}
                    onChangeText={userID => this.setState({ userID })}
                    value={this.state.userID}
                    placeholder="Enter Your UserID"
                  />
                </View>
                <View>
                  <Text style={styles.text}>Password</Text>
                  <TextInput
                    style={{ width: 220 }}
                    onChangeText={storePass => this.setState({ storePass })}
                    value={this.state.storePass}
                    placeholder="Enter Your Store Password"
                    secureTextEntry
                  />
                </View>
                {/* Submit button */}
                <View style={styles.loginBtnView}>
                  <TouchableOpacity
                    onPress={this._handleSubmit}
                    style={styles.loginBtn}
                  >
                    <Text style={[styles.text, styles.loginText]}>Log In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </LoginContext.Consumer>
      </View>
    );
  }
}
