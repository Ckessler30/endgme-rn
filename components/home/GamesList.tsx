import React, { useMemo } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import GameListItem from './GameListItem';
import { useQuery } from '@tanstack/react-query';
import { GameService } from '@/Services/Game.service';
import { Spinner } from '@ui-kitten/components';

function GamesList() {
  const { data, isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => GameService.getGames(),
  });
  console.log(data);

  const renderListEmpty = useMemo(() => {
    return (
      <View style={styles.listEmptyContainer}>
        <Spinner />
      </View>
    );
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <GameListItem game={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      bounces={false}
      ListEmptyComponent={renderListEmpty}
      extraData={isLoading}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GamesList;
