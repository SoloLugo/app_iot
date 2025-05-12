import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

export default function HomeScreen({ navigation, route }) {
  const { profile } = route.params || { profile: 'Papá' }; // Obtiene el perfil
  const [alarmOn, setAlarmOn] = useState(false);
  const [light1On, setLight1On] = useState(false);
  const [light2On, setLight2On] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [temperature, setTemperature] = useState('----');

  const handleAlarmToggle = () => {
    const newState = !alarmOn;
    setAlarmOn(newState);
    console.log(`Alarma: ${newState ? 'Encendida' : 'Apagada'}`);
    // Evento para backend: fetch('/api/alarm', { method: 'POST', body: { state: newState } })
  };

  const handleLightToggle = (lightId) => {
    if (lightId === 1) {
      const newState = !light1On;
      setLight1On(newState);
      console.log(`Luz Interior: ${newState ? 'Encendida' : 'Apagada'}`);
      // Evento para backend: fetch('/api/light1', { method: 'POST', body: { state: newState } })
    } else {
      const newState = !light2On;
      setLight2On(newState);
      console.log(`Luz Exterior: ${newState ? 'Encendida' : 'Apagada'}`);
      // Evento para backend: fetch('/api/light2', { method: 'POST', body: { state: newState } })
    }
  };

  const handleCurtainToggle = () => {
    const newState = !curtainsOpen;
    setCurtainsOpen(newState);
    console.log(`Cortinas: ${newState ? 'Abiertas' : 'Cerradas'}`);
    // Evento para backend: fetch('/api/curtains', { method: 'POST', body: { state: newState } })
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // Navegación a Logs con el perfil actual
  const goToLogs = () => {
    navigation.navigate('Logs', { profile });
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

      {/* Controles en cruz */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.topLeft, alarmOn && styles.buttonPressed]}
          onPress={handleAlarmToggle}
        >
          <Text>Alarma</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.topRight]} onPress={() => {}}>
          <Text>Luces ▼</Text>
          <View style={styles.lightOptions}>
            <View style={styles.lightItem}>
              <Text>Interior</Text>
              <Switch value={light1On} onValueChange={() => handleLightToggle(1)} />
            </View>
            <View style={styles.lightItem}>
              <Text>Exterior</Text>
              <Switch value={light2On} onValueChange={() => handleLightToggle(2)} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.bottomLeft]}
          onPress={handleCurtainToggle}
        >
          <Text>Cortinas</Text>
          <Text>{curtainsOpen ? 'Evento: Cortinas Abiertas' : 'Evento: Cortinas Cerradas'}</Text>
        </TouchableOpacity>
        <View style={[styles.button, styles.bottomRight]}>
          <Text>Temperatura: {temperature} °C</Text>
        </View>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => {}} // No hace nada al estar deshabilitado
          disabled={true} // Deshabilitado en HomeScreen
          style={[styles.navIcon, { opacity: 0.5, backgroundColor: '#ccc' }]} // Estilo presionado
        >
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToLogs}
          disabled={false} // Habilitado en HomeScreen
          style={styles.navIcon}
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
  controlsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { 
    width: 120, 
    height: 80, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#e0e0e0', 
    margin: 10, 
    borderRadius: 5,
    padding: 5,
  },
  topLeft: { position: 'absolute', top: 0, left: 0 },
  topRight: { position: 'absolute', top: 0, right: 0 },
  bottomLeft: { position: 'absolute', bottom: 0, left: 0 },
  bottomRight: { position: 'absolute', bottom: 0, right: 0 },
  buttonPressed: { backgroundColor: '#a0a0a0' },
  lightOptions: { marginTop: 5 },
  lightItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 5 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderTopWidth: 1, borderTopColor: '#ccc' },
  navIcon: { padding: 10 },
});