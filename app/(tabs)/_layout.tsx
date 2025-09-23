import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from ".";
import Chat from "./chat";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tab.Screen name="index" component={HomeScreen} />
      <Tab.Screen name="chat" component={Chat} />
    </Tab.Navigator>
  );
}
