
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function PerfilAdrian() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.iniciales}>AM</Text>
        </View>

        <Text style={styles.nombre}>Adrián Miranda</Text>
        <Text style={styles.subtitulo}>
          Mi perfil personal
        </Text>

        <View style={styles.separador} />

        <Text style={styles.titulo}>Mis datos</Text>

        <Text style={styles.dato}>👤 Nombre: Adrián Miranda</Text>
        <Text style={styles.dato}>🎓 Grado: Por completar</Text>
        <Text style={styles.dato}>👥 Grupo: Por completar</Text>
        <Text style={styles.dato}>📚 Materia: Por completar</Text>
        <Text style={styles.dato}>💻 Carrera: Por completar</Text>

        <Text style={styles.titulo}>Acerca de mí</Text>
        <Text style={styles.descripcion}>
          Soy estudiante y estoy participando en el
          desarrollo de una aplicación móvil en equipo.
        </Text>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBoton}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  iniciales: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitulo: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 5,
  },
  separador: {
    height: 2,
    backgroundColor: '#E2E8F0',
    width: '100%',
    marginVertical: 25,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    alignSelf: 'flex-start',
    marginBottom: 15,
    marginTop: 10,
  },
  dato: {
    fontSize: 16,
    color: '#334155',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  descripcion: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 23,
    marginBottom: 25,
  },
  boton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 12,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
