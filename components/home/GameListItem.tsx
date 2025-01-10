import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import { Game } from '@/types/Games';

interface GameListItemProps {
  game: Game;
}

function GameListItem({ game }: GameListItemProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={{ uri: game.image_url }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <Text
          category="h4"
          style={[
            styles.text,
            {
              color: theme['text-basic-color'],
              shadowColor: theme['background-basic-color-5'],
            },
          ]}
        >
          {game.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    height: 200,
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'cover',
  },
  text: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    padding: 10,
  },
});

export default GameListItem;
