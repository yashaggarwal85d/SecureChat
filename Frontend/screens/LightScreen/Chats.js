import React, {Component} from 'react';
import {
  Header,
  Title,
  Button,
  Body,
  Footer,
  FooterTab,
} from 'native-base';

import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import LightChatScreen from './DMList';
import { LightTheme } from '../../appStyles';
import LightGroupScreen from './GroupList';

export default class LightChatHeader extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            component:LightChatScreen,
            groupButton:LightTheme.FooterTab,
            chatButton:LightTheme.FooterActiveTab,
            groupIcon:LightTheme.FooterIcons,
            chatIcon:LightTheme.FooterActiveIcons,
        }
    }

    rendergroup()
    {
        this.setState({
            component:LightGroupScreen,
            groupButton:LightTheme.FooterActiveTab,
            chatButton:LightTheme.FooterTab,
            groupIcon:LightTheme.FooterActiveIcons,
            chatIcon:LightTheme.FooterIcons,
        });
    }
    renderchat()
    {
        this.setState({
            component:LightChatScreen,
            groupButton:LightTheme.FooterTab,
            chatButton:LightTheme.FooterActiveTab,
            groupIcon:LightTheme.FooterIcons,
            chatIcon:LightTheme.FooterActiveIcons,
        });
    }

    render(){
        return(
        <>
        <Header style={LightTheme.HeaderContainer}>
            <Body>
                <Title style={LightTheme.appTitle}>Chats</Title>
            </Body>
        </Header>
        
        <this.state.component navigation={this.props.navigation} appStyles={LightTheme}/>

        <Footer style={LightTheme.Footer}>
            <FooterTab style={LightTheme.FooterTab}>
                <Button style={this.state.chatButton} onPress={() => this.renderchat()}>
                    <MaterialCommunityIcons name='message'style={this.state.chatIcon}/>
                </Button>
                <Button style={this.state.groupButton} onPress={() => this.rendergroup()}>
                    <MaterialIcons name='group' style={this.state.groupIcon}/>
                </Button>
                <Button style={LightTheme.FooterTab}>
                    <MaterialIcons name='search' style={LightTheme.FooterIcons}/>
                </Button>
                <Button style={LightTheme.FooterTab}>
                    <MaterialIcons name='settings' style={LightTheme.FooterIcons}/>
                </Button>
            </FooterTab>
        </Footer>
        
        </>
        )
}
}