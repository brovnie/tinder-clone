import HeaderIndex from "@/components/header-index";
import CardSwiper, { ProfileCard } from "@/components/swiper";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useLayoutEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import type Swiper from "react-native-deck-swiper";

export default function HomeScreen() {
  const [swipeRef, setSwipeRef] = useState<Swiper<ProfileCard> | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  // show modal if the user profile not set
  useLayoutEffect(() => {
    if (user) {
      const unsibscribe = onSnapshot(
        doc(db, "users", user?.uid),
        (snapshot) => {
          if (!snapshot.exists()) {
            router.push("/modal");
          }
        }
      );
      return () => unsibscribe();
    }
  }, []);

  return (
    <>
      <HeaderIndex />
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
    </>
  );
}
