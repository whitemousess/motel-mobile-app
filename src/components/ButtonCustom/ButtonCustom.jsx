import { Text, TouchableOpacity } from "react-native";

function ButtonCustom({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
      }}
      activeOpacity={1}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#000",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default ButtonCustom;
