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
import { StatusBar,Image,SafeAreaView } from 'react-native';
import appStyles from '../appStyles';
import { Feather,Ionicons } from '@expo/vector-icons';

export default class MainApp extends Component {
  
  componentDidMount() {
    setTimeout(() => {
      StatusBar.setBackgroundColor(colors.dodgerblue);
    });
  }

  render() {
    return (
      <Container>
        <Header style={appStyles.headerBackgroundColor}>
        <Left>
        <Image
          source={require("../assets/omega.jpg")}
          resizeMode="stretch"
          style={appStyles.image}
        ></Image>
        </Left>
          <Body>
            <Title style={appStyles.appTitle}> Hi, Yash</Title>
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
          tabBarUnderlineStyle={appStyles.tabBarUnderLine}
          tabBarActiveTextColor="blue"
          initialPage={3}
          tabBarBackgroundColor={colors.ghostwhite}>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: colors.ghostwhite}}>
                <Text style={appStyles.tabsText}>CHATS</Text>
                <Badge style={appStyles.badge}>
                  <Text style={appStyles.badgeText}>2</Text>
                </Badge>
              </TabHeading>
            }>
            <ChatsScreen navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: colors.ghostwhite}}>
                <Text style={appStyles.tabsText}>GROUPS</Text>
              </TabHeading>
            }>
            <GroupScreen navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}