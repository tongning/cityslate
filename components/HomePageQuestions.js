import React from 'react';
import {View, Text, Image, Dimensions, Button} from 'react-native';
import UpvoteCounter from '../components/UpvoteCounter';
//import console = require('console');

export default class HomePageQuestions extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props){
    super(props);
   
  }
  render() {
 
    return (

      <View style={{ flexDirection: "row", flex: 1, width: 200/*Dimensions.get('window').width*0.7*/ }}>

        <Image source={{ uri: "https://f001.backblazeb2.com/file/alipublic/question2.png", width: 64, height: 64 }} />
        <View style={[{ width: "90%", margin: 10}]}>
        <Button
          color="#ff5c5c"
          title={this.props.my_comment}

          onPress={() => this.props.navigation.push("Question", {
            myItemName: this.props.my_comment,
          })}
        />
        </View>

        <View style={[{ margin: 10}]}>
         
        <UpvoteCounter my_comment_prop={this.props.my_comment}></UpvoteCounter>
        </View>

      </View>



    );
  }
}

