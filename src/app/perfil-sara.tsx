
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PerfilSara() {
  const formacion = [
    "🎓 Estudiante",
    "📚 En formación",
    "🌷 Crecimiento personal",
    "✨ Nuevos aprendizajes",
  ];

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#342044"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.navigation}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityLabel="Regresar"
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <Text style={styles.headerLabel}>
              Mi espacio personal
            </Text>

            <Ionicons
              name="sparkles"
              size={24}
              color="#F2A9D1"
            />
          </View>

          <Text style={styles.greeting}>
            ¡Hola, soy Sara!
          </Text>

          <Text style={styles.headerSubtitle}>
            Bienvenido a un pedacito de mi mundo ✨
          </Text>

          <View style={styles.circleOne} />
          <View style={styles.circleTwo} />
        </View>

        <View style={styles.content}>
          {/* PRESENTACIÓN PERSONAL */}
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Ionicons
                name="person-outline"
                size={48}
                color="#F7C8E4"
              />
            </View>

            <Text style={styles.name}>
              Sara Elizabeth Cruz Gómez
            </Text>

            <Text style={styles.role}>
              Estudiante de Ingeniería
            </Text>

            <Text style={styles.roleDetail}>
              En proceso de formación profesional
            </Text>

            <View style={styles.universityBadge}>
              <Text style={styles.universityText}>
                Universidad Tecnológica de la Selva
              </Text>
            </View>
          </View>

          {/* CUATRIMESTRE Y GRUPO */}
          <View style={styles.statsRow}>
            <View style={styles.semesterCard}>
              <Ionicons
                name="school-outline"
                size={25}
                color="#F0A8D2"
              />

              <Text style={styles.semesterNumber}>
                10°
              </Text>

              <Text style={styles.statLabel}>
                Cuatrimestre
              </Text>
            </View>

            <View style={styles.groupCard}>
              <Ionicons
                name="people-outline"
                size={25}
                color="#B6A7FA"
              />

              <Text style={styles.groupNumber}>
                A
              </Text>

              <Text style={styles.statLabel}>
                Grupo
              </Text>
            </View>
          </View>

          {/* SOBRE MÍ */}
          <View style={styles.card}>
            <View style={styles.sectionHeading}>
              <Ionicons
                name="heart-outline"
                size={24}
                color="#F0A8D2"
              />

              <Text style={styles.sectionTitle}>
                Un poquito sobre mí
              </Text>
            </View>

            <Text style={styles.paragraph}>
              ¡Hola! Soy Sara Elizabeth, actualmente
              soy estudiante de Ingeniería en
              Desarrollo y Gestión de Software.
              Me encuentro en proceso de formación
              académica, adquiriendo nuevos
              conocimientos y experiencias que
              me ayudarán a crecer tanto personal
              como profesionalmente.
            </Text>

            <Text style={styles.paragraph}>
              Cada día sigo aprendiendo y
              esforzándome para alcanzar mis metas
              y continuar preparándome para mi futuro.
            </Text>
          </View>

          {/* MI FORMACIÓN ACADÉMICA */}
          <View style={styles.card}>
            <View style={styles.sectionHeading}>
              <Ionicons
                name="book-outline"
                size={24}
                color="#F0A8D2"
              />

              <Text style={styles.sectionTitle}>
                Mi formación
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons
                name="laptop-outline"
                size={22}
                color="#C4B5FD"
              />

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  CARRERA
                </Text>

                <Text style={styles.infoValue}>
                  Ingeniería en Desarrollo y
                  Gestión de Software
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons
                name="book-outline"
                size={22}
                color="#C4B5FD"
              />

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  MATERIA
                </Text>

                <Text style={styles.infoValue}>
                  Desarrollo Móvil Integral
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons
                name="location-outline"
                size={22}
                color="#C4B5FD"
              />

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  UNIVERSIDAD
                </Text>

                <Text style={styles.infoValue}>
                  Universidad Tecnológica de la Selva
                </Text>
              </View>
            </View>
          </View>

          {/* PROCESO DE FORMACIÓN */}
          <View style={styles.card}>
            <View style={styles.sectionHeading}>
              <Ionicons
                name="star-outline"
                size={24}
                color="#F0A8D2"
              />

              <Text style={styles.sectionTitle}>
                Mi proceso de formación
              </Text>
            </View>

            <View style={styles.tags}>
              {formacion.map((item) => (
                <View
                  key={item}
                  style={styles.tag}
                >
                  <Text style={styles.tagText}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* FRASE PERSONAL */}
          <View style={styles.quoteCard}>
            <Ionicons
              name="sparkles-outline"
              size={24}
              color="#F0A8D2"
            />

            <Text style={styles.quote}>
              "Cada día es una nueva oportunidad
              para aprender, crecer y cumplir mis sueños."
            </Text>
          </View>

          {/* PIE DE PÁGINA */}
          <Text style={styles.footer}>
            Hecho con 💗 por Sara
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#100D1E",
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  header: {
    backgroundColor: "#342044",
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 80,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    overflow: "hidden",
  },

  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
    zIndex: 2,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#57345F",
    alignItems: "center",
    justifyContent: "center",
  },

  headerLabel: {
    color: "#F5DDF3",
    fontSize: 15,
    fontWeight: "600",
  },

  greeting: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    zIndex: 2,
  },

  headerSubtitle: {
    color: "#E4C3DB",
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
    zIndex: 2,
  },

  circleOne: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: 65,
    right: -70,
  },

  circleTwo: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
    bottom: -40,
    left: -25,
  },

  content: {
    paddingHorizontal: 18,
    marginTop: -48,
  },

  profileCard: {
    backgroundColor: "#21182F",
    borderRadius: 26,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#503452",
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#473052",
    borderWidth: 3,
    borderColor: "#CE84B9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  name: {
    color: "#FFF1F9",
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
  },

  role: {
    color: "#E8CAE4",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },

  roleDetail: {
    color: "#D3AED1",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },

  universityBadge: {
    backgroundColor: "#412844",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    marginTop: 15,
  },

  universityText: {
    color: "#F1B8DD",
    fontSize: 11,
    textAlign: "center",
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },

  semesterCard: {
    flex: 1,
    backgroundColor: "#32213E",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    gap: 5,
  },

  groupCard: {
    flex: 1,
    backgroundColor: "#252344",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    gap: 5,
  },

  semesterNumber: {
    fontSize: 30,
    color: "#F0A8D2",
    fontWeight: "800",
  },

  groupNumber: {
    fontSize: 30,
    color: "#B6A7FA",
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 12,
    color: "#C8A9CF",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#21182F",
    borderRadius: 22,
    padding: 20,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: "#503452",
  },

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  sectionTitle: {
    color: "#F8D9EB",
    fontSize: 17,
    fontWeight: "700",
    flexShrink: 1,
  },

  paragraph: {
    color: "#DBC8DF",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: "#CDA5C9",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 1,
  },

  infoValue: {
    color: "#F2E8F5",
    fontSize: 14,
    lineHeight: 22,
  },

  divider: {
    height: 1,
    backgroundColor: "#503452",
    marginVertical: 17,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  tag: {
    backgroundColor: "#412844",
    borderRadius: 25,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },

  tagText: {
    color: "#F2BEDD",
    fontSize: 12,
    fontWeight: "600",
  },

  quoteCard: {
    backgroundColor: "#32213E",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    gap: 12,
    marginBottom: 25,
  },

  quote: {
    color: "#F0D1E8",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 23,
  },

  footer: {
    color: "#BE91B9",
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 15,
  },
});
