import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function PerfilSosa() {
  const intereses = [
    "React Native",
    "TypeScript",
    "Diseño UI/UX",
    "Apps móviles",
  ];

  return (
    <View style={styles.pantalla}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F2" />

      <ScrollView
        contentContainerStyle={styles.contenedor}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Mi perfil</Text>
          <Text style={styles.subtituloEncabezado}>
            Conoce un poco sobre mí
          </Text>
        </View>

        <View style={styles.perfil}>
          <View style={styles.filaPresentacion}>
            <View style={styles.avatar}>
              <Text style={styles.iniciales}>SS</Text>
            </View>

            <View style={styles.presentacion}>
              <Text style={styles.saludo}>HOLA, SOY SALVADOR</Text>
              <Text style={styles.rol}>Estudiante de{"\n"}Software</Text>
            </View>
          </View>

          <Text style={styles.nombre}>
            Salvador Alejandro Sosa Estrada
          </Text>

          <Text style={styles.descripcion}>
            Aprendiendo, creando y compartiendo ideas.
          </Text>

          <View style={styles.etiqueta}>
            <View style={styles.punto} />
            <Text style={styles.textoEtiqueta}>
              Desarrollo Móvil Integral
            </Text>
          </View>

          <View style={styles.datosAcademicos}>
            <View style={styles.dato}>
              <Text style={styles.numero}>10°</Text>
              <Text style={styles.textoDato}>Cuatrimestre</Text>
            </View>

            <View style={styles.divisionVertical} />

            <View style={styles.dato}>
              <Text style={styles.numero}>A</Text>
              <Text style={styles.textoDato}>Grupo</Text>
            </View>
          </View>
        </View>

        <View style={styles.encabezadoSeccion}>
          <Text style={styles.indice}>01</Text>
          <Text style={styles.subtitulo}>Sobre mí</Text>
        </View>

        <View style={styles.tarjetaSobreMi}>
          <Text style={styles.textoSobreMi}>
            Soy estudiante de Ingeniería de Software y me interesa la
            tecnología, la programación y la creación de aplicaciones
            móviles. Disfruto aprender cosas nuevas, compartir ideas y
            colaborar en proyectos con otras personas.
          </Text>
        </View>

        <View style={styles.encabezadoSeccion}>
          <Text style={styles.indice}>02</Text>
          <Text style={styles.subtitulo}>Mi formación</Text>
        </View>

        <View style={styles.tarjeta}>
          <View style={styles.filaFormacion}>
            <View style={styles.iconoFormacion}>
              <Text style={styles.textoIcono}>01</Text>
            </View>

            <View style={styles.detalleFormacion}>
              <Text style={styles.label}>CARRERA</Text>
              <Text style={styles.valor}>
                Ingeniería en Desarrollo y Gestión de Software
              </Text>
            </View>
          </View>

          <View style={styles.linea} />

          <View style={styles.filaFormacion}>
            <View style={styles.iconoFormacion}>
              <Text style={styles.textoIcono}>02</Text>
            </View>

            <View style={styles.detalleFormacion}>
              <Text style={styles.label}>MATERIA</Text>
              <Text style={styles.valor}>
                Desarrollo Móvil Integral
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.encabezadoSeccion}>
          <Text style={styles.indice}>03</Text>
          <Text style={styles.subtitulo}>Mis intereses</Text>
        </View>

        <View style={styles.intereses}>
          {intereses.map((interes) => (
            <View key={interes} style={styles.interes}>
              <Text style={styles.textoInteres}>{interes}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.pie}>SALVADOR SOSA · PERFIL PERSONAL</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#F4F6F2",
  },

  contenedor: {
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 40,
  },

  encabezado: {
    marginBottom: 26,
  },

  titulo: {
    color: "#1D342A",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -1,
  },

  subtituloEncabezado: {
    color: "#68776D",
    fontSize: 14,
    marginTop: 6,
  },

  perfil: {
    backgroundColor: "#183F32",
    borderRadius: 28,
    padding: 24,
  },

  filaPresentacion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: "#D9EDB0",
    alignItems: "center",
    justifyContent: "center",
  },

  iniciales: {
    color: "#183F32",
    fontSize: 28,
    fontWeight: "800",
  },

  presentacion: {
    flex: 1,
  },

  saludo: {
    color: "#D9EDB0",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 7,
  },

  rol: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
    lineHeight: 29,
  },

  nombre: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 30,
  },

  descripcion: {
    color: "#C0D2C8",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },

  etiqueta: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    backgroundColor: "#2A5142",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 18,
  },

  punto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9EDB0",
  },

  textoEtiqueta: {
    color: "#E2EBD9",
    fontSize: 11,
    fontWeight: "600",
    flexShrink: 1,
  },

  datosAcademicos: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#416353",
    marginTop: 24,
    paddingTop: 20,
  },

  dato: {
    flex: 1,
    alignItems: "center",
  },

  numero: {
    color: "#D9EDB0",
    fontSize: 28,
    fontWeight: "800",
  },

  textoDato: {
    color: "#C0D2C8",
    fontSize: 12,
    marginTop: 4,
  },

  divisionVertical: {
    width: 1,
    height: 40,
    backgroundColor: "#416353",
  },

  encabezadoSeccion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
    marginBottom: 14,
  },

  indice: {
    color: "#627B49",
    backgroundColor: "#E5EDDB",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },

  subtitulo: {
    color: "#1D342A",
    fontSize: 20,
    fontWeight: "700",
  },

  tarjetaSobreMi: {
    backgroundColor: "#EAF0E2",
    borderRadius: 20,
    padding: 22,
    borderLeftWidth: 4,
    borderLeftColor: "#79974E",
  },

  textoSobreMi: {
    color: "#405243",
    fontSize: 15,
    lineHeight: 26,
  },

  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E1E7DB",
  },

  filaFormacion: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },

  iconoFormacion: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F0F4E9",
    alignItems: "center",
    justifyContent: "center",
  },

  textoIcono: {
    color: "#56703D",
    fontSize: 12,
    fontWeight: "700",
  },

  detalleFormacion: {
    flex: 1,
  },

  label: {
    color: "#72806F",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 7,
  },

  valor: {
    color: "#263D30",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 23,
  },

  linea: {
    height: 1,
    backgroundColor: "#E8EDE2",
    marginVertical: 20,
  },

  intereses: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  interes: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#DCE5D4",
  },

  textoInteres: {
    color: "#3E5931",
    fontSize: 13,
    fontWeight: "600",
  },

  pie: {
    color: "#72806F",
    textAlign: "center",
    fontSize: 10,
    marginTop: 36,
    letterSpacing: 1.3,
  },
}); 