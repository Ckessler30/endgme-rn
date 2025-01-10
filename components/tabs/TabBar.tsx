import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@ui-kitten/components';
import TabBarButton from './TabBarButton';
import { useCallback, useMemo, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const WIDTH = Dimensions.get('window').width * 0.1;

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const [dimensions, setDimensions] = useState({ width: WIDTH, height: 100 });
  const buttonWidth = useMemo(() => {
    return dimensions.width / state.routes.length;
  }, [dimensions, state.routes.length]);

  const onTabBarLayout = useCallback((event: LayoutChangeEvent) => {
    setDimensions({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }, []);

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      onLayout={onTabBarLayout}
      style={[
        styles.container,
        {
          backgroundColor: theme['discord-color-5'],
        },
      ]}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            width: buttonWidth - 25,
            height: dimensions.height - 15,
            borderRadius: 30,
            marginHorizontal: 12,
          },
        ]}
      >
        <LinearGradient
          colors={[theme['color-primary-500'], theme['color-primary-600']]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            flex: 1,
            borderRadius: 30,
          }}
        />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const Icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          Haptics.selectionAsync();
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={index}
            route={route}
            isFocused={isFocused}
            options={options}
            onPress={onPress}
            onLongPress={onLongPress}
            Icon={
              Icon as React.ComponentType<{
                focused: boolean;
                color: string;
                size: number;
              }>
            }
            label={label as string}
          />
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '10%',
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
export default TabBar;
