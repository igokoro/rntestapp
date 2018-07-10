import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
// styled components
import OrderText from "./styledComponents/OrderText";
import HeaderText from "./styledComponents/HeaderText";
import CancelButton from "./styledComponents/CancelButton";
import ConfirmButton from "./styledComponents/ConfirmButton";
import DeliveredButton from "./styledComponents/DeliveredButton";
import AttemptedButton from "./styledComponents/AttemptedButton";
// 3rd party libraries
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import openMap from "react-native-open-maps";
import googleMapsConfig from "../config/googleMaps";
import Geocoder from "react-native-geocoding";
// base styling
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

  handleDelivered = () => {
    this.setState({ deliveryBtnPressed: "Delivered" });
    this.openModal();
  };

  handleAttempted = () => {
    // return devices location for Firebase storage
    // const test = navigator.geolocation.getCurrentPosition(position =>
    //   console.log(position)
    // );
    this.setState({ deliveryBtnPressed: "Attempted" });
    this.openModal();
  };

  handleConfirm = () => {
    // push data to firebase
    // this.props.testRef.push(sampleOrder);

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
                <ConfirmButton handleConfirm={this.handleConfirm} />

                {/* Cancel Button */}
                <CancelButton handleCancel={this.handleCancel} />
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
            {/* if marked as attempted border changes to orange */}
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
          <DeliveredButton handleDelivered={this.handleDelivered} />

          {/* Attemped Btn */}
          <View>
            <AttemptedButton handleAttempted={this.handleAttempted} />
          </View>
        </View>
      </View>
    );
  }
}
