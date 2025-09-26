import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";
import { Button } from "react-native-paper";

type BtnType = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  whiteButton?: boolean;
};

const Btn = ({
  text,
  onPress,
  disabled = false,
  whiteButton = false,
}: BtnType) => {
  const colorScheme = useColorScheme();

  return (
    <Button
      mode="contained"
      labelStyle={{ fontSize: 18 }}
      contentStyle={{ height: 50 }}
      onPress={onPress}
      buttonColor={
        !whiteButton ? Colors[colorScheme ?? "light"].button : "white"
      }
      textColor={whiteButton ? "black" : "white"}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default Btn;
