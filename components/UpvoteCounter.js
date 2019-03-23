import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import firebase from '../firebase.js'; // <--- add this line

export default class UpvoteCounter extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
      upvote_count =  0
      my_key = this.props.my_key
      firebase.database().ref('Questions/').on('value', function (snapshot) {
            upvote_count = snapshot.val()[my_key].upvotes
      }
      );
      
    return (

         <View style={{flexDirection:"row"}}>
          
          <Button  
           color="#daa520"
          title={upvote_count.toString()}
         onPress={() => {


          console.log("MY ID IS", this.props.my_key ,my_key)
         var databaseRef = firebase.database().ref('Questions/').child(this.props.my_key).child('upvotes');
          console.log("Data base ref is ", databaseRef)
          databaseRef.transaction(function(upvotes) {
            console.log("want to UPDATING UPVOTES!")
            return (upvotes || 0) + 1;
          });
         }}
         
         />
      
          </View>

    );
  }
}