import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import OrderText from "./styledComponents/OrderText";
import HeaderText from "./styledComponents/HeaderText";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import openMap from "react-native-open-maps";
import googleMapsConfig from "../config/googleMaps";
import Geocoder from "react-native-geocoding";
import styles from "../styles/styles";

const tracker = new GoogleAnalyticsTracker("UA-121230754-2");

const sampleOrder = {
  bloomlinkOrderNumber: 100001,
  deliveryAddress: "315 Spring St. NY, NY 10003",
  deliveryDate: "6/26/2018",
  orderStatus: "DLTA"
};

// Props
// - testRef : firebase reference for pushing data
// - info : order info from bloomlink
// - navigation : ability to navigate screens
export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      deliveryBtnPressed: "",
      modalBtnPressed: "",
      lng: null,
      lat: null
    };
  }

  openModal = visible => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _handleDelivered = () => {
    this.setState({ deliveryBtnPressed: "Delivered" });
    this.openModal();
  };

  _handleAttempted = () => {
    // return devices location for Firebase storage
    // const test = navigator.geolocation.getCurrentPosition(position =>
    //   console.log(position)
    // );
    this.setState({ deliveryBtnPressed: "Attempted" });
    this.openModal();
  };

  handleConfirm = () => {
    this.setState({ modalBtnPressed: "Confirm" });
    // If the driver confirms a attempted delivery, change order status
    if (
      this.state.modalBtnPressed === "Confirm" &&
      this.state.deliveryBtnPressed === "Attempted"
    ) {
      this.setState({ orderStatus: "ATTEMPTED" });
    }
    this.closeModal();
  };

  handleCancel = () => {
    this.closeModal();
  };
  // called on render for each card
  convertAddress = (street, city, state) => {
    Geocoder.init(googleMapsConfig.gMapsAPIKey);

    Geocoder.from(`${street} ${city}, ${state}`)
      .then(json => {
        var location = json.results[0].geometry.location;
        // console.log("location");
        // console.log(location);
        this.setState({ lng: location.lng, lat: location.lat });
      })
      .catch(error => console.warn(error));
  };
  // triggered by touching the address of each card
  _goToAddress = () => {
    openMap({ latitude: this.state.lat, longitude: this.state.lng });
  };

  render() {
    // GA events
    tracker.trackEvent("_handleDelivered", "_handleDelivered");
    tracker.trackEvent("_handleAttempted", "_handleAttempted");

    // Convert address into long lat
    // DO NOT LEAVE THIS UNCOMMENTED IN DEVELOPMENT WILL WASTE API CREDITS
    // const addressLongLat = this.convertAddress(
    //   this.props.info.address1,
    //   this.props.info.city,
    //   this.props.info.state
    // );

    // if no first name, check toAttention
    const deliverTo =
      this.props.info.recFirstName || this.props.info.toAttention;

    const modalStatus = this.state.modalBtnPressed;
    const deliveryStatus = this.state.deliveryBtnPressed;
    const orderStatus =
      modalStatus === "Confirm" && deliveryStatus === "Attempted"
        ? "ATTEMPTED"
        : null;

    return (
      // Card Wrapper
      <View
        style={[
          styles.orderCard,
          orderStatus === "ATTEMPTED" ? styles.borderOrange : styles.borderBlack
        ]}
      >
        {/* Popup */}
        <View>
          <Modal
            animationType="none"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalVisible}>
                {/* Modal Order Information Text */}
                <View style={{ marginBottom: 10 }}>
                  <HeaderText>
                    Mark Order as{" "}
                    <Text style={{ color: "#5e3987" }}>
                      {this.state.deliveryBtnPressed}
                    </Text>
                  </HeaderText>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                  style={[styles.btn, styles.deliveredBtn, styles.btnTextWhite]}
                  onPress={() => {
                    this.handleConfirm();
                    // push data to firebase
                    // this.props.testRef.push(sampleOrder);
                  }}
                >
                  <Text style={[styles.text, { color: "white" }]}>Confirm</Text>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity
                  style={[
                    styles.btn,
                    styles.attemptedBtn,
                    styles.btnTextBlack,
                    {
                      borderRadius: 4,
                      borderWidth: 0.5,
                      borderColor: "black"
                    }
                  ]}
                  onPress={() => {
                    this.handleCancel();
                  }}
                >
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Order Information */}
        <View>
          {/* Top bar */}
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            {/* Order Number */}
            <OrderText>{this.props.info.bloomlinkOrder}</OrderText>
            {/* Order Status */}
            <Text
              style={[
                styles.orderText,
                orderStatus === "ATTEMPTED" ? styles.orderStatusText : null
              ]}
            >
              {orderStatus}
            </Text>
          </View>
          {/* Search Address in GMaps trigger */}
          {/* <TouchableWithoutFeedback onLongPress={() => this._goToAddress()}> */}
          {/* Address information */}
          <View style={styles.container}>
            <OrderText>{deliverTo}</OrderText>
            <OrderText>{this.props.info.address1}</OrderText>
            <OrderText>
              {this.props.info.city}, {this.props.info.state}
            </OrderText>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </View>

        <View style={styles.buttonView}>
          {/* Delivered button */}
          <TouchableOpacity style={{ width: 175 }}>
            <Text
              style={[
                styles.button,
                styles.borderBlack,
                styles.btnTextWhite,
                styles.deliveredBtn,
                { fontSize: 18 }
              ]}
              onPress={this._handleDelivered}
            >
              Delivered
            </Text>
          </TouchableOpacity>

          {/* Attemped Btn */}
          <View>
            {/* disables after use */}
            <TouchableOpacity style={{ width: 175 }}>
              <Text
                style={[
                  styles.button,
                  styles.borderBlack,
                  styles.btnTextBlack,
                  styles.attemptedBtn,
                  { fontSize: 18 }
                ]}
                onPress={this._handleAttempted}
              >
                Attempted
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
