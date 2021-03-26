import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._playAnimation();
  }

  _playAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          {
            <Lottie
              ref={(animation) => {
                this.animation = animation;
              }}
              style={styles.loadingAnimation}
              source={require("../assets/loaders/9844-loading-40-paperplane.json")}
            />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingAnimation: {
    width: 400,
    height: 400,
    backgroundColor: "transparent",
  },
});
