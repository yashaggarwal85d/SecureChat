import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, login, getUser } from '../../store/actions/LoginActions';
import Firebase from '../../firebase/Config';
import { AuthStyle } from '../../appStyles';

class Login extends React.Component {
	componentDidMount = () => {
		Firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.getUser(user.uid)
				if (this.props.user != null) {
					this.props.navigation.navigate('Chat')
				}
			}
		})
	}

	render() {
		return (
			<View style={AuthStyle.container}>
			<Text style={AuthStyle.Heading}>Welcome back.</Text>
				<TextInput
					style={AuthStyle.inputBox}
					value={this.props.user.email}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					autoCapitalize='none'
				/>
				<TextInput
					style={AuthStyle.inputBox}
					value={this.props.user.password}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Password'
					secureTextEntry={true}
				/>
				<TouchableOpacity style={AuthStyle.button} onPress={() => this.props.login()}>
					<Text style={AuthStyle.buttonText}>Login</Text>
				</TouchableOpacity>
				<View style={{flexDirection:'row',paddingTop:10}}>
					<Text style={AuthStyle.Text}>Don't have an account yet? </Text>
					<Text style={AuthStyle.TextButton}
						onPress={() => this.props.navigation.navigate('SignUp')}>Sign up</Text>
				</View>
			</View>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)