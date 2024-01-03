import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Item({ data }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginVertical: 6,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        borderRadius: 10,
        overflow: "hidden",
      }}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("Detail", {
          motelId: data.motelId._id,
        })
      }
    >
      <Image
        source={{ uri: data.motelId.imageUrl[0] }}
        style={{ width: 80, height: 80 }}
      />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 500, flex: 1 }}>
          {data.motelId.title}
        </Text>
        <Text style={{ marginBottom: 10 }}>{data.motelId.price} VNĐ</Text>
      </View>
      <View
        style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
      >
        <AntDesign name="checkcircle" size={24} color="#16a34a" />
      </View>
    </TouchableOpacity>
  );
}

export default Item;
