import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  // true = Login mode, false = Signup mode
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (isLogin) {
      // 👇 Yahan apna login logic / API call lagayein
      console.log('Login attempt:', { email, password });
    } else {
      // 👇 Yahan apna signup logic / API call lagayein
      console.log('Signup attempt:', { name, email, password });
    }

    router.replace('/(tabs)');
  };

  return (
    <View style={styles.screen}>
      {/* ---------- Decorative background elements (same palette as splash) ---------- */}
      <View style={styles.dotGrid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View key={i} style={styles.dot} />
        ))}
      </View>

      <View style={styles.star} />

      <View style={styles.ballTopLeft} />
      <View style={styles.ballBottom} />

      <View style={styles.leafShape} />

      <View style={styles.blobBottom} />

      {/* ---------- Login/Signup form ---------- */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? 'Login to continue your LogicLand journey'
                : 'Sign up to start solving puzzles'}
            </Text>

            {!isLogin && (
              <View style={styles.inputWrap}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor="#A7A0C9"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            )}

            <View style={styles.inputWrap}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#A7A0C9"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A7A0C9"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Pressable style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>
                {isLogin ? 'Login' : 'Sign Up'}
              </Text>
            </Pressable>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </Text>
              <Pressable onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchLink}>
                  {isLogin ? ' Sign Up' : ' Login'}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1ECFB', // same light purple as splash screen
  },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
    justifyContent: 'center',
  },

  // ---------- Decorative shapes (matching splash screen palette) ----------
  dotGrid: {
    position: 'absolute',
    top: 55,
    right: 28,
    width: 54,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    zIndex: 0,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A78BFA' },

  star: {
    position: 'absolute',
    top: 100,
    left: 24,
    width: 34,
    height: 34,
    backgroundColor: '#F5A8BC',
    transform: [{ rotate: '20deg' }],
    zIndex: 0,
    borderRadius: 6,
  },

  ballTopLeft: {
    position: 'absolute',
    top: 45,
    left: 110,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F5A8BC',
    zIndex: 0,
  },

  ballBottom: {
    position: 'absolute',
    bottom: 80,
    left: 30,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#8A7CF0',
    zIndex: 0,
  },

  leafShape: {
    position: 'absolute',
    top: 170,
    right: 10,
    width: 80,
    height: 100,
    backgroundColor: '#B8A9F0',
    opacity: 0.8,
    borderTopLeftRadius: 70,
    borderBottomRightRadius: 70,
    transform: [{ rotate: '-15deg' }],
    zIndex: 0,
  },

  blobBottom: {
    position: 'absolute',
    bottom: 20,
    right: -10,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8A7CF0',
    opacity: 0.35,
    zIndex: 0,
  },

  // ---------- Form card ----------
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 32,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2A2550',
  },
  subtitle: {
    fontSize: 14,
    color: '#6E6892',
    marginTop: 8,
    marginBottom: 28,
    fontWeight: '500',
  },

  inputWrap: { marginBottom: 18 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2A2550',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8F6FE',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2A2550',
    borderWidth: 1,
    borderColor: '#E3DCF7',
  },

  submitBtn: {
    backgroundColor: '#2A2550',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    flexWrap: 'wrap',
  },
  switchText: { color: '#6E6892', fontSize: 14 },
  switchLink: { color: '#8A7CF0', fontWeight: '700', fontSize: 14 },
});