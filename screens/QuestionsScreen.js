
import React from 'react';
import {View, StyleSheet, Dimensions, Button} from 'react-native';
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
      dbCallComplete: false,
      mapMode : true,
      questions : null
    };
  }

  callback = (snapshot) => {
    var nav = this.props.navigation;
    let qs_arr = []
    console.log("SNAP", snapshot.val())
      let keyidx = 0;
      for (var key in snapshot.val()) {

        qs_arr.unshift(<HomePageQuestions
          navigation={nav} key={keyidx}
          my_comment={snapshot.val()[key].questionText} ></HomePageQuestions>);
        keyidx++;
      }
      this.setState({dbCallComplete: true, questions: qs_arr})
  }

  createListOfStuff = () => {
    var nav = this.props.navigation;
    let arr = []

    firebase.database().ref('Questions/').once('value', this.callback.bind(this));

    return arr;
  }
  switchMode() {
      this.setState({mapMode : !this.state.mapMode});
  }

  componentDidMount(){
    this.createListOfStuff();
  }
  render() {
    //var my_arr = this.createListOfStuff()
    //console.log("IDK",my_arr);

    return (
      <View style={{flex: 1}}>
        {!this.state.mapMode ? 
        <MapScreen/> : 
        <LinksScreen  navigation = {this.props.navigation} 
        my_questions = {!this.state.dbCallComplete ? null : this.state.questions}/>}


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