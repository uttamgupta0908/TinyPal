import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
    text: string;
    emoji?: string; // Optional emoji
    className?: string; // For potential further overrides
}

const ContextChip = ({ text, emoji, className = '' }: Props) => {
    return (
        <TouchableOpacity
            className={`flex-row items-center bg-brand/80 rounded-pill px-4 py-2 mr-2 shadow-card active:opacity-80 active:scale-95 ${className}`}
            activeOpacity={0.8}
        >
            {emoji && <Text className="text-xl mr-1">{emoji}</Text>}
            <Text className="text-brand-dark font-medium text-sm flex-1" numberOfLines={1} ellipsizeMode="tail">{text}</Text>
        </TouchableOpacity>
    );
};

export default ContextChip;