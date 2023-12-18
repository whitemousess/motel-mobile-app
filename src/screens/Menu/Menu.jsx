import { useContext } from "react";
import { Button, Text, View } from "react-native";
import SafeView from "~/components/SafeView";
import { AuthContext } from "~/context/AuthContext";

function Menu() {
  const { logOut } = useContext(AuthContext);

  return (
    <SafeView>
      <View>
        <Button title="logOut" onPress={logOut} />
      </View>
    </SafeView>
  );
}

export default Menu;
