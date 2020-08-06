import {Alert, Platform} from "react-native";
import RNGooglePlaces from "react-native-google-places";
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import Permissions from "react-native-permissions";
import {Tracking} from "./Tracking";

export interface LocationPoint {
  latitude: number;
  longitude: number;
  speed: number;
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  bearing: number;
  heading: number;
  time: Date;
}

const DEFAULT_CONFIGURATION = {
  locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
  desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  distanceFilter: 10,
  stationaryFilter: 10,
  interval: 60 * 1000, /// 1 minute
  fastestIntervial: 60 * 1000, // 1 minute
  stopOnTerminate: true,
  startOnBoot: false,
  foregroundService: false,
  startForeground: true,
  notificationsEnabled: false,
  notificationTitle: "AvoToast",
  notificationText: "",
  debug: false,
  pauseLocationUpdates: false,
  logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
};

export interface Place {
  name: string;
  latitude: number;
  longitude: number;
  placeID: string;
  address: string;
}

type LocationCallback = (location: LocationPoint) => void;

export class Location {
  static instance: Location;

  enabled = false;
  authorized = false;
  onLocationCallback?: LocationCallback = undefined;

  /**
   * @returns {CommonDataManager}
   */
  static getInstance() {
    if (Location.instance == undefined) {
      Location.instance = new Location();
    }
    return this.instance;
  }

  constructor() {
    BackgroundGeolocation.on("location", (location: LocationPoint) => {
      Tracking.log("[location] on location event", location);
      if (this.onLocationCallback) {
        this.onLocationCallback(location);
      }
    });

    BackgroundGeolocation.on("stationary", (location: LocationPoint) => {
      Tracking.log("[location] stationary location event", location);
      if (this.onLocationCallback) {
        this.onLocationCallback(location);
      }
    });

    BackgroundGeolocation.on("error", (error: string) => {
      Tracking.warn("[location] BackgroundGeolocation error:", error);
    });

    BackgroundGeolocation.on("start", () => {
      Tracking.log("[location] BackgroundGeolocation service has been started");
    });

    BackgroundGeolocation.on("stop", () => {
      Tracking.log("[location] BackgroundGeolocation service has been stopped");
    });

    BackgroundGeolocation.on("authorization", (status: any) => {
      Tracking.log(
        `[location] BackgroundGeolocation authorization status: ${status}`,
        BackgroundGeolocation.AUTHORIZED
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              "App requires location tracking permission",
              "Would you like to open app settings?",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    Tracking.log("[location] Attempting to fix location permissions");
                    BackgroundGeolocation.showAppSettings();
                  },
                },
                {
                  text: "No",
                  onPress: () => Tracking.log("[location] Denied fixing location permissions"),
                  style: "cancel",
                },
              ]
            ),
          1000
        );
      }
    });

    BackgroundGeolocation.on("background", () => {
      Tracking.log("[location] App is in background");
    });

    BackgroundGeolocation.on("foreground", () => {
      Tracking.log("[location] App is in foreground");
    });

    BackgroundGeolocation.configure(DEFAULT_CONFIGURATION);
  }

  start(callback: LocationCallback, extraConfiguration?: any) {
    Tracking.log("[location] Starting location tracking");
    BackgroundGeolocation.configure(Object.assign({}, DEFAULT_CONFIGURATION, extraConfiguration));
    this.onLocationCallback = callback;
    BackgroundGeolocation.start();
  }

  stop() {
    Tracking.log("[location] Stopping location tracking");
    BackgroundGeolocation.stop();
  }

  getLocation(successCallback: any, failureCallback?: any) {
    Tracking.log("[location] Fetching current location");
    let fail = failureCallback;
    if (!fail) {
      fail = (code: number, message: string) => {
        Tracking.error(
          `[location] Failed to get current location. code: ${code}. message: ${message}`
        );
      };
    }
    BackgroundGeolocation.getCurrentLocation(successCallback, fail, {
      timeout: 2 * 60 * 1000, // 2 minutes
      maximumAge: 30 * 60 * 1000, // 30 minutes
      enableHighAccuracy: true,
    });
  }

  static async promptForPermissionsWithAlert() {
    let status = await this.checkPermissions("always");
    if (status === "authorized" || status === "restricted") {
      return;
    }
    let explainer =
      "We will use your location to let your family and friends know when you have made it home " +
      "safely.";
    if (Platform.OS === "ios") {
      explainer +=
        '\nPlease select "Always Allow" so we can continue tracking when the app ' + "isn't open";
    }
    Alert.alert("Can we access your location?", explainer, [
      {
        text: "Don't Allow",
        onPress: () => {
          Tracking.trackPermission("Location", "softDenied", true);
          return "softDenied";
        },
        style: "cancel",
      },
      status === "undetermined"
        ? {text: "OK", onPress: () => this.promptForPermissions("always")}
        : {text: "Open Settings", onPress: Permissions.openSettings},
    ]);
  }

  static async promptForPermissions(type: "always" | "whenInUse" = "whenInUse") {
    let response = await Permissions.request("location", type);
    Tracking.trackPermission("Location", response, true);
    return response;
  }

  static async checkPermissions(type: "always" | "whenInUse" = "whenInUse") {
    let response = await Permissions.check("location", type);
    Tracking.trackPermission("Location", response, false);
    return response;
  }

  static openLocationPicker(): Promise<Place> {
    return new Promise((resolve, reject) => {
      // setTimeout(async () => {
      RNGooglePlaces.openPlacePickerModal()
        .then((location: Place) => {
          Tracking.track("AddLocation", {location});
          resolve(location);
        })
        .catch((error: any) => {
          if (error.message === "Search cancelled") {
            resolve();
          } else {
            Tracking.error(error.message);
            reject();
          }
        });
    });
    // });
  }
}
