// src/components/SensorMeter.js — Premium Animated Circular Sensor Meter
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';

/**
 * props:
 *   value       — numeric reading
 *   max         — max for the gauge arc (default 100)
 *   unit        — string like '%' or '°C'
 *   label       — label below value
 *   icon        — MaterialCommunityIcons name
 *   colorFn     — (value) => string  (color of arc)
 *   size        — width/height of the component in px (default 110)
 */
export default function SensorMeter({ value = 0, max = 100, unit = '', label = '', icon, colorFn, size = 110 }) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const pct = Math.min(1, Math.max(0, value / max));
  const color = colorFn ? colorFn(value) : COLORS.primary;

  // Arc: we simulate with a progress ring using View transforms
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = pct * circumference * 0.75; // 270° arc

  return (
    <View style={[styles.wrap, { width: size, height: size + 28 }]}>
      {/* Arc ring background */}
      <View style={[styles.ringWrap, { width: size, height: size }]}>
        {/* Background track */}
        <RingArc size={size} strokeWidth={strokeWidth} color="#E2E8F0" pct={1} />
        {/* Foreground progress */}
        <RingArc size={size} strokeWidth={strokeWidth} color={color} pct={pct} animated={animValue} max={max} />

        {/* Center content */}
        <View style={styles.center}>
          {icon && <MaterialCommunityIcons name={icon} size={size * 0.22} color={color} style={{ marginBottom: 2 }} />}
          <Text style={[styles.valText, { fontSize: size * 0.22, color }]}>
            {typeof value === 'number' ? value.toFixed(value % 1 === 0 ? 0 : 1) : '--'}
            <Text style={[styles.unitText, { fontSize: size * 0.13, color }]}>{unit}</Text>
          </Text>
        </View>
      </View>
      <Text style={[styles.label, { color: COLORS.textSecondary }]}>{label}</Text>
    </View>
  );
}

// Simple arc simulation using clipped views (no SVG needed)
function RingArc({ size, strokeWidth, color, pct, animated, max }) {
  // We use a CSS-style approach: two half-circle clips
  // For simplicity, use a segmented approach with opacity/rotation
  // We'll render a series of thin View slices rotated around center
  const segments = 36;
  const arcDeg = 270; // total arc degrees
  const startDeg = 135; // start angle

  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
      {Array.from({ length: segments }).map((_, i) => {
        const segPct = (i + 1) / segments;
        const rotation = startDeg + segPct * arcDeg;
        const isActive = segPct <= pct;

        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: strokeWidth * 1.2,
              height: size * 0.5 - strokeWidth * 0.5,
              bottom: size * 0.5,
              left: size * 0.5 - strokeWidth * 0.6,
              transformOrigin: `${strokeWidth * 0.6}px ${size * 0.5 - strokeWidth * 0.5}px`,
              transform: [{ rotate: `${rotation}deg` }],
              backgroundColor: isActive ? color : 'transparent',
              borderRadius: strokeWidth,
              opacity: isActive ? 1 : 0,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  ringWrap: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valText: {
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: undefined,
  },
  unitText: {
    fontWeight: '700',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 6,
    textAlign: 'center',
  },
});
