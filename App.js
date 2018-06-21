import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Text,
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

class OrderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <View style={[styles.borderBlack, styles.orderCard]}>

        <View>
          <View>
            <Text style={styles.text}>{this.props.info.recFirstName}</Text>
          </View>

          <View>
            <Text style={styles.text}>{this.props.info.bloomlinkOrder}</Text>
          </View>

          <View>
            <Text style={styles.text}>{this.props.info.address1}</Text>
          </View>
        </View>

        <View>
          <Button
            title='Delivered'
            onPress={null}
            color='green'
          />
          <Button
            title='Attempted'
            onPress={null}
            color='red'
          />
        </View>

      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Login,
    OrdersList,
  },
  {
    initialRouteName: "OrdersList",
    headerMode: "none"
  }
);

const styles = StyleSheet.create({
  button: {

  },
  confimBtn: {

  },
  attemptedBtn: {

  },
  borderBlack: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 10,
    margin: 5
  },
  orderCard: {
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ordersList: {
    alignItems: "center"
  },
  orderItemView: {
    flex: 1,
    flexDirection: "row"
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
  }
});
