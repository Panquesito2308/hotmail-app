import * as Crypto from "expo-crypto";

import { router, useLocalSearchParams, type Href } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { guardarSesion, verificarSesion } from "../utils/sesion";

import { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Animated,
  AppState,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const underwater = require("../../assets/images/underwater.png");

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") || "";

const PERFILES = {
  "/perfil-francisco": "FRANCISCO",

  "/perfil-luis": "LUIS",
} as const;

type Perfil = keyof typeof PERFILES;

type Solicitud = { state: string; verifier: string; startedAt: number };

// Solo en memoria: se borra al reiniciar la app. No es almacenamiento persistente.

let tokenDeSesion: string | null = null;

export function obtenerTokenTikTok() {
  return tokenDeSesion;
}

export default function LoginScreen() {
  const { width, height } = useWindowDimensions();

  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const perfil: Perfil =
    typeof redirect === "string" && redirect in PERFILES
      ? (redirect as Perfil)
      : "/perfil-francisco";

  const [loading, setLoading] = useState(false);

  const [esperando, setEsperando] = useState(false);

  const [loginError, setLoginError] = useState<string | null>(null);

  const [mensaje, setMensaje] = useState("");

  const solicitud = useRef<Solicitud | null>(null);

  const consultando = useRef(false);

  const activo = useRef(true);

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

    return () => {
      activo.current = false;
    };
  }, [fade, slide]);

  // Si ya existe una sesión válida, no volver a solicitar TikTok.
  useEffect(() => {
    let cancelado = false;
    void (async () => {
      const autenticado = await verificarSesion();
      if (!cancelado && autenticado) {
        router.replace(perfil as Href);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [perfil]);

  async function consultarSesion() {
    const actual = solicitud.current;

    if (!actual || consultando.current || !API_URL) return;

    if (Date.now() - actual.startedAt > 10 * 60 * 1000) {
      solicitud.current = null;

      setEsperando(false);

      setLoginError("La autorización expiró. Intenta nuevamente.");

      return;
    }

    consultando.current = true;

    try {
      const respuesta = await fetch(`${API_URL}/auth/tiktok/poll`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          state: actual.state,

          verifier: actual.verifier,
        }),
      });

      const datos = await respuesta.json();

      if (datos.status === "pending") return;

      if (
        !respuesta.ok ||
        datos.status !== "complete" ||
        typeof datos.sessionToken !== "string"
      ) {
        throw new Error(datos.error || "No se pudo recuperar la sesión.");
      }

      // Confirmar el token con el servidor antes de navegar.

      const comprobacion = await fetch(`${API_URL}/auth/session`, {
        headers: { Authorization: `Bearer ${datos.sessionToken}` },
      });

      const sesion = await comprobacion.json();

      if (!comprobacion.ok || sesion.authenticated !== true) {
        throw new Error("No se pudo validar la sesión.");
      }

      await guardarSesion(datos.sessionToken);
      tokenDeSesion = datos.sessionToken;

      solicitud.current = null;

      if (activo.current) {
        setEsperando(false);

        router.replace(perfil as Href);
      }
    } catch (err) {
      solicitud.current = null;

      if (activo.current) {
        setEsperando(false);

        setLoginError(
          err instanceof Error ? err.message : "Error al comprobar TikTok.",
        );
      }
    } finally {
      consultando.current = false;
    }
  }

  // Consulta solo al volver a Expo Go o mientras está visible.

  useEffect(() => {
    if (!esperando) return;

    const intervalo = setInterval(() => {
      if (AppState.currentState === "active") void consultarSesion();
    }, 2500);

    const suscripcion = AppState.addEventListener("change", (estado) => {
      if (estado === "active") void consultarSesion();
    });

    return () => {
      clearInterval(intervalo);

      suscripcion.remove();
    };
  }, [esperando, perfil]);

  async function handleTikTokLogin() {
    if (loading || esperando) return;

    setLoading(true);

    setLoginError(null);

    setMensaje("");

    try {
      if (!API_URL)
        throw new Error("Falta EXPO_PUBLIC_API_URL en el .env de Expo.");

      const bytes = await Crypto.getRandomBytesAsync(32);

      const verifier = Array.from(bytes, (b) =>
        b.toString(16).padStart(2, "0"),
      ).join("");

      const challenge = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,

        verifier,
      );

      const respuesta = await fetch(`${API_URL}/auth/tiktok/start`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ challenge }),
      });

      const datos = await respuesta.json();

      if (
        !respuesta.ok ||
        !/^[a-f0-9]{64}$/.test(datos.state || "") ||
        typeof datos.authorizationUrl !== "string" ||
        !datos.authorizationUrl.startsWith(
          "https://www.tiktok.com/v2/auth/authorize/",
        )
      ) {
        throw new Error(datos.error || "El servidor no pudo iniciar TikTok.");
      }

      solicitud.current = {
        state: datos.state,

        verifier,

        startedAt: Date.now(),
      };

      setEsperando(true);

      setMensaje("Autoriza TikTok en Safari y regresa a Expo Go.");

      await Linking.openURL(datos.authorizationUrl);
    } catch (err) {
      solicitud.current = null;

      setEsperando(false);

      setLoginError(
        err instanceof Error ? err.message : "Error al abrir TikTok.",
      );
    } finally {
      setLoading(false);
    }
  }

  const mobile = width < 600;

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

          { minHeight: height, paddingHorizontal: mobile ? 24 : 48 },
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

            { opacity: fade, transform: [{ translateY: slide }] },
          ]}
        >
          <Text style={styles.eyebrow}>01 / THE EXPERIENCE</Text>

          <Text
            style={[
              styles.title,

              { fontSize: mobile ? 49 : 78, lineHeight: mobile ? 52 : 83 },
            ]}
          >
            DIVE{"\n"}INTO THE{"\n"}
            <Text style={styles.blueText}>UNKNOWN.</Text>
          </Text>

          <View style={styles.line} />

          <Text style={styles.description}>
            Cada historia tiene algo que descubrir. Inicia sesión para conocer a
            las personas detrás de esta experiencia.
          </Text>

          <View style={styles.profileBox}>
            <Text style={styles.profileLabel}>YOUR DESTINATION / 01</Text>

            <Text style={styles.profileName}>{PERFILES[perfil]}</Text>

            <Text style={styles.profileHint}>
              Este perfil estará disponible después de iniciar sesión.
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,

              (loading || esperando) && styles.loginButtonDisabled,
            ]}
            onPress={handleTikTokLogin}
            activeOpacity={0.85}
            disabled={loading || esperando}
          >
            <Text style={styles.loginButtonText}>
              {loading
                ? "CONECTANDO CON TIKTOK..."
                : esperando
                  ? "ESPERANDO AUTORIZACIÓN..."
                  : "CONTINUAR CON TIKTOK"}
            </Text>

            {loading || esperando ? (
              <ActivityIndicator size="small" color="#03101A" />
            ) : (
              <Text style={styles.loginArrow}>↗</Text>
            )}
          </TouchableOpacity>

          {esperando && <Text style={styles.disclaimer}>{mensaje}</Text>}

          {loginError && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{loginError}</Text>
            </View>
          )}

          <Text style={styles.disclaimer}>
            Autenticación mediante TikTok Login Kit. Después de autorizar en
            Safari, vuelve a Expo Go para continuar.
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

