import React, {Component} from 'react';
import {useSelector} from 'react-redux';
import {
    ListItem,
    Thumbnail,
    Body,
    Right,
    Text,
    Badge,
    Button,
    View,
} from 'native-base';
import {StyleSheet} from 'react-native';
import { Feather,AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native';

class HomeScreenComponent extends Component {
  
    renderGridItem2=(itemData) => {
        const ProfilePicUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg'
        return(
        <View >
                    <Thumbnail small source={{ uri: ProfilePicUrl }} />
                    <View
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: "93%"
                      }}
                    >
                      <View style={{ flexDirection: "row", maxHeight: 22 }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {itemData.item.name}
                        </Text>
                        <Text
                          style={{ color: "#888", flex: 1, paddingLeft: 5 }}
                        >
                          {"@" + itemData.item.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 5,
                          maxHeight: 22
                        }}
                      >
                        <Text style={{ color: "#888" }}>Replying to</Text>
                        <Text style={{ color: "#4286f4", flex: 1 }}>
                          {"@" + itemData.item.name}
                        </Text>
                      </View>
                      <Text style={{ paddingTop: 5 }}>{itemData.item.name}</Text>
                      <View
                        style={StyleSheet.flatten([
                        //   styles.tweetFooter,
                          { width: "100%" }
                        ])}
                      >
                        <View >
                          <Button transparent dark>
                            <Feather
                              name="ios-text-outline"
                              style={{ fontSize: 20 }}
                            />
                            <Text style={{ fontSize: 14 }}>4</Text>
                          </Button>
                        </View>
                        <View >
                          <Button transparent dark>
                            <Feather name="ios-repeat" style={{ fontSize: 20 }} />
                            <Text style={{ fontSize: 14 }}>
                              8
                            </Text>
                          </Button>
                        </View>
                        <View >
                          <Button transparent dark>
                            <Feather
                              name="ios-heart-outline"
                              style={{ fontSize: 20 }}
                            />
                            <Text style={{ fontSize: 14 }}>2</Text>
                          </Button>
                        </View>
                        <View>
                          <Button transparent dark>
                            <Feather
                              name="ios-mail-outline"
                              style={{ fontSize: 20 }}
                            />
                          </Button>
                        </View>
                      </View>
                    </View>
                  </View>
        )
    }
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
            </Button>
            <Button icon transparent>
              <AntDesign name='retweet' style={this.props.appStyles.MessageIcon} />
            </Button>
            <Button icon transparent>
              <Feather name='heart' style={this.props.appStyles.MessageIcon} />
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