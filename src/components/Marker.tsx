import { LatLng, Marker as RNMMarker } from "react-native-maps";

type MarkerProps = {
  coordinate: LatLng;
};

export const Marker = ({ coordinate }: MarkerProps) => {
  return (
    <RNMMarker
      stopPropagation
      icon={require("../assets/pin.png")}
      // image={require("../assets/pin.png")}
      coordinate={coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  );
};
