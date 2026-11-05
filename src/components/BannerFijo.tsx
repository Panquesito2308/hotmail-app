import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const BANNER_ID = "ca-app-pub-5723112193325409/1084611171";

export default function BannerFijo() {
  return (
    <BannerAd
      unitId={__DEV__ ? TestIds.BANNER : BANNER_ID}
      size={BannerAdSize.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
