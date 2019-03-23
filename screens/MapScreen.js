import React from 'react';
import { MapView, Location} from 'expo';
import {View, StyleSheet, Button} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Maps',
  };

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
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({flex: 1}), 500);
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
        />
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