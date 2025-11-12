import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  TouchableOpacity, 
} from 'react-native';
import { Colors } from '@/src/constants/colors'; // Importar as nossas cores
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- Componente Reutilizável para as Linhas do Menu ---
// Isto é uma boa prática para manter o código limpo
type MenuRowProps = {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  styles: ReturnType<typeof getStyles>; // Passar os estilos dinâmicos
  color?: string; // Opcional, para o botão de logout
};

const MenuRow = ({ title, icon, onPress, styles, color }: MenuRowProps) => {
  const textColor = color || styles.menuRowText.color;

  return (
    <TouchableOpacity style={styles.menuRow} onPress={onPress}>
      <View style={styles.menuRowIconContainer}>
        <Ionicons name={icon} size={22} color={color || Colors.primary} />
      </View>
      <Text style={[styles.menuRowText, { color: textColor }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={22} color={Colors.gray} />
    </TouchableOpacity>
  );
};

// --- Ecrã de Perfil Principal ---
const Profile = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme); // Obter estilos dinâmicos
  const router = useRouter(); // Para navegação

  // Função de logout (exemplo)
  const handleLogout = () => {
    console.log("Terminar Sessão");
    // Aqui colocaria a sua lógica de logout (limpar auth token, etc.)
    // e depois navegar para a tela de login
    // router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Secção de Informação do Perfil */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Euclides João</Text>
          <Text style={styles.email}>euclides@example.com</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/profile/edit')} // Navega para a página de edição
          >
            <Ionicons name="pencil" size={16} color={Colors.primary} />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Grupo de Menu: Conta */}
        <View style={styles.menuGroup}>
          <Text style={styles.menuGroupTitle}>Minha Conta</Text>
          <MenuRow
            title="Minhas Encomendas"
            icon="cube-outline"
            onPress={() => router.push('/orders')}
            styles={styles}
          />
          <MenuRow
            title="Listas de Desejos"
            icon="heart-outline"
            onPress={() => router.push('/../screens/wishlist')}
            styles={styles}
          />
          <MenuRow
            title="Moradas de Envio"
            icon="map-outline"
            onPress={() => router.push('/addresses')}
            styles={styles}
          />
          <MenuRow
            title="Métodos de Pagamento"
            icon="card-outline"
            onPress={() => router.push('/payment-methods')}
            styles={styles}
          />
        </View>

        {/* Grupo de Menu: App */}
        <View style={styles.menuGroup}>
          <Text style={styles.menuGroupTitle}>Definições & Ajuda</Text>
          <MenuRow
            title="Definições da App"
            icon="settings-outline"
            onPress={() => router.push('/settings')}
            styles={styles}
          />
          <MenuRow
            title="Centro de Ajuda"
            icon="help-circle-outline"
            onPress={() => router.push('/help-center')}
            styles={styles}
          />
          <MenuRow
            title="Sobre Nós"
            icon="information-circle-outline"
            onPress={() => router.push('/about')}
            styles={styles}
          />
        </View>

        {/* Secção de Logout */}
        <View style={styles.logoutSection}>
          <MenuRow
            title="Terminar Sessão"
            icon="log-out-outline"
            onPress={handleLogout}
            styles={styles}
            color={Colors.accent} // Cor de perigo
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Estilos Dinâmicos ---
const getStyles = (colorScheme: 'light' | 'dark') => {
  const colors = Colors[colorScheme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    // --- Header do Perfil ---
    profileHeader: {
      alignItems: 'center',
      paddingVertical: 24,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
    },
    email: {
      fontSize: 16,
      color: colors.icon,
      marginBottom: 16,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.primary + '20', // Cor primária com 20% de opacidade
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    editButtonText: {
      color: Colors.primary,
      fontWeight: '600',
      marginLeft: 6,
    },
    // --- Grupos de Menu ---
    menuGroup: {
      marginTop: 20,
      marginHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: 12,
      overflow: 'hidden', // Para os cantos arredondados
      borderWidth: 1,
      borderColor: colors.border,
    },
    menuGroupTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.icon,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    // --- Linha do Menu ---
    menuRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    menuRowIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary + '15', // Fundo leve para o ícone
      marginRight: 16,
    },
    menuRowText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    // --- Logout ---
    logoutSection: {
      marginTop: 20,
      marginHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 30, // Espaço no fundo
    },
  });
};

export default Profile;