import { View, StyleSheet } from 'react-native';
import BrandText from '@/components/text/BrandText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@ui-kitten/components';
import GamesList from '@/components/home/GamesList';
export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme['discord-color-4'],
          paddingTop: top,
        },
      ]}
    >
      <View style={styles.brandTextContainer}>
        <BrandText />
      </View>
      <GamesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  brandTextContainer: {
    paddingTop: '5%',
  },
});
