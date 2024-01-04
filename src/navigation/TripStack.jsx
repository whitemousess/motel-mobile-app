import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Trips from "~/screens/Trips";
import PaymentScreen from "~/screens/PaymentScreen";
import ResultPayment from "~/screens/ResultPayment";

const Stack = createNativeStackNavigator();

function TripStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Trips" component={Trips} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ResultPayment" component={ResultPayment} />
    </Stack.Navigator>
  );
}

export default TripStack;
