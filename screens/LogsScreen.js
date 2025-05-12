import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

export default function LogsScreen({ navigation, route }) {
  const { profile } = route.params || { profile: 'Papá' }; // Obtiene el perfil

  // Navegación al ícono de casa con el perfil actual
  const goToHome = () => {
    navigation.navigate('Home', { profile });
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      {/* Barra superior personalizada */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.profileSection}>
          <Text style={styles.profileText}>{profile}</Text>
          <View style={styles.profileImage} />
        </View>
      </View>

      {/* Contenido de Logs */}
      <View style={styles.content}>
        <Text>Aquí van los logs</Text>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={goToHome}
          disabled={false} // Habilitado en LogsScreen
          style={styles.navIcon}
        >
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}} // No hace nada al estar deshabilitado
          disabled={true} // Deshabilitado en LogsScreen
          style={[styles.navIcon, { opacity: 0.5, backgroundColor: '#ccc' }]} // Estilo presionado
        >
          <Ionicons name="list" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  menuButton: { padding: 5 },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  profileText: { marginRight: 10 },
  profileImage: { width: 30, height: 30, backgroundColor: '#ccc', borderRadius: 15 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderTopWidth: 1, borderTopColor: '#ccc' },
  navIcon: { padding: 10 },
});