import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { sensorNodes } from '../mockData';

export default function FarmMap() {
  const getPinColor = (status) => {
    switch (status) {
      case 'green': return '#4CAF50';
      case 'amber': return '#FF9800';
      case 'red': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
        initialRegion={{
          latitude: 18.5198,
          longitude: 73.8567,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {sensorNodes.map((node) => (
          <Marker
            key={node.id}
            coordinate={{ latitude: node.latitude, longitude: node.longitude }}
            pinColor={getPinColor(node.status)}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{node.label}</Text>
                <Text>Moisture: {node.moisture}%</Text>
                <Text>EC: {node.ec}</Text>
                <Text>Temp: {node.temperature}°C</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    width: 150,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
});
