import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updatePhone,
  updatePassword,
  login,
  updateAlert,
} from "../../store/actions/LoginActions";
import { fillData } from "../../store/actions/RoomActions";
import { AuthStyle } from "../../appStyles";
import { Button, Container } from "native-base";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Phonealert: "",
      Passalert: "",
      alert: "",
      valid: false,
      loading: false,
      callingCode: "+91",
    };
  }
  PhoneValid = (e) => {
    var pattern = new RegExp(/^\+(?:[0-9] ?){10,14}[0-9]$/);
    if (!pattern.test(e)) {
      this.setState({ Phonealert: "Please enter a valid phone address" });
      this.setState({ valid: false });
    } else {
      this.setState({ Phonealert: "" });
      this.setState({ valid: true });
    }
  };

  PasswordValid = (e) => {
    if (e.length < 6) {
      this.setState({ Passalert: "Password should be atleast 6 digits" });
      this.setState({ valid: false });
    } else {
      this.setState({ Passalert: "" });
      this.setState({ valid: true });
    }
  };

  checkValid() {
    this.PhoneValid(this.props.user.phone);
    this.PasswordValid(this.props.user.password);
    if (!this.props.user.phone || !this.props.user.password) return false;
    return this.state.valid;
  }

  async handleLogin() {
    try {
      if (this.checkValid()) {
        this.setState({ loading: true });
        await this.props.login();
        if (
          this.props.user.id &&
          this.props.user.token &&
          !this.props.user.alert
        ) {
          await this.props.fillData();
          this.props.navigation.navigate("Chat");
        } else {
          this.setState({
            alert: this.props.user.alert || "something went wrong :(",
          });
          this.props.updateAlert(null);
        }
        this.setState({ loading: false });
      }
    } catch (e) {
      this.setState({
        alert: e || "something went wrong :(",
      });
    }
  }

  handleNavigation() {
    this.setState({ Phonealert: "", Passalert: "", alert: "" });
    this.props.navigation.navigate("SignUp");
  }

  render() {
    if (this.state.loading) {
      return (
        <>
          <StatusBar hidden />
          <Container
            style={{
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Image
              source={require(`../../assets/darkLoader.gif`)}
              style={{
                height: "60%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Container>
        </>
      );
    }
    return (
      <>
        <StatusBar hidden />
        <View style={AuthStyle.container}>
          <Text style={AuthStyle.Heading}>Welcome back.</Text>
          <View style={{ ...AuthStyle.inputBox, flexDirection: "row" }}>
            <Button
              style={AuthStyle.countryCodeButton}
              onPress={() => this.setState({ countryPicker: true })}
            >
              <Text style={AuthStyle.countryCodeButtonText}>
                {this.state.callingCode}
              </Text>
            </Button>
            <TextInput
              style={AuthStyle.inputBoxText}
              value={this.props.user.phone.replace(this.state.callingCode, "")}
              onChangeText={(phone) =>
                this.props.updatePhone(this.state.callingCode + phone)
              }
              placeholder='Phone'
              autoCapitalize='none'
              onChange={(e) =>
                this.PhoneValid(this.state.callingCode + e.nativeEvent.text)
              }
              autoCompleteType='off'
            />
          </View>
          <CountryPicker
            theme={DARK_THEME}
            visible={this.state.countryPicker}
            withCallingCode={true}
            withEmoji={true}
            withFilter={true}
            withFlag={true}
            containerButtonStyle={{ display: "none" }}
            onSelect={(code) => {
              var callcode = "+" + code.callingCode[0];
              this.props.updatePhone(
                this.props.user.phone.replace(this.state.callingCode, callcode)
              );
              this.setState({ callingCode: callcode });
            }}
            onClose={() => this.setState({ countryPicker: false })}
          />
          <Text style={AuthStyle.AlertText}>{this.state.Phonealert}</Text>
          <TextInput
            style={AuthStyle.inputBox}
            value={this.props.user.password}
            onChangeText={(password) => this.props.updatePassword(password)}
            placeholder='Password'
            secureTextEntry={true}
            onChange={(e) => this.PasswordValid(e.nativeEvent.text)}
            autoCompleteType='off'
          />
          <Text style={AuthStyle.AlertText}>{this.state.Passalert}</Text>
          <TouchableOpacity
            style={AuthStyle.button}
            onPress={() => this.handleLogin()}
          >
            <Text style={AuthStyle.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={AuthStyle.AlertText}>{this.state.alert}</Text>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <Text style={AuthStyle.Text}>Don't have an account yet? </Text>
            <Text
              style={AuthStyle.TextButton}
              onPress={() => this.handleNavigation()}
            >
              Sign up
            </Text>
          </View>
        </View>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updatePhone, updatePassword, login, updateAlert, fillData },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
