import { useAuth } from '@/context/AuthProvider';
import { useTheme } from '@ui-kitten/components';
import { View } from 'react-native';

export default function Profile() {
  const theme = useTheme();
  const { user } = useAuth();
  console.log(user);
  return (
    <View style={{ backgroundColor: theme['discord-color-4'], flex: 1 }}></View>
  );
}
