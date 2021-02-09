import React, {Component} from 'react';
import DarkChatHeader from './DarkScreen/Chats';
import LightChatHeader from './LightScreen/Chats';

export default class MainTabScreen extends Component {
    
    renderDark(){
        return(
          <DarkChatHeader {...this.props}/>
        )
    }
    renderLight(){
        return(
          <LightChatHeader {...this.props}/>
        )
    }
    render(){
        if(this.props.DefaultTheme == 'dark')
        return this.renderDark();
        else if(this.props.DefaultTheme == 'light')
        return this.renderLight();
    }
};