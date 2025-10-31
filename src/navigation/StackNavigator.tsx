import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DidYouKnowScreen from '../screens/DidYouKnowScreen';
import GoalSubobjectivesScreen from '../screens/GoalSubobjectivesScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  HOME: undefined;
  DidYouKnow: undefined;
  GOAL_SUBJECTIVE: undefined;
  Flashcard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Home Screen</Text>
      <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded" onPress={() => navigation.navigate('DidYouKnow')}>
        <Text className="text-white text-lg">DidYouKnow</Text>
      </TouchableOpacity>
    </View>)
}
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="DidYouKnow" component={DidYouKnowScreen} />
      <Stack.Screen name="GOAL_SUBJECTIVE" component={GoalSubobjectivesScreen} />
      <Stack.Screen name="Flashcard" component={FlashcardScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

