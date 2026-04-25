import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GhagavadGeethaScreen from '../screens/BhagavadGeethaScreen';

const Stack = createNativeStackNavigator();

const GhagavadGeethaNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GhagavadGeethaMain"
        component={GhagavadGeethaScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default GhagavadGeethaNavigation;
