import BackgroundGeolocation from "react-native-background-geolocation";

// Some android thing
module.exports = async (event) => {
  console.log('[js] BackgroundGeolocationHeadlessService: ', event.name, event.params);
}