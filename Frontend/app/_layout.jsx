import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="UniTrackSplash" 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="WelcomeScreen" 
        options={{ headerShown: false }}
      />
       <Stack.Screen 
        name="LoginScreen" 
        options={{ headerShown: false }}
      />
    </Stack>
  );
}