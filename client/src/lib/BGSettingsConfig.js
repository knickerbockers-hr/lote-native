'use strict';

import BackgroundGeolocation from 'react-native-background-geolocation';

module.exports.Config = {
        // Geolocation Config
      desiredAccuracy: 0,
      distanceFilter: 5,


      stationaryRadius: 25,
      disableStopDetection: true, // debug mode
      disableMotionActivityUpdates: true, //debug mode
      
      preventSuspend: true,
      foregroundService: true,
      notificationTitle: 'Lote', // android show notification status
      forceReloadOnGeofence: true,
      geofenceProximityRadius: 10000,
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
}
