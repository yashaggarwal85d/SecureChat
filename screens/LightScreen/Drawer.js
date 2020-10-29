import React from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import {View,Text} from 'native-base';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LightTheme } from '../../appStyles';

function DrawerContent(props){
  return(
    <View style={{flex:1}}>
      <View style={LightTheme.DrawerView}>
        <Image
            source={require("../../assets/omega.jpg")}
            resizeMode="stretch"
            style={LightTheme.image}
        ></Image>
        <View>
        <Text style={LightTheme.DrawerProfileName}>Yash</Text>
        <Text style={LightTheme.DrawerProfileTag}>@yash</Text>
        </View>
      </View>
      <View style={LightTheme.DrawerView}>
        <View style={{flexDirection:'row'}}>
          <Text style={LightTheme.DrawerProfileNameStyle}>80</Text>
          <Text style={LightTheme.DrawerProfileTag}>Following</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={LightTheme.DrawerProfileNameStyle}>25k</Text>
          <Text style={LightTheme.DrawerProfileTag}>Followers</Text>
        </View>
      </View>
      <View style={{paddingTop:10}}>
      <DrawerItem
          icon={({color})=>(
            <Feather
              name='home'
              color={color}
              size={25}
            />
          )}
          label='Home'
          labelStyle={LightTheme.DrawerLabelStyle}
          onPress={() => {props.navigation.navigate('Home')}}
        />
      <DrawerItem
          icon={({color})=>(
            <Feather
              name='user'
              color={color}
              size={25}
            />
          )}
          label='Profile'
          labelStyle={LightTheme.DrawerLabelStyle}
          onPress={() => {props.navigation.navigate('Home')}}
        />
        <DrawerItem
          icon={({color})=>(
            <Feather
              name='settings'
              color={color}
              size={25}
            />
          )}
          label='settings'
          labelStyle={LightTheme.DrawerLabelStyle}
          onPress={() => {props.navigation.navigate('Settings')}}
        />
        </View>
    </View>
  )
}

export default DrawerContent;