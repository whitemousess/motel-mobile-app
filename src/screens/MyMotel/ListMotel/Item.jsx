import { Image, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Item({ data, onDelete, openModal }) {
  const navigation = useNavigation();

  const renderLeftActions = () => {
    return (
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            backgroundColor: "#52D3D8",
            marginLeft: 10,
            marginRight: 4,
          }}
          activeOpacity={0.8}
          onPress={() => openModal(data)}
        >
          <Feather name="eye" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            backgroundColor: "#16a34a",
            marginRight: 4,
          }}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("EditMotel", {
              motelId: data._id,
            })
          }
        >
          <Feather name="edit" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            backgroundColor: "#f87171",
          }}
          activeOpacity={0.8}
          onPress={() => onDelete(data._id)}
        >
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderLeftActions}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          borderWidth: 1,
          borderColor: "#DDDDDD",
          borderRadius: 10,
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: data.imageUrl[0] }}
          style={{ width: 80, height: 80 }}
        />
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>
            {data.title}
          </Text>
          <Text>{data.district + " - " + data.province}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

export default Item;
