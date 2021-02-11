import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

export default class ActionButton extends Component {
  state = {
    animation: new Animated.Value(0),
  };
  toggleOpen = () => {
    if (this._open) {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 200,
      }).start();
    }
    this._open = !this._open;
  };
  render() {
    const printInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -90],
    });
    const saveInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -80, -180],
    });

    const printStyle = {
      transform: [
        {
          translateY: printInterpolate,
        },
      ],
    };

    const saveStyle = {
      transform: [
        {
          translateY: saveInterpolate,
        },
      ],
    };
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.background]}>
          <TouchableWithoutFeedback onPress={() => Alert.alert("saveIconn")}>
            <Animated.View style={[styles.button, saveStyle]}>
              <Image
                style={styles.iconStyle}
                resizeMode="contain"
                source={{
                  uri: "https://www.freeiconspng.com/uploads/save-icon-31.png",
                }}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => Alert.alert("printIcon")}>
            <Animated.View style={[styles.button, printStyle]}>
              <Image
                style={styles.iconStyle}
                resizeMode="contain"
                source={{
                  uri:
                    "https://cdn4.iconfinder.com/data/icons/small-v2/512/device_document_electronic_print_printer_printing-512.png",
                }}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleOpen()}>
            <Animated.View style={[styles.button]}>
              <Image
                style={styles.iconStyle}
                resizeMode="contain"
                source={{ uri: "https://img.icons8.com/cotton/2x/plus.png" }}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
  },
  button: {
    // backgroundColor: 'grey',
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    alignSelf: "center",
    shadowRadius: 4,
    shadowOpacity: 1,
    borderRadius: 40,
    borderBottomColor: 12,
    width: 70,
    height: 70,
  },
  iconStyle: {
    width: 60,
    height: 60,
  },
});
