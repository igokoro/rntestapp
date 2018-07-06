import React, { Component } from "react";
import { View, Text, FlatList, Button, AsyncStorage } from "react-native";
import OrderItem from "./OrderItem";
import HeaderText from './styledComponents/HeaderText';
import * as firebase from "firebase";
import { getCurrentLocation } from "../services/geolocation"
import { getCurrentDay } from '../services'
import firebaseConfig from "../config/firebase";
import styles from "../styles/styles";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const mockData = require("../mock.json");

export default class OrdersList extends Component {
  constructor() {
    super();
    this.state = {
      deviceLatitude: "x",
      deviceLongitude: "x",
      error: ""
    };

    this.testRef = this.getRef()
      .child("users")
      .child("orders");
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          deviceLatitude: position.coords.deviceLatitude,
          deviceLongitude: position.coords.deviceLongitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  getRef = () => {
    return firebaseApp.database().ref();
  };
  // item is recognized by FlatList from data, also need to pass navigation
  _renderItem = ({ item }) => {
    return (
      <OrderItem
        info={item}
        testRef={this.testRef}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const todaysDate = getCurrentDay();

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.ordersListHeaderView}>
          {/* <Text style={styles.headerText}>Your Shops Orders for:</Text> */}
          <HeaderText>Your Shops Orders for:</HeaderText>
          <Text style={styles.dateText}>{todaysDate}</Text>
        </View>

        <FlatList
          data={mockData.result.orders}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ height: "100%" }}
        />

        <Button
          title="Logout"
          onPress={() => { AsyncStorage.removeItem('loginToken')}}
          color="#5e3987"
        />
      </View>
    );
  }
}
