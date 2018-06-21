import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default class OrderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

    const deliverTo = this.props.info.recFirstName || this.props.info.toAttention;

    return (
      <View style={[styles.borderBlack, styles.orderCard]}>
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
          <TouchableOpacity>
            <Text
              style={[
                styles.button,
                styles.borderBlack,
                styles.text,
                styles.confirmBtn
              ]}
            >
              Delivered
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                styles.button,
                styles.borderBlack,
                styles.text,
                styles.attemptedBtn
              ]}
            >
              Attempted
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
