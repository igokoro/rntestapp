import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  IconNB
} from "native-base";
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
      <Container>
        <Content padder>
          <Card>
            <CardItem
              header
              button
              onPress={() => alert("This is Card Header")}
            >
              <Text>{this.props.info.recFirstName}</Text>
            </CardItem>
            <CardItem button onPress={() => alert("This is Card Body")}>
              <Body>
                <Text>{this.props.info.address1}{this.props.info.city}{this.props.info.state}</Text>
              </Body>
            </CardItem>
            <CardItem
              footer
              button
              onPress={() => alert("This is Card Footer")}
            >
              <Text>{this.props.info.bloomlinkOrder}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
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
    initialRouteName: "OrdersList",
    headerMode: 'none'
  }
);

const styles = StyleSheet.create({
  borderBlack: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black"
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
