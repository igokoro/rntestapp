import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    textAlign: "center",
    padding: 10,
    margin: 10
  },
  confirmBtn: {
    backgroundColor: 'rgb(57, 187, 101)'
  },
  attemptedBtn: {
    backgroundColor: 'rgb(175, 29, 29)'
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
