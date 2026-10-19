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

export default function Splash2Screen() {
  const { width, height } = useWindowDimensions();

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(45)).current;
  const imageScale = useRef(new Animated.Value(1.15)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const isMobile = width < 600;

  const titleSize =
    width >= 900 ? 90 : width >= 600 ? 65 : width < 380 ? 40 : 48;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 3000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/about");
    }, 3000);

    return () => clearTimeout(timer);
  }, [fade, slide, imageScale, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* FOTOGRAFÍA DE FONDO */}

      <Animated.View
        style={[
          styles.imageContainer,
          {
            width,
            height,
            transform: [{ scale: imageScale }],
          },
        ]}
      >
        <Image source={underwater} resizeMode="cover" style={styles.image} />
      </Animated.View>

      {/* CAPAS OSCURAS */}

      <View style={styles.overlay} />

      <View style={styles.topGradient} />

      {/* ENCABEZADO */}

      <View style={styles.header}>
        <Text style={styles.brand}>BEYOND / 26</Text>

        <Text style={styles.headerRight}>CHAPTER 02</Text>
      </View>

      {/* CONTENIDO CENTRAL */}

      <View style={styles.center}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fade,
              transform: [{ translateY: slide }],
            },
          ]}
        >
          <Text style={styles.eyebrow}>A NEW DIGITAL EXPERIENCE</Text>

          <Text
            style={[
              styles.title,
              {
                fontSize: titleSize,
                lineHeight: titleSize * 1.08,
                letterSpacing: isMobile ? -1.5 : -3,
              },
            ]}
          >
            FEEL{"\n"}
            THE{"\n"}
            <Text style={styles.blueText}>DEPTH.</Text>
          </Text>

          <View style={styles.line} />

          <Text style={styles.description}>
            La creatividad no tiene límites.
            {"\n"}
            Nuestra historia comienza aquí.
          </Text>
        </Animated.View>
      </View>

      {/* INDICADOR INFERIOR */}

      <View style={styles.bottom}>
        <Text style={styles.loadingText}>ENTERING THE EXPERIENCE</Text>

        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.footerText}>DESIGN × TECHNOLOGY</Text>

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

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(1, 13, 28, 0.65)",
  },

  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: "rgba(1, 10, 20, 0.25)",
  },

  header: {
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

  headerRight: {
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

  content: {
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

  loadingText: {
    color: "#C4DAE8",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 15,
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
