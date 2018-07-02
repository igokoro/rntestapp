import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import LoginContext from "../context/loginContext";

export default class LoginContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      storeID: "",
      storePass: "",
      userID: ""
    };
  }

  // componentDidMount() {
  //   this._retrieveData();
  // }

  _retrieveData = async () => {
    const loginToken = await AsyncStorage.getItem("loginToken");
    console.log(loginToken)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(loginToken ? "App" : "Auth");
  };

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}
