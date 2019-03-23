import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {View, Text, Image} from 'react-native';



export default class HomePageQuestions extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
 
         <View style={{flexDirection:"row"}}>
          
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:20}}>    {this.props.my_comment}</Text>
          </View>

    );
  }
}
