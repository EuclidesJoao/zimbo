import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useColorScheme,
  Image,
  TouchableOpacity,
  ScrollView,
  ListRenderItem,
} from 'react-native';
import { Colors } from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- Tipos de Dados ---
type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  imageUrl: string;
};

type Section = {
  id: string;
  component?: React.JSX.Element;
  data?: Product[];
};

// --- Dados Fictícios (Mock Data) ---
const MOCK_HERO_BANNERS = [
  { id: '1', imageUrl: 'https://placehold.co/600x400/0A79DE/FFFFFF?text=50%25+OFF\nElectrónica', screen: '/(tabs)/categories/electronics' as const },
  { id: '2', imageUrl: 'https://placehold.co/600x400/E63946/FFFFFF?text=Novidades\nModa', screen: '/(tabs)/categories/clothing' as const },
  { id: '3', imageUrl: 'https://placehold.co/600x400/4B5563/FFFFFF?text=Entrega\nGrátis', screen: '/(tabs)/deals' as const },
];

const MOCK_DEALS: Product[] = [
  { id: 'p1', name: 'Smartphone Pro X', price: 250000, oldPrice: 350000, rating: 4.5, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Smartphone' },
  { id: 'p2', name: 'Laptop Ultra', price: 650000, rating: 4.8, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Laptop' },
  { id: 'p3', name: 'Fones de Ouvido', price: 45000, oldPrice: 60000, rating: 4.2, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Fones' },
  { id: 'p4', name: 'Smart Watch', price: 80000, rating: 4.6, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Watch' },
];

const MOCK_RECOMMENDED: Product[] = [
  { id: 'p5', name: 'Camisa Casual', price: 15000, rating: 4.0, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Camisa' },
  { id: 'p6', name: 'Sapatilhas Correr', price: 32000, rating: 4.7, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Sapatilhas' },
  { id: 'p7', name: 'Mochila Viagem', price: 25000, rating: 4.4, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Mochila' },
  { id: 'p8', name: 'Máquina de Café', price: 55000, oldPrice: 70000, rating: 4.9, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Café' },
  { id: 'p9', name: 'Livro "O Vendedor"', price: 8500, rating: 4.8, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Livro' },
  { id: 'p10', name: 'Teclado Mecânico', price: 30000, rating: 4.6, imageUrl: 'https://placehold.co/200x200/EDEDED/000000?text=Teclado' },
];

// --- Componentes da Home Screen ---

const formatPrice = (price: number) => {
  return `Kz ${price.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`;
};

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme);

  const handlePress = () => {
    router.push(`/(tabs)/product/${product.id}` as any);
  };

  return (
    <TouchableOpacity style={styles.productCard} onPress={handlePress}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        {product.oldPrice && (
          <Text style={styles.productOldPrice}>{formatPrice(product.oldPrice)}</Text>
        )}
        <View style={styles.productRating}>
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text style={styles.productRatingText}>{product.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProductCarousel = ({ title, products }: { title: string, products: Product[] }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.carouselHeader}>
        <Text style={styles.carouselTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.carouselLink}>Ver tudo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  );
};

const HeroBanner = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.heroContainer}
    >
      {MOCK_HERO_BANNERS.map((banner) => (
        <TouchableOpacity 
          key={banner.id} 
          onPress={() => router.push(banner.screen as any)}
        >
          <Image source={{ uri: banner.imageUrl }} style={styles.heroImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// --- Tela Principal (Home) ---
export default function Index() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme);

  const sections: Section[] = [
    { id: 'hero', component: <HeroBanner /> },
    { id: 'deals', component: <ProductCarousel title="Ofertas do Dia" products={MOCK_DEALS} /> },
    { id: 'recommendedTitle', component: <Text style={styles.carouselTitle}>Recomendado para si</Text> },
    { id: 'recommended', data: MOCK_RECOMMENDED },
  ];

  // CORREÇÃO: Garantir que sempre retorna um ReactElement ou null
  const renderSection: ListRenderItem<Section> = ({ item }) => {
    if (item.id === 'recommended') {
      return (
        <FlatList
          data={item.data}
          renderItem={({ item: _product }) => (
            <ProductCard product={_product} />
          )}
          keyExtractor={(_product) => _product.id}
          numColumns={2}
          scrollEnabled={false} 
          contentContainerStyle={{ paddingHorizontal: 12 }}
        />
      );
    }
    
    // CORREÇÃO: Retornar null se component for undefined
    return item.component || null;
  };

  return (
    <FlatList
      style={styles.container}
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
}

// --- Estilos ---
const getStyles = (colorScheme: 'light' | 'dark') => {
  const colors = Colors[colorScheme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    heroContainer: {
      height: 200,
      marginBottom: 20,
    },
    heroImage: {
      width: 390,
      height: 200,
      resizeMode: 'cover',
    },
    carouselContainer: {
      marginBottom: 20,
    },
    carouselHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    carouselTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      paddingHorizontal: 16,
      marginVertical: 12,
    },
    carouselLink: {
      fontSize: 14,
      color: Colors.primary,
      fontWeight: '600',
    },
    productCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      margin: 4,
      width: 160,
      flex: 1,
      maxWidth: '48%',
    },
    productImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    productInfo: {
      padding: 12,
    },
    productName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.primary,
      marginBottom: 2,
    },
    productOldPrice: {
      fontSize: 12,
      color: colors.icon,
      textDecorationLine: 'line-through',
    },
    productRating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    productRatingText: {
      fontSize: 12,
      color: colors.icon,
      marginLeft: 4,
    },
  });
};