import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors'; // Adjust this path if needed
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CommerceHeader() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets(); // Gets safe area (status bar height)

  return (
    // Use insets.top to add padding only at the top
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* 1. Brand Logo */}
        <TouchableOpacity style={styles.logoContainer}>
          <Ionicons name="layers" size={28} color={Colors.primary} />
          {/* <Text style={[styles.logoText, { color: colors.text }]}>MyStore</Text> */}
        </TouchableOpacity>

        {/* 2. Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search for products..."
            placeholderTextColor={colors.icon}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>

        {/* 3. Other Icons (e.g., Wishlist, Notifications) */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border, // Use a consistent border color
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60, // Set a consistent height for the content area
  },
  logoContainer: {
    marginRight: 10,
    // If you use text logo:
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  searchContainer: {
    flex: 1, // This makes the search bar fill the available space
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
  },
});