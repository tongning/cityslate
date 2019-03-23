import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import UpvoteCounter from '../components/UpvoteCounter';

export default class HomePageQuestions extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (

         <View style={{flexDirection:"row"}}>
          
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
         
        
          <Button  
           color="#ff5c5c"
          title={this.props.my_comment}
         onPress={() => this.props.navigation.push("Question",{
          myItemName: " HI898",
         })}
         />
      <UpvoteCounter upvote_number = {10}></UpvoteCounter>
          </View>

      

    );
  }
}

