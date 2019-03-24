import React from 'react';
import {View, Text, Image, Dimensions, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import UpvoteCounter from '../components/UpvoteCounter';
import CardView from 'react-native-cardview'


export default class IconWithTextBelow extends React.Component {

  constructor(props){
    super(props);
   
  }
  render() {
    return (
        <View style={this.storyCounters}>
            <Icon name="eye" style={this.iconCounter} />
            <Text style={this.iconCounterText}>5 miles</Text>
        </View>
    );
  }
}

const storyCounters = {
    width: 25,
  };
  
const iconCounter = {
    fontSize: 21,
    color: '#bbbbbb',
    textAlign: 'center',
  };
  
const iconCounterText= {
    color: '#bbbbbb',
    fontSize: 12,
    textAlign: 'center'
  };
  

