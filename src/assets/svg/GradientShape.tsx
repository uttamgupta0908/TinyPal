import React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

const GradientShape = () => {
    return (
        <Svg width={200} height={400} viewBox="0 0 600 1000" fill="none">
            <Defs>
                <LinearGradient
                    id="paint0_linear_0_1"
                    x1="205.715"
                    y1="100"
                    x2="205.715"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset="0" stopColor="#F3EDF7" stopOpacity="0" />
                    <Stop offset="0.649038" stopColor="#F3EDF7" stopOpacity="1" />
                </LinearGradient>
            </Defs>

            <Path
                d="M-0.285156 32C-0.285156 14.3269 14.0417 0 31.7148 0H36.265C47.0965 0 57.4626 4.40347 64.9825 12.1991L70.7265 18.1537C88.8868 36.9797 119.043 36.9797 137.203 18.1537L144.442 10.6497C151.007 3.8442 160.056 0 169.512 0H205.715H379.715C397.388 0 411.715 14.3269 411.715 32V100H-0.285156V32Z"
                fill="url(#paint0_linear_0_1)"
            />
        </Svg>
    );
}


export default GradientShape