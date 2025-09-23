import { Text, View } from "react-native";

import Header from "@/components/header";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import "../../global.css";

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      <Header />
      <Text className="dark:text-white">Hello world</Text>
    </View>
  );
}
