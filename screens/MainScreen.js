import React, {Component} from 'react';
import {
  Header,
  Title,
  Button,
  Right,
  Body,
  Container,
  Left
} from 'native-base';

import * as colors from '../constants/colors';
import { StatusBar,Image,Animated,View } from 'react-native';
import { LightTheme,DarkTheme, MediumTheme } from '../appStyles';
import { Feather,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import TrippleToggleSwitch from '../components/TripleToggle';
import { connect } from 'react-redux';
import MainTabScreen from './Tabs';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {
  
  constructor(props) {
    super(props)
    if(this.props.theme == 'light')
    {
      this.appStyles = LightTheme;
      this.defaultActiveIndex = 0;
      this.SecondaryColor = colors.ghostwhite;
      this.DefaultTheme = 'light';
    }
    else
    if(this.props.theme == 'dark')
    {
      this.appStyles = DarkTheme;
      this.defaultActiveIndex = 2;
      this.SecondaryColor = colors.black;
      this.DefaultTheme = 'dark';
    }
    else
    if(this.props.theme == 'medium')
    {
      this.appStyles = MediumTheme;
      this.defaultActiveIndex = 1;
      this.SecondaryColor = colors.grey;
      this.DefaultTheme = 'medium';
    }
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
        <Header style={this.appStyles.headerBackgroundColor}>
        <Left>
        <View style={this.appStyles.Headercontainer}>
        <Image
          source={require("../assets/omega.jpg")}
          resizeMode="stretch"
          style={this.appStyles.image}
        ></Image>
        </View>
        </Left>
          <Body>
            <Title style={this.appStyles.appTitle}> Hi, Yash</Title>
          </Body>
          <Right>
            <Button icon transparent>
            <Feather name='search' style={this.appStyles.HeaderIcon} />
            </Button>
            <Button icon transparent onPress={() => {
              this.props.navigation.navigate({routeName: 'Settings'});
            }}>
              <Ionicons name="ios-settings" style={this.appStyles.HeaderIcon} />
            </Button>
          </Right>
        </Header>
        <MainTabScreen 
          navigation={this.props.navigation}
          SecondaryColor={this.SecondaryColor}
          appStyles={this.appStyles}
          DefaultTheme={this.DefaultTheme}
          defaultActiveIndex={this.defaultActiveIndex}
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