import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from "react-native";

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeID: "Enter Your Store ID",
      storePass: "Enter Your Password"
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Store ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={storeID => this.setState({ storeID })}
          value={this.state.storeID}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={storePass => this.setState({ storePass })}
          value={this.state.storePass}
        />
        <Button
          onPress={() => this.props.navigation.navigate("OrdersList")}
          title="Log In"
        />
      </View>
    );
  }
}
const mockData = require("./mock.json");

class OrdersList extends Component {
  render() {
    const orders = mockData.map(order => {
      return (
          <Text
            key={order.id}
            onPress={() => this.props.navigation.navigate("Order")}
            style={{ fontSize: 26 }}
          >
            {order.address}
          </Text>
      );
    });
    return (
      <View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Your Shops Orders</Text>
        </View>
        <View style={styles.ordersList}>{orders}</View>
      </View>
    );
  }
}

class Order extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Order Information</Text>
        <View style={styles.confirmationBtn}>
          <Button onPress={null} title="Delivered" />
          <Button onPress={null} title="Attempted" />
        </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Login,
    OrdersList,
    Order
  },
  {
    initialRouteName: "OrdersList"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ordersList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  input: {
    width: 200
  },
  headerView: {
    alignItems: "center"
  },
  headerText: {
    fontSize: 22
  },
  text: {
    marginTop: 10,
    fontSize: 18
  },
  confirmationBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    maxHeight: 40
  }
});
