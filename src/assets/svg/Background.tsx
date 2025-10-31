import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
const { width } = Dimensions.get('screen')
const BackgroundSvg = (props) => (
  <Svg
    width={width}
    height={425}
    viewBox={`0 0 ${width} 425`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={206} cy={420} r={420} fill="url(#paint0_linear_1_535)" />
    <Defs>
      <LinearGradient
        id="paint0_linear_1_535"
        x1={206}
        y1={0}
        x2={206}
        y2={441}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E7809E" />
        <Stop offset={1} stopColor="#B65672" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default BackgroundSvg;
