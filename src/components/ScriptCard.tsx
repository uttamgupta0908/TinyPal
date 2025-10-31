import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Bookmark, ScrollText, Share } from "lucide-react-native";

interface Props {
  title: string;
  content: string;
  className?: string;
}

const ScriptCard = ({ title, content, className = "" }: Props) => {
  return (
    <View
      className={`bg-[#F8E8EA] rounded-2xl border border-[#E3CCD1] px-5 py-5 w-72 shadow-sm ${className}`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-3">
        {/* Script Tag */}
        <View className="flex-row items-center bg-[#E5C3CC] rounded-full px-2 py-1">
          <ScrollText size={12} color="#5A2D42" />
          <Text className="text-[11px] font-semibold text-[#5A2D42] ml-1">
            SCRIPT
          </Text>
        </View>

        {/* Icons */}
        <View className="flex-row gap-3">
          <TouchableOpacity activeOpacity={0.8}>
            <Share size={18} color="#5A2D42" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Bookmark size={18} color="#5A2D42" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title & Content */}
      <Text className="text-[15px] font-bold text-[#1A1A28] mb-1">
        {title}
      </Text>
      <Text className="text-[13px] text-[#3D3D4A] leading-[20px]">
        {content}
      </Text>
    </View>
  );
};

export default ScriptCard;
