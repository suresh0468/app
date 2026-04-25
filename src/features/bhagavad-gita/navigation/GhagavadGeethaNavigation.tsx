import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GhagavadGeethaScreen from '../screens/BhagavadGeethaScreen';
import ChapterVersesScreen from '../screens/ChapterVersesScreen';
import VerseDetailScreen from '../screens/VerseDetailScreen';

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
      <Stack.Screen
        name="ChapterVerses"
        component={ChapterVersesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerseDetail"
        component={VerseDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default GhagavadGeethaNavigation;
