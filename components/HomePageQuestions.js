import React from 'react';
import {View, Text, Image, Dimensions, Button} from 'react-native';
import UpvoteCounter from '../components/UpvoteCounter';

export default class HomePageQuestions extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props){
    super(props);
   
  }
  render() {
    console.log("THIS PROPS DATA STUFF", this.props.data, this.props.my_key)
    return (

      <View style={{ flexDirection: "row", flex: 1, width: 200/*Dimensions.get('window').width*0.7*/ }}>

        <Image source={{ uri: "https://f001.backblazeb2.com/file/alipublic/question2.png", width: 64, height: 64 }} />
        <View style={[{ width: "90%", margin: 10}]}>
        <Button
          color="#ff5c5c"
          title={this.props.data.questionText}

          onPress={() => this.props.navigation.push("Question", {
            myItemName: this.props.data.questionText,
          })}
        />
        </View>

        <View style={[{ margin: 10}]}>
         
        <UpvoteCounter my_key={this.props.my_key}></UpvoteCounter>
        </View>

      </View>



    );
  }
}

