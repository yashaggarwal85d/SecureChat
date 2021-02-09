import React, {Component} from 'react';
import {Container} from 'native-base';
import * as colors from '../constants/colors';
import { StatusBar,Animated,View } from 'react-native';
import { LightTheme,DarkTheme } from '../appStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ToggleSwitch from '../components/TripleToggle';
import { connect } from 'react-redux';
import MainTabScreen from './Tabs';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {

  constructor(props) {
    super(props)
    this.appStyles = LightTheme;
    this.defaultActiveIndex = 0;
    this.SecondaryColor = colors.white;
    this.DefaultTheme = 'light';
    this.props.ThemeSwitching('light');
  }

  componentDidMount() {
    setTimeout(() => {
      StatusBar.setBackgroundColor(this.SecondaryColor);
    });
  }

  SwitchThemeFunction(currentTheme){
    this.props.ThemeSwitching(currentTheme);
    this.DefaultTheme=currentTheme;
    if(currentTheme == 'light')
    {
      this.appStyles = LightTheme;
      this.SecondaryColor = colors.white;
    }
    else
    if(currentTheme == 'dark')
    {
      this.appStyles = DarkTheme;
      this.SecondaryColor = colors.black;
    }
    this.componentDidMount();
  }

  render() {
  
    return (
      <Container>
        <MainTabScreen 
          navigation={this.props.navigation}
          DefaultTheme={this.DefaultTheme}
        />
        <View style={this.appStyles.Toggle}>
	        <ToggleSwitch
            onLeftState={()=> this.SwitchThemeFunction('light') }
            onRightState={()=> this.SwitchThemeFunction('dark')}
            AnimatedIcon={AnimatedIcon}
            defaultActiveIndex={this.defaultActiveIndex}
          />
      </View>
      </Container>

    );
  }
}

function mapStateToProps(state){
  return{
    theme: state.CurrentTheme.theme
  }
}

function mapDispatchToProps(dispatch){
  return{
    ThemeSwitching: (theme) => dispatch({type: 'SWITCH_THEME',theme:theme}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainApp);