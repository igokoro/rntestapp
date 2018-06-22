import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { Platform } from "react-native";
import LoginForm from "./LoginForm";
import OrdersList from "./OrdersList";
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
  GoogleTagManager
} from "react-native-google-analytics-bridge";

export default class App extends Component {
  render() {

    let tracker = new GoogleAnalyticsTracker("UA-121230754-2");
    console.log(tracker)
    GoogleAnalyticsSettings.setDispatchInterval(30);
    tracker.trackScreenView("LoginForm");

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
    // removes white space at top of device
    headerMode: "none"
  }
);
