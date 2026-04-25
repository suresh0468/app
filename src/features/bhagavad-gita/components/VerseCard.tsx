import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Verse } from '../types';
import { scale, verticalScale, moderateScale } from '@src/utils/scalingUI';

interface VerseCardProps {
  verse: Verse;
  onPress?: () => void;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.verseLabel}>VERSE {verse.id}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.verseText}>{verse.text}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginHorizontal: scale(16),
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(1) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(2),
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0EAD6',
  },
  header: {
    marginBottom: verticalScale(12),
  },
  verseLabel: {
    fontSize: moderateScale(10),
    fontWeight: 'bold',
    color: '#E67E22',
    letterSpacing: 0.5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
  },
  verseText: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    lineHeight: verticalScale(28),
  },
  footer: {
    alignItems: 'flex-end',
    marginTop: verticalScale(8),
  },
  arrow: {
    fontSize: moderateScale(20),
    color: '#666666',
  },
});

export default VerseCard;
