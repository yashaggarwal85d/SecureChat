import React, { Component } from "react";
import { View, Animated, TouchableWithoutFeedback, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DarkFloatBarStyle } from "../appStyles";

export default class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      icon: "plus-circle",
    };
  }
  toggleOpen = () => {
    if (this._open) {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      this.setState({ icon: "plus-circle" });
    } else {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      this.setState({ icon: "close-circle" });
    }
    this._open = !this._open;
  };

  render() {
    const peopleInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -60],
    });

    const settingInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -80, -140],
    });

    const peopleStyle = {
      transform: [
        {
          translateY: peopleInterpolate,
        },
      ],
    };

    const settingStyle = {
      transform: [
        {
          translateY: settingInterpolate,
        },
      ],
    };

    return (
      <View style={DarkFloatBarStyle.container}>
        <Animated.View style={[DarkFloatBarStyle.background]}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate("DarkGroupSearchScreen")
            }
          >
            <Animated.View style={[DarkFloatBarStyle.button0, settingStyle]}>
              <MaterialCommunityIcons
                style={DarkFloatBarStyle.settings}
                name='account-multiple-plus'
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("DarkSearchScreen")}
          >
            <Animated.View style={[DarkFloatBarStyle.button, peopleStyle]}>
              <MaterialCommunityIcons
                style={DarkFloatBarStyle.account}
                name='account-plus'
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleOpen()}>
            <Animated.View style={[DarkFloatBarStyle.button2]}>
              <MaterialCommunityIcons
                style={DarkFloatBarStyle.open}
                name={this.state.icon}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}
