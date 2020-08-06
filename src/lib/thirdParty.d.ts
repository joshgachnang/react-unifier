declare module "react-native-google-places" {
  export default class GooglePlaces {
    static openPlacePickerModal(): Promise<any>;
  }
}

declare module "react-native-mauron85-background-geolocation" {
  export default class BackgroundGeolocation {
    static AUTHORIZED: string;
    static LOG_LEVEL_VERBOSE: string;
    static HIGH_ACCURACY: string;
    static RAW_PROVIDER: string;
    static DISTANCE_FILTER_PROVIDER: string;

    static on(event: string, callback: (arg: any) => void): void;
    static showAppSettings(): void;
    static configure(args: any): void;
    static start(): void;
    static stop(): void;
    static getCurrentLocation(success: any, failure: any, options: any): void;
    static startTask(callback: any): void;
    static endTask(taskKey: string): void;
  }
}
