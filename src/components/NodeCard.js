import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function NodeCard({ node }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'green': return '#4CAF50';
      case 'amber': return '#FF9800';
      case 'red': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.nodeLabel}>{node.labelLine1}</Text>
            <Text style={styles.nodeLabelSub}>{node.labelLine2}</Text>
          </View>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(node.status) }]} />
        </View>
        <Text style={styles.nodeText}>Moisture: {node.moisture}%</Text>
        <Text style={styles.nodeText}>EC: {node.ec}</Text>
        <Text style={styles.nodeText}>Temp: {node.temperature}°C</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
    elevation: 3,
    backgroundColor: '#fff',
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nodeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  nodeLabelSub: {
    fontSize: 14,
    color: '#555',
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  nodeText: {
    fontSize: 16, // Minimum 16px as per rules
    color: '#666',
    marginTop: 4,
  },
});
