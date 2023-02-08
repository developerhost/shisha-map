import { useEffect, useState } from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import { Map } from "./src/components/Map";
import { Marker } from "./src/components/Marker";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await Promise.all([...cacheImages()]);
      setIsReady(true);
    })();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Map>
      <Marker coordinate={{ latitude: -33.8688, longitude: 151.2099 }} />
    </Map>
  );
}

/**
 *
 * https://docs.expo.dev/archive/classic-updates/preloading-and-caching-assets/#pre-loading-and-caching-assets
 */
function cacheImages() {
  return [require("./src/assets/pin.png")].map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
