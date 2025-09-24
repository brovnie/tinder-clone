import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";
import { Button } from "react-native-paper";

const Btn = ({ text, onPress }: { text: string; onPress: () => void }) => {
  const colorScheme = useColorScheme();

  return (
    <Button
      mode="contained"
      labelStyle={{ fontSize: 18 }}
      contentStyle={{ height: 50 }}
      onPress={onPress}
      buttonColor={Colors[colorScheme ?? "light"].button}
      textColor="white"
    >
      {text}
    </Button>
  );
};

export default Btn;
