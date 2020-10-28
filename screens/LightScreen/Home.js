import React, {Component} from 'react';
import {useSelector} from 'react-redux';
import {
    ListItem,
    Thumbnail,
    Body,
    Text,
    Button,
    View,
    Left,
} from 'native-base';
import { Feather,AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native';

class HomeScreenComponent extends Component {
  
    renderGridItem = (itemData) => {
  
      const ProfilePicUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg'
      return (
        <ListItem noBorder={true} style={this.props.appStyles.ListItemStyle} avatar onPress={() => {
          this.props.navigation.navigate({
            routeName: 'DetailsScreen',
            params: {
              activeChatID: itemData.item.id,
              userId: '1',
              activeChatname: itemData.item.name,
              ProfilePicUrl: ProfilePicUrl,
              appStyles:this.props.appStyles,
            }
            });
          }}>
          <Left>
            <Thumbnail
              source={{ uri: ProfilePicUrl}}/>
          </Left>
          <Body>
          <View style={{flexDirection: "row"}}>
            <Text style={this.props.appStyles.chatListName}>{itemData.item.name} </Text>
            <Text style={this.props.appStyles.chatListNote} > @yash </Text>
            <Text note style={this.props.appStyles.chatListNote} > .2h</Text>
            </View>
            <Text numberOfLines={7} style={this.props.appStyles.chatListMessage} > I was broken from a young age
Taking my sulking to the masses
Writing my poems for the few
That look at me, took to me, shook to me, feeling me
Singing from heartache from the pain
Taking my message from the veins
Speaking my lesson from the brain
Seeing the beauty through the Taking my sulking to the masses
Writing my poems for the few
That look at me, took to me, shook to me, feeling me
Singing from heartache from the pain
Taking my message from the veins
Speaking my lesson from the brain
Seeing the beauty through the Taking my sulking to the masses
Writing my poems for the few
That look at me, took to me, shook to me, feeling me
Singing from heartache from the pain
Taking my message from the veins
Speaking my lesson from the brain
Seeing the beauty through the Taking my sulking to the masses
Writing my poems for the few
That look at me, took to me, shook to me, feeling me
Singing from heartache from the pain
Taking my message from the veins
Speaking my lesson from the brain
Seeing the beauty through the Taking my sulking to the masses
Writing my poems for the few
That look at me, took to me, shook to me, feeling me
Singing from heartache from the pain
Taking my message from the veins
Speaking my lesson from the brain
Seeing the beauty through the... </Text>

        <View style={{flexDirection: "row"}}>
          <Button icon transparent>
              <Feather name='message-square' style={this.props.appStyles.MessageIcon} />
              <Text style={this.props.appStyles.MessageIconNum}>5</Text>
            </Button>
            <Button icon transparent>
              <AntDesign name='retweet' style={this.props.appStyles.MessageIcon} />
              <Text style={this.props.appStyles.MessageIconNum}>5</Text>
            </Button>
            <Button icon transparent>
              <Feather name='heart' style={this.props.appStyles.MessageIcon} />
              <Text style={this.props.appStyles.MessageIconNum}>5</Text>
            </Button>
          </View>
          </Body>
                
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

const HomeScreen = props => {
  const ChatList = useSelector(state => state.ChatList.chats ); 
  return(
    <HomeScreenComponent
      {...props}
      CHATLIST={ChatList} 
    />
  );
}

export default HomeScreen;