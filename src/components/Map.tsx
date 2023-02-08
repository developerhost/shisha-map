import React, { ReactNode } from "react";
import RNMMap from "react-native-maps";

type MapProps = {
  children?: ReactNode;
};

export const Map = ({ children }: MapProps) => {
  return (
    <RNMMap
      style={{ flex: 1 }}
      initialCamera={{
        center: { latitude: -33.8688, longitude: 151.2099 },
        zoom: 3,
        heading: 0,
        pitch: 0,
      }}
      rotateEnabled={false}
      pitchEnabled={false}
      moveOnMarkerPress={false}
      toolbarEnabled={false}
      provider="google"
    >
      {children}
    </RNMMap>
  );
};
