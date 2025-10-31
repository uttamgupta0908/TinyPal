// import React from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import LinearGradient from "react-native-linear-gradient";

// interface Props {
//     question?: string;
//     onPress: () => void;
//     bgGradient?: string[];
// }

// const AskTinuBar = ({
//     question = "What are considered distractions?",
//     onPress,
//     bgGradient = ["#FFFFFF", "#F3A9A1"],
// }: Props) => {
//     return (
//         <View className="w-full px-4 pb-4">
//             <View className="relative">
//                 <LinearGradient
//                     colors={bgGradient}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     className="px-5 py-4 flex-row justify-between items-center rounded-t-2xl"
//                     style={{
//                         shadowColor: "#000",
//                         shadowOpacity: 0.1,
//                         shadowRadius: 10,
//                         elevation: 5,
//                     }}
//                 >
//                     <Text className="text-[#4B164C] text-sm font-medium flex-1 mr-3">
//                         {question}
//                     </Text>
//                     <TouchableOpacity onPress={onPress} className="bg-[#F8C8DC] px-4 py-2 rounded-full active:scale-95">
//                         <Text className="text-[#4B164C] font-semibold text-xs">Ask Tinu</Text>
//                     </TouchableOpacity>
//                 </LinearGradient>

//                 {/* Character badge sitting above the bar (visual hint) */}
//                 <View className="absolute -top-6 left-6 w-12 h-12 rounded-full items-center justify-center">
//                     <Image
//                         source={require("../assets/images/Character.png")}
//                         className="w-12 h-12"
//                         resizeMode="contain"
//                     />
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default AskTinuBar;



// import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
// import React, { useRef, useState } from 'react'
// import { LinearGradient } from 'react-native-svg'
// import BottomSheet from '@gorhom/bottom-sheet';


// interface Props {
//     // Optional external ref; if not provided, component will create its own.
//     bottomSheetRef?: React.RefObject<BottomSheet | null>;
//     question: string;
//     gradientColors?: string[];
// }
// const [isSheetOpen, setSheetOpen] = useState(false)
// const bottomSheetRef = useRef<BottomSheet>(null);
// const handleExpand = () => {
//     setSheetOpen(true)
//     bottomSheetRef.current?.expand()

// }
// export default function AskTinuBar({ question, gradientColors = ["#FFFFFF", "#F3A9A1"] }: Props) {
//     return (
//         <>
//             <ImageBackground
//                 source={require("../assets/images/Backdrop.png")}
//                 style={{ width: '100%', height: 80, backgroundColor: 'transparent' }}
//             >
//                 <LinearGradient
//                     colors={["#FFFFFF", "#F3A9A1"]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{ borderRadius: 16 }}
//                     className="px-6 py-4 flex-row justify-between top-6 items-center"
//                 >

//                     <View className="absolute -top-20 left-20 w-16 h-16 rounded-full items-center justify-center">
//                         <Image
//                             source={require("../assets/images/Character.png")}
//                             className="w-20 h-20"
//                             resizeMode="contain"
//                         />
//                     </View>
//                     <Text className="text-[#4B164C] text-sm font-medium flex-1 mr-2">
//                         {question}
//                     </Text>
//                     <TouchableOpacity
//                         onPress={handleExpand}
//                         className="bg-[#F8C8DC] px-4 py-2 rounded-full active:scale-95"
//                     >
//                         <Text className="text-[#4B164C] font-semibold text-xs">Ask Tinu</Text>
//                     </TouchableOpacity>
//                 </LinearGradient>

//             </ImageBackground></>
//     )
// }