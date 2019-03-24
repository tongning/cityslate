import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {View, Text, Image, Button,Alert} from 'react-native';
import MainTabNavigator from '../navigation/MainTabNavigator'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';




export default class QuestionScreen extends React.Component {
  static navigationOptions = {
     title: 'Questions',
  };
  

  render() {
       return (
      <View style={{flex:1}}>
     <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
     <Text style={{fontSize: 20}} >HELLOW {this.props.navigation.state.params.myItemName} </Text>
     <Button
           color="#ff5c5c"
          title="GO BACK"
         onPress={() => this.props.navigation.goBack(null)}
         />
      
    </View>
    );
  }
}


