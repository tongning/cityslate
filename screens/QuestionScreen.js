import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {View, Text, Image, Button,Alert} from 'react-native';
import HomePageQuestions from '../components/HomePageQuestions';
import firebase from '../firebase.js'; // <--- add this line


export default class QuestionScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };


  createListOfStuff = () => {
    let arr = []
    var num_posts = 1
    for (var i = 0; i < num_posts; i++) {
        
        arr.push(<HomePageQuestions key = {i} my_comment = "Details of a question" ></HomePageQuestions>);
        
    }
    return arr;
}

  render() {
    //this.writeUserData("A","B","C");
    return (
      <View style={{flex:1}}>
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}   
            {this.createListOfStuff()}
           
        
      </ScrollView>
      <Button
          style = {styles.submitButton}
             title="+Add A question"
             color="#841584"
             onPress={() => {
              Alert.alert('You tapped the button!');
            }}
             />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  submitButton: {
  width: 60,  
  height: 60,   
  borderRadius: 30,            
  backgroundColor: '#ee6e73',                                    
  position: 'absolute',                                          
  bottom: 10,                                                    
  right: 10, 
}
});

