import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import OrderItem from "./OrderItem";
import styles from "../styles/styles";

import * as firebase from "firebase";
import firebaseConfig from "../config/firebase";

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
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const todaysDate = `${month}-${date}-${year}`;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.ordersListHeaderView}>
          <Text style={styles.headerText}>Your Shops Orders for:</Text>
          <Text style={styles.dateText}>{todaysDate}</Text>
        </View>

        <FlatList
          data={mockData.result.orders}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ height: "100%" }}
        />
      </View>
    );
  }
}
