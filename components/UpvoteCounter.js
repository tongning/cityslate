import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import firebase from '../firebase.js'; // <--- add this line

export default class UpvoteCounter extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
      upvote_count =  0
      my_comment = this.props_my_comment
      firebase.database().ref('Questions/').on('value', function (snapshot) {
        console.log("SNAP",snapshot.val())
        for (var key in snapshot.val()){
          
       if (snapshot.val()[key].questionText ==  {my_comment}){
            upvote_count = snapshot.val()[key].upvotes
       }
    }
      });
      
    return (

         <View style={{flexDirection:"row"}}>
          
          <Button  
           color="#daa520"
          title={upvote_count.toString()}
         onPress={() => {}}
         
         />
      
          </View>

    );
  }
}