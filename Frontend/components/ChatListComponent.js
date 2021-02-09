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

export default class ChatScreenComponent extends Component {
  
    renderGridItem = (itemData) => {
  
      const ProfilePicUrl = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
      if(itemData.item.active)
      {
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
            
              <Thumbnail source={{ uri: ProfilePicUrl}}/>
            
            <Body>
              <Text numberOfLines={1} style={this.props.appStyles.chatListActiveName}>{itemData.item.name}</Text>
              <Text numberOfLines={1} style={this.props.appStyles.chatListActiveNote} note>{itemData.item.lastMessage}</Text>
            </Body>
            <Right>
              <Text note style={this.props.appStyles.chatListActiveNote}>
              {itemData.item.lastTime}
              </Text>
              <Badge style={this.props.appStyles.chatListBadge}>
                <Text style={this.props.appStyles.chatListBadgeText}>1</Text>
              </Badge>
            </Right>
          </ListItem>
        )
          
      }
      else
      {
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
          
            <Thumbnail source={{ uri: ProfilePicUrl}}/>
          
          <Body>
            <Text numberOfLines={1} style={this.props.appStyles.chatListName}>{itemData.item.name}</Text>
            <Text numberOfLines={1} style={this.props.appStyles.chatListNote} note>{itemData.item.lastMessage}</Text>
          </Body>
          <Right>
            <Text note style={this.props.appStyles.chatListNote}>
            {itemData.item.lastTime}
            </Text>
            </Right>
        </ListItem>
      )
        }
    }
    render() {
      return (
        <FlatList keyExtractor = {(item) => item.id}
          data={this.props.CHATLIST} 
          renderItem={this.renderGridItem} 
          numColumns={1}
          style={this.props.appStyles.FlatListComponent}
        />
      );
    }
  }