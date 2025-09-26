import { Colors } from "@/constants/theme";
import { KeyboardTypeOptions, useColorScheme, View } from "react-native";
import { TextInput } from "react-native-paper";

type FieldInputType = {
  error: string | null;
  onChangeText: (value: string) => void;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  value?: string | null;
  onSubmitEditing?: () => void;
  inputRef?: any;
};

const FieldInput = ({
  error,
  onChangeText,
  placeholder,
  label,
  secureTextEntry = false,
  keyboardType = "default",
  value,
  onSubmitEditing = () => {},
  inputRef,
}: FieldInputType) => {
  const colorScheme = useColorScheme();
  return (
    <View>
      <TextInput
        ref={inputRef}
        label={label}
        mode="outlined"
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme ?? "light"].inputBorder}
        onChangeText={onChangeText}
        outlineColor={
          !error ? Colors[colorScheme ?? "light"].inputBorder : "red"
        }
        activeOutlineColor={Colors[colorScheme ?? "light"].inputBorderFocused}
        theme={{
          colors: {
            primary: "#4ade80",
            error: "#dc2626",
          },
        }}
        contentStyle={{ paddingHorizontal: 10 }}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value ? value : undefined}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default FieldInput;
