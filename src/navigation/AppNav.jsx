import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "~/context/AuthContext";

function AppNav() {
  const { token } = useContext(AuthContext);
  return (
    <>
      <NavigationContainer>
        {token ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default AppNav;
