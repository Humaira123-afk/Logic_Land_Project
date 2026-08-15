import React, { useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const LETTERS = 'LogicLand'.split('');

export default function IslandMapScreen() {
  // har letter ke liye ek alag animated value
  const letterAnims = useRef(LETTERS.map(() => new Animated.Value(0))).current;
  // tagline ke liye alag animated value
  const taglineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const letterAnimations = letterAnims.map((anim) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    );

    // pehle letters animate honge, phir tagline fade in hogi
    Animated.stagger(85, letterAnimations).start(() => {
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }).start(() => {
        // sab animation complete hone ke thori dair baad agli screen pe chala jayega
        setTimeout(() => {
          router.replace('/login');
        }, 1000);
      });
    });
  }, []);

  return (
    <ImageBackground
      // 👇 "Let's Start Your Learning Adventure" wali image
      source={require('../assets/images/character-bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" />

      {/* ---------- Top logo + tagline block ---------- */}
      <View style={styles.topWrap}>
        <View style={styles.wordRow}>
          {LETTERS.map((letter, i) => {
            const anim = letterAnims[i];
            return (
              <Animated.Text
                key={i}
                style={[
                  styles.letter,
                  {
                    opacity: anim,
                    transform: [
                      {
                        translateY: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [26, 0],
                        }),
                      },
                      {
                        scale: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.75, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {letter}
              </Animated.Text>
            );
          })}
        </View>

        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: taglineAnim,
              transform: [
                {
                  translateY: taglineAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Solve puzzles. Think in code.
        </Animated.Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: SCREEN_W,
    height: SCREEN_H,
  },

  // top pe logo + tagline ke liye jagah
  topWrap: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  wordRow: {
    flexDirection: 'row',
  },

  letter: {
    fontSize: 58,
    fontWeight: '800',
    color: '#2A2550', // dark purple — logo/heading
    letterSpacing: 0.3,
  },

  tagline: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#6E6892', // muted purple-grey — secondary text, hierarchy ke liye
    letterSpacing: 0.2,
  },
});

