import React from 'react';
import { MapView, Location} from 'expo';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../firebase.js'; // <--- add this line


export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Maps',
  };

  createListOfStuff = () => {
    var nav = this.props.navigation;
    let arr = []
    markers = []

    firebase.database().ref('Questions/').once('value', function (snapshot) {
      console.log("SNAP", snapshot.val())
      for (var key in snapshot.val()) {
        /*
        arr.unshift(<HomePageQuestions
          navigation={nav} key={1}
          my_comment={snapshot.val()[key].questionText} ></HomePageQuestions>);*/
        markers.unshift(
          {
            latlng: {
              latitude: snapshot.val()[key].lat,
              longitude: snapshot.val()[key].lon
            },
            title:snapshot.val()[key].questionText
          
          })
      }

    });

    return markers;
  }

  constructor(props){
    super(props);
    result = this.createListOfStuff();

    this.state = {
      region: {
        latitude: 38.915574,
        longitude: -77.041658,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      flex: 0,
      markers: result,
      showMarkers: false
    };
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
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{ flex: this.state.flex }}
          showsMyLocationButton={true}
          showsUserLocation={true}
          initialRegion={this.state.region}
          region={this.state.region}>

          {this.state.showMarkers ? this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}>

                <MapView.Callout tooltip>
                <TouchableHighlight  underlayColor='#dddddd'>
                                          <View>
                                              <Text>{marker.title}{"\n"}{marker.description}</Text>
                                          </View>
                                      </TouchableHighlight>
                </MapView.Callout>
            </MapView.Marker>
          )) : null}

        </MapView>
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
      width: 40,
  }
});