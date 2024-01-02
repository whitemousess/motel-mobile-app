import { Text, View } from "react-native";

function ClientEmpty({ title, description }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>
        {title}
      </Text>
      <Text style={{ color: "#333" }}>{description}</Text>
    </View>
  );
}

export default ClientEmpty;
