import React, {Component} from 'react';
import {
  Header,
  Title,
  Button,
  Right,
  Body,
  Icon,
  Container,
  Text,
  Tabs,
  Tab,
  ScrollableTab,
  TabHeading,
  Badge, Left
} from 'native-base';

import * as colors from '../constants/colors';
import ChatsScreen from './ChatList';
import GroupScreen from './Groups';
import { StatusBar,Image,SafeAreaView,Animated,View,StyleSheet } from 'react-native';
import { LightTheme,DarkTheme, MediumTheme } from '../appStyles';
import { Feather,Ionicons,FontAwesome,MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import TrippleToggleSwitch from '../components/TripleToggle';
import { useSelector,useDispatch,connect } from 'react-redux';
import { SwitchTheme } from '../store/actions/ThemeChangeActions'
import { lightTheme,darkTheme,mediumTheme } from '../constants/colors'
import styled,{ThemeProvider} from 'styled-components'

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {
  
  constructor(props) {
    super(props)
    if(this.props.theme.mode == 'light')
    this.appStyles = LightTheme;
    else
    if(this.props.theme.mode == 'dark')
    this.appStyles = DarkTheme;
    else
    if(this.props.theme.mode == 'medium')
    this.appStyles = MediumTheme;
  }

  componentDidMount() {
    setTimeout(() => {
      StatusBar.setBackgroundColor(this.props.theme.BACKGROUND_COLOR);
    });
  }

  SwitchThemeFunction(currentTheme){
    this.props.ThemeSwitching(currentTheme);
    console.log(currentTheme);
    if(currentTheme.mode == 'light')
    this.appStyles = LightTheme;
    else
    if(currentTheme.mode == 'dark')
    this.appStyles = DarkTheme;
    else
    if(currentTheme.mode == 'medium')
    this.appStyles = MediumTheme;
  }

  render() {
  
    return (
      <Container>
      <ThemeProvider theme={this.appStyles}>
        <Header style={this.appStyles.headerBackgroundColor}>
        <Left>
        <Image
          source={require("../assets/omega.jpg")}
          resizeMode="stretch"
          style={this.appStyles.image}
        ></Image>
        </Left>
          <Body>
            <Title style={this.appStyles.appTitle}> Hi, Yash</Title>
          </Body>
          <Right>
            <Button icon transparent>
            <Feather name='search' size={25} color={colors.dodgerblue} />
            </Button>
            <Button icon transparent onPress={() => {
              this.props.navigation.navigate({routeName: 'Settings'});
            }}>
              <Ionicons name="ios-settings" size={25} color={colors.dodgerblue} />
            </Button>
          </Right>
        </Header>
        <Tabs
          tabContainerStyle={{
            elevation: 0,
          }}
          renderTabBar={() => <ScrollableTab />}
          tabBarUnderlineStyle={this.appStyles.tabBarUnderLine}
          tabBarActiveTextColor="blue"
          initialPage={3}
          tabBarBackgroundColor={colors.ghostwhite}>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: colors.ghostwhite}}>
                <Text style={this.appStyles.tabsText}>CHATS</Text>
                <Badge style={this.appStyles.badge}>
                  <Text style={this.appStyles.badgeText}>2</Text>
                </Badge>
              </TabHeading>
            }>
            <ChatsScreen navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: colors.ghostwhite}}>
                <Text style={this.appStyles.tabsText}>GROUPS</Text>
              </TabHeading>
            }>
            <GroupScreen navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
        <View style={this.appStyles.TrippleToggle}>
	        <TrippleToggleSwitch
            onLeftState={()=> this.SwitchThemeFunction(lightTheme) }
            onMiddleState={()=> this.SwitchThemeFunction(mediumTheme)}
            onRightState={()=> this.SwitchThemeFunction(darkTheme)}
            AnimatedIcon={AnimatedIcon}
        />
      </View>
      </ThemeProvider> 
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

