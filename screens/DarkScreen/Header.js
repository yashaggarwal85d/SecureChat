import React, {Component} from 'react';
import {
  Text,
  Tabs,
  Tab,
  ScrollableTab,
  TabHeading,
  Badge,
  Header,
  Title,
  Button,
  Right,
  Body,
  Left,
} from 'native-base';

import { Feather,Ionicons } from '@expo/vector-icons';
import { Image,View } from 'react-native';
import DarkChatScreen from './ChatList';
import DarkGroupScreen from './GroupList';
import {DarkTheme} from '../../appStyles';
import * as colors from '../../constants/colors';

export default class DarkHeader extends Component {

    render(){
        return(
        <>
        <Header style={DarkTheme.headerBackgroundColor}>
            <Left>
                <View style={DarkTheme.Headercontainer}>
                    <Image
                        source={require("../../assets/omega.jpg")}
                        resizeMode="stretch"
                        style={DarkTheme.image}
                    ></Image>
                </View>
            </Left>
            <Body>
                <Title style={DarkTheme.appTitle}> Hi, Ano</Title>
            </Body>
            <Right>
                <Button icon transparent>
                    <Feather name='search' style={DarkTheme.HeaderIcon} />
                </Button>
            </Right>
        </Header>
        
        <Tabs
            tabContainerStyle={{
            elevation: 0,
            }}
            prerenderingSiblingsNumber={1/0}
            renderTabBar={() => <ScrollableTab />}
            tabBarUnderlineStyle={DarkTheme.tabBarUnderLine}
            initialPage={0}
            tabBarBackgroundColor={colors.black} 
            >
            <Tab
            heading={
                <TabHeading style={DarkTheme.HeadertabBarBackgroundColor}>
                <Text style={DarkTheme.tabsText}>CHAT</Text>
                <Badge style={DarkTheme.badge}>
                    <Text style={DarkTheme.badgeText}>2</Text>
                </Badge>
                </TabHeading>
            }>
            <DarkChatScreen navigation={this.props.navigation} appStyles={DarkTheme} />
            </Tab>
            <Tab
            heading={
                <TabHeading style={DarkTheme.HeadertabBarBackgroundColor}>
                <Text style={DarkTheme.tabsText}>GROUPS</Text>
                </TabHeading>
            }>
            <DarkGroupScreen navigation={this.props.navigation} appStyles={DarkTheme}/>
            </Tab>
        </Tabs>
        </>
        )
}
}