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
import appStyles from '../appStyles';
import { FlatList } from 'react-native'
import {useSelector} from 'react-redux';

class GroupScreenComponent extends Component {

  renderGridItem = (itemData) => {
    return (
      <ListItem avatar onPress={() => {
        this.props.navigation.navigate({
          routeName: 'ChatScreen',
          params: {
            activeChatID: itemData.item.id,
            userId: '1',
            activeChatname: itemData.item.name,
          }
        });
      }}>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg',
                }}
              />
            </Left>
            <Body>
              <Text style={appStyles.chatListName}>{itemData.item.name}</Text>
              <Text note>{itemData.item.lastMessage}</Text>
            </Body>
            <Right>
              <Text note style={appStyles.lastmessagetime}>
              {itemData.item.lastTime}
              </Text>
              <Badge style={appStyles.badgeChats}>
                <Text style={appStyles.badgeTextChats}>1</Text>
              </Badge>
            </Right>
          </ListItem>
    )
  }
  render() {
    return (
      <FlatList keyExtractor = {(item) => item.id}
        data={this.props.GROUPLIST} 
        renderItem={this.renderGridItem} 
        numColumns={1}
      />
    );
  }
}

const GroupScreen = props => {
  const GroupList = useSelector(state => state.GroupList.chats ); 
  return(
    <GroupScreenComponent
      {...props}
      GROUPLIST={GroupList} 
    />
  );
}


export default GroupScreen;