import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Board } from '@/components/Board/Board';
import { useGame } from '@/context/GameContext';

export default function GameScreen() {
  const { state } = useGame();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{state.currentLevel ? state.currentLevel.id : 'No level'}</Text>
      </View>
      <View style={styles.boardWrapper}>
        <Board />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700' },
  boardWrapper: { alignItems: 'center', justifyContent: 'center' },
});
