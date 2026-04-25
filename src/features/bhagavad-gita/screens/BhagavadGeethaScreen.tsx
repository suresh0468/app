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
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={require('../../../assets/header.png')}
        style={styles.heroImage}
        imageStyle={{ borderRadius: moderateScale(16) }}
      >
        <View style={styles.overlay}>
          <Text style={styles.heroSubtitle}>SACRED TEXT</Text>
          <Text style={styles.heroTitle}>The 18 Chapters</Text>
        </View>
      </ImageBackground>
    </View>
  );

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
          ListHeaderComponent={renderHeader}
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
  heroImage: {
    height: verticalScale(180),
    width: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  overlay: {
    padding: moderateScale(20),
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: moderateScale(16),
    height: '100%',
    justifyContent: 'flex-end',
  },
  heroSubtitle: {
    color: '#E0E0E0',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: verticalScale(4),
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: verticalScale(24),
  },
});

export default GhagavadGeethaScreen;
