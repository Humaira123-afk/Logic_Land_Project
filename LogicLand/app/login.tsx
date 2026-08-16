// app/login.tsx
// Ye file ROUTE hai (URL "/login" is se banta hai)
// Asal design/logic components/login.js mein hai
import { Stack } from 'expo-router';
import Login from '../components/login';

export default function LoginRoute() {
  return (
    <>
      {/* Header hide karne ke liye */}
      <Stack.Screen options={{ headerShown: false }} />
      <Login />
    </>
  );
}