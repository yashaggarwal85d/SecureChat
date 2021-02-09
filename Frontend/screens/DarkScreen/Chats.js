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
import DarkChatScreen from './DMList';
import { DarkTheme } from '../../appStyles';
import DarkGroupScreen from './GroupList';

export default class DarkChatHeader extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            component:DarkChatScreen,
            groupButton:DarkTheme.FooterTab,
            chatButton:DarkTheme.FooterActiveTab,
            groupIcon:DarkTheme.FooterIcons,
            chatIcon:DarkTheme.FooterActiveIcons,
        }
    }

    rendergroup()
    {
        this.setState({
            component:DarkGroupScreen,
            groupButton:DarkTheme.FooterActiveTab,
            chatButton:DarkTheme.FooterTab,
            groupIcon:DarkTheme.FooterActiveIcons,
            chatIcon:DarkTheme.FooterIcons,
        });
    }
    renderchat()
    {
        this.setState({
            component:DarkChatScreen,
            groupButton:DarkTheme.FooterTab,
            chatButton:DarkTheme.FooterActiveTab,
            groupIcon:DarkTheme.FooterIcons,
            chatIcon:DarkTheme.FooterActiveIcons,
        });
    }

    render(){
        return(
        <>
        <Header style={DarkTheme.HeaderContainer}>
            <Body>
                <Title style={DarkTheme.appTitle}>Chats</Title>
            </Body>
        </Header>
        
        <this.state.component navigation={this.props.navigation} appStyles={DarkTheme}/>

        <Footer style={DarkTheme.Footer}>
            <FooterTab style={DarkTheme.FooterTab}>
                <Button style={this.state.chatButton} onPress={() => this.renderchat()}>
                    <MaterialCommunityIcons name='message' style={this.state.chatIcon}/>
                </Button>
                <Button style={this.state.groupButton} onPress={() => this.rendergroup()}>
                    <MaterialIcons name='group' style={this.state.groupIcon}/>
                </Button>
                <Button style={DarkTheme.FooterTab}>
                    <MaterialIcons name='search' style={DarkTheme.FooterIcons}/>
                </Button>
                <Button style={DarkTheme.FooterTab}>
                    <MaterialIcons name='settings' style={DarkTheme.FooterIcons}/>
                </Button>
            </FooterTab>
        </Footer>
        
        </>
        )
}
}