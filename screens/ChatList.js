import React, {Component} from 'react';
import {
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Text,
  Badge,
} from 'native-base';

import { FlatList } from 'react-native';
import {useSelector} from 'react-redux';

class ChatScreenComponent extends Component {
  
  renderGridItem = (itemData) => {

    const ProfilePicUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg'
    return (
      <ListItem avatar onPress={() => {
        this.props.navigation.navigate({
          routeName: 'ChatScreen',
          params: {
            activeChatID: itemData.item.id,
            userId: '1',
            activeChatname: itemData.item.name,
            ProfilePicUrl: ProfilePicUrl,
          }
          });
        }}>
        <Left>
          <Thumbnail
            source={{ uri: ProfilePicUrl}}/>
        </Left>
        <Body>
          <Text style={this.props.appStyles.chatListName}>{itemData.item.name}</Text>
          <Text note>{itemData.item.lastMessage}</Text>
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
      />
    );
  }
}

const ChatScreen = props => {
  const ChatList = useSelector(state => state.ChatList.chats ); 
  return(
    <ChatScreenComponent
      {...props}
      CHATLIST={ChatList} 
    />
  );
}

export default ChatScreen;