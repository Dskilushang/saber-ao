// src/screens/CategoriesScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function CategoriesScreen({ navigation }) {
  // Lista de categorias do nosso jogo sobre Angola
  const categorias = [
    { id: 'cultura', nome: '🇦🇴 Cultura & Tradições', cor: '#1e2d4a' },
    { id: 'musica', nome: '🎵 Música & Dança (Kizomba/Kuduro)', cor: '#1e2d4a' },
    { id: 'geografia', nome: '🌍 Geografia & Províncias', cor: '#1e2d4a' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.titre}>ESCOLHA UMA ARÈNE</Text>
      <Text style={styles.sousTitre}>Selecione a categoria para desafiar a IA</Text>

      <View style={styles.grid}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.cardCat, { backgroundColor: cat.cor }]}
            onPress={() => navigation.navigate('Quiz', { categoriaId: cat.id })}
          >
            <Text style={styles.catText}>{cat.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.btnRetour} onPress={() => navigation.goBack()}>
        <Text style={styles.btnRetourText}>⬅ Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  titre: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  sousTitre: {
    fontSize: 14,
    color: '#6F80A5',
    marginBottom: 40,
    textAlign: 'center',
  },
  grid: {
    width: '100%',
    gap: 16,
  },
  cardCat: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
  },
  catText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnRetour: {
    marginTop: 40,
    padding: 10,
  },
  btnRetourText: {
    color: '#6F80A5',
    fontWeight: '600',
    fontSize: 14,
  },
});
    
