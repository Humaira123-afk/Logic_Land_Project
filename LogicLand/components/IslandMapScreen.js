import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

export default function OnboardingScreen({ onSkip, onStart }) {
  return (
    <View style={styles.container}>
      {/* decorative dot pattern, top right */}
      <View style={styles.dotGrid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View key={i} style={styles.dot} />
        ))}
      </View>

      {/* decorative star shape, top left */}
      <View style={styles.star} />

      {/* "Hi" speech bubble near the illustration */}
      <View style={styles.hiBubble}>
        <Text style={styles.hiText}>Hi</Text>
      </View>

      {/* ---------- Character illustration area ----------
          Drop your own 3D character PNG here (e.g. from Storyset / Freepik).
          For now this is a placeholder so the layout still looks intentional. */}
      <View style={styles.illustrationWrap}>
        <Image
          // source={require('../assets/character.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
        {/* fallback placeholder shape while you don't have an asset yet */}
        <View style={styles.placeholderBadge}>
          <View style={styles.placeholderBook} />
          <View style={[styles.placeholderBook, { backgroundColor: '#F0997B', bottom: 18 }]} />
          <View style={[styles.placeholderBook, { backgroundColor: '#5DCAA5', bottom: 34 }]} />
        </View>
      </View>

      {/* "Hello" tag, angled, near bottom of illustration */}
      <View style={styles.helloTag}>
        <Text style={styles.helloText}>Hello</Text>
      </View>

      {/* ---------- Heading + slogan ---------- */}
      <View style={styles.textBlock}>
        <Text style={styles.heading}>
          Welcome to{'\n'}
          <Text style={styles.headingAccent}>LogicLand</Text>
        </Text>
        <Text style={styles.slogan}>Solve puzzles. Think in code.</Text>
      </View>

      <View style={styles.divider} />

      {/* ---------- Bottom row: Skip / Start ---------- */}
      <View style={styles.bottomRow}>
        <Pressable onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        <Pressable style={styles.startBtn} onPress={onStart}>
          <Text style={styles.startText}>Start Learning</Text>
          <Text style={styles.startArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1ECFB', paddingHorizontal: 24, paddingTop: 60 },

  dotGrid: {
    position: 'absolute', top: 50, right: 24,
    width: 44, flexDirection: 'row', flexWrap: 'wrap', gap: 6,
  },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#C9BFEF' },

  star: {
    position: 'absolute', top: 90, left: 20,
    width: 26, height: 26, backgroundColor: '#F5B9C6',
    transform: [{ rotate: '20deg' }],
  },

  hiBubble: {
    position: 'absolute', top: 130, right: 30,
    backgroundColor: '#2A2550', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16,
  },
  hiText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  illustrationWrap: { height: 300, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  illustration: { width: SCREEN_W - 48, height: 280 },
  placeholderBadge: { position: 'absolute', bottom: 30, left: 40, width: 70, height: 60 },
  placeholderBook: { position: 'absolute', bottom: 0, width: 70, height: 14, borderRadius: 4, backgroundColor: '#6C63C6' },

  helloTag: {
    position: 'absolute', top: 300, left: 30,
    backgroundColor: '#FFD972', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 14,
    transform: [{ rotate: '-8deg' }],
  },
  helloText: { color: '#2A2550', fontWeight: '700', fontSize: 13 },

  textBlock: { marginTop: 26 },
  heading: { fontSize: 30, fontWeight: '800', color: '#2A2550', lineHeight: 38 },
  headingAccent: { color: '#8A7CF0' },
  slogan: { fontSize: 15, color: '#6E6892', marginTop: 10, fontWeight: '500' },

  divider: { width: 40, height: 3, backgroundColor: '#2A2550', borderRadius: 2, marginTop: 22 },

  bottomRow: {
    marginTop: 'auto', marginBottom: 34,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  skipText: { color: '#6E6892', fontSize: 15, fontWeight: '600' },
  startBtn: {
    backgroundColor: '#2A2550', borderRadius: 30,
    paddingVertical: 14, paddingHorizontal: 24,
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  startText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  startArrow: { color: '#fff', fontSize: 16, fontWeight: '700' },
});