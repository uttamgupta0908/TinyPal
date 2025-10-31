import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ArrowUp, ChevronDown, Mic, Share } from "lucide-react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import ContextChip from "./ContextChip";
import ScriptCard from "./ScriptCard";
import CustomAnimatedBackdrop from "./Custombackdrop";
import { getTinuData, TinuUiData } from "../backend/bff";
import BackgroundSvg from "../assets/svg/Background";

interface Props {
    // Optional external ref; if not provided, component will create its own.
    bottomSheetRef?: React.RefObject<BottomSheet | null>;
    question: string;
    gradientColors?: string[];
}

const DeepDiveSheet = ({ question, gradientColors = ["#FFFFFF", "#F3A9A1"] }: Props) => {
    const [isSheetOpen, setSheetOpen] = useState(false)
    const [inputText, setInputText] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [tinuData, setTinuData] = useState<TinuUiData | null>(null);
    const [loading, setLoading] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        const loadTinuData = async () => {
            try {
                setLoading(true);
                const data = await getTinuData();
                setTinuData(data);
            } catch (error) {
                console.error("Failed to load Tinu data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isSheetOpen) {
            loadTinuData();
        }
    }, [isSheetOpen]);

    const handleExpand = () => {
        setSheetOpen(true)
        bottomSheetRef.current?.expand()
    }
    const handleCollapse = () => bottomSheetRef?.current?.close();
    // Custom backdrop that fades in/out
    //   const renderBackdrop = useCallback(
    //     (props) => (
    //         <BottomSheetBackdrop
    //             {...props}
    //             disappearsOnIndex={-1}
    //             appearsOnIndex={1}
    //             style={{backgroundColor:'black'}}
    //         >
    //           <View style={{width:100,height:100,backgroundColor:'black',zIndex:100}}>
    //           <Text>cddd</Text>
    //           </View>
    //         </BottomSheetBackdrop>
    //     ),
    //     []
    // );
    const handleComponent = useCallback(() => {
        return <ImageBackground
            source={require("../assets/images/Backdrop.png")}

            style={{ width: '100%', height: 90, backgroundColor: 'transparent', top: '50' }}
        >
            <View className="bg-black">
                <View className="absolute flex-row rounded-full items-center justify-center px-6 -top-14 left-12">

                    <Image
                        source={require("../assets/images/Character.png")}
                        className="w-24 h-24"
                        resizeMode="contain"
                    />
                    <View className="">
                        <Text className=" font-bold text-white flex-1 left-8 top-1 ">
                            {question}
                        </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    }, [])
    return (
        <>

            {/* {askTinuBar.tsx} */}

            <ImageBackground
                source={require("../assets/images/Backdrop.png")}
                style={{ width: '100%', height: 80, backgroundColor: 'transparent' }}
            >
                <LinearGradient
                    colors={["#FFFFFF", "#F3E5E3"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}

                    className="px-5 py-5 flex-row justify-between top-6  items-center"
                >
                    {/* Character positioned outside the card */}
                    <View className="absolute -top-16 left-20 w-16 h-16 rounded-full items-center justify-center"
                    >
                        <Image
                            source={require("../assets/images/Character.png")}
                            className="w-28 h-20"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Question text with proper spacing */}
                    <Text className="text-[#4B164C] font-bold flex-1 ">
                        {question}
                    </Text>

                    {/* Ask Tinu button */}

                    <TouchableOpacity
                        onPress={handleExpand}
                        className="rounded-full active:scale-95 overflow-hidden"
                    >
                        <LinearGradient
                            colors={["#E2D3FF", "#FFCCB8", "#FFB4E2"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            locations={[0, 0.5292, 1]}
                            className="px-5 py-2.5"
                        >
                            <Text className="text-[#4B164C] font-semibold text-xs">Ask Tinu</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>


            {/*  */}

            {isSheetOpen && <BottomSheet
                ref={bottomSheetRef}
                index={0}
                backdropComponent={CustomAnimatedBackdrop}
                enablePanDownToClose
                onClose={() => {
                    setSheetOpen(false)
                }}
                backgroundStyle={{ backgroundColor: 'transparent' }}
                handleComponent={handleComponent}
            >
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    <LinearGradient
                        colors={gradientColors}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 2, y: 2 }}
                        style={{
                            flex: 1,
                            minHeight: "10%",
                            paddingHorizontal: 24,
                            paddingTop: 16,
                            paddingBottom: 40,
                        }}
                        className="flex-1 min-h-full px-6 pt-4 pb-10"
                    >
                        <View className=" flex-row justify-end items-center mb-4">

                            <TouchableOpacity onPress={handleCollapse} className="p-1 w-8 h-8 rounded-full items-center justify-center">

                                <ChevronDown size={22} color="#222" />

                            </TouchableOpacity>
                        </View>

                        {/* Scripts */}
                        {loading ? (
                            <View className="items-center justify-center mb-4">
                                <ActivityIndicator size="large" color="#7B3AD0" />
                            </View>
                        ) : (
                            <>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    horizontal
                                    className="mb-3"
                                    contentContainerStyle={{ paddingBottom: 8 }}
                                >
                                    {tinuData?.cards && tinuData.cards.length > 0 ? (
                                        tinuData.cards.map((sc, idx) => (
                                            <ScriptCard key={idx} title={sc.title} content={sc.content} className="mr-3" />
                                        ))
                                    ) : (
                                        <ScriptCard title="Loading..." content="Please wait..." className="mr-3" />
                                    )}
                                </ScrollView>

                                {/* Context Section */}
                                <View className="flex-row items-center mb-2">
                                    <Share size={14} color="#7B3AD0" />
                                    <Text className="text-xs font-semibold text-[#7B3AD0] ml-1">
                                        Share more context about Arya
                                    </Text>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                                    {tinuData?.chips && tinuData.chips.length > 0 ? (
                                        tinuData.chips.map((ctx, idx) => (
                                            <ContextChip
                                                key={idx}
                                                text={ctx}
                                                className="rounded-full bg-purple-200 px-4 py-2 mr-2"
                                            />
                                        ))
                                    ) : (
                                        <ContextChip text="Loading..." className="rounded-full bg-purple-200 px-4 py-2 mr-2" />
                                    )}
                                </ScrollView>
                            </>
                        )}

                        {/* Input Field */}
                        <View className="bg-white rounded-full flex-row items-center px-4 py-2 shadow-md mt-2">
                            <TextInput
                                className="flex-1 text-sm text-gray-700"
                                placeholder="Ask me anything..."
                                placeholderTextColor="#9CA3AF"
                                value={inputText}
                                onChangeText={setInputText}
                                onFocus={() => setIsRecording(false)}
                            />

                            <TouchableOpacity
                                className={`w-8 h-8 rounded-full items-center justify-center mr-2 ${isRecording ? "bg-red-500" : "bg-gray-300"
                                    }`}
                                onPress={() => setIsRecording(!isRecording)}
                            >
                                <Mic size={16} color="#fff" />
                            </TouchableOpacity>


                            <TouchableOpacity className="w-8 h-8 rounded-full bg-orange-400 items-center justify-center active:scale-95">
                                <ArrowUp size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>


                    </LinearGradient>
                </BottomSheetScrollView>
            </BottomSheet>}

        </>
    );
};

export default DeepDiveSheet;
