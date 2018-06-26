import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import styles from "../styles/styles";

const tracker = new GoogleAnalyticsTracker("UA-121230754-2");

const sampleOrder = {
  bloomlinkOrderNumber: 100001,
  deliveryAddress: "315 Spring St. NY, NY 10003",
  deliveryDate: "6/26/2018",
  orderStatus: "DLTA"
}

export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _handleDelivered = () => {
    this.setModalVisible();
  };

  _handleAttempted = () => {
    alert("Delivery Attempted");
  };

  render() {
    tracker.trackEvent("_handleDelivered", "_handleDelivered");
    tracker.trackEvent("_handleAttempted", "_handleAttempted");

    // if no first name, check toAttention
    const deliverTo =
      this.props.info.recFirstName || this.props.info.toAttention;

    return (
      // Card Wrapper
      <View style={[styles.borderBlack, styles.orderCard]}>
        {/* Popup */}
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalVisible}>
                {/* Confirm Button */}
                <TouchableOpacity
                  style={[styles.btn, styles.confirmBtn]}
                  onPress={() => {
                    this.props.testRef.push(sampleOrder)
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={[styles.text, { textAlign: 'center' }]}>Confirm</Text>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity
                  style={[styles.btn, styles.attemptedBtn]}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={[styles.text, { textAlign: 'center' }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Order Information */}
        <View>
          <View>
            <Text style={styles.text}>{this.props.info.bloomlinkOrder}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.text}>{deliverTo}</Text>
              <Text style={styles.text}>{this.props.info.address1}</Text>
              <Text style={styles.text}>
                {this.props.info.city}, {this.props.info.state}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonView}>
          {/* Confirm button */}
          <TouchableOpacity>
            <Text
              style={[
                styles.button,
                styles.borderBlack,
                styles.text,
                styles.confirmBtn
              ]}
              onPress={this._handleDelivered}
            >
              Delivered
            </Text>
          </TouchableOpacity>
          {/* Attemped Btn */}
          <TouchableOpacity>
            <Text
              style={[
                styles.button,
                styles.borderBlack,
                styles.text,
                styles.attemptedBtn
              ]}
              onPress={this._handleAttempted}
            >
              Attempted
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
