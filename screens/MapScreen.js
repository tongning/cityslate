import React from 'react';
import { MapView, Location} from 'expo';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../firebase.js'; // <--- add this line
import haversine from 'haversine';

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
        // Only include markers within 5 miles
       
        const start = {
          latitude: snapshot.val()[key].lat,
          longitude: snapshot.val()[key].lon
        }

        const end = {
          latitude: 38.900136,
          longitude: -77.046731
        }
        
        distMiles = haversine(start, end, { unit: 'mile' });
        if (distMiles <= 5) {
          markers.unshift(
            {
              latlng: {
                latitude: snapshot.val()[key].lat,
                longitude: snapshot.val()[key].lon
              },
              title: snapshot.val()[key].questionText

            })
        }
      }

    });

    return markers;
  }

  constructor(props){
    super(props);

    this.state = {
      region: {
        latitude: 38.915574,
        longitude: -77.041658,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      flex: 0,
      markers: [],
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
              onPress={this.props.focusCallback.bind(null, marker.description)}>

                <MapView.Callout>
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