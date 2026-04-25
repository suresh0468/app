import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GhagavadGeethaNavigation from '../../features/bhagavad-gita/navigation/GhagavadGeethaNavigation';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <GhagavadGeethaNavigation />
    </NavigationContainer>
  );
};

export default RootNavigator;
