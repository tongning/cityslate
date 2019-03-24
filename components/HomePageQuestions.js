import React from 'react';
import {View, Text, Image, Dimensions, Button} from 'react-native';
import UpvoteCounter from '../components/UpvoteCounter';
import CardView from 'react-native-cardview'


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

      <View style={{ borderColor: 'grey',
      alignItems:"center",borderWidth: 2, flexDirection: "row", flex: 1, width: 350/*Dimensions.get('window').width*0.7*/ }}>

        <Image source={{ uri: "https://f001.backblazeb2.com/file/alipublic/question2.png", width: 64, height: 64 }} />
        <View style={[{ width: 180, margin: 10}]}>
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

