import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from ".";
import Chat from "./chat";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen
        name="index"
        component={HomeScreen}
        options={{ swipeEnabled: false }}
      />
      <Tab.Screen name="chat" component={Chat} />
    </Tab.Navigator>
  );
}
