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
    backgroundColor: "rgb(146, 201, 219)"
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
  ordersListHeaderView: {
    alignItems: "center"
  },
  ordersListDateView: {
    alignSelf: 'flex-end'
  },
  input: {
    width: 210
  },
  orderCard: {
    backgroundColor: "white"
  },
  ordersList: {
    alignItems: "center"
  },
  orderItemView: {
    flex: 1,
    flexDirection: "row"
  },
  text: {
    marginTop: 12,
    fontSize: 18,
    fontFamily: "Roboto"
  }
});
