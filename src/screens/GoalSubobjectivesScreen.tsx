// import React, { useRef, useCallback } from "react";
// import { View, Text, Image, ScrollView } from "react-native";
// import CommonHeader from "../components/CommonHeader";
// import AskTinuBar from "../components/AskTinuBar";
// import BottomSheet from "@gorhom/bottom-sheet";
// import CustomBackdrop from "../components/Custombackdrop";
// import DeepDiveSheet from "../components/DeepDiveSheet";

// const GoalSubobjectivesScreen = () => {
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   const handleSheetChanges = useCallback((index: number) => {
//     console.log("handleSheetChanges", index);
//   }, []);

//   return (
//     <View className="flex-1 bg-[#081824]">
//         {/* HEADER */}
//         <CommonHeader title="UNLEARN OLD" subtitle="No Distractions 101" />

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         >
//           {/* MAIN IMAGE */}
//           <Image
//             source={require("../assets/images/main2.png")}
//             className="w-full h-[250px] rounded-b-3xl"
//             resizeMode="cover"
//           />

//           {/* CONTENT CARD */}
//           <View className="px-4 mt-[-40px] ">
//             <View className="bg-[#3A5B73] rounded-3xl p-4 ">
//               <Text className="text-white text-[16px] font-semibold mb-2">
//                 1
//               </Text>

//               <Text className="text-white text-[20px] font-semibold mb-4">
//                 What Qualifies as{"\n"}Distractions?
//               </Text>

//               <Text className="text-[#E0E0E0] text-[15px] leading-relaxed mb-4">
//                 Toys and screens? Obvious distractions. But so are:
//                 {"\n"}- “Open your mouth! Here comes an aeroplane woooooo!!”
//                 {"\n"}- “Look there’s a bird!”, as the bite goes in{" "}
//                 {"<child name>"}’s mouth.
//                 {"\n"}- “I’m closing my eyes. Let me see who comes to take a
//                 bite: you or the cat!”
//               </Text>
//             </View>
//           </View>
//         </ScrollView>

//         {/* ASK TINU BAR */}
//         <View className="absolute bottom-0 w-full">
//           <AskTinuBar
//             question="What can I talk about instead?"
//             onPress={() => bottomSheetRef.current?.expand()}
//           />
//         </View>

//         {/* DEEP DIVE SHEET */}
//         <DeepDiveSheet
//           bottomSheetRef={bottomSheetRef}
//           question="What are considered distractions?"
//         />
//       </View>
//   );
// };

// export default GoalSubobjectivesScreen;
