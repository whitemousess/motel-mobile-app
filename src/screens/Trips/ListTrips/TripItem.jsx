import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function TripItem({ data, onCancel }) {
  const navigation = useNavigation();
  const renderLeftActions = () => {
    return (
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            backgroundColor: "#16a34a",
          }}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("PaymentScreen", {
              BookedID: data._id,
              amount: data.motelId.price,
              language: "vn",
              bankCode: "",
            })
          }
        >
          <AntDesign name="shoppingcart" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            backgroundColor: "#f87171",
          }}
          activeOpacity={0.8}
          onPress={() => onCancel(data._id)}
        >
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Swipeable renderRightActions={renderLeftActions}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 10,
            overflow: "hidden",
          }}
          activeOpacity={1}
          onPress={() => {
            navigation.navigate("Detail", { motelId: data.motelId._id });
          }}
        >
          <Image
            source={{ uri: data.motelId.imageUrl[0] }}
            style={{ width: 100, height: 100 }}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 500, flex: 1 }}>
              {data.motelId.title}
            </Text>
            <Text style={{ marginBottom: 10 }}>{data.motelId.price} VNĐ</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}

export default TripItem;
