import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import toMaterialStyle from 'material-color-hash';

const placeIcon = 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class WrappedMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        latitude: this.props.userLocation.lat || 37.78825,
        longitude: this.props.userLocation.lng || -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { lotecation, userLocation } = this.props;
    return (
      <MapView provider="google"
        style={ styles.map }
        region={ this.state.position }
        onRegionChange={ this.centerMoved }
        showsUserLocation={true}
        loadingEnabled={true}
        showsMyLocationButton={true}>
        {this.props.lotes && this.props.lotes.map(lote => {
          let color = toMaterialStyle(lote.loteSender.email);
          return (
            <MapView.Marker key={lote.id}
            coordinate={{latitude: lote.location.latitude || 0,
              longitude: lote.location.longitude || 0}}
            pinColor={color.backGroundColor} />
          );
        })}
      </MapView>
    );
  }
}

export default WrappedMap;