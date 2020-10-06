import React, {Component} from 'react';
import {
  Text,
  Tabs,
  Tab,
  ScrollableTab,
  TabHeading,
  Badge
} from 'native-base';

import DarkChatScreen from './DarkScreen/ChatList';
import DarkGroupScreen from './DarkScreen/GroupList';
import MediumChatScreen from './MediumScreen/ChatList';
import MediumGroupScreen from './MediumScreen/GroupList';
import ChainList from './LightScreen/ChainList';
import FeedList from './LightScreen/FeedList';

export default class MainTabScreen extends Component {
    
    renderLight(){
        return(
        <Tabs
          tabContainerStyle={{
            elevation: 0,
          }}
          prerenderingSiblingsNumber={1/0}
          renderTabBar={() => <ScrollableTab />}
          tabBarUnderlineStyle={this.props.appStyles.tabBarUnderLine}
          initialPage={1}
          tabBarBackgroundColor={this.props.SecondaryColor} 
          >
          <Tab
            heading={
              <TabHeading style={this.props.appStyles.HeadertabBarBackgroundColor}>
                <Text style={this.props.appStyles.tabsText}>FEED</Text>
                <Badge style={this.props.appStyles.badge}>
                  <Text style={this.props.appStyles.badgeText}>2</Text>
                </Badge>
              </TabHeading>
            }>
            <FeedList navigation={this.props.navigation} appStyles={this.props.appStyles} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={this.props.appStyles.HeadertabBarBackgroundColor}>
                <Text style={this.props.appStyles.tabsText}>CHAINS</Text>
              </TabHeading>
            }>
            <ChainList navigation={this.props.navigation} appStyles={this.props.appStyles}/>
          </Tab>
        </Tabs>
        )
    }
    renderDark(){
        return(
        <Tabs
          tabContainerStyle={{
            elevation: 0,
          }}
          prerenderingSiblingsNumber={1/0}
          renderTabBar={() => <ScrollableTab />}
          tabBarUnderlineStyle={this.props.appStyles.tabBarUnderLine}
          initialPage={0}
          tabBarBackgroundColor={this.props.SecondaryColor} 
          >
          <Tab
            heading={
              <TabHeading style={this.props.appStyles.HeadertabBarBackgroundColor}>
                <Text style={this.props.appStyles.tabsText}>CHATS</Text>
                <Badge style={this.props.appStyles.badge}>
                  <Text style={this.props.appStyles.badgeText}>2</Text>
                </Badge>
              </TabHeading>
            }>
            <DarkChatScreen navigation={this.props.navigation} appStyles={this.props.appStyles} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={this.props.appStyles.HeadertabBarBackgroundColor}>
                <Text style={this.props.appStyles.tabsText}>GROUPS</Text>
              </TabHeading>
            }>
            <DarkGroupScreen navigation={this.props.navigation} appStyles={this.props.appStyles}/>
          </Tab>
        </Tabs>
        )
    }
    renderMedium(){
        return(
        <Tabs
          tabContainerStyle={{
            elevation: 0,
          }}
          prerenderingSiblingsNumber={1/0}
          renderTabBar={() => <ScrollableTab />}
          tabBarUnderlineStyle={this.props.appStyles.tabBarUnderLine}
          initialPage={0}
          tabBarBackgroundColor={this.props.SecondaryColor} 
          >
          <Tab
            heading={
              <TabHeading style={this.props.appStyles.HeadertabBarBackgroundColor}>
                <Text style={this.props.appStyles.tabsText}>CHATS</Text>
                <Badge style={this.props.appStyles.badge}>
                  <Text style={this.props.appStyles.badgeText}>2</Text>
                </Badge>
              </TabHeading>
            }>
            <MediumChatScreen navigation={this.props.navigation} appStyles={this.props.appStyles} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={this.props.appStyles.HeadertabBarBackgroundColor}>
                <Text style={this.props.appStyles.tabsText}>GROUPS</Text>
              </TabHeading>
            }>
            <MediumGroupScreen navigation={this.props.navigation} appStyles={this.props.appStyles}/>
          </Tab>
        </Tabs>
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