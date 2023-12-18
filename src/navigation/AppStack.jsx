import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, AntDesign, Feather, Entypo } from "@expo/vector-icons";

import Explore from "~/screens/Explore";
import Menu from "~/screens/Menu";
import Trips from "~/screens/Trips";
import Wishlists from "~/screens/Wishlists";

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
        component={Explore}
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
            <AntDesign
              name={"hearto"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Trips"
        component={Trips}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="send" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
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
