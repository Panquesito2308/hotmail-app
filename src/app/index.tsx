import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const underwater = require("../../assets/images/underwater.png");

export default function SplashScreen1() {
  const { width, height } = useWindowDimensions();

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(35)).current;
  const scale = useRef(new Animated.Value(1.12)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 1300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 2500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/splash2");
    }, 2500);

    return () => clearTimeout(timer);
  }, [fade, slide, scale, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const titleSize = width >= 900 ? 92 : width >= 600 ? 70 : 48;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* FOTOGRAFÍA SUBMARINA */}

      <Animated.View
        style={[
          styles.imageContainer,
          {
            width,
            height,
            transform: [{ scale }],
          },
        ]}
      >
        <Image
          source={underwater}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Animated.View>

      <View style={styles.overlay} />

      {/* MARCA SUPERIOR */}

      <View style={styles.top}>
        <Text style={styles.brand}>BEYOND / 26</Text>

        <Text style={styles.topRight}>THE BEGINNING</Text>
      </View>

      {/* TÍTULO CENTRAL */}

      <View style={styles.center}>
        <Animated.View
          style={[
            styles.animatedContent,
            {
              opacity: fade,
              transform: [{ translateY: slide }],
            },
          ]}
        >
          <Text style={styles.eyebrow}>AN EXPERIENCE BENEATH THE ORDINARY</Text>

          <Text
            style={[
              styles.title,
              {
                fontSize: titleSize,
                lineHeight: titleSize * 1.08,
              },
            ]}
          >
            BEYOND{"\n"}
            THE{"\n"}
            <Text style={styles.blueText}>SURFACE.</Text>
          </Text>

          <View style={styles.line} />

          <Text style={styles.description}>
            Todo comienza debajo de la superficie.
          </Text>
        </Animated.View>
      </View>

      {/* BARRA DE CARGA */}

      <View style={styles.bottom}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.footerText}>LOADING EXPERIENCE</Text>

          <Text style={styles.footerText}>2026</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03101A",
    overflow: "hidden",
  },

  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(1, 12, 24, 0.57)",
  },

  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 55,
  },

  brand: {
    color: "#F1F7FC",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },

  topRight: {
    color: "#AFC4D2",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  animatedContent: {
    width: "100%",
  },

  eyebrow: {
    color: "#B9D7E9",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 24,
  },

  title: {
    color: "#F1F7FC",
    fontWeight: "900",
    letterSpacing: -1.5,
  },

  blueText: {
    color: "#82B5D4",
  },

  line: {
    width: 55,
    height: 2,
    backgroundColor: "#C4E2F5",
    marginTop: 28,
    marginBottom: 20,
  },

  description: {
    color: "#D0E0EA",
    fontSize: 14,
    lineHeight: 24,
  },

  bottom: {
    paddingHorizontal: 25,
    paddingBottom: 55,
  },

  progressTrack: {
    width: "100%",
    height: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#A6D5F2",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 17,
  },

  footerText: {
    color: "#AFC4D2",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
});
