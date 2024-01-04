import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, AntDesign, Feather, Entypo } from "@expo/vector-icons";

import MenuStack from "./MenuStack";
import TripStack from "./TripStack";
import Wishlists from "~/screens/Wishlists";
import MotelStack from "./MotelStack";

const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarInactiveTintColor: "#000",
        tabBarActiveTintColor: "#D83752",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={MotelStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Wishlists"
        component={Wishlists}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name={"hearto"} size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="TripStack"
        component={TripStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="send" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="menu" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppStack;
