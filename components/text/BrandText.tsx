import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';

function BrandText() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text
        category="h1"
        style={[styles.text, { color: theme['text-basic-color'] }]}
      >
        END
      </Text>
      <Text
        category="h1"
        style={[styles.text, { color: theme['color-primary-500'] }]}
      >
        GME
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Impact',
  },
});

export default BrandText;
