import React from 'react';
import {
    ListItem,
    Thumbnail,
    Body,
    Text,
    Button,
    View,
    Container,
    Content,
    Left,
} from 'native-base';
import { Feather,AntDesign } from '@expo/vector-icons';
import { LightTheme } from '../../appStyles';
import { FlatList } from 'react-native';

export default class DetailScreen extends React.Component {

    renderGridItem = () => {
  
        const ProfilePicUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/mauriolg/128.jpg'
        return (
          <ListItem style={LightTheme.ListItemStyle} avatar>
            <Left>
              <Thumbnail 
                source={{ uri: ProfilePicUrl}}/>
            </Left>
            <Body>
                <View style={{flexDirection: "row"}}>
                    <Text style={LightTheme.chatListName}>Yash </Text>
                    <Text style={LightTheme.chatListNote} > @yash </Text>
                    <Text note style={LightTheme.chatListNote} > .2h</Text>
                </View>
                <Text numberOfLines={30} style={LightTheme.chatListMessageComment} > I was broken from a young age
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
                        <Feather name='message-square' style={LightTheme.MessageIcon} />
                        <Text style={LightTheme.MessageIconNum}>5</Text>
                    </Button>
                    <Button icon transparent>
                        <Feather name='heart' style={LightTheme.MessageIcon} />
                        <Text style={LightTheme.MessageIconNum}>5</Text>
                    </Button>
                    <Button icon transparent>
                        <Feather name='mail' style={LightTheme.MessageIcon} />
                        <Text style={LightTheme.MessageIconNum}></Text>
                    </Button>
                </View>  
            </Body>      
            </ListItem>
        )
      }

    render() {
        const {state} = this.props.navigation;
        return (
        <Container>
            <Content>
                <View style={LightTheme.DetailView}>
                    <Thumbnail source={{uri:state.params.ProfilePicUrl}} />
                    <View style={LightTheme.DetailViewName}>
                        <Text style={LightTheme.DetailViewNameText}>{state.params.activeChatname}</Text>
                        <Text style={LightTheme.chatListNote} > @yash</Text>
                    </View>
                </View>
              
                <Body style={{padding:20}}>
                    <Text style={LightTheme.chatListMessageDetail} >I was broken from a young age
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
                    
                    <View style={LightTheme.DetailViewIcons}>
                        <Text style={LightTheme.DetailViewIconsTextNum}>23</Text>
                        <Text style={LightTheme.DetailViewIconsText}>Retweets</Text>
                        <Text style={LightTheme.DetailViewIconsTextNum}>2</Text>
                        <Text style={LightTheme.DetailViewIconsText}>Likes</Text>
                        <Text style={LightTheme.DetailViewIconsTextNum}>2h</Text>
                        <Text style={LightTheme.DetailViewIconsText}>Ago</Text>
                    </View>
                    
                    <View style={{flexDirection: "row"}}>
                        <Button icon transparent>
                            <Feather name='message-square' style={LightTheme.DetailMessageIcon} />
                        </Button>
                        <Button icon transparent>
                            <AntDesign name='retweet' style={LightTheme.DetailMessageIcon} />
                        </Button>
                        <Button icon transparent>
                            <Feather name='heart' style={LightTheme.DetailMessageIcon} />
                        </Button>
                        <Button icon transparent>
                            <Feather name='mail' style={LightTheme.DetailMessageIcon} />
                        </Button>
                    </View>

                </Body>

                <FlatList keyExtractor = {(item) => item.id}
                    data={['1','2','3']} 
                    renderItem={this.renderGridItem} 
                    numColumns={1}
                    style={LightTheme.MainScreenContainer}
                />
            </Content>
        </Container>

        );
      }

}