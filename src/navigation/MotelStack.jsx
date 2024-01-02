import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Explore from "~/screens/Explore";
import User from "~/screens/User";
import DetailMotel from "~/screens/DetailMotel";

const Stack = createNativeStackNavigator();

function MotelStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Explore} />
      <Stack.Screen name="Detail" component={DetailMotel} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}

export default MotelStack;
