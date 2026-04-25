import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GhagavadGeethaNavigation from '../../features/ghagavad-geetha/navigation/GhagavadGeethaNavigation';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <GhagavadGeethaNavigation />
    </NavigationContainer>
  );
};

export default RootNavigator;
