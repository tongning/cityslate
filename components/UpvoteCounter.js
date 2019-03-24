import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import firebase from '../firebase.js'; // <--- add this line

export default class UpvoteCounter extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props){
    super(props);
    this.state = {
      dbCallComplete: false,
      upvote_count : 0
    };
  }

  callback = (snapshot) => {
    my_key = this.props.my_key
      firebase.database().ref('Questions/').on('value', function (snapshot) {
            my_upvote_count = snapshot.val()[my_key].upvotes
            this.setState({dbCallComplete: true,upvote_count: upvote_count})
      }
      );
  }

  
  render() {
    
      
    return (

         <View style={{flexDirection:"row"}}>
          
              <Button  
                  color="#daa520"
                  title={this.state.upvote_count.toString()}
                  onPress={() => {

              console.log("MY ID IS", this.props.my_key )
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