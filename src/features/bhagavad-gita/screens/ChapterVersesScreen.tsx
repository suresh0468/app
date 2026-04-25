import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Chapter } from '../types';
import { VERSES } from '../data/verses';
import VerseCard from '../components/VerseCard';
import { verticalScale, moderateScale, scale } from '@src/utils/scalingUI';
import StatusBarCover from '@src/components/layout/StatusBarCover';

type RootStackParamList = {
  ChapterVerses: { chapter: Chapter };
};

type ChapterVersesRouteProp = RouteProp<RootStackParamList, 'ChapterVerses'>;

const ChapterVersesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ChapterVersesRouteProp>();
  const { chapter } = route.params;

  const verses = VERSES[chapter.id] || [];

  return (
    <View style={styles.container}>
      <StatusBarCover style={styles.statusBar} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.headerTitle}>
          {chapter.title}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={verses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <VerseCard
            verse={item}
            onPress={() => {
              // Navigate to verse details if needed later
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  statusBar: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: scale(16),
  },
  backButton: {
    padding: moderateScale(4),
  },
  backArrow: {
    fontSize: moderateScale(24),
    color: '#E67E22',
  },
  headerTitle: {
    flex: 1,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#E67E22',
    textAlign: 'center',
  },
  placeholder: {
    width: moderateScale(32),
  },
  listContent: {
    paddingVertical: verticalScale(16),
  },
});

export default ChapterVersesScreen;
