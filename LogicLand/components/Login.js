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
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export default function LoginScreen() {
  // true = Login mode, false = Signup mode
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErrorMsg('');

    // Basic validation
    if (!email || !password) {
      setErrorMsg('Email aur password dono zaroori hain');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // ---- LOGIN ----
        // Firebase check karega: email exist karta hai? password sahi hai?
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // ---- SIGNUP ----
        // Firebase naya account banayega aur user ko login bhi kar dega
        await createUserWithEmailAndPassword(auth, email, password);
      }

      // Success - home screen pe bhej do
      router.replace('/(tabs)');
    } catch (error) {
      // Firebase khud batata hai kya galat hua (jese "email already in use")
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      // 👇 Neeche wali decorative background image
      source={require('../assets/images/login-bg.png')}
      style={styles.screen}
      resizeMode="cover"
    >
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

            {errorMsg ? (
              <Text style={styles.errorText}>{errorMsg}</Text>
            ) : null}

            <Pressable
              style={[styles.submitBtn, loading && { opacity: 0.6 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitText}>
                {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
    justifyContent: 'center',
  },

  // ---------- Form card ----------
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 32,
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

  errorText: {
    color: '#E24C4C',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
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