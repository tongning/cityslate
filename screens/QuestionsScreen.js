
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue'
import MapScreen from './MapScreen';
import LinksScreen from './LinksScreen';
import firebase from '../firebase.js'; // <--- add this line

const {height, width} = Dimensions.get('window');

export default class QuestionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
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
    let arr = {};
    snapshot.forEach(function(childSnapshot){
      let key = childSnapshot.key;
      let childData = childSnapshot.val();
      console.log(childData);
      arr[key] = childData;
    });

    let markers = [];
    Object.keys(arr).map((question) => 
      markers.push({
        latlng: {
          latitude: arr[question].lat,
          longitude: arr[question].lon
        },
        title:arr[question].questionText,
        description: question
      })
    )
    this.refs.map.setState({markers : markers});
    this.refs.list.setState({questions : arr, refreshing: false});
  }

  refreshData = () => {
    firebase.database().ref('Questions/').once('value', this.callback.bind(this));
  }

  switchMode() {
      this.setState({mapMode : !this.state.mapMode});
  }

  componentDidMount(){
    this.refreshData();
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <MapScreen ref="map"/>

        <View style={styles.overlay}>
          <View style={styles.header}></View>
          <LinksScreen ref="list"
          refreshCallback = {this.refreshData.bind(this)}
          navigation = {this.props.navigation} />
        </View>
        
        {/* <AwesomeButtonBlue 
            raiseLevel={0}
            onPress={next => this.setState({mapMode : !this.state.mapMode})}
            style={styles.toggleButton}>
            {this.state.mapMode ? "Map" : "List"}
        </AwesomeButtonBlue> */}

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
  }, 
  overlay: {
    position: "absolute",
    bottom: 0,
    height: height * 1/3,
    width: width,
  }, 
  header: {
    height: 200,
    width: width,
    color: 'blue',
    position: "absolute",
    top: 0
  }
});