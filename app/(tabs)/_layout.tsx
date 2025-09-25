import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigationState } from "@react-navigation/native";
import { useState } from "react";
import HomeScreen from ".";
import Chat from "./chat";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const currentRoute = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });
  currentRoute === "index" && setSwipeEnabled(false);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },
        tabBarStyle: { display: "none" },
        swipeEnabled: swipeEnabled,
      }}
    >
      <Tab.Screen name="index" component={HomeScreen} />
      <Tab.Screen name="chat" component={Chat} />
    </Tab.Navigator>
  );
}
