import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import OrderItem from "./OrderItem";
import styles from "../styles/styles";

const mockData = require("../mock.json");

export default class OrdersList extends Component {
  // item is recognized by FlatList from data, also need to pass navigation
  _renderItem = ({ item }) => {
    return <OrderItem info={item} navigation={this.props.navigation} />;
  };

  render() {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const todaysDate = `${date}-${month}-${year}`;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.ordersListHeaderView}>
          <Text style={styles.headerText}>Your Shops Orders</Text>
        </View>
        <View>
          <Text style={[styles.ordersListDateView, styles.text]}>
            {todaysDate}
          </Text>
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
