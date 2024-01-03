import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "~/screens/Menu";
import Profile from "~/screens/Profile";
import History from "~/screens/History";
import EditProfile from "~/screens/EditProfile";
import PostMotel from "~/screens/PostMotel";
import EditMotel from "~/screens/EditMotel";
import MyMotel from "~/screens/MyMotel";
import DetailMotel from "~/screens/DetailMotel";

const Stack = createNativeStackNavigator();

function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="PostMotel" component={PostMotel} />
      <Stack.Screen name="EditMotel" component={EditMotel} />
      <Stack.Screen name="Detail" component={DetailMotel} />
      <Stack.Screen name="MyMotel" component={MyMotel} />
    </Stack.Navigator>
  );
}

export default MenuStack;
