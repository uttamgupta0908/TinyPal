import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface Props {
    question?: string;
    onPress: () => void;
    bgGradient?: string[];
}

const AskTinuBar = ({
    question = "What are considered distractions?",
    onPress,
    bgGradient = ["#FFFFFF", "#F3A9A1"],
}: Props) => {
    return (
        <View className="w-full px-4 pb-4">
            <View className="relative">
                <LinearGradient
                    colors={bgGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="px-5 py-4 flex-row justify-between items-center rounded-t-2xl"
                    style={{
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 5,
                    }}
                >
                    <Text className="text-[#4B164C] text-sm font-medium flex-1 mr-3">
                        {question}
                    </Text>
                    <TouchableOpacity onPress={onPress} className="bg-[#F8C8DC] px-4 py-2 rounded-full active:scale-95">
                        <Text className="text-[#4B164C] font-semibold text-xs">Ask Tinu</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* Character badge sitting above the bar (visual hint) */}
                <View className="absolute -top-6 left-6 w-12 h-12 rounded-full items-center justify-center">
                    <Image
                        source={require("../assets/images/Character.png")}
                        className="w-12 h-12"
                        resizeMode="contain"
                    />
                </View>
            </View>
        </View>
    );
};

export default AskTinuBar;

// import React from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import DeepDiveModal from "./DeepDiveSheet";
// import DeepDiveSheet from "./DeepDiveSheet";

// interface Props {
//     question?: string;
//     onPress: () => void;
//     bgGradient?: string[];
// }

// const AskTinuBar = ({
//     question = "What are considered distractions?",
//     onPress,
//     bgGradient = ["#FFFFFF", "#F3A9A1"]
// }: Props) => {
//     return (
//         <View className="flex-1 rounded-2xl bottom-4 w-full bg-red-600">
//             <View className="relative">

//                 <LinearGradient
//                     colors={bgGradient}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     className="px-5 py-4 flex-row justify-between items-center bg-red-500"
//                     style={{
//                         shadowColor: "#000",
//                         shadowOpacity: 0.1,
//                         shadowRadius: 10,
//                         elevation: 5,
//                     }}
//                 >
//                     <View className="flex-1 pr-3 pl-12">
//                         <Text className="text-[#4B164C] text-sm font-medium">
//                             {question}
//                         </Text>
//                     </View>
//                     <TouchableOpacity onPress={onPress}>
//                         <View className="bg-[#F8C8DC] px-4 py-2 rounded-full">
//                             <Text className="text-[#4B164C] font-semibold text-xs" onPress={() => { DeepDiveSheet }}>Ask Tinu</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </LinearGradient>

//             </View>
//         </View>
//     );
// };

// export default AskTinuBar;
