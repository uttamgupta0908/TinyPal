import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft, Tally1 } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
    title: string;
    subtitle?: string;
    bgColor?: string;
}

const CommonHeader = ({ title, subtitle = "", bgColor = "bg-brand-dark" }: Props) => {
    const navigation = useNavigation();

    return (
        <View className={`w-full ${bgColor} px-5 pt-12 pb-4 flex-row items-center shadow-card`} style={{ minHeight: 68 }}>
            <TouchableOpacity className="mr-2" hitSlop={10}>
                <View>
                    <ChevronLeft size={26} color="#FFFFFF" />
                </View>
            </TouchableOpacity>
            <Tally1 size={28} color="#FFFFFF" className="mr-3" />
            <View className="flex-1">
                <Text className="text-white text-lg font-extrabold" numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                {subtitle ? (
                    <Text className="text-white/80 text-xs mt-0.5">{subtitle}</Text>
                ) : null}
            </View>
            <View className="w-5" />
        </View>
    );
};

export default CommonHeader;