import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { sensorNodes, npkValues } from '../mockData';
import NodeCard from '../components/NodeCard';
import NPKBar from '../components/NPKBar';

export default function Dashboard({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.farmName}>रामराव शिंदे की खेत</Text>

      <Button 
        mode="contained" 
        style={styles.voiceButton}
        labelStyle={styles.voiceButtonLabel}
        buttonColor="#FF6F00"
        onPress={() => navigation.navigate('Advisory')}
      >
        🔊 VOICE ADVISORY
      </Button>

      <Text style={styles.sectionTitle}>Sensor Nodes</Text>
      <View style={styles.gridContainer}>
        {sensorNodes.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>NPK Summary</Text>
      <NPKBar npkValues={npkValues} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  farmName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  voiceButton: {
    marginBottom: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
    width: '90%',
  },
  voiceButtonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#424242',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
