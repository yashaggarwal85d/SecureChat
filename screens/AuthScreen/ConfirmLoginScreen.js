import { Button,Text } from 'native-base';
import React, {Component} from 'react';
import {} from 'react-native';

export default class ConfirmAuthScreen extends Component {
    render() {
        return (
            <Button onPress={() => {
                this.props.navigation.navigate('Chat');
            }}>
                <Text>hello1</Text>
            </Button>
        );
    }
}