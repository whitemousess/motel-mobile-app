import { TextInput, View } from "react-native";

function InputCustom({
  label,
  onChange,
  keyboardType,
  value,
  icon,
  password,
  isError,
}) {
  var isEmpty;
  if (isError) {
    isEmpty = {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#F24C3D",
    };
    label = "Thiếu thông tin";
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15,
        padding: 4,
        ...isEmpty,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={label}
        secureTextEntry={password}
        placeholderTextColor={isError ? "#F24C3D" : "#ccc"}
        style={{
          flex: 1,
          paddingVertical: 0,
          fontSize: 16,
        }}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default InputCustom;
