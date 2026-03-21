import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { advisory } from '../mockData';

export default function Advisory() {
  const cards = [
    {
      id: 'irrigation',
      title: advisory.irrigation.titleEn,
      text: advisory.irrigation.textEn,
      color: '#2196F3', // Blue for irrigation
      icon: 'water',
    },
    {
      id: 'nutrients',
      title: advisory.nutrients.titleEn,
      text: advisory.nutrients.textEn,
      color: '#FF9800', // Orange for nutrients
      icon: 'leaf',
    },
    {
      id: 'nextCrop',
      title: advisory.nextCrop.titleEn,
      text: advisory.nextCrop.textEn,
      color: '#4CAF50', // Green for next crop
      icon: 'sprout',
    },
  ];

  const handlePlayAudio = (id) => {
    // In a real app, play the audioUrl here
    console.log(`Speaker icon clicked for ${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      {cards.map((item) => (
        <Card key={item.id} style={[styles.card, { borderLeftColor: item.color, borderLeftWidth: 6 }]}>
          <Card.Title 
            title={item.title}
            titleStyle={[styles.cardTitle, { color: item.color }]}
            left={(props) => <IconButton {...props} icon={item.icon} iconColor={item.color} />}
            right={(props) => (
              <IconButton 
                {...props} 
                icon="volume-high" 
                iconColor="#333" 
                size={28}
                onPress={() => handlePlayAudio(item.id)} 
              />
            )}
          />
          <Card.Content>
            <Text style={styles.cardText}>{item.text}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    paddingTop: 8,
  },
});
