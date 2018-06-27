import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import ReactNativeComponentTree from "react-native/Libraries/Renderer/shims/ReactNativeComponentTree";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
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
      disabled: false,

    };
  }

  openModal = visible => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    if (this.state.deliveryBtnPressed === "Attempted") {
      this.setState({ disabled: true });
    }
    this.setState({ modalVisible: false, deliveryBtnPressed: "" });
  };

  _handleDelivered = () => {
    this.setState({ deliveryBtnPressed: "Delivered" });
    this.openModal();
  };

  _handleAttempted = () => {
    const test = navigator.geolocation.getCurrentPosition(position =>
      console.log(position)
    );

    this.setState({ deliveryBtnPressed: "Attempted" });
    this.openModal();
  };

  render() {
    // GA events
    tracker.trackEvent("_handleDelivered", "_handleDelivered");
    tracker.trackEvent("_handleAttempted", "_handleAttempted");

    // if no first name, check toAttention
    const deliverTo =
      this.props.info.recFirstName || this.props.info.toAttention;

    const disabled = this.state.disabled;

    const attemptedBtn = (
      <TouchableOpacity disabled style={{ width: 175 }}>
        <Text
          style={[
            styles.button,
            styles.borderBlack,
            styles.btnText,
            styles.attemptedBtn
          ]}
          onPress={this._handleAttempted}
        >
          Attempted
        </Text>
      </TouchableOpacity>
    );

    return (
      // Card Wrapper
      <View style={[styles.borderBlack, styles.orderCard]}>
        {/* Popup */}
        <View>
          <Modal
            animationType="none"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalVisible}>
                {/* Order Information Text */}
                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.text}>
                    Mark Order as{" "}
                    <Text style={{ color: "rgb(172, 46, 198)" }}>
                      {this.state.deliveryBtnPressed}
                    </Text>
                  </Text>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                  style={[styles.btn, styles.confirmBtn]}
                  onPress={() => {
                    this.closeModal();
                    // push data to firebase
                    this.props.testRef.push(sampleOrder);
                  }}
                >
                  <Text style={[styles.text, { color: "white" }]}>Confirm</Text>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity
                  style={[styles.btn, styles.attemptedBtn]}
                  onPress={() => {
                    this._handleAttempted();
                    this.closeModal();
                  }}
                >
                  <Text style={[styles.text, { color: "white" }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Order Information */}
        <View>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.orderText}>
              {this.props.info.bloomlinkOrder}
            </Text>
          </View>
          {/* Address information */}
          <View style={styles.container}>
            <Text style={styles.orderText}>{deliverTo}</Text>
            <Text style={styles.orderText}>{this.props.info.address1}</Text>
            <Text style={styles.orderText}>
              {this.props.info.city}, {this.props.info.state}
            </Text>
          </View>
        </View>

        <View style={styles.buttonView}>
          {/* Confirm button */}
          <TouchableOpacity style={{ width: 175 }}>
            <Text
              style={[
                styles.button,
                styles.borderBlack,
                styles.btnText,
                styles.confirmBtn
              ]}
              onPress={this._handleDelivered}
            >
              Delivered
            </Text>
          </TouchableOpacity>

          {/* Attemped Btn */}
          <View>
            {/* disables after use */}
            {disabled ? null : attemptedBtn}
          </View>
        </View>
      </View>
    );
  }
}
