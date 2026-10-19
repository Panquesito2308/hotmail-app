import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PerfilFrancisco() {
  return (
    <ImageBackground
      source={require("../../assets/images/underwater.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.eyebrow}>BEYOND THE SURFACE</Text>
          <Text style={styles.title}>FRANCISCO</Text>
          <Text style={styles.subtitle}>MY PERSONAL SPACE</Text>

          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={58} color="#BBD9E8" />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>ABOUT ME</Text>
            <Text style={styles.name}>Francisco</Text>
            <Text style={styles.description}>
              Hola, soy Francisco. Me gusta la tecnología, el diseño y
              desarrollar proyectos donde pueda combinar la creatividad con la
              programación.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>INFORMACIÓN ACADÉMICA</Text>

            <View style={styles.infoRow}>
              <Ionicons name="school-outline" size={19} color="#A9D4E9" />
              <Text style={styles.infoText}>Carrera: Por completar</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="book-outline" size={19} color="#A9D4E9" />
              <Text style={styles.infoText}>Materia: Por completar</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={19} color="#A9D4E9" />
              <Text style={styles.infoText}>Semestre: Por completar</Text>
            </View>
          </View>

          <Text style={styles.footer}>
            HIT ME HARD AND SOFT — INSPIRED EXPERIENCE
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#061323",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(3, 13, 28, 0.67)",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 65,
    paddingBottom: 45,
  },
  backButton: {
    alignSelf: "flex-start",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.07)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 42,
  },
  eyebrow: {
    color: "#B6CEDC",
    fontSize: 10,
    letterSpacing: 4,
    fontWeight: "600",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: 3,
    marginTop: 12,
  },
  subtitle: {
    color: "#A4C3D5",
    fontSize: 11,
    letterSpacing: 4,
    marginTop: 6,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "rgba(183,220,238,0.55)",
    backgroundColor: "rgba(145,190,215,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginBottom: 30,
  },
  card: {
    width: "100%",
    borderRadius: 22,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(191,224,240,0.22)",
    backgroundColor: "rgba(8, 27, 49, 0.82)",
  },
  sectionLabel: {
    color: "#91BDD3",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2.5,
    marginBottom: 14,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    color: "#D0DFE8",
    fontSize: 14,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.13)",
    marginVertical: 26,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  infoText: {
    color: "#E0EBF1",
    fontSize: 14,
    flex: 1,
  },
  footer: {
    color: "rgba(215,232,241,0.65)",
    fontSize: 9,
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 38,
  },
});
