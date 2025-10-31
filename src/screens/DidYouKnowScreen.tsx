import React, { useRef, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import CommonHeader from "../components/CommonHeader";
import DeepDiveSheet from "../components/DeepDiveSheet";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import BottomSheet from "@gorhom/bottom-sheet";
import { getDidYouKnowData, DidYouKnowUiCard } from "../backend/bff";
import BackgroundSvg from "../assets/svg/Background";
const { width } = Dimensions.get('window');
const DidYouKnowScreen = () => {
    const navigation = useNavigation();
    const [dykCards, setDykCards] = useState<DidYouKnowUiCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    useEffect(() => {
        const loadDidYouKnowData = async () => {
            try {
                setLoading(true);
                const data = await getDidYouKnowData();
                setDykCards(data);
                setCurrentCardIndex(0);
            } catch (error) {
                console.error("Failed to load Did You Know cards:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDidYouKnowData();
    }, []);



    return (
        <View className="flex-1 bg-[#4B164C] mt-[-30px]  ">
            {/* Header */}
            <TouchableOpacity onPress={() => navigation.navigate('Flashcard' as never)}>
                <CommonHeader
                    title="UNLEARN OLD PATTERNS"
                    subtitle="Distractions = No No!"
                />
            </TouchableOpacity>
            {/* Top Illustration */}
            <View className="items-center mt-2 ">
                <Image
                    source={require("../assets/images/main1.png")}
                    className="w-full h-[280px] rounded-t-3xl"
                    resizeMode="cover"
                />
            </View>

            <View className="flex-1">
                {/* Elliptical Pink Section */}
                {/* <View

                    // className="bg-[#D47FA1] mb-[80px] mt-[-30px]  p-6 flex-1"
                    style={{
                        backgroundColor: '#D47FA1',
                        width: width * 1.4, // 120% width
                        // height: (width * 2) / 2,
                        height: width * 0.9,
                        borderTopLeftRadius: (width * 1.2) / 2,
                        borderTopRightRadius: (width * 1.2) / 2,
                        alignSelf: 'center', // centers the extra width
                        position: 'absolute',
                        borderBottomRightRadius: width * 0.3,
                        borderBottomLeftRadius: width * 0.3,
                        top: -50,
                    }}
                /> */}
                <View className="absolute top-10 justify-center bottom-60 ">
                    <BackgroundSvg />
                </View>
                {/* Floating Badge Image */}
                <Image
                    source={require("../assets/images/main3.png")}
                    resizeMode="contain"
                    style={{
                        width: 120,
                        height: 100,
                        position: "absolute",
                        top: -100, // overlap ellipse top
                        alignSelf: "center",

                    }}
                />

                {/* Buttons Row */}
                <View className="flex-row justify-center gap-6 items-start w-full mt-[30px] mb-6 ">
                    <View className="border justify-center border-white/70 rounded-xl px-3 py-2 w-[100px] h-[60px] bg-pink-300 ">
                        <Text className="text-center text-white text-xs leading-tight ">
                            Eating with{"\n"}distractions
                        </Text>
                    </View>


                    <FastImage
                        source={require("../assets/images/arrow.gif")}
                        style={{ width: 64, height: 64 }}
                        resizeMode={FastImage.resizeMode.contain}
                    />


                    <View className="border justify-center border-white/70 rounded-xl px-3 py-2 w-[100px] h-[60px] bg-pink-300">
                        <Text className="text-center text-white text-xs leading-tight">
                            Higher rates of{"\n"}healthy food{"\n"}refusal
                        </Text>
                    </View>
                </View>

                {/* Description */}
                {loading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="#FFFFFF" />
                        <Text className="text-white/80 mt-4">Loading content...</Text>
                    </View>
                ) : dykCards.length > 0 ? (
                    <>
                        <Text className="text-white px-4 text-center mb-4 text-sm leading-relaxed text-[60px]">
                            {dykCards[currentCardIndex]?.description || "No description available"}
                        </Text>

                        {/* Reference Link */}
                        {dykCards[currentCardIndex]?.reference && (
                            <Text className="underline text-center text-[#FCCCA8] text-[14px] mt-20">
                                {dykCards[currentCardIndex].reference}
                            </Text>
                        )}
                    </>
                ) : (
                    <Text className="text-white px-4 text-center mb-4 text-sm leading-relaxed text-[60px]">
                        No content available
                    </Text>
                )}
            </View>
            <DeepDiveSheet question="What are considered distractions?" />
        </View>
    );
};

export default DidYouKnowScreen;
