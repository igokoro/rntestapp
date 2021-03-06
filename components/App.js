import React, { Component } from "react";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { Platform, View, PermissionsAndroid } from "react-native";
import LoginForm from "./LoginForm";
import OrdersList from "./OrdersList";
import WelcomeSplash from "./WelcomeSplash";
import { getCurrentRouteName } from '../services/navigation'
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
  GoogleTagManager
} from "react-native-google-analytics-bridge";


const tracker = new GoogleAnalyticsTracker("UA-121230754-2");

class App extends Component {
  // required for geolocation
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "local",
          message: "permissions"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location Finding Enabled");
      } else {
        console.log("Please Enable Location Services");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    const AppStack = createStackNavigator(
      {
        OrdersList: { screen: OrdersList }
      },
      {
        initialRouteName: "OrdersList",
        // removes white space at top of device
        headerMode: "none"
      }
    );

    const AuthStack = createStackNavigator(
      {
        LoginForm: { screen: LoginForm }
      },
      {
        initialRouteName: "LoginForm",
        // removes white space at top of device
        headerMode: "none"
      }
    );

    const RootStack = createSwitchNavigator(
      {
        WelcomeSplash: { screen: WelcomeSplash },
        App: { screen: AppStack },
        Auth: { screen: AuthStack }
      },
      {
        initialRouteName: "Auth",
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

              // determine if screen changed
              if (prevScreen !== currentScreen) {
                tracker.trackScreenView(currentScreen);
              }
            }}
          />
        </View>
    );
  }
}
export default App;
