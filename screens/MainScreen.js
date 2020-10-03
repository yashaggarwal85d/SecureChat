import React, {Component} from 'react';
import {
  Header,
  Title,
  Button,
  Right,
  Body,
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
import { StatusBar,Image,Animated,View } from 'react-native';
import { LightTheme,DarkTheme, MediumTheme } from '../appStyles';
import { Feather,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import TrippleToggleSwitch from '../components/TripleToggle';
import { connect } from 'react-redux';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {
  
  constructor(props) {
    super(props)
    if(this.props.theme == 'light')
    {
      this.appStyles = LightTheme;
      this.defaultActiveIndex = 0;
    }
    else
    if(this.props.theme == 'dark')
    {
      this.appStyles = DarkTheme;
      this.defaultActiveIndex = 2;
    }
    else
    if(this.props.theme == 'medium')
    {
      this.appStyles = MediumTheme;
      this.defaultActiveIndex = 1;
    }
  }

  componentDidMount() {
    setTimeout(() => {
      StatusBar.setBackgroundColor(this.props.theme.BACKGROUND_COLOR);
    });
  }

  SwitchThemeFunction(currentTheme){
    this.props.ThemeSwitching(currentTheme);
    
    if(currentTheme == 'light')
    {
      this.appStyles = LightTheme;
    }
    else
    if(currentTheme == 'dark')
    {
      this.appStyles = DarkTheme;
    }
    else
    if(currentTheme == 'medium')
    {
      this.appStyles = MediumTheme;
    }
  }

  render() {
  
    return (
      <Container>
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
            <ChatsScreen navigation={this.props.navigation} appStyles={this.appStyles} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: colors.ghostwhite}}>
                <Text style={this.appStyles.tabsText}>GROUPS</Text>
              </TabHeading>
            }>
            <GroupScreen navigation={this.props.navigation} appStyles={this.appStyles}/>
          </Tab>
        </Tabs>
        <View style={this.appStyles.TrippleToggle}>
	        <TrippleToggleSwitch
            onLeftState={()=> this.SwitchThemeFunction('light') }
            onMiddleState={()=> this.SwitchThemeFunction('medium')}
            onRightState={()=> this.SwitchThemeFunction('dark')}
            AnimatedIcon={AnimatedIcon}
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