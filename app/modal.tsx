import FieldInput from "@/components/ui/field-input";
import { useAuth } from "@/hooks/useAuth";
import { JSX } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Step = {
  label: string;
  inputField: JSX.Element;
};

export default function ModalScreen() {
  const { user } = useAuth();

  const allSteps: (Step | false)[] = [
    !user?.displayName && {
      label: "Your name",
      inputField: (
        <FieldInput
          label=""
          placeholder="Joe Doe"
          onChangeText={() => {}}
          error=""
        />
      ),
    },
    !user?.photoURL && {
      label: "Your avatar",
      inputField: (
        <FieldInput
          label=""
          placeholder="https://avatar.example.com"
          onChangeText={() => {}}
          error=""
        />
      ),
    },
    {
      label: "Your profile picture",
      inputField: (
        <FieldInput
          label=""
          placeholder="https://profile-picture.example.com"
          onChangeText={() => {}}
          error=""
        />
      ),
    },
    {
      label: "Your occupation",
      inputField: (
        <FieldInput
          label=""
          placeholder="cool job"
          onChangeText={() => {}}
          error=""
        />
      ),
    },
    {
      label: "Your age",
      inputField: (
        <FieldInput
          label=""
          placeholder="40"
          onChangeText={() => {}}
          error=""
          keyboardType="numeric"
        />
      ),
    },
  ];
  const steps: Step[] = allSteps.filter(Boolean) as Step[];
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
          <View className="flex-1 items-center pt-1">
            <Image
              source={require("@/assets/images/Tinder-Logo-Name.png")}
              resizeMode="contain"
              className="w-full h-28"
            />
            <Text className="dark:text-white text-3xl mb-5">
              Welcome {user?.displayName ? user?.displayName : user?.email}
            </Text>
            <View>
              <Text className="dark:text-white text-2xl mb-4 border-red-400 dark:border-rose-900 border-b-8 ml-0 mr-auto">
                Edit your profile
              </Text>
              {steps.map((step, index) => (
                <View key={index} className="h-24 mb-6">
                  <Text className="dark:text-white text-rose-500 font-bold text-xl mb-2">
                    Step {index + 1}: {step.label}
                  </Text>
                  {step.inputField}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