const C = {
  background: "#03101A",

  white: "#F1F7FC",

  blue: "#82B5D4",

  muted: "#AFC4D2",

  border: "#294456",
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.background },

  backgroundImage: { position: "absolute", top: 0, left: 0 },

  overlay: {
    ...StyleSheet.absoluteFill,

    backgroundColor: "rgba(1, 12, 24, 0.68)",
  },

  scroll: { flex: 1 },

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

  brand: { color: C.white, fontSize: 12, fontWeight: "900", letterSpacing: 2 },

  navLink: {
    color: C.white,

    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 1.5,
  },

  content: { width: "100%", maxWidth: 650, paddingVertical: 60 },

  eyebrow: {
    color: "#B9D7E9",

    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    marginBottom: 25,
  },

  title: { color: C.white, fontWeight: "900", letterSpacing: -1.5 },

  blueText: { color: C.blue },

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

  profileHint: { color: C.muted, fontSize: 12, lineHeight: 20, marginTop: 8 },

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

  loginButtonDisabled: { opacity: 0.65 },

  loginButtonText: {
    color: "#03101A",

    fontSize: 13,

    fontWeight: "900",

    letterSpacing: 1,

    flexShrink: 1,
  },

  loginArrow: { color: "#03101A", fontSize: 24, fontWeight: "700" },

  errorBox: {
    width: "100%",

    maxWidth: 420,

    marginTop: 15,

    padding: 15,

    backgroundColor: "rgba(130, 30, 40, 0.25)",

    borderWidth: 1,

    borderColor: "rgba(255, 160, 170, 0.35)",
  },

  errorText: { color: "#FFB7B7", fontSize: 12, lineHeight: 19 },

  disclaimer: {
    color: C.muted,

    fontSize: 11,

    lineHeight: 19,

    maxWidth: 420,

    marginTop: 20,
  },

  footer: { flexDirection: "row", justifyContent: "space-between", gap: 10 },

  micro: { color: "#B4C9D9", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
});
