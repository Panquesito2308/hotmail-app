import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen1() {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Cambiando a Splash 2...");
      router.replace("/splash2");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoLetter}>H</Text>
      </View>

      <Text style={styles.title}>Hotmail</Text>

      <Text style={styles.subtitle}>Conecta tu cuenta de Microsoft</Text>

      <ActivityIndicator size="small" color="#ffffff" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0078D4",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 90,
    height: 90,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  logoLetter: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#0078D4",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
  },

  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 10,
  },

  loader: {
    marginTop: 30,
  },
});
