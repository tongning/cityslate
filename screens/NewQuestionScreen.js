import React from 'react';
import { ScrollView, StyleSheet,TouchableOpacity,Dimensions,KeyboardAvoidingView } from 'react-native';
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
        username = "Wisley Won"
        firebase.database().ref('Questions').push({
            questionText, lat, lon, upvotes, username
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
            <KeyboardAvoidingView style={formStyles.wrapper}>
        <KeyboardAvoidingView>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView >
        <TouchableOpacity
          style={styles.btnView}
          activeOpacity={0.8}
          onPress={() => {this.submit()
            this.props.navigation.goBack(null)}}
          >
          <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 25,
              fontFamily:'sans-serif'
            }}>Submit</Text>
        </TouchableOpacity>



        <TouchableOpacity
          style={styles.backView}
          backgroundColor='red'
          activeOpacity={0.8}
          onPress={() => this.props.navigation.goBack(null)}
          >
          <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 25,
              fontFamily:'sans-serif'
            }}>Go Back</Text>
        </TouchableOpacity>
          
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
        );
    }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row'
  },
  btnView: {
    height: undefined,
    margin:20,
    width: undefined,
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
  },

  backView: {
    height: undefined,
    marginLeft:20,
    marginRight:20,
    width: undefined,
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  }
});

const formStyles = {
    wrapper: {
      flex: 1,
      marginTop: height/4,
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
