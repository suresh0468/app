import { Dimensions } from 'react-native';

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 412;
const guidelineBaseHeight = 914;

// Create a function that gets dimensions at runtime instead of module load
const getDimensions = () => Dimensions.get('window');

const scale = (size: number) =>
  (getDimensions().width / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (getDimensions().height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
