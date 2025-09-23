import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
const Header = () => {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const photo = {
    uri: user?.photoURL
      ? (user.photoURL as string)
      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
  };

  return (
    <Appbar.Header>
      <View className="flex-row justify-between items-center flex-1 px-5">
        <TouchableOpacity>
          <Avatar.Image size={32} source={photo} />
        </TouchableOpacity>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/Tinder-Logo.png")}
              className="w-20 h-20"
            />
          </TouchableOpacity>
        </Link>
        <Link href="/chat" asChild>
          <TouchableOpacity>
            <Ionicons
              name="chatbubbles-sharp"
              size={32}
              color={Colors[colorScheme ?? "light"].button}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </Appbar.Header>
  );
};

export default Header;
