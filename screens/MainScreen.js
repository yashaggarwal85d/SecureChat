import React, {Component} from 'react';
import {Container} from 'native-base';
import * as colors from '../constants/colors';
import { StatusBar,Animated,View } from 'react-native';
import { LightTheme,DarkTheme, MediumTheme } from '../appStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TrippleToggleSwitch from '../components/TripleToggle';
import { connect } from 'react-redux';
import MainTabScreen from './Tabs';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {
  
  constructor(props) {
    super(props)
    this.appStyles = LightTheme;
    this.defaultActiveIndex = 0;
    this.SecondaryColor = colors.ghostwhite;
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
      this.SecondaryColor = colors.ghostwhite;
    }
    else
    if(currentTheme == 'dark')
    {
      this.appStyles = DarkTheme;
      this.SecondaryColor = colors.black;
    }
    else
    if(currentTheme == 'medium')
    {
      this.appStyles = MediumTheme;
      this.SecondaryColor = colors.grey;
    }
    this.componentDidMount();
  }

  render() {
  
    return (
      <Container style={this.appStyles.MainScreenContainer}>
        <MainTabScreen 
          navigation={this.props.navigation}
          DefaultTheme={this.DefaultTheme}
        />
        <View style={this.appStyles.TrippleToggle}>
	        <TrippleToggleSwitch
            onLeftState={()=> this.SwitchThemeFunction('light') }
            onMiddleState={()=> this.SwitchThemeFunction('medium')}
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