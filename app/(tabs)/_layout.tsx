import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState } from "react";
import HomeScreen from ".";
import Chat from "./chat";
import Message from "./message";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const [swipeEnabled, setSwipeEnabled] = useState(false);
  //First time swipe is true on ios: https://github.com/react-navigation/react-navigation/issues/12668
  return (
    <Tab.Navigator
      initialRouteName="index"
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
      <Tab.Screen
        name="message"
        component={Message}
        listeners={{ focus: () => setSwipeEnabled(true) }}
      />
    </Tab.Navigator>
  );
}
