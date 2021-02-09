import React, {Component} from 'react';
import { View } from 'native-base';
import { TextInput } from 'react-native';
import { MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons'
import { KeyboardAvoidingView } from 'react-native';

export default class ChatFooter extends Component {
  
  render() {
    return (
        <KeyboardAvoidingView style={this.props.appStyles.ChatKeyboardAvoidingView} >
            <View style={this.props.appStyles.ChatInputView}>
                <FontAwesome5 name='smile' style={this.props.appStyles.ChatInputSmile}/>
                <TextInput
                    onChangeText={text => this.setState({ message: text })}
                    // value={this.state.email}
                    style={this.props.appStyles.ChatInput}
                    placeholder='Type a message'
                    placeholderTextColor='grey'
                    underlineColorAndroid='transparent'
                > 
                </TextInput>
                <MaterialCommunityIcons name='attachment' style={this.props.appStyles.ChatInputFile}/>
            </View>
            <View style={this.props.appStyles.SendButtonView}>
                <MaterialCommunityIcons name='send' style={this.props.appStyles.SendButton}/>
            </View>
        </KeyboardAvoidingView>
    );
  }
}