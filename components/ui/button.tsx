import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";
import { Button } from "react-native-paper";

type BtnType = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

const Btn = ({ text, onPress, disabled = false }: BtnType) => {
  const colorScheme = useColorScheme();

  return (
    <Button
      mode="contained"
      labelStyle={{ fontSize: 18 }}
      contentStyle={{ height: 50 }}
      onPress={onPress}
      buttonColor={Colors[colorScheme ?? "light"].button}
      textColor="white"
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default Btn;
