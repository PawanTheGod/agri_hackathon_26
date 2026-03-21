import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { npkValues } from '../mockData';

export default function NPKTest() {
  const [step, setStep] = useState('start'); // 'start' | 'testing' | 'results'
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer;
    if (step === 'testing') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        setStep('results');
      }
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const startTest = () => {
    setCountdown(3);
    setStep('testing');
  };

  const resetTest = () => {
    setStep('start');
  };

  const getStatusColor = (val, threshold) => val >= threshold ? '#4CAF50' : '#F44336';
  const getStatusText = (val, threshold) => val >= threshold ? 'OK' : 'LOW';

  const renderContent = () => {
    if (step === 'start') {
      return (
        <View style={styles.centerContent}>
          <Button 
            mode="contained" 
            onPress={startTest}
            buttonColor="#4CAF50"
            style={styles.actionButton}
            labelStyle={styles.actionButtonLabel}
          >
            Start Test
          </Button>
        </View>
      );
    }

    if (step === 'testing') {
      return (
        <View style={[styles.centerContent, { padding: 40 }]}>
          <Text style={styles.countdownText}>{countdown}</Text>
          <Text style={styles.testingLabel}>Analyzing Soil...</Text>
        </View>
      );
    }

    if (step === 'results') {
      return (
        <View style={styles.resultsContainer}>
          <Text style={styles.Title}>Test Results</Text>
          
          <View style={styles.resultBoxes}>
            <View style={[styles.resultBox, { backgroundColor: getStatusColor(npkValues.N, npkValues.thresholds.N.min) }]}>
              <Text style={styles.resultValue}>N: {npkValues.N}</Text>
              <Text style={styles.resultStatus}>{getStatusText(npkValues.N, npkValues.thresholds.N.min)}</Text>
            </View>

            <View style={[styles.resultBox, { backgroundColor: getStatusColor(npkValues.P, npkValues.thresholds.P.min) }]}>
              <Text style={styles.resultValue}>P: {npkValues.P}</Text>
              <Text style={styles.resultStatus}>{getStatusText(npkValues.P, npkValues.thresholds.P.min)}</Text>
            </View>

            <View style={[styles.resultBox, { backgroundColor: getStatusColor(npkValues.K, npkValues.thresholds.K.min) }]}>
              <Text style={styles.resultValue}>K: {npkValues.K}</Text>
              <Text style={styles.resultStatus}>{getStatusText(npkValues.K, npkValues.thresholds.K.min)}</Text>
            </View>

            <View style={[styles.resultBox, { backgroundColor: npkValues.pH >= 6.0 && npkValues.pH <= 7.5 ? '#4CAF50' : '#F44336' }]}>
              <Text style={styles.resultValue}>pH: {npkValues.pH}</Text>
              <Text style={styles.resultStatus}>{npkValues.pH >= 6.0 && npkValues.pH <= 7.5 ? 'OK' : 'ABNORMAL'}</Text>
            </View>
          </View>

          <Button 
            mode="contained" 
            onPress={resetTest}
            buttonColor="#2196F3"
            style={styles.actionButton}
            labelStyle={styles.actionButtonLabel}
          >
            Next Spot
          </Button>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
  },
  actionButtonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  countdownText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  testingLabel: {
    fontSize: 24,
    color: '#666',
    marginTop: 20,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  Title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  resultBoxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  resultBox: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  resultStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8,
  },
});
