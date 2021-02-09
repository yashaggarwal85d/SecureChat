import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, login, getUser } from '../store/actions/LoginActions';
import { AuthStyle } from '../appStyles';

class FirstTimeLogin extends React.Component {
	
	render() {
		return (
			<View style={AuthStyle.container}>
                <TouchableOpacity style={AuthStyle.button} onPress={() => this.props.navigation.navigate('Chat')}>
					<Text style={AuthStyle.buttonText}>Finish</Text>
				</TouchableOpacity>
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
)(FirstTimeLogin)