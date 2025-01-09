import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { Route, useLinkBuilder } from '@react-navigation/native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarButtonProps {
  route: Route<string, object | undefined>;
  isFocused: boolean;
  options: BottomTabNavigationOptions;
  onPress: () => void;
  onLongPress: () => void;
  Icon: React.ComponentType<{ focused: boolean; color: string; size: number }>;
  label: string;
}

function TabBarButton({
  route,
  isFocused,
  options,
  onPress,
  onLongPress,
  Icon,
  label,
}: TabBarButtonProps) {
  const theme = useTheme();
  const { buildHref } = useLinkBuilder();
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [isFocused, scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  return (
    <PlatformPressable
      href={buildHref(route.name, route.params)}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarButtonTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {Icon && (
          <Icon
            focused={isFocused}
            color={theme['text-basic-color']}
            size={24}
          />
        )}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color: theme['text-basic-color'],
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});

export default TabBarButton;
