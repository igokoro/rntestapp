import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import styles from '../styles/styles';

const tracker = new GoogleAnalyticsTracker("UA-121230754-2");

export default class OrderItem extends Component {
  constructor(props) {
    super(props);
  }

  _handleDelivered = () => {
    alert("Delivery Confirmed");
  };

  _handleAttempted = () => {
    alert("Delivery Attempted");
  };

  render() {
    tracker.trackEvent("_handleDelivered", "_handleDelivered");
    tracker.trackEvent("_handleAttempted", "_handleAttempted");

    // if no first name, check toAttention
    const deliverTo = this.props.info.recFirstName || this.props.info.toAttention;

    return (
      // Card Wrapper
      <View style={[styles.borderBlack, styles.orderCard]}>
        {/* Order Information */}
        <View>
          <View>
            <Text style={styles.text}>{deliverTo}</Text>
          </View>

          <View>
            <Text style={styles.text}>{this.props.info.bloomlinkOrder}</Text>
          </View>

          <View>
            <Text style={styles.text}>{this.props.info.address1}</Text>
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
