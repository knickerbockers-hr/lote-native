/**
* BackgroundGeolocation Service
* A helper singleton for interacting with BackgroundGeolocation
* Copied from RN-Background-Geolocation-Demo
* Needs to be cleaned up but not sure what we are using yet
*/
import {
  AsyncStorage
} from 'react-native';

import EventEmitter from 'EventEmitter';

import DeviceInfo from 'react-native-device-info';

const STORAGE_KEY = '@TSLocationManager:';

// react-native-device-info
let deviceInfo = {
  uuid: DeviceInfo.getUniqueID(),
  model: DeviceInfo.getModel(),
  platform: DeviceInfo.getSystemName(),
  manufacturer: DeviceInfo.getManufacturer(),
  version: DeviceInfo.getSystemVersion(),
  framework: 'ReactNative'
};

const SECTIONS = ['geolocation', 'activity recognition', 'application', 'persistence', 'http'];
const SETTINGS = {
  common: [
    // Geolocation
    {name: 'desiredAccuracy', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [-1, 0, 10, 100, 1000], defaultValue: 0 },
    {name: 'distanceFilter', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [0, 10, 20, 50, 100, 500], defaultValue: 20 },
    {name: 'disableElasticity', group: 'geolocation', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    {name: 'geofenceProximityRadius', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [1000, 1500, 2000, 5000, 10000, 100000], defaultValue: 1000 },
    {name: 'stopAfterElapsedMinutes', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [-1, 0, 1, 2, 5, 10, 15], defaultValue: 0},
    {name: 'desiredOdometerAccuracy', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [10, 20, 50, 100, 500], defaultValue: 100},
    // Activity Recognition
    {name: 'activityRecognitionInterval', group: 'activity recognition', dataType: 'integer', inputType: 'select', values: [0, 1000, 5000, 10000, 30000], defaultValue: 10000},
    {name: 'stopTimeout', group: 'activity recognition', dataType: 'integer', inputType: 'select', values: [0, 1, 5, 10, 15], defaultValue: 1},
    // HTTP & Persistence
    {name: 'url', group: 'http', inputType: 'text', dataType: 'string', defaultValue: 'http://your.server.com/endpoint'},
    {name: 'autoSync', group: 'http', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: true},
    {name: 'autoSyncThreshold', group: 'http', dataType: 'integer', inputType: 'select', values: [0, 5, 10, 25, 50, 100], defaultValue: 0},
    {name: 'batchSync', group: 'http', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    {name: 'maxBatchSize', group: 'http', dataType: 'integer', inputType: 'select', values: [-1, 50, 100, 250, 500], defaultValue: 250},
    {name: 'maxRecordsToPersist', group: 'http', dataType: 'integer', inputType: 'select', values: [-1, 0, 1, 10, 100, 1000], defaultValue: -1},
    {name: 'maxDaysToPersist', group: 'http', dataType: 'integer', inputType: 'select', values: [-1, 1, 2, 3, 4, 5, 6, 7], defaultValue: -1},
    // Application
    {name: 'stopOnTerminate', group: 'application', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: true},
    {name: 'startOnBoot', group: 'application', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    {name: 'heartbeatInterval', group: 'application', dataType: 'integer', inputType: 'select', values: [60, (2*60), (5*60), (15*60)], defaultValue: 60},
    // Logging & Debug
    {name: 'debug', group: 'debug', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: true},
    {name: 'logLevel', group: 'debug', dataType: 'string', inputType: 'select', values: ['OFF', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'VERBOSE'], defaultValue: 'VERBOSE'},
    {name: 'logMaxDays', group: 'debug', dataType: 'integer', inputType: 'select', values: [1, 2, 3, 4, 5, 6, 7], defaultValue: 3}
  ],
  ios: [
    // Geolocation
    {name: 'stationaryRadius', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [0, 25, 50, 100, 500, 1000, 5000], defaultValue: 25 },
    {name: 'activityType', group: 'geolocation', dataType: 'string', inputType: 'select', values: ['Other', 'AutomotiveNavigation', 'Fitness', 'OtherNavigation'], defaultValue: 'Other'},
    {name: 'useSignificantChangesOnly', group: 'geolocation', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    // Application
    {name: 'preventSuspend', group: 'application', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    // Activity Recognition
    {name: 'disableStopDetection', group: 'activity recognition', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    {name: 'stopDetectionDelay', group: 'activity recognition', dataType: 'integer', inputType: 'select', values: [0, 1, 5, 10, 15], defaultValue: 0}
  ],
  android: [
    // Geolocation
    {name: 'locationUpdateInterval', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [0, 1000, 5000, 10000, 30000, 60000], defaultValue: 5000},
    {name: 'fastestLocationUpdateInterval', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [0, 1000, 5000, 10000, 30000, 60000], defaultValue: 1000},
    {name: 'deferTime', group: 'geolocation', dataType: 'integer', inputType: 'select', values: [0, (10*1000), (30*1000), (60*1000), (5*60*1000)], defaultValue: 0},
    // Activity Recognition
    {name: 'triggerActivities', group: 'activity recognition', dataType: 'string', inputType: 'select', values: ['in_vehicle', 'on_bicycle', 'on_foot', 'running', 'walking'], defaultValue: 'in_vehicle, on_bicycle, running, walking, on_foot'},      
    // Application
    {name: 'foregroundService', group: 'application', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    {name: 'forceReloadOnMotionChange', group: 'application', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    {name: 'forceReloadOnLocationChange', group: 'application', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    {name: 'forceReloadOnGeofence', group: 'application', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false},
    {name: 'forceReloadOnHeartbeat', group: 'application', dataType: 'boolean', inputType: 'toggle', values: [true, false], defaultValue: false}
  ]
};

//A collection of soundId for use with BackgroundGeolocation#playSound
const SOUND_MAP = {
  "ios": {
    "LONG_PRESS_ACTIVATE": 1113,
    "LONG_PRESS_CANCEL": 1075,
    "ADD_GEOFENCE": 1114,
    "BUTTON_CLICK": 1104,
    "MESSAGE_SENT": 1303,
    "ERROR": 1006,
    "OPEN": 1502,
    "CLOSE": 1503,
    "FLOURISH": 1509
  },
  "android": {
    "LONG_PRESS_ACTIVATE": 27,
    "LONG_PRESS_CANCEL": 94,
    "ADD_GEOFENCE": 28,
    "BUTTON_CLICK": 19,
    "MESSAGE_SENT": 90,
    "ERROR": 89,
    "OPEN": 37,
    "CLOSE": 94,
    "FLOURISH": 37
  }
};

let eventEmitter = new EventEmitter();

let geofenceNextId = 0;

// Singleton instance
let instance = null;

class BGService {

  static getInstance() {
    if (!instance) {
      instance = new BGService();
    }
    return instance;
  }

  constructor() {
    this.uuid = null;
    this.getUUID((uuid) => {
      this.uuid = uuid;
    });
    this.state = {};

    this.plugin = global.BackgroundGeolocation;

    let platform = DeviceInfo.getSystemName();
    if (platform.match(/iPhone/)) {
      platform = 'ios'
    };
    this.platform = platform.toLowerCase();

    let items = [].concat(SETTINGS.common).concat(SETTINGS[this.platform]);
    this.settings = {
      items: items,
      map: {}
    };
    // Create a Map of Settings
    items.forEach((item) => {
      this.settings.map[item.name] = item;
    });

    console.log('BGService#constructor');
  }

  getUUID(callback) {
    AsyncStorage.getItem(STORAGE_KEY+"uuid", function(err, uuid) {
      if (uuid) {
        this.uuid = uuid;
      }
      callback(this.uuid);
    });
  }

  setUUID(uuid) {
    AsyncStorage.setItem(STORAGE_KEY+"uuid", uuid);
  }

  getPlugin() {
    return this.plugin;
  }

  getPlatform() {
    return this.platform;
  }

  getPlatformSettings(group) {
    if (group === undefined) {
      return this.settings.items;
    } else {
      let settings = [];
      this.settings.items.forEach((setting) => {
        if (setting.group === group && !setting.ignore) {
          settings.push(setting);
        }
      });
      return settings;
    }
  }

  // Fetch plugin state.
  getState(callback) {
    if (this.uuid) {
      this.plugin.getState((state) => {
        this.state = state;
        callback(state);
      });
    } else {
      // Determine if this is app first-boot.
      this.getUUID((uuid) => {
        if (!uuid) {
          this.plugin.getState((state) => {
            // First boot:  Override default options from plugin state.
            // We want to start with debug: true.
            this.setUUID(deviceInfo.uuid);  // <-- flag to detect we've booted before

            state.debug = true;
            state.logLevel = this.plugin.LOG_LEVEL_VERBOSE;
            state.foregroundService = true;
            state.autoSync = false;
            state.stopOnTerminate = false;
            state.startOnBoot = true;
            state.heartbeatInterval = 60;
            state.params = {device: deviceInfo};
            this.state = state;
            callback(state);
          });
        } else {
          this.plugin.getState((state) => {
            this.state = state;
            callback(state);
          });
        }
      });
    }
  }

  isLocationTrackingMode() {
    return (this.state.trackingMode === 1) || (this.state.trackingMode === 'location');
  }

  // Set a plugin config option and execute BackgroundGeolocation#setConfig
  set(key, value, callback) {
    callback = callback || function(){};
    
    if (key === 'trackingMode') {
      if (value === 'location') {
        this.plugin.start((state) => {
          this.state = state;
          callback(state);
        });
      } else {
        this.plugin.startGeofences((state) => {
          this.state = state;
          callback(state);
        });
      }
    } else {
      let config = {};
      config[key] = value;
      this.state[key] = value;

      this.plugin.setConfig(config, (state) => {
        this.state = state;
        console.log('- setConfig success', state);
        callback(state);
      });
    }
    eventEmitter.emit('change', key, value);
  }

  /**
  * Listen to config change events
  */
  on(event, callback) {
    eventEmitter.addListener(event, callback);
  }

  removeListeners() {
    eventEmitter.removeAllListeners();
  }

  /**
  * Load test geofences
  * @param {[lotes]} array of lotes
  * @param {Function} callback
  */
  loadGeofences(lotes, config) {
    let geofences = lotes.map(lote => {
      return {
        identifier: 'lote_' + (++geofenceNextId),
        extras: {
          "geofence_extra_foo": "extra geofence data"
        },
        latitude: data[n].lat,
        longitude: data[n].lng,
        radius: lote.radius,
        notifyOnEntry: config.notifyOnEntry,
        notifyOnExit: config.notifyOnExit,
        notifyOnDwell: config.notifyOnDwell,
        loiteringDelay: config.loiteringDelay
      };
    });

    return new Promise((resolve, reject) => {
      this.plugin.addGeofences(geofences, 
        () => { resolve(); }, 
        () => { reject(); });
    });
  }

  setOdometer(value, success, failure) {
    success = success || function() {};
    failure = failure || function() {};
    this.plugin.setOdometer(value, (location) => {
      eventEmitter.emit('change', 'odometer', value);
      success(location);
    }, (error) => {
      failure(error);
    });
  }

  /**
  * Clear all geofences
  */
  removeGeofences() {
    this.playSound('MESSAGE_SENT');
    this.plugin.removeGeofences();
  }

  /**
  * Play a UI sound via BackgroundGeolocation
  * @param {String/Number} name/soundId
  */
  playSound(name) {
    var soundId = 0;

    if (typeof(name) === 'string') {
      soundId = SOUND_MAP[this.platform][name];
    } else if (typeof(name) === 'number') {
      soundId = name;
    }
    if (!soundId) {
      alert('Invalid sound id provided to BGService#playSound' + name);
      return;
    }
    this.plugin.playSound(soundId);
  }

  toRad(n) {
    return n * (Math.PI / 180);
  }
  toDeg(n) {
    return n * (180 / Math.PI);
  }

  getBearing(start, end){
    let startLat = this.toRad(start.latitude);
    let startLong = this.toRad(start.longitude);
    let endLat = this.toRad(end.latitude);
    let endLong = this.toRad(end.longitude);

    let dLong = endLong - startLong;

    let dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
    if (Math.abs(dLong) > Math.PI){
      if (dLong > 0.0)
         dLong = -(2.0 * Math.PI - dLong);
      else
         dLong = (2.0 * Math.PI + dLong);
    }
    return (this.toDeg(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
  }

  computeOffsetCoordinate(coordinate, distance, heading) {
    distance = distance / (6371*1000);
    heading = this.toRad(heading);

    var lat1 = this.toRad(coordinate.latitude), lon1 = this.toRad(coordinate.longitude);
    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance) +
                        Math.cos(lat1) * Math.sin(distance) * Math.cos(heading));

    var lon2 = lon1 + Math.atan2(Math.sin(heading) * Math.sin(distance) *
                                Math.cos(lat1), 
                                Math.cos(distance) - Math.sin(lat1) *
                                Math.sin(lat2));

    if (isNaN(lat2) || isNaN(lon2)) return null;

    return {
      latitude: this.toDeg(lat2),
      longitude: this.toDeg(lon2)
    };
  }
}
module.exports = new BGService();