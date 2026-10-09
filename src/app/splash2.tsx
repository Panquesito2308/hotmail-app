
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Splash2Screen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/about");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>H</Text>
      </View>

      <Text style={styles.title}>Hotmail App</Text>
      <Text style={styles.subtitle}>
        Conecta tu cuenta de Microsoft de forma sencilla.
      </Text>

      <ActivityIndicator
        size="large"
        color="#FFFFFF"
        style={styles.loader}
      />

      <Text style={styles.footer}>Cargando aplicación...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0078D4",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  logoText: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#0078D4",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#E5F2FC",
    textAlign: "center",
    lineHeight: 24,
  },
  loader: {
    marginTop: 40,
  },
  footer: {
    position: "absolute",
    bottom: 45,
    color: "#E5F2FC",
    fontSize: 14,
  },
});
