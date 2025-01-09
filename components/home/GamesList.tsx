import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import GameListItem from './GameListItem';
import { useQuery } from '@tanstack/react-query';
import { GameService } from '@/Services/Game.service';

function GamesList() {
  const { data } = useQuery({
    queryKey: ['games'],
    queryFn: () => GameService.getGames(),
  });
  console.log(data);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <GameListItem game={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      bounces={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
  },
});

export default GamesList;
