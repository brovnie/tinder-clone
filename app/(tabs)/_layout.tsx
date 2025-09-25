import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState } from "react";
import HomeScreen from ".";
import Chat from "./chat";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const [swipeEnabled, setSwipeEnabled] = useState(true);

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
      <Tab.Screen
        name="index"
        component={HomeScreen}
        listeners={{ focus: () => setSwipeEnabled(false) }}
      />
      <Tab.Screen
        name="chat"
        component={Chat}
        listeners={{ focus: () => setSwipeEnabled(true) }}
      />
    </Tab.Navigator>
  );
}
