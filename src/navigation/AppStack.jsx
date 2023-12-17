import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "~/context/AuthContext";

function AppStack() {
  const { logOut } = useContext(AuthContext);
  return (
    <View>
      <Text>AuthStack</Text>
      <Button onPress={logOut} title="LOGOUT" />
    </View>
  );
}

export default AppStack;
