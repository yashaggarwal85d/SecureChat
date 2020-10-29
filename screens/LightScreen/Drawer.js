import {StyleSheet} from 'react-native';
import React from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import {
  Header,
  Title,
  Button,
  Right,
  Body,
  Left,View,Text, Drawer, Label
} from 'native-base';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LightTheme } from '../../appStyles';
import { grey } from '../../constants/colors';

function DrawerContent(props){
  return(
    <View style={{flex:1}}>
      <View style={{padding:15,flexDirection:'row'}}>
        <Image
            source={require("../../assets/omega.jpg")}
            resizeMode="stretch"
            style={LightTheme.image}
        ></Image>
        <View>
        <Text style={{fontFamily:'Touche_Semibold',fontSize:22,paddingLeft:10}}>Yash</Text>
        <Text style={{fontFamily:'Touche_Medium',paddingLeft:10,color:'grey'}}>@yash</Text>
        </View>
      </View>
      <View style={{padding:15,flexDirection:'row'}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:'Touche_Semibold',fontSize:18,paddingLeft:10}}>80</Text>
          <Text style={{fontFamily:'Touche_Medium',paddingLeft:10,color:'grey'}}>Following</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:'Touche_Semibold',fontSize:18,paddingLeft:10}}>25k</Text>
          <Text style={{fontFamily:'Touche_Medium',paddingLeft:10,color:'grey'}}>Followers</Text>
        </View>
      </View>
      <View style={{paddingTop:10}}>
      <DrawerItem
          icon={({color,size})=>(
            <Feather
              name='home'
              color={color}
              size={25}
            />
          )}
          label='Home'
          labelStyle={{color:grey,fontFamily:'Touche_Medium',fontSize:18}}
          onPress={() => {props.navigation.navigate('Home')}}
        />
      <DrawerItem
          icon={({color,size})=>(
            <Feather
              name='user'
              color={color}
              size={25}
            />
          )}
          label='Profile'
          labelStyle={{color:grey,fontFamily:'Touche_Medium',fontSize:18}}
          onPress={() => {props.navigation.navigate('Home')}}
        />
        <DrawerItem
          icon={({color,size})=>(
            <Feather
              name='settings'
              color={color}
              size={25}
            />
          )}
          label='settings'
          labelStyle={{color:grey,fontFamily:'Touche_Medium',fontSize:18}}
          onPress={() => {props.navigation.navigate('Settings')}}
        />
        </View>
    </View>
  )
}

export default DrawerContent;