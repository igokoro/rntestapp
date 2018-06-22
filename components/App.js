import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { Platform, View } from "react-native";
import LoginForm from "./LoginForm";
import OrdersList from "./OrdersList";
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
  GoogleTagManager
} from "react-native-google-analytics-bridge";

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const tracker = new GoogleAnalyticsTracker("UA-121230754-2");

class App extends Component {
  render() {
    const RootStack = createStackNavigator(
      {
        LoginForm: { screen: LoginForm },
        OrdersList: { screen: OrdersList }
      },
      {
        initialRouteName: "LoginForm",
        // removes white space at top of device
        headerMode: "none"
      }
    );

    return (
      <View style={{ flex: 1 }}>
        <RootStack
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
              // the line below uses the Google Analytics tracker
              // change the tracker here to use other Mobile analytics SDK.
              tracker.trackScreenView(currentScreen);
            }
          }}
        />
      </View>
    );
  }
}
export default App;
