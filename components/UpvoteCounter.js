import React from 'react';
import {View, Text, Image, Button, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
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
          <View >
            <TouchableOpacity
              style={styles.btnView}
              activeOpacity={0.8}
              onPress={() => {
                this.setState({
                  textValue: this.state.textValue+1
                })
                  console.log("MY ID IS", this.props.my_key )
                  var databaseRef = firebase.database().ref('Questions/').child(this.props.my_key).child('upvotes');
                  databaseRef.transaction(function(upvotes) {return (upvotes || 0) + 1; });
                  }}
              >
              <Text style={{color: 'white', fontSize: 12,}}>{this.state.textValue.toString()}</Text>
            </TouchableOpacity>
          </View>
      );
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  logo: {
    flex:1,
    alignSelf:'stretch',
    width: undefined,
    height: undefined,
    marginTop: 10,
  },
  header: {
    fontSize: 50,
    fontFamily:'monospace',
    color: 'lightblue',
    marginBottom: 20,
  },
  container: {
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row'
  },
  btnView: {
    //margin:10,
    height: 25,
    //marginTop:10,
    //marginBottom:10,
    width: 25,
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'space-evenly',
    backgroundColor: 'lightgreen',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  textInput: {
    fontFamily:'monospace',
    height:55,
    flex:1,
    width: width-40,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    backgroundColor: 'lightgray',
  }
});