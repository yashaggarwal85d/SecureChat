import React, {Component} from 'react';
import DarkHeader from './DarkScreen/Header';
import MediumHeader from './MediumScreen/Header';
import LightHeader from './LightScreen/Header';

export default class MainTabScreen extends Component {
    
    renderLight(){
        return(
          <LightHeader {...this.props} />
        )
    }
    renderDark(){
        return(
          <DarkHeader {...this.props} />
        )
    }
    renderMedium(){
        return(
          <MediumHeader {...this.props} />
        )
    }
    render(){
        if(this.props.DefaultTheme == 'light')
        return this.renderLight();
        else if(this.props.DefaultTheme == 'dark')
        return this.renderDark();
        else if(this.props.DefaultTheme == 'medium')
        return this.renderMedium();
    }
};