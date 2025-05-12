import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileSelectionScreen({ navigation }) {
  const profiles = ['Papá', 'Mamá', 'Hijo'];

  const handleProfileSelect = (profile) => {
    navigation.navigate('Main', {
      screen: 'Home', // Navega a la pantalla Home dentro de MainDrawer
      params: { profile }, // Pasa el perfil seleccionado
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione un perfil</Text>
      {profiles.map((profile, index) => (
        <TouchableOpacity
          key={index}
          style={styles.profile}
          onPress={() => handleProfileSelect(profile)}
        >
          <Text style={styles.profileText}>{profile}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  profile: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', margin: 10, borderRadius: 10 },
  profileText: { fontSize: 18 },
});