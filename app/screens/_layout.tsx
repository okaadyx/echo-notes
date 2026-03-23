import SearchComponent from "@/components/header/SearchComponent";
import { Stack } from "expo-router";

export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="recording" options={{ headerShown: false }} />
      <Stack.Screen name="analyzing" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{ title: "Personal Information" }}
      />
      <Stack.Screen name="security" options={{ title: "Security" }} />
      <Stack.Screen
        name="search"
        options={{
          headerTitle: () => <SearchComponent />,
        }}
      />
    </Stack>
  );
}
