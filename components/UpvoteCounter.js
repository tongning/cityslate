import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import firebase from '../firebase.js'; // <--- add this line

export default class UpvoteCounter extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
      upvote_count =  0
      my_comment = this.props.my_comment_prop
      firebase.database().ref('Questions/').on('value', function (snapshot) {
        console.log("SNAP",snapshot.val())
        for (var key in snapshot.val()){
          
       if (snapshot.val()[key].questionText ===  my_comment){
            upvote_count = snapshot.val()[key].upvotes
       }
    }
      });
      
    return (

         <View style={{flexDirection:"row"}}>
          
          <Button  
           color="#daa520"
          title={upvote_count.toString()}
         onPress={() => {

          
        
          var my_id;
          firebase.database().ref('Questions/').once('value', function (snapshot) {
            console.log("SNAP",snapshot.val())
            for (var key in snapshot.val()){
              console.log("CURRENT QUESTION TEXT IS ", snapshot.val()[key].questionText, my_comment)
           if (snapshot.val()[key].questionText ===  my_comment){
               my_id = key
               console.log("KEY IS", key)
           }
        }
          });

          console.log("MY ID IS", my_id, my_comment)
         var databaseRef = firebase.database().ref('Questions/').child(my_id).child('upvotes');
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