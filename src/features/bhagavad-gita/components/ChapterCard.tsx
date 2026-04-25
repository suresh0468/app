import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Chapter } from '../types';
import { scale, verticalScale, moderateScale } from '@src/utils/scalingUI';

interface ChapterCardProps {
  chapter: Chapter;
  onPress?: () => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <ImageBackground
        source={chapter.image}
        resizeMode="cover"
        style={[styles.imageBackground, StyleSheet.absoluteFill]}
      />
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{chapter.id}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleSanskrit}>{chapter.title}</Text>
        <Text style={styles.titleEnglish}>{chapter.subTitle}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {chapter.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginHorizontal: scale(16),
    marginBottom: verticalScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
    overflow: 'hidden',
  },
  imageBackground: {
    position: 'absolute',
    opacity: 0.5,
  },
  numberContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#FFF1E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  numberText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#8D5B4C',
  },
  contentContainer: {
    flex: 1,
  },
  titleSanskrit: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: verticalScale(2),
  },
  titleEnglish: {
    fontSize: moderateScale(14),
    color: '#B57C4C',
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: moderateScale(13),
    color: '#666666',
    lineHeight: verticalScale(18),
  },
});

export default ChapterCard;
