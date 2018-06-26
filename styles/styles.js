import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  attemptedBtn: {
    backgroundColor: "rgb(175, 29, 29)"
  },
  borderBlack: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 10,
    margin: 5
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  btn: {
    paddingHorizontal: 80,
    height: 50,
  },
  button: {
    textAlign: "center",
    padding: 10,
    margin: 10
  },
  confirmBtn: {
    backgroundColor: "rgb(57, 187, 101)"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  confirmationBtnView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40
  },
  headerText: {
    fontSize: 22
  },
  input: {
    width: 210
  },
  loginBtn: {
    paddingHorizontal: 80,
    height: 50,
    backgroundColor: 'rgb(156, 216, 231)'
  },
  loginFormContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    height: 400,
    width: 300
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080"
  },
  modalVisible: {
    justifyContent: 'space-evenly',
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    width: 300,
    height: 200
  },
  orderCard: {
    backgroundColor: "white",
  },
  ordersList: {
    alignItems: "center"
  },
  ordersListHeaderView: {
    alignItems: "center"
  },
  orderItemView: {
    flex: 1,
    flexDirection: "row"
  },
  orderText: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: 'center'
  },
  text: {
    marginTop: 12,
    fontSize: 22,
    fontFamily: "Roboto",
    textAlign: 'center'
  }
});
