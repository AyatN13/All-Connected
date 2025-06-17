import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const cities = ['Madrid', 'Florence', 'Nice', 'Barcelona'];

export default function CitySelectorScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a City</Text>
      {cities.map((city) => (
        <TouchableOpacity
          key={city}
          style={styles.cityButton}
          onPress={() => navigation.navigate('CityPosts', { city })}
        >
          <Text style={styles.cityText}>{city}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  cityButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  cityText: { fontSize: 18 }
});
