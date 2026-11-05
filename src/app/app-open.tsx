import { router, useLocalSearchParams, type Href } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
    AdEventType,
    AppOpenAd,
    TestIds,
} from "react-native-google-mobile-ads";
import { verificarSesion } from "../utils/sesion";

const AD_UNIT_ID = TestIds.APP_OPEN;
const MAX_WAIT_MS = 8000;

const DESTINOS = [
  "/perfil-francisco",
  "/perfil-luis",
  "/perfil-sosa",
  "/perfil-sara",
] as const;

export default function AppOpenScreen() {
  const { redirect } = useLocalSearchParams<{
    redirect?: string;
  }>();

  const [mensaje, setMensaje] = useState("PREPARANDO TU EXPERIENCIA...");

  const finalizado = useRef(false);

  useEffect(() => {
    let activo = true;
    let anuncioVisible = false;
    let temporizador: ReturnType<typeof setTimeout> | null = null;
    let cancelarEventos: Array<() => void> = [];

    const destino =
      typeof redirect === "string" && DESTINOS.some((ruta) => ruta === redirect)
        ? redirect
        : "/perfil-francisco";

    const continuar = () => {
      if (!activo || finalizado.current) return;

      finalizado.current = true;

      if (temporizador) {
        clearTimeout(temporizador);
        temporizador = null;
      }

      router.replace(destino as Href);
    };

    const iniciar = async () => {
      const autenticado = await verificarSesion();

      if (!activo) return;

      if (!autenticado) {
        router.replace("/login");
        return;
      }

      const anuncio = AppOpenAd.createForAdRequest(AD_UNIT_ID, {
        requestNonPersonalizedAdsOnly: true,
      });

      const cargado = anuncio.addAdEventListener(AdEventType.LOADED, () => {
        if (!activo || finalizado.current) return;

        if (temporizador) {
          clearTimeout(temporizador);
          temporizador = null;
        }

        setMensaje("MOSTRANDO ANUNCIO...");

        anuncioVisible = true;

        anuncio.show().catch((error) => {
          console.log("Error mostrando anuncio:", error);
          anuncioVisible = false;
          continuar();
        });
      });

      const cerrado = anuncio.addAdEventListener(AdEventType.CLOSED, () => {
        anuncioVisible = false;
        continuar();
      });

      const error = anuncio.addAdEventListener(AdEventType.ERROR, (err) => {
        console.log("Error App Open Ad:", err);

        anuncioVisible = false;
        continuar();
      });

      cancelarEventos = [cargado, cerrado, error];

      temporizador = setTimeout(() => {
        if (!anuncioVisible) {
          console.log("AdMob tardó demasiado. Continuando sin anuncio.");
          continuar();
        }
      }, MAX_WAIT_MS);

      anuncio.load();
    };

    void iniciar().catch((error) => {
      console.log("Error iniciando App Open Ad:", error);

      if (activo) {
        router.replace("/login");
      }
    });

    return () => {
      activo = false;

      if (temporizador) {
        clearTimeout(temporizador);
      }

      cancelarEventos.forEach((cancelar) => cancelar());
    };
  }, [redirect]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BEYOND / 26</Text>

      <ActivityIndicator size="large" color="#82B5D4" />

      <Text style={styles.message}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03101A",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    padding: 24,
  },
  logo: {
    color: "#F1F7FC",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 3,
  },
  message: {
    color: "#AFC4D2",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "center",
  },
});
