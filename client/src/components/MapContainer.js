import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class WrappedMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {position: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }};

    this.onSubmit = this.onSubmit.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position: {
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({position: {
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentDidUpdate(prevProps) {
    // const {google, map, searchBox} = this.props;
    // if (map !== prevProps.map) {
    //   this.renderSearchBox();
    // } else if (searchBox !== prevProps.searchBox) {
    //   this.renderSearchBox();
    // }
  }

  centerMoved(region) {
    this.props.updateLotecation({lat: region.latitude, lng: region.longitude});
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    const {lotecation, userLocation} = this.props;
    return (
      <View style={styles.container}>
        <MapView provider="google"
          region={this.state.position}
          onRegionChange={this.centerMoved}>
        </MapView>
      </View>
    );
  }
}

export default WrappedMap;