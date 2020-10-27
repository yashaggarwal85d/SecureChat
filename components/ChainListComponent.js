import React, {Component} from 'react';
import {
  ListItem,
  Thumbnail,
  Body,
  Right,
  Text,
  Badge,
} from 'native-base';

import { FlatList } from 'react-native';

export default class ChainScreenComponent extends Component {
  
    renderGridItem = (itemData) => {
  
      const ProfilePicUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg'
      return (
        <ListItem noBorder={true} style={this.props.appStyles.ListItemStyle} avatar onPress={() => {
          this.props.navigation.navigate({
            routeName: 'ChatScreen',
            params: {
              activeChatID: itemData.item.id,
              userId: '1',
              activeChatname: itemData.item.name,
              ProfilePicUrl: ProfilePicUrl,
              appStyles:this.props.appStyles,
            }
            });
          }}>
          
            <Thumbnail
              source={{ uri: ProfilePicUrl}}/>
          
          <Body>
            <Text numberOfLines={1} style={this.props.appStyles.chatListName}>{itemData.item.name}</Text>
            <Text numberOfLines={1} style={this.props.appStyles.chatListNote} note>ksaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
          </Body>
          <Right>
            <Text note style={this.props.appStyles.lastmessagetime}>
            {itemData.item.lastTime}
            </Text>
            <Badge style={this.props.appStyles.badgeChats}>
              <Text style={this.props.appStyles.badgeTextChats}>1</Text>
            </Badge>
          </Right>
        </ListItem>
      )
    }
    render() {
      return (
        <FlatList keyExtractor = {(item) => item.id}
          data={this.props.CHATLIST} 
          renderItem={this.renderGridItem} 
          numColumns={1}
          style={this.props.appStyles.MainScreenContainer}
        />
      );
    }
}