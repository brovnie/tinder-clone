import Btn from "@/components/ui/button";
import FieldInput from "@/components/ui/field-input";
import { useAuth } from "@/hooks/useAuth";
import { JSX, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Step = {
  label: string;
  inputField: JSX.Element;
};

export default function ModalScreen() {
  const { user, updateUserAuthProfile } = useAuth();
  const [name, setName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [occupation, setOccupation] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);

  const updateProfile = () => {
    //remove data for user one
    // updateUserAuthProfile({photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"});
    if (name || avatar) {
      const data: { [key: string]: any } = {};
      name && (data["displayName"] = name);
      avatar && (data["photoURL"] = avatar);

      updateUserAuthProfile(data);
    }
  };

  const allSteps: (Step | false)[] = [
    !user?.displayName && {
      label: "Your name: can be set only once",
      inputField: (
        <FieldInput
          label=""
          placeholder="Joe Doe"
          onChangeText={setName}
          error=""
          value={name}
        />
      ),
    },
    !user?.photoURL && {
      label: "Your avatar url",
      inputField: (
        <FieldInput
          label=""
          placeholder="https://avatar.example.com"
          onChangeText={setAvatar}
          error=""
          value={avatar}
        />
      ),
    },
    {
      label: "Your profile picture url",
      inputField: (
        <FieldInput
          label=""
          placeholder="https://profile-picture.example.com"
          onChangeText={setProfilePicture}
          error=""
          value={profilePicture}
        />
      ),
    },
    {
      label: "Your occupation",
      inputField: (
        <FieldInput
          label=""
          placeholder="cool job"
          onChangeText={setOccupation}
          value={occupation}
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
          onChangeText={setAge}
          value={age}
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
        <ScrollView className="flex-1 mx-10">
          <View className="flex-1 items-center pt-1 ">
            <Image
              source={require("@/assets/images/Tinder-Logo-Name.png")}
              resizeMode="contain"
              className="w-full h-28"
            />
            <Text className="dark:text-white text-3xl ">
              Welcome {user?.displayName ? user?.displayName : user?.email}
            </Text>
            <View className="h-1 my-4 flex-1 bg-slate-200 mx-10 w-full"></View>

            <View className="w-full px-10 ">
              <Btn onPress={() => {}} text="Logout" />
            </View>
            <View className="h-1 my-4 flex-1 bg-slate-200 mx-10 w-full"></View>
            <View>
              <Text className="dark:text-white text-2xl border-red-400 dark:border-rose-900 border-b-8 ml-10 mr-auto">
                Edit your profile
              </Text>
              {steps.map((step, index) => (
                <View key={index} className="h-24 mt-6  w-screen px-10">
                  <Text className="dark:text-white text-rose-500 font-bold text-xl mb-2">
                    Step {index + 1}: {step.label}
                  </Text>
                  {step.inputField}
                </View>
              ))}
            </View>
            <View className="mt-5">
              <Btn
                onPress={() => {
                  updateProfile();
                }}
                text="Update Profile"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
