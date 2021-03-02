import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  signup,
  updateName,
  updateAlert,
  updateIsAuth,
} from "../../store/actions/LoginActions";
import { AuthStyle } from "../../appStyles";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.user);
    this.state = {
      confirmPass: "",
      Emailalert: "",
      Passalert: "",
      Confirmalert: "",
      Namealert: "",
      alert: "",
      valid: false,
    };
  }

  CheckValid = () => {
    this.EmailValid(this.props.user.email);
    this.NameValid(this.props.user.name);
    this.PasswordValid(this.props.user.password);
    this.ConfirmPassValid(this.state.confirmPass);
    if (
      this.props.user.name !== "" &&
      this.props.user.email !== "" &&
      this.state.confirmPass !== "" &&
      this.props.user.password !== "" &&
      this.state.confirmPass === this.props.user.password
    )
      return this.state.valid;
    else return false;
  };

  handleSignUp = async () => {
    if (this.CheckValid()) {
      await this.props.signup();
      if (this.props.user.isauth) {
        this.props.updateEmail("");
        this.props.updatePassword("");
        this.props.updateIsAuth(false);
        this.props.navigation.navigate("Login");
      } else {
        this.setState({
          alert: this.props.user.alert || "something went wrong :(",
        });
        this.props.updateAlert(null);
      }
    } else this.setState({ alert: "Please check the details again" });
  };

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

  ConfirmPassValid = (e) => {
    if (e !== this.props.user.password) {
      this.setState({ Confirmalert: "Password does not match" });
      this.setState({ valid: false });
    } else {
      this.setState({ Confirmalert: "" });
      this.setState({ valid: true });
    }
  };

  NameValid = (e) => {
    var pattern = new RegExp(/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/);
    if (!pattern.test(e)) {
      this.setState({ Namealert: "Please enter a valid full name" });
      this.setState({ valid: false });
    } else {
      this.setState({ Namealert: "" });
      this.setState({ valid: true });
    }
  };

  render() {
    return (
      <View style={AuthStyle.container}>
        <Text style={AuthStyle.Heading}>Create Account</Text>
        <TextInput
          style={AuthStyle.inputBox}
          value={this.props.user.name}
          onChangeText={(name) => this.props.updateName(name)}
          placeholder='Full Name'
          onChange={(e) => this.NameValid(e.nativeEvent.text)}
          autoCompleteType='off'
        />
        <Text style={AuthStyle.AlertText}>{this.state.Namealert}</Text>
        <TextInput
          style={AuthStyle.inputBox}
          value={this.props.user.email}
          onChangeText={(email) => this.props.updateEmail(email)}
          placeholder='Email'
          autoCapitalize='none'
          onChange={(e) => this.EmailValid(e.nativeEvent.text)}
          autoCompleteType='off'
        />
        <Text style={AuthStyle.AlertText}>{this.state.Emailalert}</Text>
        <TextInput
          style={AuthStyle.inputBox}
          value={this.props.user.password}
          onChangeText={(password) => this.props.updatePassword(password)}
          placeholder='Password'
          secureTextEntry={true}
          onChange={(e) => this.PasswordValid(e.nativeEvent.text)}
          onEndEditing={() => this.ConfirmPassValid(this.state.confirmPass)}
          autoCompleteType='off'
        />
        <Text style={AuthStyle.AlertText}>{this.state.Passalert}</Text>
        <TextInput
          style={AuthStyle.inputBox}
          value={this.confirmPass}
          placeholder='Confirm Password'
          onChangeText={(password) => this.setState({ confirmPass: password })}
          secureTextEntry={true}
          onChange={(e) => this.ConfirmPassValid(e.nativeEvent.text)}
          autoCompleteType='off'
        />
        <Text style={AuthStyle.AlertText}>{this.state.Confirmalert}</Text>
        <TouchableOpacity style={AuthStyle.button} onPress={this.handleSignUp}>
          <Text style={AuthStyle.buttonText}>Signup</Text>
        </TouchableOpacity>
        <Text style={AuthStyle.AlertText}>{this.state.alert}</Text>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text style={AuthStyle.Text}>Already have an account yet? </Text>
          <Text
            style={AuthStyle.TextButton}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Login
          </Text>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateEmail,
      updatePassword,
      signup,
      updateName,
      updateAlert,
      updateIsAuth,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
