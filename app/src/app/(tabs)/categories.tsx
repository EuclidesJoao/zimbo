import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from "react";
import { Colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


type Category = {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};


const CATEGORIES: Category[] = [
  { id: "1", name: "Electrónicos", icon: "hardware-chip" },
  { id: "2", name: "Roupas", icon: "shirt" },
  { id: "3", name: "Alimentos", icon: "fast-food" },
  { id: "4", name: "Acessórios", icon: "watch" },
  { id: "5", name: "Casa e Móveis", icon: "home" },
  { id: "6", name: "Livros", icon: "book" },
  { id: "7", name: "Desporto", icon: "basketball" },
  { id: "8", name: "Beleza", icon: "sparkles" },
  { id: "9", name: "Saúde", icon: "medkit" },
//   { id: "10", name: "Bebés e Crianças", icon: "baby" },
  { id: "11", name: "Automóveis e Peças", icon: "car" },
  { id: "12", name: "Ferramentas e Construção", icon: "construct" },
  { id: "13", name: "Animais de Estimação", icon: "paw" },
  { id: "14", name: "Tecnologia e Gadgets", icon: "laptop" },
  { id: "15", name: "Supermercado", icon: "cart" },
];

const Categories = () => {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();
  const styles = getStyles(colorScheme); 

  const handleCategoryPress = (category: Category) => {
    console.log("Selected category:", category.name);
    // Now you can navigate
    // router.push(`/products?category=${category.name}`);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
    >
      <Ionicons name={item.icon} size={32} color={Colors.primary} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.title}>Browse Categories</Text>
      </View> */}
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaProvider>
  );
};


const getStyles = (colorScheme: "light" | "dark") => {
  const colors = Colors[colorScheme]; 
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
    },
    listContainer: {
      padding: 10,
    },
    categoryItem: {
      flex: 1,
      margin: 10,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
    },
    categoryText: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: "600",
      textAlign: 'center',
      color: colors.text,
    },
  });
};
export default Categories;
