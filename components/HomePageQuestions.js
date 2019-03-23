import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import UpvoteCounter from '../components/UpvoteCounter';
//import console = require('console');

export default class HomePageQuestions extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    my_comment = this.props.my_comment
    console.log("EHLLO", typeof my_comment)
    return (

         <View style={{flexDirection:"row"}}>
          
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
         
        
          <Button  
           color="#ff5c5c"
          title={my_comment}
         onPress={() => this.props.navigation.push("Question",{
          myItemName: {my_comment},
         })}
         />
      <UpvoteCounter my_comment = {my_comment}></UpvoteCounter>
          </View>

      

    );
  }
}

