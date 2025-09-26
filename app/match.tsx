import Btn from "@/components/ui/button";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";

type MatchScreenParams = {
  loggedInPhoto: string;
  swippedUserName: string;
  swippedUserPhoto: string;
};

const Match = () => {
  const router = useRouter();
  const { params } = useRoute() as { params: MatchScreenParams };

  return (
    <View className="flex-1 h-full px-20 bg-red-500 dark:bg-red-800 pt-20 opacity-90 justify-center">
      <Text className="text-5xl text-white text-center ">
        It&apos;s a match!
      </Text>
      <Text className="text-white text-center mt-5 text-xl">
        You and {params?.swippedUserName} have liked each other
      </Text>
      <View className="flex-row justify-evenly mt-8 mb-10 items-center">
        <Avatar.Image size={100} source={{ uri: params.swippedUserPhoto }} />
        <Avatar.Image size={100} source={{ uri: params.loggedInPhoto }} />
      </View>
      <Btn
        text="Send a Message"
        onPress={() => {
          router.back();
          router.navigate("/chat");
        }}
        whiteButton
      />
    </View>
  );
};

export default Match;
