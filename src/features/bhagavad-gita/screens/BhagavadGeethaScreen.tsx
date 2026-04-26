import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import { CHAPTERS } from '../data/chapters';
import ChapterCard from '../components/ChapterCard';
import { verticalScale, moderateScale } from '@src/utils/scalingUI';
import StatusBarCover from '@src/components/layout/StatusBarCover';
import NavBarCover from '@src/components/layout/NavBarCover';

const GhagavadGeethaScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <StatusBarCover style={styles.statusBar} />
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>శ్రీమద్భగవద్గీత</Text>
        </View>

        <FlatList
          data={CHAPTERS}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ChapterCard chapter={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        <NavBarCover />
      </View>
    </>
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
  topBar: {
    height: verticalScale(56),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  topBarTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#E67E22',
  },
  headerContainer: {
    padding: moderateScale(16),
  },
  listContent: {
    paddingBottom: verticalScale(24),
  },
});

export default GhagavadGeethaScreen;
