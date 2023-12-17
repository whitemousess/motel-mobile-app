import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "~/screens/Authentication/Login";
import Register from "~/screens/Authentication/Register";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default AuthStack;
