import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { Platform } from "react-native";
import LoginForm from "./LoginForm";
import OrdersList from "./OrdersList";

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    LoginForm,
    OrdersList
  },
  {
    initialRouteName: "LoginForm",
    headerMode: "none"
  }
);
