import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Verse } from '../types';
import { scale, verticalScale, moderateScale } from '@src/utils/scalingUI';
import StatusBarCover from '@src/components/layout/StatusBarCover';
import Tts from 'react-native-tts';

// Initialize TTS
Tts.setDefaultLanguage('te-IN');
Tts.setDefaultRate(1, true); // Slower rate for clarity in spiritual verses

type RootStackParamList = {
  VerseDetail: { verse: Verse };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type VerseDetailRouteProp = RouteProp<RootStackParamList, 'VerseDetail'>;

const VerseDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<VerseDetailRouteProp>();
  const { verse } = route.params;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Image slideshow logic with cross-fade
  useEffect(() => {
    if (verse.images.length <= 1) return;

    const interval = setInterval(() => {
      const next = (currentIdx + 1) % verse.images.length;
      setNextIdx(next);
      fadeAnim.setValue(0);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500, // Smooth transition duration
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setCurrentIdx(next);
          setNextIdx(null);
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIdx, verse.images.length, fadeAnim]);

  const getImageSource = (img: any) => {
    return typeof img === 'string' ? { uri: img } : img;
  };

  // TTS cleanup
  useEffect(() => {
    return () => {
      Tts.stop();
    };
  }, []);

  const handleSpeak = (text: string) => {
    Tts.stop();
    Tts.speak(text);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `${verse.text}\n\nMeaning: ${verse.meaning}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBarCover style={styles.statusBar} />

      <View style={styles.headerOverlay}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>శ్రీమద్భగవద్గీత</Text>
        <TouchableOpacity onPress={onShare} style={styles.iconButton}>
          <Text style={styles.headerIcon}>షేర్</Text>
        </TouchableOpacity>
      </View>
      {/* Fixed Image Header Area */}
      <View style={styles.imageContainer}>
        {/* Base Image */}
        <Image
          source={getImageSource(verse.images[currentIdx])}
          style={styles.verseImage}
          resizeMode="cover"
        />

        {/* Cross-fading Overlaid Image */}
        {nextIdx !== null && (
          <Animated.Image
            source={getImageSource(verse.images[nextIdx])}
            style={[styles.verseImage, { opacity: fadeAnim }]}
            resizeMode="cover"
          />
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sloka Section */}
        <View style={styles.slokaSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.slokaText}>{verse.text}</Text>
            <TouchableOpacity
              onPress={() => handleSpeak(verse.text)}
              style={styles.playButton}
            >
              <Text style={styles.playIcon}>🔊</Text>
            </TouchableOpacity>
          </View>
          {verse.transliteration && (
            <Text style={styles.transliterationText}>
              {verse.transliteration}
            </Text>
          )}
          <View style={styles.divider} />
        </View>

        {/* Meaning Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderTitleRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.sectionIcon}>💡</Text>
              </View>
              <Text style={styles.sectionTitle}>సరళ భావం • SIMPLE MEANING</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleSpeak(verse.meaning)}
              style={styles.playButtonSmall}
            >
              <Text style={styles.playIconSmall}>🔊</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.meaningCard}>
            <Text style={styles.meaningText}>{verse.meaning}</Text>
          </View>
        </View>

        {/* Explanation Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderTitleRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.sectionIcon}>📖</Text>
              </View>
              <Text style={styles.sectionTitle}>
                తాత్పర్యం / వ్యాఖ్యానం • EXPLANATION
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleSpeak(verse.explanation)}
              style={styles.playButtonSmall}
            >
              <Text style={styles.playIconSmall}>🔊</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.explanationCard}>
            <Text style={styles.explanationText}>{verse.explanation}</Text>
          </View>
        </View>

        <View style={{ height: verticalScale(100) }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  statusBar: {
    backgroundColor: 'transparent',
  },
  imageContainer: {
    height: verticalScale(250),
    zIndex: 10,
  },
  verseImage: {
    backgroundColor: '#000',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  headerOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#E67E22',
    textAlign: 'center',
  },
  headerIcon: {
    fontSize: moderateScale(24),
    color: '#E67E22',
  },
  iconButton: {
    padding: moderateScale(8),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(20),
  },
  slokaSection: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  slokaText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    lineHeight: verticalScale(32),
    marginBottom: verticalScale(12),
  },
  transliterationText: {
    fontSize: moderateScale(14),
    color: '#8D6E63',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: verticalScale(16),
  },
  divider: {
    width: scale(60),
    height: verticalScale(2),
    backgroundColor: '#FFE0B2',
    marginTop: verticalScale(8),
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: scale(20),
  },
  sectionHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    padding: moderateScale(8),
    marginLeft: scale(8),
  },
  playButtonSmall: {
    padding: moderateScale(4),
  },
  playIcon: {
    fontSize: moderateScale(20),
  },
  playIconSmall: {
    fontSize: moderateScale(16),
  },
  iconCircle: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  sectionIcon: {
    fontSize: moderateScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    color: '#795548',
    letterSpacing: 0.5,
  },
  meaningCard: {
    backgroundColor: '#FFF8F1',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  meaningText: {
    fontSize: moderateScale(16),
    color: '#3E2723',
    lineHeight: verticalScale(26),
  },
  explanationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  explanationText: {
    fontSize: moderateScale(15),
    color: '#4E342E',
    lineHeight: verticalScale(24),
  },
});

export default VerseDetailScreen;
