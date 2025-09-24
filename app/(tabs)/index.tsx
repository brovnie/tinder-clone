import CardSwiper from "@/components/swiper";
import { Card } from "@/components/types/types";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import type Swiper from "react-native-deck-swiper";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [swipeRef, setSwipeRef] = useState<Swiper<Card> | null>(null);

  useEffect(() => {
    navigation.setOptions({
      swipeEnabled: false,
    });
  }, [navigation]);

  return (
    <View className="flex-1">
      <View className="flex-1">
        <CardSwiper setSwipeRef={setSwipeRef} />
      </View>
      <View className="flex-row items-end justify-evenly z-10">
        <TouchableOpacity
          className="items-center justify-center rounded-full w-20 h-20 bg-red-300 dark:bg-red-800"
          onPress={() => {
            swipeRef?.swipeLeft();
          }}
        >
          <Entypo name="cross" size={50} color={"#dc2626"} />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full w-20 h-20 bg-green-300 dark:bg-green-800"
          onPress={() => {
            swipeRef?.swipeRight();
          }}
        >
          <AntDesign name="heart" size={40} color={"#22c55e"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
