import { Text, View } from "react-native";
import SafeView from "../SafeView";

function ClientEmpty({ title, description }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeView>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={{ color: "#333" }}>{description}</Text>
        </View>
      </SafeView>
    </View>
  );
}

export default ClientEmpty;
