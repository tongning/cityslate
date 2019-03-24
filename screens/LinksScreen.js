import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {View, Text, Image, Button,Alert, Dimensions} from 'react-native';
import HomePageQuestions from '../components/HomePageQuestions';
import MapScreen from '../screens/MapScreen';
import QuestionScreen from '../screens/QuestionScreen';
import firebase from '../firebase.js'; // <--- add this line

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
      questions: []
    }
  }

  render() {
    var _onRefresh = () => {
      this.setState({refreshing: true});
      this.props.refreshCallback();
    }
   return (
      <View style={{flex:1}}>
      
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={_onRefresh}
          />
        }>
        {Object.keys(this.state.questions).map(question => 
          <HomePageQuestions  navigation = {this.props.navigation}  
          data={this.state.questions[question]} my_key = {question} ></HomePageQuestions>)}
        
      </ScrollView>
    </View>
    );
  }
}
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'white',
  },
  submitButton: {
    width: width,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: 'lightblue',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
},
textInput: {
  fontFamily:'monospace',
  height:55,
  flex:1,
  width: width-40,
  alignItems: 'center',
  borderRadius: 10,
  flexDirection: 'row',
  borderWidth: 0.5,
  paddingLeft: 15,
  paddingRight: 15,
  marginBottom: 10,
  backgroundColor: 'lightgray',
}
});

