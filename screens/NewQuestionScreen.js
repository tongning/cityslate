import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {View, Text, Image, Button,Alert} from 'react-native';
import HomePageQuestions from '../components/HomePageQuestions';
import MapScreen from '../screens/MapScreen';
import QuestionScreen from '../screens/QuestionScreen';
import firebase from '../firebase.js'; // <--- add this line
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


export default class NewQuestionScreen extends React.Component {
    
    render() {
        //this.writeUserData("A","B","C");
        return (
            <View>
              
              <Text>Form goes here</Text>
                
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

