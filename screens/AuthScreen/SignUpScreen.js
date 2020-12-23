import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text,Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, signup } from '../../store/actions/LoginActions';

class Signup extends React.Component {
	handleSignUp = () => {
		this.props.signup()
		this.props.navigation.navigate('Profile')
	}

	CheckSame = () => {
		if(this.confirmPass === this.props.user.password)
		this.alert='ok';
		else
		this.alert='not same';
	}
	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.email}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.password}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Password'
					secureTextEntry={true}
				/>
				<TextInput
					style={styles.inputBox}
					value={this.confirmPass}
					onChangeText={this.CheckSame}
					placeholder='Confirm Password'
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
					<Text style={styles.buttonText}>Signup</Text>
				</TouchableOpacity>
				<Button
					title="Already have an account yet? Login"
					onPress={() => this.props.navigation.navigate('Login')}
				/>
				<Text>{this.alert}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputBox: {
		width: '85%',
		margin: 10,
		padding: 15,
		fontSize: 16,
		borderColor: '#d3d3d3',
		borderBottomWidth: 1,
		textAlign: 'center'
	},
	button: {
		marginTop: 30,
		marginBottom: 20,
		paddingVertical: 5,
		alignItems: 'center',
		backgroundColor: '#FFA611',
		borderColor: '#FFA611',
		borderWidth: 1,
		borderRadius: 5,
		width: 200
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff'
	},
	buttonSignup: {
		fontSize: 12
	}
})

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup)