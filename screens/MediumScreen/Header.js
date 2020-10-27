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
import MediumChatScreen from './ChatList';
import MediumGroupScreen from './GroupList';
import { MediumTheme } from '../../appStyles';
import * as colors from '../../constants/colors';

export default class MediumHeader extends Component {

    render(){
        return(
        <>
        <Header style={MediumTheme.headerBackgroundColor}>
            <Left>
                <View style={MediumTheme.Headercontainer}>
                    <Image
                        source={require("../../assets/omega.jpg")}
                        resizeMode="stretch"
                        style={MediumTheme.image}
                    ></Image>
                </View>
            </Left>
            <Body>
                <Title style={MediumTheme.appTitle}> Hi, Yash</Title>
            </Body>
            <Right>
                <Button icon transparent>
                    <Feather name='search' style={MediumTheme.HeaderIcon} />
                </Button>
            </Right>
        </Header>
        
        <Tabs
            tabContainerStyle={{
            elevation: 0,
            }}
            prerenderingSiblingsNumber={1/0}
            renderTabBar={() => <ScrollableTab />}
            tabBarUnderlineStyle={MediumTheme.tabBarUnderLine}
            initialPage={0}
            tabBarBackgroundColor={colors.ghostwhite} 
            >
            <Tab
            heading={
                <TabHeading style={MediumTheme.HeadertabBarBackgroundColor}>
                <Text style={MediumTheme.tabsText}>CHAT</Text>
                <Badge style={MediumTheme.badge}>
                    <Text style={MediumTheme.badgeText}>2</Text>
                </Badge>
                </TabHeading>
            }>
            <MediumChatScreen navigation={this.props.navigation} appStyles={MediumTheme} />
            </Tab>
            <Tab
            heading={
                <TabHeading style={MediumTheme.HeadertabBarBackgroundColor}>
                <Text style={MediumTheme.tabsText}>GROUPS</Text>
                </TabHeading>
            }>
            <MediumGroupScreen navigation={this.props.navigation} appStyles={MediumTheme}/>
            </Tab>
        </Tabs>
        </>
        )
}
}