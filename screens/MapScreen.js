import React from 'react';
import { MapView, Location} from 'expo';
import getCurrentLocation from '../App';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };
  constructor(props){
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
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
      <MapView
        style={{ flex: this.state.flex }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        initialRegion={this.state.region}
      />
    );
  }
}
