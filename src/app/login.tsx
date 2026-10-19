import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const underwater = require("../../assets/images/underwater.png");

const C = {
  background: "#03101A",
  surface: "#061827",
  white: "#F1F7FC",
  blue: "#82B5D4",
  muted: "#AFC4D2",
  border: "#294456",
};

const PERFILES = {
  "/perfil-francisco": "FRANCISCO",
  "/perfil-adrian": "ADRIÁN",
} as const;

export default function LoginScreen() {
  const { width, height } = useWindowDimensions();

  const { redirect } = useLocalSearchParams<{
    redirect?: string;
  }>();

  const perfilNombre =
    typeof redirect === "string" &&
    Object.prototype.hasOwnProperty.call(PERFILES, redirect)
      ? PERFILES[redirect as keyof typeof PERFILES]
      : null;

  const mobile = width < 600;

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(35)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 1100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  const handleTikTokLogin = () => {
    Alert.alert(
      "TikTok Login",
      "La autenticación real con TikTok está pendiente. Todavía no se ha iniciado sesión.",
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <Image
        source={underwater}
        resizeMode="cover"
        style={[styles.backgroundImage, { width, height }]}
      />

      <View style={styles.overlay} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            minHeight: height,
            paddingHorizontal: mobile ? 24 : 48,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navbar}>
          <Text style={styles.brand}>BEYOND / 26</Text>

          <TouchableOpacity onPress={() => router.replace("/about")}>
            <Text style={styles.navLink}>BACK ↗</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fade,
              transform: [{ translateY: slide }],
            },
          ]}
        >
          <Text style={styles.eyebrow}>01 / THE EXPERIENCE</Text>

          <Text
            style={[
              styles.title,
              {
                fontSize: mobile ? 49 : 78,
                lineHeight: mobile ? 52 : 83,
              },
            ]}
          >
            DIVE{"\n"}
            INTO THE{"\n"}
            <Text style={styles.blueText}>UNKNOWN.</Text>
          </Text>

          <View style={styles.line} />

          <Text style={styles.description}>
            Cada historia tiene algo que descubrir. Inicia sesión para conocer a
            las personas detrás de esta experiencia.
          </Text>

          {perfilNombre && (
            <View style={styles.profileBox}>
              <Text style={styles.profileLabel}>YOUR DESTINATION / 01</Text>

              <Text style={styles.profileName}>{perfilNombre}</Text>

              <Text style={styles.profileHint}>
                Este perfil estará disponible después de iniciar sesión.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleTikTokLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginButtonText}>CONTINUAR CON TIKTOK</Text>

            <Text style={styles.loginArrow}>↗</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Autenticación mediante TikTok Login Kit. La conexión con TikTok
            todavía está en desarrollo.
          </Text>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.micro}>HIT ME HARD AND SOFT / INSPIRED</Text>

          <Text style={styles.micro}>2026 ©</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.background,
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(1, 12, 24, 0.68)",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    width: "100%",
    alignSelf: "center",
    maxWidth: 1200,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 35,
  },

  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: {
    color: C.white,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },

  navLink: {
    color: C.white,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  content: {
    width: "100%",
    maxWidth: 650,
    paddingVertical: 60,
  },

  eyebrow: {
    color: "#B9D7E9",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 25,
  },

  title: {
    color: C.white,
    fontWeight: "900",
    letterSpacing: -1.5,
  },

  blueText: {
    color: C.blue,
  },

  line: {
    width: 55,
    height: 2,
    backgroundColor: "#E0F2FF",
    marginTop: 30,
    marginBottom: 25,
  },

  description: {
    color: "#E1ECF3",
    fontSize: 15,
    lineHeight: 25,
    maxWidth: 390,
    marginBottom: 30,
  },

  profileBox: {
    backgroundColor: "rgba(6, 24, 39, 0.75)",
    borderWidth: 1,
    borderColor: C.border,
    padding: 20,
    marginBottom: 25,
  },

  profileLabel: {
    color: C.blue,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  profileName: {
    color: C.white,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
  },

  profileHint: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 8,
  },

  loginButton: {
    width: "100%",
    maxWidth: 420,
    minHeight: 58,
    backgroundColor: "#B9D7E9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  loginButtonText: {
    color: "#03101A",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },

  loginArrow: {
    color: "#03101A",
    fontSize: 24,
    fontWeight: "700",
  },

  disclaimer: {
    color: "#AFC4D2",
    fontSize: 11,
    lineHeight: 19,
    maxWidth: 420,
    marginTop: 20,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  micro: {
    color: "#B4C9D9",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
