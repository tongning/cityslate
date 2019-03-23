import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {View, Text, Image, Button,Alert} from 'react-native';
import HomePageQuestions from '../components/HomePageQuestions';
import MapScreen from '../screens/MapScreen';
import { MapView, Location} from 'expo';

import QuestionScreen from '../screens/QuestionScreen';
import firebase from '../firebase.js'; // <--- add this line
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import GenerateForm from 'react-native-form-builder';

export default class NewQuestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit() {
        const formValues = this.formGenerator.getValues();
        console.log('FORM VALUES', formValues);
        this.writeQuestionData(formValues['question_text'])
    }
  
    writeQuestionData(questionText) {
        lat = this.state.region.latitude;
        lon = this.state.region.longitude;
        upvotes = 0;
        firebase.database().ref('Questions/').push({
            questionText, lat, lon, upvotes
        }).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }
    componentDidMount() {
        setTimeout(() => 
            this.setState({flex: 1, showMarkers: true}) , 500);
        return Location.getCurrentPositionAsync({}).then(position => {
          if (position) {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              },
            });
          }
        });
    }

    render() {
        //this.writeUserData("A","B","C");
        return (
            <View style={formStyles.wrapper}>
        <View>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>
        <View style={formStyles.submitButton}>
          <Button block title="Submit" onPress={() => {this.submit()
          this.props.navigation.goBack(null)}}>
            <Text>Submit</Text>
          </Button>
        </View>
      </View>
        );
    }
}

const formStyles = {
    wrapper: {
      flex: 1,
      marginTop: 150,
    },
    submitButton: {
      paddingHorizontal: 10,
      paddingTop: 20,
    },
  };
  // These Fields will create a login form with three fields
  const fields = [
    {
      type: 'text',
      name: 'question_text',
      required: true,
      /*icon: 'ios-person',*/
      label: 'Type your question here...',
      multiline: true,
      props:{multiline:true}
    },
   
  ];