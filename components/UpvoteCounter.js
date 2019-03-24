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
      textValue: 0,
    }
  }  

  render() {
    
 
      my_upvotes = this.props.my_upvotes
      if (this.state.textValue < my_upvotes){
        this.setState({textValue: my_upvotes})
      }

      return (
         <View style={{flexDirection:"row"}}>
              <Button  
                color="#daa520"
                title={this.state.textValue.toString()}
                onPress={() => {
                  this.setState({
                    textValue: this.state.textValue+1
                  })

                    console.log("MY ID IS", this.props.my_key )
                    var databaseRef = firebase.database().ref('Questions/').child(this.props.my_key).child('upvotes');
                    
                      //this.onPress()
                    
                      databaseRef.transaction(function(upvotes) {
                        return (upvotes || 0) + 1;
                      });
                    }}/>
      
          </View>

      );
  }
}