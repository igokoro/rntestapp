import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList
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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("OrdersList")}
          style={styles.btn}
        >
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mockData = require("./mock.json");

class OrdersList extends Component {

  _renderItem = ({ item }) => {
    return (
      <OrderItem info={item} navigation={this.props.navigation} />
    );
  };

  render() {
    return (
      <View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Your Shops Orders</Text>
        </View>

        <View style={styles.ordersList}>
          <FlatList
            data={mockData.result.orders}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

class OrderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <View style={[styles.borderBlack, styles.orderItemView]}>
        <Text>I am here</Text>
      </View>
    );
  }
}

class Order extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Order Information</Text>
        <View style={styles.confirmationBtnView}>
          <Button style={styles.btn} onPress={null} title="Delivered" />
          <Button style={styles.btn} onPress={null} title="Attempted" />
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
  borderBlack: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ordersList: {
    alignItems: "center"
  },
  orderItemView: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    width: 210
  },
  headerView: {
    alignItems: "center"
  },
  headerText: {
    fontSize: 22
  },
  text: {
    marginTop: 12,
    fontSize: 18,
    fontFamily: "Roboto"
  },
  confirmationBtnView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40
  },
  btn: {
    paddingHorizontal: 80,
    height: 50,
    backgroundColor: "rgb(146, 201, 219)"
  }
});
