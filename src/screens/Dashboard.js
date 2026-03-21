import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';
import { sensorNodes, npkValues } from '../mockData';
import NodeCard from '../components/NodeCard';
import NPKBar from '../components/NPKBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerGradient}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>नमस्कार,</Text>
            <Text style={styles.farmName}>रामराव शिंदे की खेत</Text>
          </View>
          <Avatar.Text size={48} label="RS" style={{ backgroundColor: '#FFD54F' }} labelStyle={{ color: '#2E7D32' }} />
        </View>

        <TouchableOpacity 
          style={styles.voiceWrapper}
          onPress={() => navigation.navigate('Advisory')}
        >
          <View style={styles.voiceCard}>
            <MaterialCommunityIcons name="microphone-outline" size={32} color="#FFF" />
            <Text style={styles.voiceText}>VOICE ADVISORY</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sensor Nodes</Text>
          <Text style={styles.viewMap} onPress={() => navigation.navigate('Farm Map')}>View Map</Text>
        </View>
        <View style={styles.gridContainer}>
          {sensorNodes.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>NPK Summary (Soil Profile)</Text>
        <NPKBar npkValues={npkValues} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    padding: 24,
    paddingTop: 30, 
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    backgroundColor: '#2E7D32',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#E8F5E9',
    opacity: 0.9,
  },
  farmName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  voiceWrapper: {
    marginTop: 10,
  },
  voiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  voiceText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 15,
    letterSpacing: 1,
  },
  content: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#263238',
  },
  viewMap: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
