import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function NPKBar({ npkValues }) {
  const npkStatusColor = (val, thresholdMin, thresholdMax) => {
    if (thresholdMax) {
      return (val >= thresholdMin && val <= thresholdMax) ? '#4CAF50' : '#F44336';
    }
    return val >= thresholdMin ? '#4CAF50' : '#F44336';
  };

  return (
    <Card style={styles.npkCard}>
      <Card.Content style={styles.npkRow}>
        <View style={styles.npkItem}>
          <Text style={styles.npkLabel}>N</Text>
          <Text style={[styles.npkValue, { color: npkStatusColor(npkValues.N, npkValues.thresholds.N.min) }]}>
            {npkValues.N}
          </Text>
        </View>
        <View style={styles.npkItem}>
          <Text style={styles.npkLabel}>P</Text>
          <Text style={[styles.npkValue, { color: npkStatusColor(npkValues.P, npkValues.thresholds.P.min) }]}>
            {npkValues.P}
          </Text>
        </View>
        <View style={styles.npkItem}>
          <Text style={styles.npkLabel}>K</Text>
          <Text style={[styles.npkValue, { color: npkStatusColor(npkValues.K, npkValues.thresholds.K.min) }]}>
            {npkValues.K}
          </Text>
        </View>
        <View style={styles.npkItem}>
          <Text style={styles.npkLabel}>pH</Text>
          <Text style={[styles.npkValue, { color: npkStatusColor(npkValues.pH, npkValues.thresholds.pH.min, npkValues.thresholds.pH.max) }]}>
            {npkValues.pH}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  npkCard: {
    marginBottom: 30,
    elevation: 3,
    backgroundColor: '#fff',
  },
  npkRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  npkItem: {
    alignItems: 'center',
  },
  npkLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  npkValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
