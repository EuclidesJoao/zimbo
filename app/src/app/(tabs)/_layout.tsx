import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { Colors } from "@/src/constants/colors";
import { CommerceHeader } from "@/src/components/header";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme]; // Get the color object


  return (
    <Tabs
      screenOptions={{
        // Use the colors object
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false, // <-- 2. Keep this as the default
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 6,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
             headerShown: true,
          header: () => <CommerceHeader />,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />

      {/*Categories Tab */}
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categorias",
                 // --- 4. SHOW A SIMPLE HEADER ---
          headerShown: true, 
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text },
          headerTintColor: colors.tint, // Color for the back arrow
          // ---------------------------------
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'grid': 'grid-outline'} size={size} color={color} />
          ),
        }}
      />

      {/*Cart Tab */}
      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrinho",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
