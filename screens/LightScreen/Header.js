import React, {Component} from 'react';
import HomeScreen from './Home';
import { LightTheme } from '../../appStyles';
import LightHeaderComponent from '../../components/LightHeaderComponent';

export default class LightHeader extends Component {

    render(){
        return(
        <>
            <LightHeaderComponent navigation={this.props.navigation} appStyles={LightTheme}/>
            <HomeScreen navigation={this.props.navigation} appStyles={LightTheme}/>
        </>
        )
}
}