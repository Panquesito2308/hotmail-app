
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function PerfilLuis() {
  const intereses = [
    'React Native',
    'TypeScript',
    'Diseño UI/UX',
    'Apps móviles',
  ];

  return (
    <View style={styles.pantalla}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090E1D"
      />

      <ScrollView
        contentContainerStyle={styles.contenedor}
        showsVerticalScrollIndicator={false}
      >

        {/* Titulo */}
        <Text style={styles.titulo}>MI PERFIL</Text>

        {/* Datos personales */}
        <View style={styles.perfil}>
          <View style={styles.avatar}>
            <Text style={styles.iniciales}>AM</Text>
          </View>

          <Text style={styles.nombre}>
            Luis Adrián Miranda Mendez
          </Text>

          <Text style={styles.descripcion}>
            Software Developer - Estudiante
          </Text>

          <View style={styles.etiqueta}>
            <Text style={styles.textoEtiqueta}>
              Desarrollo Móvil Integral
            </Text>
          </View>
        </View>

        {/* Cuatrimestre y grupo */}
        <View style={styles.fila}>
          <View style={styles.cajaDato}>
            <Text style={styles.numeroMorado}>10°</Text>
            <Text style={styles.textoDato}>
              Cuatrimestre
            </Text>
          </View>

          <View style={styles.cajaDato}>
            <Text style={styles.numeroAzul}>A</Text>
            <Text style={styles.textoDato}>
              Grupo
            </Text>
          </View>
        </View>

        {/* Formacion */}
        <Text style={styles.subtitulo}>
          Mi formación
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.label}>
            CARRERA
          </Text>

          <Text style={styles.valor}>
            Ingeniería en Desarrollo y Gestión de Software
          </Text>

          <View style={styles.linea} />

          <Text style={styles.label}>
            MATERIA
          </Text>

          <Text style={styles.valor}>
            Desarrollo Móvil Integral
          </Text>
        </View>

        {/* Sobre mi */}
        <Text style={styles.subtitulo}>
          Sobre mí
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.textoSobreMi}>
            Soy estudiante de Ingeniería de Software,
            me gusta la tecnología, la programación
            y el desarrollo de aplicaciones móviles.
            También me gusta aprender cosas nuevas
            y trabajar en equipo.
          </Text>
        </View>

        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#090E1D',
  },

  contenedor: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 2,
  },

  perfil: {
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#394FBD',
    borderWidth: 4,
    borderColor: '#A78BFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  iniciales: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
  },

  nombre: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  descripcion: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },

  etiqueta: {
    backgroundColor: '#1A2B48',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 18,
  },

  textoEtiqueta: {
    color: '#C4B5FD',
    fontSize: 12,
  },

  fila: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  cajaDato: {
    flex: 1,
    backgroundColor: '#17233E',
    padding: 22,
    borderRadius: 18,
    alignItems: 'center',
  },

  numeroMorado: {
    color: '#A78BFA',
    fontSize: 30,
    fontWeight: 'bold',
  },

  numeroAzul: {
    color: '#60A5FA',
    fontSize: 30,
    fontWeight: 'bold',
  },

  textoDato: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },

  subtitulo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 15,
  },

  tarjeta: {
    backgroundColor: '#17233E',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#243454',
  },

  label: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 8,
  },

  valor: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 23,
  },

  linea: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 18,
  },

  textoSobreMi: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 25,
  },

  intereses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  interes: {
    backgroundColor: '#26315A',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#394A7C',
  },

  textoInteres: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '600',
  },

  pie: {
    color: '#64748B',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 45,
    letterSpacing: 2,
  },
});
