import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import LoginContext from "../context/loginContext"

export default class LoginContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      storeID: "",
      storePass: ""
    };
  }

  componentWillMount() {
    console.log('yes')
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(
        "loginToken",
        (error, result) => {
          this.setState({
            storeID: result.storeID,
            storePass: result.storePass
          });
          console.log("result" + result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {    
    return <LoginContext.Provider value={this.state}>{this.props.children}</LoginContext.Provider>;
  }
}
