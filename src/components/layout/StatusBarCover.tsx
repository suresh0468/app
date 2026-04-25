import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface StatusBarCoverProps extends Omit<ViewProps, 'height'> {}

function StatusBarCover(props: StatusBarCoverProps) {
  const insets = useSafeAreaInsets();
  return <View {...props} style={[{ height: insets.top }, props.style]} />;
}

export default StatusBarCover;
