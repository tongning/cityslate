import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {View, Text, Image, Button,Alert} from 'react-native';
import MainTabNavigator from '../navigation/MainTabNavigator'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat'



export default class QuestionScreen extends React.Component {
  static navigationOptions = {
     title: 'Questions',
  };
  
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'I live near Dupont Circle, might be able to help.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    console.log("QUESTION SCREEN TRYING")
    console.log("IDK", this.props.navigation.state)
       return (
      <View style={{flex:1}}>
    
     <Text style={{fontSize: 20}} >
     <Image source={{uri: "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg", width: 32, height: 32}} />
     {this.props.navigation.state.params.myItemName}
      </Text>
     <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />

     <Button  
           color="#ff5c5c"
          title="GO BACK"
         onPress={() => this.props.navigation.goBack(null)}
         />
      
    </View>
    );
  }
}


