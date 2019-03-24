
import React from 'react';
import {View, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from './MapScreen';
import LinksScreen from './LinksScreen';
import firebase from '../firebase.js'; // <--- add this line
import { Ionicons } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');
const buttonSize = 70;

export default class QuestionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  };

  constructor(props){
    super(props);
    this.state = {
      dbCallComplete: false,
      mapMode : true,
      questions : null,
      overlayHeight: new Animated.Value(height * 1/3),
      expanded: false,
    };
  }

  callback = (snapshot) => {
    let arr = {};
    snapshot.forEach(function(childSnapshot){
      let key = childSnapshot.key;
      let childData = childSnapshot.val();
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


  _expand(){
    if(this.state.expanded){
      Animated.timing(this.state.overlayHeight, {
        toValue: height * 1/3,
        velocity: 3,
        overshootClamping: true
      }).start();
    } else {
      Animated.timing(this.state.overlayHeight, {
        toValue: height - 130,
        velocity: 3,
        overshootClamping: true
      }).start();
    }
    this.setState({expanded: !this.state.expanded});
  }

  focusItem(key){
    this.refs.list.scrollToQuestion(key);
  }

  focusMarker = (key) => {
    console.log(key);
    this.refs.map.focusOnMarker(key);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapScreen ref="map" focusCallback={this.focusItem.bind(this)}/>

        <Animated.View ref="overlay" style={[styles.overlay, 
          {height:this.state.overlayHeight}]}>
          <TouchableOpacity 
            onPress={next => this._expand()}
            style={styles.toggleButton}>
            <Ionicons name={this.state.expanded ? "ios-arrow-dropdown-circle" : "ios-arrow-dropup-circle"} size={buttonSize} color="blue" />
          </TouchableOpacity>
          <LinksScreen ref="list"
          focusCallback={this.focusMarker.bind(this)}
          refreshCallback = {this.refreshData.bind(this)}
          navigation = {this.props.navigation} />
        </Animated.View>

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
      position: "relative",
      //margin: 10,
      top:buttonSize/2,
      width: width / 2 + buttonSize/2,
      backgroundColor: 'rgba(52, 52, 52, 0)',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      zIndex: 4,
  }, 
  overlay: {
    position: "absolute",
    bottom: 0,
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