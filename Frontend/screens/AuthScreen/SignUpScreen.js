import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  updatePhone,
  updatePassword,
  signup,
  updateName,
  updateAlert,
  updateIsAuth,
} from '../../store/actions/LoginActions';
import { AuthStyle } from '../../appStyles';
import { StatusBar } from 'react-native';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import { Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPass: '',
      Phonealert: '',
      Passalert: '',
      Confirmalert: '',
      Namealert: '',
      alert: '',
      valid: false,
      callingCode: '+91',
    };
  }

  CheckValid = () => {
    this.PhoneValid(this.props.user.phone);
    this.NameValid(this.props.user.name);
    this.PasswordValid(this.props.user.password);
    this.ConfirmPassValid(this.state.confirmPass);
    if (
      this.props.user.name !== '' &&
      this.props.user.phone !== '' &&
      this.state.confirmPass !== '' &&
      this.props.user.password !== '' &&
      this.state.confirmPass === this.props.user.password
    )
      return this.state.valid;
    else return false;
  };

  handleSignUp = async () => {
    if (this.CheckValid()) {
      showMessage({
        message: `Account creation in process`,
        description: 'Your account is being created please wait',
        type: 'warning',
        floating: true,
      });
      await this.props.signup();
      if (this.props.user.isauth) {
        this.props.updatePhone('');
        this.props.updatePassword('');
        this.props.updateIsAuth(false);
        this.props.updateName('');
        this.props.navigation.navigate('Login');
      } else {
        this.setState({
          alert: this.props.user.alert || 'something went wrong :(',
        });
        this.props.updateAlert(null);
      }
    } else this.setState({ alert: 'Please check the details again' });
  };

  PhoneValid = (e) => {
    var pattern = new RegExp(/^\+(?:[0-9] ?){10,14}[0-9]$/);
    if (!pattern.test(e)) {
      this.setState({ Phonealert: 'Please enter a valid phone address' });
      this.setState({ valid: false });
    } else {
      this.setState({ Phonealert: '' });
      this.setState({ valid: true });
    }
  };

  PasswordValid = (e) => {
    if (e.length < 6) {
      this.setState({ Passalert: 'Password should be atleast 6 digits' });
      this.setState({ valid: false });
    } else {
      this.setState({ Passalert: '' });
      this.setState({ valid: true });
    }
  };

  ConfirmPassValid = (e) => {
    if (e !== this.props.user.password) {
      this.setState({ Confirmalert: 'Password does not match' });
      this.setState({ valid: false });
    } else {
      this.setState({ Confirmalert: '' });
      this.setState({ valid: true });
    }
  };

  NameValid = (e) => {
    var pattern = new RegExp(/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/);
    if (!pattern.test(e)) {
      this.setState({ Namealert: 'Please enter a valid full name' });
      this.setState({ valid: false });
    } else {
      this.setState({ Namealert: '' });
      this.setState({ valid: true });
    }
  };

  handleNavigation() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <>
        <StatusBar hidden />
        <KeyboardAwareScrollView
          contentContainerStyle={AuthStyle.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <Text style={AuthStyle.Heading}>Create Account</Text>
          <TextInput
            style={AuthStyle.inputBox}
            value={this.props.user.name}
            onChangeText={(name) => this.props.updateName(name)}
            placeholder='Full Name'
            placeholderTextColor='grey'
            onChange={(e) => this.NameValid(e.nativeEvent.text)}
            autoCompleteType='off'
          />
          <Text style={AuthStyle.AlertText}>{this.state.Namealert}</Text>
          <View style={{ ...AuthStyle.inputBox, flexDirection: 'row' }}>
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
              value={this.props.user.phone.replace(this.state.callingCode, '')}
              onChangeText={(phone) =>
                this.props.updatePhone(this.state.callingCode + phone)
              }
              placeholder='Phone number'
              placeholderTextColor='grey'
              autoCapitalize='none'
              keyboardType='number-pad'
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
            containerButtonStyle={{ display: 'none' }}
            onSelect={(code) => {
              var callcode = '+' + code.callingCode[0];
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
            placeholderTextColor='grey'
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
            placeholderTextColor='grey'
            onChangeText={(password) =>
              this.setState({ confirmPass: password })
            }
            secureTextEntry={true}
            onChange={(e) => this.ConfirmPassValid(e.nativeEvent.text)}
            autoCompleteType='off'
          />
          <Text style={AuthStyle.AlertText}>{this.state.Confirmalert}</Text>
          <TouchableOpacity
            style={AuthStyle.button}
            onPress={this.handleSignUp}
          >
            <Text style={AuthStyle.buttonText}>Signup</Text>
          </TouchableOpacity>
          <Text style={AuthStyle.AlertText}>{this.state.alert}</Text>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Text style={AuthStyle.Text}>Already have an account ? </Text>
            <Text
              style={AuthStyle.TextButton}
              onPress={() => this.handleNavigation()}
            >
              Login
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updatePhone,
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
