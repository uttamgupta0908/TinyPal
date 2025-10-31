// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { BlurView } from '@react-native-community/blur';
// import Animated, {
//   useAnimatedStyle,
//   interpolate,
//   Extrapolate,
// } from 'react-native-reanimated';

// const CustomBackdrop = ({ animatedIndex, style }) => {
//   const animatedOpacity = useAnimatedStyle(() => {
//     const opacity = interpolate(
//       animatedIndex.value,
//       [0, 1],
//       [0, 1],
//       Extrapolate.CLAMP
//     );
//     return { opacity };
//   });

//   return (
//     <Animated.View style={[StyleSheet.absoluteFill, animatedOpacity]}>
//       <BlurView
//         style={StyleSheet.absoluteFill}
//         blurAmount={1}
//         blurType="light"
//       />
//     </Animated.View>
//   );
// };

// export default CustomBackdrop;
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';

// The Animated View wrapper is key for this to work
const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

interface CustomAnimatedBackdropProps {
  animatedIndex: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
}

const CustomAnimatedBackdrop = ({ animatedIndex, style }: CustomAnimatedBackdropProps) => {
  // Animate the opacity of the backdrop
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0], // When sheet is closed (-1) to starting to appear (0)
      [0, 1],   // Opacity goes from 0 to 1
      Extrapolate.CLAMP
    ),
  }));

  return (
    <Animated.View style={[style, animatedOpacity]}>
      <AnimatedBlur
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={15}
      />
    </Animated.View>
  );
};

export default CustomAnimatedBackdrop