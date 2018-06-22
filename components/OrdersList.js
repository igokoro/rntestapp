import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import OrderItem from './OrderItem';
import styles from '../styles/styles';

const mockData = require('../mock.json')

export default class OrdersList extends Component {
  // item is recognized by FlatList from data, also need to pass navigation
  _renderItem = ({ item }) => {
    return <OrderItem info={item} navigation={this.props.navigation} />;
  };

  render() {
    return (
      <View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Your Shops Orders</Text>
        </View>

        <FlatList
          data={mockData.result.orders}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
