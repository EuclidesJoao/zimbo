import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Group for main tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="whishlist"/>
    </Stack>
  );
}
