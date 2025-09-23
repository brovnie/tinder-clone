import { auth } from "@/firebase";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { Text, View } from "react-native";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: false,
  forceCodeForRefreshToken: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

const GoogleLoginButton = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { accessToken, idToken } = await GoogleSignin.getTokens();
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        try {
          await signInWithCredential(auth, credential);
        } catch (error) {
          console.log("signInWithCredential error:", error);
        }
      } else {
        // sign in was cancelled by user
        return Promise.reject();
      }
    } catch (error) {
      //TODO: error handeling
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <View className="items-center">
      <View className="flex-row w-full mb-3 justify-center items-center">
        <View className="h-1 flex-1 bg-slate-200 mr-10"></View>
        <Text className="text-xl">or</Text>
        <View className="h-1 flex-1 bg-slate-200 ml-10"></View>
      </View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
        className="m-0"
      />
    </View>
  );
};

export default GoogleLoginButton;
