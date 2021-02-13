import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  updateAlert,
} from "../../store/actions/LoginActions";
import { AuthStyle } from "../../appStyles";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Emailalert: "",
      Passalert: "",
      alert: "",
      valid: false,
    };
  }
  EmailValid = (e) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(e)) {
      this.setState({ Emailalert: "Please enter a valid email address" });
      this.setState({ valid: false });
    } else {
      this.setState({ Emailalert: "" });
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
    this.EmailValid(this.props.user.email);
    this.PasswordValid(this.props.user.password);
    if (!this.props.user.email || !this.props.user.password) return false;
    return this.state.valid;
  }

  async handleLogin() {
    try {
      if (this.checkValid()) {
        await this.props.login();
        if (
          this.props.user.id &&
          this.props.user.token &&
          !this.props.user.alert
        )
          this.props.navigation.navigate("Chat");
        else {
          this.setState({
            alert: this.props.user.alert || "something went wrong :(",
          });
          this.props.updateAlert(null);
        }
      }
    } catch (e) {
      this.setState({
        alert: e || "something went wrong :(",
      });
    }
  }

  handleNavigation() {
    this.setState({ Emailalert: "", Passalert: "", alert: "" });
    this.props.navigation.navigate("SignUp");
  }

  render() {
    return (
      <View style={AuthStyle.container}>
        <Text style={AuthStyle.Heading}>Welcome back.</Text>
        <TextInput
          style={AuthStyle.inputBox}
          value={this.props.user.email}
          onChangeText={(email) => this.props.updateEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
          autoCompleteType="off"
          onChange={(e) => this.EmailValid(e.nativeEvent.text)}
        />
        <Text style={AuthStyle.AlertText}>{this.state.Emailalert}</Text>
        <TextInput
          style={AuthStyle.inputBox}
          value={this.props.user.password}
          onChangeText={(password) => this.props.updatePassword(password)}
          placeholder="Password"
          secureTextEntry={true}
          onChange={(e) => this.PasswordValid(e.nativeEvent.text)}
          autoCompleteType="off"
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, updateAlert },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
