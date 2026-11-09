import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import {
    AdEventType,
    AppOpenAd,
    TestIds,
} from "react-native-google-mobile-ads";

const APP_OPEN_ID = TestIds.APP_OPEN;
const MIN_INTERVAL = 4 * 60 * 60 * 1000;

export default function AppOpenAds() {
  const appState = useRef<string>(AppState.currentState ?? "active");
  const adRef = useRef<AppOpenAd | null>(null);
  const loadedAt = useRef(0);
  const lastShownAt = useRef(0);
  const showing = useRef(false);

  useEffect(() => {
    const ad = AppOpenAd.createForAdRequest(APP_OPEN_ID, {
      requestNonPersonalizedAdsOnly: true,
    });

    adRef.current = ad;

    const loaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      loadedAt.current = Date.now();
    });

    const closed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      showing.current = false;
      ad.load();
    });

    const error = ad.addAdEventListener(AdEventType.ERROR, (err) => {
      showing.current = false;
      console.log("Error App Open Ad:", err);
    });

    ad.load();

    const subscription = AppState.addEventListener("change", (nextState) => {
      const returnedToForeground =
        appState.current.match(/inactive|background/) && nextState === "active";

      appState.current = nextState;

      if (!returnedToForeground) return;
      if (showing.current) return;
      if (!loadedAt.current) return;

      const now = Date.now();

      if (now - lastShownAt.current < MIN_INTERVAL) {
        return;
      }

      // Los App Open Ads precargados caducan
      // después de aproximadamente 4 horas.
      if (now - loadedAt.current >= MIN_INTERVAL) {
        ad.load();
        return;
      }

      showing.current = true;
      lastShownAt.current = now;
      loadedAt.current = 0;
      ad.show();
    });

    return () => {
      subscription.remove();
      loaded();
      closed();
      error();
      adRef.current = null;
    };
  }, []);

  return null;
}
