import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import CommonHeader from "../components/CommonHeader";
import DeepDiveSheet from "../components/DeepDiveSheet";
import { getFlashcardsData, FlashcardUiItem } from "../backend/bff";
const FlashcardScreen = () => {
    const [showDeepDive, setShowDeepDive] = useState(false);
    const [flashcards, setFlashcards] = useState<FlashcardUiItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

    useEffect(() => {
        const loadFlashcards = async () => {
            try {
                setLoading(true);
                const data = await getFlashcardsData();
                setFlashcards(data);
                setCurrentFlashcardIndex(0);
            } catch (error) {
                console.error("Failed to load flashcards:", error);
            } finally {
                setLoading(false);
            }
        };
        loadFlashcards();
    }, []);

    return (
        <View className="flex-1 bg-[#081824] mt-[-30px]">
            <CommonHeader
                title="UNLEARN OLD PATTERNS"
                subtitle="No Distractions 101"
                bgColor="bg-[#081824]"
            />
            <View className="items-center mt-2 ">
                <Image
                    source={require("../assets/images/main2.png")}
                    className="w-full h-[220px]  rounded-t-3xl"
                    resizeMode="cover"
                />
            </View>

            <View className="flex-1 mb-500">

                <View className="bg-[#4A7A8C] mb-[80px] mt-[-10px] p-6 flex-1 rounded-b-3xl relative">

                    {loading ? (
                        <View className="flex-1 items-center justify-center mt-16">
                            <ActivityIndicator size="large" color="#FFFFFF" />
                            <Text className="text-white/80 mt-4">Loading flashcards...</Text>
                        </View>
                    ) : flashcards.length > 0 ? (
                        <ScrollView className="mt-16" >
                            <View className="absolute top-[-40px] left-6 w-12 h-12 bg-[#4A7A8C] rounded-full items-center justify-center z-10">
                                <Text className="text-white font-bold text-xl">{currentFlashcardIndex + 1}</Text>
                            </View>
                            <Text className="text-white text-xl font-bold mb-4">
                                {/* {flashcards[currentFlashcardIndex]?.title || "Flashcard"} */}"Toys and screens? Obvious distractions. But so are:
                                - “Open your mouth! Here comes an aeroplane wooooo!!”
                                - “Look there’s a bird!”, as the bite goes in  mouth.
                                - “I’m closing my eyes. Let me see who comes to take a bite: you or the cat!”"
                            </Text>
                            {flashcards[currentFlashcardIndex]?.description && (
                                <Text className="text-white/90 text-sm leading-relaxed mb-3">
                                    {flashcards[currentFlashcardIndex].description}
                                </Text>
                            )}
                            {flashcards[currentFlashcardIndex]?.points && flashcards[currentFlashcardIndex].points.length > 0 && (
                                <>
                                    {flashcards[currentFlashcardIndex].points?.map((point, idx) => (
                                        <Text key={idx} className="text-white/90 text-sm leading-relaxed">
                                            - {point}
                                        </Text>
                                    ))}
                                </>
                            )}
                        </ScrollView>
                    ) : (
                        <View className="flex-1 items-center justify-center mt-16">
                            <Text className="text-white/80">No flashcards available</Text>
                        </View>
                    )}
                </View>
            </View>

            <DeepDiveSheet question="What can I talk about instead?" gradientColors={["#FFFFFF", "#A8D8E8"]} />
        </View>
    );
};

export default FlashcardScreen;