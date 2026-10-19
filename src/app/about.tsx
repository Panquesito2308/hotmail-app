import { router } from "expo-router";

import { StatusBar } from "expo-status-bar";

import { useEffect, useRef } from "react";

import {
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

export default function AboutScreen() {
  const { width, height } = useWindowDimensions();

  const desktop = width >= 900;

  const tablet = width >= 600 && width < 900;

  const mobile = width < 600;

  const padding = desktop ? 64 : tablet ? 40 : 22;

  const heroHeight = desktop
    ? Math.max(760, height)
    : Math.max(650, height * 0.9);

  const statementHeight = desktop ? 550 : mobile ? 460 : 500;

  const heroFont = desktop ? 100 : tablet ? 75 : width < 380 ? 43 : 52;

  const headingFont = desktop ? 52 : tablet ? 44 : 34;

  const statementFont = desktop ? 76 : tablet ? 56 : 33;

  const fade = useRef(new Animated.Value(0)).current;

  const slide = useRef(new Animated.Value(30)).current;

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

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =====================================

            01. PORTADA SUBMARINA

        ===================================== */}

        <View
          style={[
            styles.hero,

            {
              width,

              minHeight: heroHeight,

              paddingHorizontal: padding,
            },
          ]}
        >
          <Image
            source={underwater}
            resizeMode="cover"
            style={[
              styles.backgroundImage,

              {
                width,

                height: heroHeight,
              },
            ]}
          />

          <View style={styles.heroOverlay} />

          <View style={styles.navbar}>
            <Text style={styles.brand}>BEYOND / 26</Text>

            <Text style={styles.navText}>ABOUT US ↗</Text>
          </View>

          <Animated.View
            style={[
              styles.heroContent,

              {
                opacity: fade,

                transform: [{ translateY: slide }],
              },
            ]}
          >
            <Text style={styles.eyebrow}>A DIFFERENT KIND OF EXPERIENCE</Text>

            <Text
              style={[
                styles.heroTitle,

                {
                  fontSize: heroFont,

                  lineHeight: heroFont * 1.04,

                  letterSpacing: mobile ? -1.5 : -3,
                },
              ]}
            >
              BEYOND{"\n"}
              THE{"\n"}
              SURFACE.
            </Text>

            <View style={styles.heroLine} />

            <Text style={styles.heroDescription}>
              No se trata solamente de crear una aplicación. Se trata de
              construir una experiencia.
            </Text>
          </Animated.View>

          <View style={styles.heroBottom}>
            <Text style={styles.micro}>SCROLL TO EXPLORE ↓</Text>

            {!mobile && (
              <Text style={styles.micro}>MOBILE EXPERIENCE / 2026</Text>
            )}
          </View>
        </View>

        {/* =====================================

            02. CONCEPTO DEL PROYECTO

        ===================================== */}

        <View style={[styles.conceptSection, { width }]}>
          <View
            style={[
              styles.contentContainer,

              {
                paddingHorizontal: padding,

                flexDirection: desktop ? "row" : "column",

                gap: desktop ? 75 : 32,
              },
            ]}
          >
            <View style={styles.conceptColumn}>
              <Text style={styles.sectionLabel}>01 / THE CONCEPT</Text>

              <Text
                style={[
                  styles.sectionTitle,

                  {
                    fontSize: headingFont,

                    lineHeight: headingFont * 1.15,
                  },
                ]}
              >
                MÁS ALLÁ{"\n"}
                <Text style={styles.blueText}>DEL CÓDIGO.</Text>
              </Text>

              <Text style={styles.paragraph}>
                Somos un equipo de estudiantes que transforma ideas en
                experiencias digitales, combinando diseño, tecnología y
                creatividad.
              </Text>

              <Text style={styles.paragraph}>
                Desarrollamos esta aplicación con React Native y Expo para
                explorar nuevas formas de interacción e integrar servicios
                externos.
              </Text>
            </View>

            <View style={styles.conceptColumn}>
              {[
                ["PROYECTO", "Aplicación móvil"],

                ["TECNOLOGÍA", "React Native / Expo"],

                ["INTEGRACIÓN", "TikTok Login Kit"],

                ["AÑO", "2026"],
              ].map(([label, value]) => (
                <View key={label} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{label}</Text>

                  <Text style={styles.detailValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* =====================================

            03. SECCIÓN SUBMARINA

        ===================================== */}

        <View
          style={[
            styles.statementSection,

            {
              width,

              height: statementHeight,

              paddingHorizontal: padding,
            },
          ]}
        >
          <Image
            source={underwater}
            resizeMode="cover"
            style={[
              styles.backgroundImage,

              {
                width,

                height: statementHeight,
              },
            ]}
          />

          <View style={styles.statementOverlay} />

          <View style={styles.statementContent}>
            <Text style={styles.sectionLabel}>THE IDEA BEHIND EVERYTHING</Text>

            <Text
              style={[
                styles.statementTitle,

                {
                  fontSize: statementFont,

                  lineHeight: statementFont * 1.15,

                  letterSpacing: mobile ? -0.8 : -2,
                },
              ]}
            >
              CREATE{"\n"}
              SOMETHING{"\n"}
              <Text style={styles.blueText}>DIFFERENT.</Text>
            </Text>

            <Text style={styles.micro}>DESIGN × TECHNOLOGY × CREATIVITY</Text>
          </View>
        </View>

        {/* =====================================

            04. NUESTRO EQUIPO

        ===================================== */}

        <View style={[styles.teamSection, { width }]}>
          <View
            style={[styles.contentContainer, { paddingHorizontal: padding }]}
          >
            <Text style={styles.sectionLabel}>02 / THE PEOPLE</Text>

            <Text
              style={[
                styles.sectionTitle,

                {
                  fontSize: headingFont,

                  lineHeight: headingFont * 1.15,
                },
              ]}
            >
              LAS MENTES{"\n"}
              <Text style={styles.blueText}>DETRÁS.</Text>
            </Text>

            <Text style={styles.paragraph}>
              Cada integrante aporta una perspectiva distinta. Juntos damos
              forma a este proyecto.
            </Text>

            <TouchableOpacity
              style={styles.memberCard}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/login",
                  params: { redirect: "/perfil-adrian" },
                })
              }
            >
              <View style={styles.memberCircle}>
                <Text style={styles.memberNumber}>01</Text>
              </View>

              <View style={styles.memberInfo}>
                <Text style={styles.memberCategory}>TEAM MEMBER</Text>

                <Text
                  style={[styles.memberName, { fontSize: mobile ? 16 : 20 }]}
                >
                  CONOCE A ADRIÁN
                </Text>

                <Text style={styles.memberHint}>
                  Inicia sesión para explorar el perfil
                </Text>
              </View>

              <Text style={styles.memberArrow}>↗</Text>
            </TouchableOpacity>

            <Text style={styles.teamNote}>
              PRÓXIMAMENTE / MÁS PERFILES DEL EQUIPO
            </Text>
          </View>
        </View>

        {/* =====================================

            05. FOOTER

        ===================================== */}

        <View
          style={[
            styles.footer,

            {
              width,

              paddingHorizontal: padding,
            },
          ]}
        >
          <View style={styles.footerContent}>
            <Text style={styles.footerEyebrow}>THANK YOU FOR EXPLORING</Text>

            <Text
              style={[
                styles.footerTitle,

                {
                  fontSize: desktop ? 72 : tablet ? 56 : 42,

                  lineHeight: desktop ? 78 : tablet ? 62 : 48,
                },
              ]}
            >
              KEEP{"\n"}
              <Text style={styles.blueText}>CREATING.</Text>
            </Text>

            <View style={styles.footerDivider} />

            <View style={styles.footerBottom}>
              <Text style={styles.micro}>BEYOND / 26</Text>

              <Text style={styles.micro}>© TEAM 2026</Text>
            </View>
          </View>
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

  scroll: {
    flex: 1,

    width: "100%",
  },

  scrollContent: {
    flexGrow: 1,

    alignItems: "center",
  },

  // IMAGEN DE FONDO

  backgroundImage: {
    position: "absolute",

    top: 0,

    left: 0,
  },

  // PORTADA

  hero: {
    position: "relative",

    overflow: "hidden",

    justifyContent: "space-between",

    paddingTop: 55,

    paddingBottom: 32,

    backgroundColor: C.surface,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,

    backgroundColor: "rgba(0, 12, 24, 0.48)",
  },

  navbar: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  brand: {
    color: C.white,

    fontSize: 12,

    fontWeight: "900",

    letterSpacing: 2,
  },

  navText: {
    color: C.white,

    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 1.5,
  },

  heroContent: {
    width: "100%",

    maxWidth: 950,

    paddingVertical: 50,
  },

  eyebrow: {
    color: "#B9D7E9",

    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    marginBottom: 24,
  },

  heroTitle: {
    color: C.white,

    fontWeight: "900",
  },

  heroLine: {
    width: 55,

    height: 2,

    backgroundColor: "#E0F2FF",

    marginTop: 28,

    marginBottom: 22,
  },

  heroDescription: {
    color: "#E1ECF3",

    fontSize: 15,

    lineHeight: 25,

    maxWidth: 370,
  },

  heroBottom: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  micro: {
    color: "#B4C9D9",

    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 1.2,
  },

  // CONTENEDORES

  conceptSection: {
    backgroundColor: "#04131F",
  },

  teamSection: {
    backgroundColor: "#04131F",
  },

  contentContainer: {
    width: "100%",

    maxWidth: 1400,

    alignSelf: "center",

    paddingTop: 85,

    paddingBottom: 85,
  },

  conceptColumn: {
    flex: 1,

    minWidth: 0,
  },

  sectionLabel: {
    color: "#83B1CF",

    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    marginBottom: 25,
  },

  sectionTitle: {
    color: C.white,

    fontWeight: "900",

    letterSpacing: -1,

    marginBottom: 25,
  },

  blueText: {
    color: C.blue,
  },

  paragraph: {
    color: C.muted,

    fontSize: 15,

    lineHeight: 26,

    maxWidth: 560,

    marginBottom: 16,
  },

  // DETALLES

  detailRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    gap: 12,

    paddingVertical: 21,

    borderBottomWidth: 1,

    borderBottomColor: C.border,
  },

  detailLabel: {
    color: "#83A9C2",

    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 1,
  },

  detailValue: {
    color: "#E5F0F7",

    fontSize: 13,

    textAlign: "right",

    flexShrink: 1,
  },

  // SECCIÓN SUBMARINA

  statementSection: {
    position: "relative",

    overflow: "hidden",

    justifyContent: "center",

    backgroundColor: "#0C2A40",
  },

  statementOverlay: {
    ...StyleSheet.absoluteFill,

    backgroundColor: "rgba(1, 18, 32, 0.65)",
  },

  statementContent: {
    width: "100%",

    maxWidth: 1400,

    alignSelf: "center",

    paddingVertical: 40,

    gap: 24,
  },

  statementTitle: {
    color: C.white,

    fontWeight: "900",
  },

  // EQUIPO

  memberCard: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    marginTop: 25,

    paddingVertical: 28,

    gap: 15,

    borderTopWidth: 1,

    borderBottomWidth: 1,

    borderColor: C.border,
  },

  memberCircle: {
    width: 45,

    height: 45,

    borderRadius: 23,

    borderWidth: 1,

    borderColor: "#557E99",

    justifyContent: "center",

    alignItems: "center",
  },

  memberNumber: {
    color: "#B5D5E9",

    fontSize: 13,

    fontWeight: "800",
  },

  memberInfo: {
    flex: 1,

    minWidth: 0,
  },

  memberCategory: {
    color: "#83B1CF",

    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 1.5,

    marginBottom: 7,
  },

  memberName: {
    color: C.white,

    fontWeight: "900",
  },

  memberHint: {
    color: "#A5C1D3",

    fontSize: 12,

    marginTop: 7,
  },

  memberArrow: {
    color: "#E0F2FF",

    fontSize: 27,
  },

  teamNote: {
    color: "#779CB4",

    fontSize: 9,

    letterSpacing: 1,

    marginTop: 23,
  },

  // FOOTER

  footer: {
    backgroundColor: "#010A12",

    paddingTop: 80,

    paddingBottom: 40,
  },

  footerContent: {
    width: "100%",

    maxWidth: 1400,

    alignSelf: "center",
  },

  footerEyebrow: {
    color: "#8BB5CF",

    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    marginBottom: 28,
  },

  footerTitle: {
    color: C.white,

    fontWeight: "900",

    letterSpacing: -1.5,

    marginBottom: 65,
  },

  footerDivider: {
    width: "100%",

    height: 1,

    backgroundColor: C.border,

    marginBottom: 25,
  },

  footerBottom: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },
});
