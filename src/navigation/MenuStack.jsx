import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "~/screens/Menu";
import Profile from "~/screens/Profile";
import EditProfile from "~/screens/EditProfile";
import PostMotel from "~/screens/PostMotel";

const Stack = createNativeStackNavigator();

function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PostMotel" component={PostMotel} />
    </Stack.Navigator>
  );
}

export default MenuStack;
