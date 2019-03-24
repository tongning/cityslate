import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {View, Text, Image, Button,Alert} from 'react-native';
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

