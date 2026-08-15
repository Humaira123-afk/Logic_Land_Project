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

    // Success ke baad home/tabs screen pe bhej dein
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Text>
        <Text style={styles.subtitle}>
          {isLogin
            ? 'Login to continue your LogicLand journey'
            : 'Sign up to start solving puzzles'}
        </Text>

        {/* Sirf Signup mode mein Name field dikhega */}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F1ECFB' },
  container: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 90,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2A2550',
  },
  subtitle: {
    fontSize: 14,
    color: '#6E6892',
    marginTop: 8,
    marginBottom: 32,
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
    backgroundColor: '#fff',
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
    marginTop: 12,
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
  },
  switchText: { color: '#6E6892', fontSize: 14 },
  switchLink: { color: '#8A7CF0', fontWeight: '700', fontSize: 14 },
});