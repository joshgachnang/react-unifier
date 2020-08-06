import debounce from "lodash/debounce";
import * as React from "react";
import {Box} from "./Box";
import {Camera} from "./Camera";
import {showFullPageModal} from "./Modal";
import {Text} from "./Text";
import {Unifier} from "./Unifier";

interface BarcodeViewProps {
  callback: (number: number) => void;
  componentId: string;
}

interface BarcodeViewState {
  permissions: "authorized" | "denied" | "restricted" | "undetermined" | undefined;
  loading: boolean;
}

export class BarcodeView extends React.Component<BarcodeViewProps, BarcodeViewState> {
  state = {permissions: undefined, loading: false};
  camera: any;

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  async componentDidMount() {
    try {
      const response = await Unifier.utils.requestPermissions("camera");
      console.log("[Camera] Permissions:", response);
      this.setState({
        permissions: response as "authorized" | "denied" | "restricted" | "undetermined",
      });
    } catch (e) {
      console.log("[Camera] Permissions Error:", e);
      this.setState({permissions: e as "authorized" | "denied" | "restricted" | "undetermined"});
    }
  }

  onBarcodeRead = debounce(async (barcode: number) => {
    this.props.callback(Number(barcode));
  }, 1000);

  render() {
    // return null;
    if (this.state.permissions !== "authorized") {
      return (
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{backgroundColor: "black"}}
        >
          <Text size="lg" align="center" color="white">
            You need to authorize camera permissions.
          </Text>
        </Box>
      );
    }
    return (
      <Box height="100%" width="100%" style={{backgroundColor: "black"}}>
        {!this.state.loading && (
          <Camera
            ref={(ref: any) => {
              this.camera = ref;
            }}
            style={{height: "100%", width: "100%"}}
            type={Camera.Constants.Type.back}
            flashMode={
              this.state.loading ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch
            }
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera to scan barcodes",
              buttonPositive: "Ok",
              buttonNegative: "Cancel",
            }}
            onBarCodeRead={async (barcode: any) => {
              console.log("BarCodeRead", barcode, this.props);
              this.setState({loading: true});
              Unifier.navigation.dismissModal(this.props.componentId);
              this.onBarcodeRead(Number(barcode.data));
            }}
          />
        )}
      </Box>
    );
  }
}

export function openCameraView(callback: (number: number) => void) {
  showFullPageModal(BarcodeView, "Scan A Barcode", undefined, {
    callback,
  });
}
