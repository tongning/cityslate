
import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue'
import MapScreen from './MapScreen';
import LinksScreen from './LinksScreen';
import firebase from '../firebase.js'; // <--- add this line
import HomePageQuestions from '../components/HomePageQuestions';


export default class QuestionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Questions',
  };

  constructor(props){
    super(props);
    this.state = {
      mapMode : true,
    };
  }


  createListOfStuff = () => {
    var nav = this.props.navigation; 
    let arr = []

      firebase.database().ref('Users/').on('value', function (snapshot) {
        console.log("SNAP",snapshot.val())
        for (var key in snapshot.val()){
          
        arr.unshift(<HomePageQuestions 
          navigation = {nav} key = {1} 
          my_comment = {snapshot.val()[key].email} ></HomePageQuestions>);
        }
        
      });
    
    return arr;
}
  switchMode() {
      this.setState({mapMode : !this.state.mapMode});
  }


  render() {
    return (
      <View style={{flex: 1}}>
        {!this.state.mapMode ? 
        <MapScreen/> : 
        <LinksScreen  navigation = {this.props.navigation} my_questions = {this.createListOfStuff()}/>}


        <AwesomeButtonBlue 
            raiseLevel={0}
            onPress={next => this.setState({mapMode : !this.state.mapMode})}
            style={styles.toggleButton}>
            {this.state.mapMode ? "Map" : "List"}
        </AwesomeButtonBlue>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Add Question" onPress={() => this.props.navigation.push("NewQuestionScreen")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>

        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  toggleButton: {
      position: "absolute",
      margin: 10,
      bottom:0
  }
});