import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NavBarCoverProps extends Omit<ViewProps, 'height'> {}

function NavBarCover(props: NavBarCoverProps) {
  const insets = useSafeAreaInsets();
  return <View {...props} style={[{ height: insets.bottom }, props.style]} />;
}

export default NavBarCover;
